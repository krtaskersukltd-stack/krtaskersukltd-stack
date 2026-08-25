import 'server-only';

const DEFAULT_REPORT_EMAIL = 'krtaskersukltd@gmail.com';

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  })[character] || character);
}

interface WorkReportEmail {
  employeeName: string;
  employeeEmail: string;
  companyId: string;
  type: 'BREAK' | 'STOP';
  note: string;
  createdAt: Date;
  ownerEmail?: string | null;
}

export async function sendWorkReportEmail(report: WorkReportEmail): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return false;

  const configuredRecipients = (process.env.REPORT_TO_EMAIL || DEFAULT_REPORT_EMAIL)
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
  if (report.ownerEmail) configuredRecipients.push(report.ownerEmail.trim().toLowerCase());
  const recipients = [...new Set(configuredRecipients)].slice(0, 5);
  if (recipients.length === 0) return false;

  const action = report.type === 'BREAK' ? 'started a break' : 'stopped tracking';
  const timestamp = report.createdAt.toISOString();
  const subject = `[KR Tasker] ${report.employeeName} ${action}`;
  const text = [
    `${report.employeeName} (${report.employeeEmail}) ${action}.`,
    `Time: ${timestamp}`,
    `Company: ${report.companyId}`,
    '',
    'Work report:',
    report.note,
  ].join('\n');

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.REPORT_FROM_EMAIL || 'KR Tasker <onboarding@resend.dev>',
        to: recipients,
        subject,
        text,
        html: `<div style="font-family:Arial,sans-serif;line-height:1.6;color:#18181b"><h2>${escapeHtml(report.employeeName)} ${escapeHtml(action)}</h2><p><strong>Employee:</strong> ${escapeHtml(report.employeeEmail)}<br><strong>Time:</strong> ${escapeHtml(timestamp)}<br><strong>Company:</strong> ${escapeHtml(report.companyId)}</p><h3>Work report</h3><p style="white-space:pre-wrap">${escapeHtml(report.note)}</p></div>`,
      }),
      signal: AbortSignal.timeout(8_000),
    });
    return response.ok;
  } catch (error) {
    console.error('Work report email delivery failed:', error);
    return false;
  }
}
