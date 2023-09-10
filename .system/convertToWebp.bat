@echo off
setlocal enabledelayedexpansion

@REM Change directory to the target folder.
cd atlas

@REM Check if "compressed" folder exists. If not, create it.
@REM if not exist compressed mkdir compressed

@REM Loop through all jpg files in the target directory.
for %%i in (*.jpg) do (
    @REM Convert jpg to webp using cwebp with a quality factor of 75 and save to the "compressed" folder.
    cwebp -q 80 "%%i" -o "..\..\public\atlas\%%~ni.webp"
)

echo Conversion complete!
pause
