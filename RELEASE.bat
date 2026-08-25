@echo off
title KR Tasker - Auto Release
echo.
echo =======================================
echo    KR Tasker Auto Release Tool
echo =======================================
echo.
echo Kya release karna hai?
echo   [1] Patch update  (bug fix)     e.g. 1.0.1 to 1.0.2
echo   [2] Minor update  (new feature) e.g. 1.0.1 to 1.1.0
echo   [3] Major update  (big release) e.g. 1.0.1 to 2.0.0
echo.
set /p choice="Choice (1/2/3): "

if "%choice%"=="1" set BUMP=patch
if "%choice%"=="2" set BUMP=minor
if "%choice%"=="3" set BUMP=major
if not defined BUMP set BUMP=patch

echo.
set /p NOTES="Release notes (Enter dabao skip ke liye): "

if "%NOTES%"=="" (
  node "%~dp0release.js" %BUMP%
) else (
  node "%~dp0release.js" %BUMP% --notes "%NOTES%"
)

echo.
pause
