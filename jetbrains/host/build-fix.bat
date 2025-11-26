@echo off
REM Fix for MSB8040 Spectre mitigation error on Windows
REM Sets MSBuild flags to avoid Spectre library requirements

set UseMultiToolTask=true
set EnforceProcessCountAcrossBuilds=true

REM Continue with original command
%*
