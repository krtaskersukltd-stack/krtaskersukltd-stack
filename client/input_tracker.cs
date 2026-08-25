using System;
using System.Diagnostics;
using System.Runtime.InteropServices;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;
using System.Windows.Forms;

namespace InputTracker {
    class Program {
        private static int keyCount = 0;
        private static int clickCount = 0;

        private const int WH_KEYBOARD_LL = 13;
        private const int WH_MOUSE_LL = 14;
        private const int WM_KEYDOWN = 0x0100;
        private const int WM_SYSKEYDOWN = 0x0104;
        private const int WM_LBUTTONDOWN = 0x0201;
        private const int WM_RBUTTONDOWN = 0x0204;
        private const int WM_MBUTTONDOWN = 0x0207;

        private delegate IntPtr LowLevelProc(int nCode, IntPtr wParam, IntPtr lParam);
        private static LowLevelProc _keyboardProc = KeyboardHookCallback;
        private static LowLevelProc _mouseProc = MouseHookCallback;
        private static IntPtr _keyboardHookID = IntPtr.Zero;
        private static IntPtr _mouseHookID = IntPtr.Zero;

        [DllImport("user32.dll", CharSet = CharSet.Auto, SetLastError = true)]
        private static extern IntPtr SetWindowsHookEx(int idHook, LowLevelProc lpfn, IntPtr hMod, uint dwThreadId);

        [DllImport("user32.dll", CharSet = CharSet.Auto, SetLastError = true)]
        [return: MarshalAs(UnmanagedType.Bool)]
        private static extern bool UnhookWindowsHookEx(IntPtr hhk);

        [DllImport("user32.dll", CharSet = CharSet.Auto, SetLastError = true)]
        private static extern IntPtr CallNextHookEx(IntPtr hhk, int nCode, IntPtr wParam, IntPtr lParam);

        [DllImport("kernel32.dll", CharSet = CharSet.Auto, SetLastError = true)]
        private static extern IntPtr GetModuleHandle(string lpModuleName);

        [DllImport("user32.dll")] public static extern IntPtr GetForegroundWindow();
        [DllImport("user32.dll", CharSet = CharSet.Auto)] public static extern int GetWindowText(IntPtr hWnd, StringBuilder text, int count);
        [DllImport("user32.dll")] public static extern uint GetWindowThreadProcessId(IntPtr hWnd, out uint lpdwProcessId);

        private static IntPtr KeyboardHookCallback(int nCode, IntPtr wParam, IntPtr lParam) {
            if (nCode >= 0 && (wParam == (IntPtr)WM_KEYDOWN || wParam == (IntPtr)WM_SYSKEYDOWN)) {
                Interlocked.Increment(ref keyCount);
            }
            return CallNextHookEx(_keyboardHookID, nCode, wParam, lParam);
        }

        private static IntPtr MouseHookCallback(int nCode, IntPtr wParam, IntPtr lParam) {
            if (nCode >= 0 && (wParam == (IntPtr)WM_LBUTTONDOWN || wParam == (IntPtr)WM_RBUTTONDOWN || wParam == (IntPtr)WM_MBUTTONDOWN)) {
                Interlocked.Increment(ref clickCount);
            }
            return CallNextHookEx(_mouseHookID, nCode, wParam, lParam);
        }

        static void Main(string[] args) {
            // Low-level hooks need a stable module handle and an active message loop.
            IntPtr moduleHandle = GetModuleHandle(null);
            _keyboardHookID = SetWindowsHookEx(WH_KEYBOARD_LL, _keyboardProc, moduleHandle, 0);
            _mouseHookID = SetWindowsHookEx(WH_MOUSE_LL, _mouseProc, moduleHandle, 0);
            if (_keyboardHookID == IntPtr.Zero || _mouseHookID == IntPtr.Zero) {
                Console.Error.WriteLine("Unable to install global input hooks. Win32 error: " + Marshal.GetLastWin32Error());
                if (_keyboardHookID != IntPtr.Zero) UnhookWindowsHookEx(_keyboardHookID);
                if (_mouseHookID != IntPtr.Zero) UnhookWindowsHookEx(_mouseHookID);
                Environment.Exit(2);
            }

            // Output JSON stats line every 1 second
            Thread timerThread = new Thread(() => {
                while (true) {
                    Thread.Sleep(1000);
                    int k = Interlocked.Exchange(ref keyCount, 0);
                    int c = Interlocked.Exchange(ref clickCount, 0);

                    IntPtr hwnd = GetForegroundWindow();
                    string rawProc = "Idle";
                    string rawTitle = "";

                    if (hwnd != IntPtr.Zero) {
                        StringBuilder sb = new StringBuilder(512);
                        GetWindowText(hwnd, sb, 512);
                        rawTitle = sb.ToString();

                        uint pid = 0;
                        GetWindowThreadProcessId(hwnd, out pid);
                        if (pid > 0) {
                            try {
                                Process proc = Process.GetProcessById((int)pid);
                                if (proc != null) rawProc = proc.ProcessName;
                            } catch {}
                        }
                    }

                    string formattedProc = FormatProcessName(rawProc);
                    string formattedTitle = FormatTitle(rawProc, rawTitle);

                    string json = string.Format(
                        "{{\"keystrokes\":{0},\"mouseClicks\":{1},\"process\":\"{2}\",\"title\":\"{3}\"}}",
                        k, c, EscapeJson(formattedProc), EscapeJson(formattedTitle)
                    );
                    Console.WriteLine(json);
                }
            });
            timerThread.IsBackground = true;
            timerThread.Start();

            // Win32 message loop to keep hook active
            Application.Run();

            if (_keyboardHookID != IntPtr.Zero) UnhookWindowsHookEx(_keyboardHookID);
            if (_mouseHookID != IntPtr.Zero) UnhookWindowsHookEx(_mouseHookID);
        }

        private static string FormatProcessName(string proc) {
            if (string.IsNullOrEmpty(proc) || proc.ToLower() == "idle") return "Idle";
            string p = proc.ToLower();
            if (p == "chrome") return "Google Chrome";
            if (p == "msedge") return "Microsoft Edge";
            if (p == "firefox") return "Mozilla Firefox";
            if (p == "brave") return "Brave Browser";
            if (p == "opera") return "Opera";
            if (p == "vivaldi") return "Vivaldi";
            if (p == "code") return "VS Code";
            if (p == "devenv") return "Visual Studio";
            if (p == "slack") return "Slack";
            if (p == "discord") return "Discord";
            if (p == "teams") return "Microsoft Teams";
            if (p == "excel") return "Excel";
            if (p == "winword") return "Word";
            if (p == "powerpnt") return "PowerPoint";
            if (p == "figma") return "Figma";
            if (p == "photoshop") return "Photoshop";
            return proc;
        }

        private static string FormatTitle(string proc, string title) {
            if (string.IsNullOrEmpty(title)) return "No activity";
            string clean = title.Trim();

            // Browser Suffixes to strip
            string[] suffixes = new string[] {
                " - Google Chrome",
                " - Microsoft Edge",
                " - Mozilla Firefox",
                " - Brave",
                " - Opera",
                " - Vivaldi",
                " - Personal - Microsoft Edge",
                " - Work - Microsoft Edge"
            };

            foreach (var suf in suffixes) {
                if (clean.EndsWith(suf, StringComparison.OrdinalIgnoreCase)) {
                    clean = clean.Substring(0, clean.Length - suf.Length).Trim();
                    break;
                }
            }

            // Look for domain names in the title (e.g. github.com, vercel.app, google.com, etc.)
            Match domainMatch = Regex.Match(clean, @"\b([a-zA-Z0-9-]+\.(?:com|org|net|io|app|co|uk|ai|dev|gov|edu|me|tv|xyz|info))\b", RegexOptions.IgnoreCase);
            if (domainMatch.Success) {
                string domain = domainMatch.Value.ToLower();
                // If title is just the domain or long title, return domain with title
                if (!clean.ToLower().StartsWith(domain)) {
                    return domain + " (" + clean + ")";
                }
                return domain;
            }

            return clean;
        }

        private static string EscapeJson(string str) {
            if (string.IsNullOrEmpty(str)) return "";
            return str.Replace("\\", "\\\\").Replace("\"", "\\\"").Replace("\r", "").Replace("\n", " ");
        }
    }
}
