# Windows Build Fix Script for Kilo Code Project
# Addresses Spectre libraries issue and peer dependency conflicts

Write-Host "=== Kilo Code Windows Build Fix ===" -ForegroundColor Cyan
Write-Host "Resolving node-gyp build failures and peer dependency conflicts" -ForegroundColor Yellow

# Set environment variables to help with MSBuild configuration
Write-Host "`n1. Setting build environment variables..." -ForegroundColor Green
[Environment]::SetEnvironmentVariable("GYP_MSVS_VERSION", "2022", "Machine")
[Environment]::SetEnvironmentVariable("npm_config_msvs_version", "2022", "Machine")
Write-Host "✅ Set GYP_MSVS_VERSION=2022" -ForegroundColor Green
Write-Host "✅ Set npm_config_msvs_version=2022" -ForegroundColor Green

# Check if Visual Studio Build Tools is installed
$vsInstallPath = "C:\Program Files (x86)\Microsoft Visual Studio\2022\BuildTools"
$vsCommunityPath = "C:\Program Files\Microsoft Visual Studio\2022\Community"
$msbuildPath = $null

if (Test-Path "$vsInstallPath\MSBuild\Current\Bin\MSBuild.exe") {
    $msbuildPath = "$vsInstallPath\MSBuild\Current\Bin\MSBuild.exe"
} elseif (Test-Path "$vsCommunityPath\MSBuild\Current\Bin\MSBuild.exe") {
    $msbuildPath = "$vsCommunityPath\MSBuild\Current\Bin\MSBuild.exe"
}

if ($msbuildPath) {
    Write-Host "✅ Found MSBuild at: $msbuildPath" -ForegroundColor Green
    [Environment]::SetEnvironmentVariable("msbuild_path", $msbuildPath, "Machine")
} else {
    Write-Host "⚠️  MSBuild not found in standard locations" -ForegroundColor Yellow
    Write-Host "   Please ensure Visual Studio Build Tools 2022 is installed" -ForegroundColor Yellow
}

# Create .npmrc configuration
Write-Host "`n2. Creating .npmrc configuration..." -ForegroundColor Green
$npmrcContent = @"
# Windows Build Configuration
node-linker=isolated
sqlite3_binary_site=https://foxgis.oss-cn-shanghai.aliyuncs.com/
sqlite3_binary_host_mirror=https://registry.npmmirror.com/-/binary/sqlite3/
msbuild_toolset=14.0

# Build optimizations
prefer-offline=true
"@

$npmrcContent | Out-File -FilePath ".npmrc" -Encoding UTF8
Write-Host "✅ Created/Updated .npmrc with build optimizations" -ForegroundColor Green

# Clean and reinstall dependencies
Write-Host "`n3. Cleaning and reinstalling dependencies..." -ForegroundColor Green
Write-Host "This may take several minutes..." -ForegroundColor Yellow

try {
    # Remove existing node_modules and lock file
    if (Test-Path "node_modules") {
        Remove-Item -Recurse -Force "node_modules" -ErrorAction SilentlyContinue
        Write-Host "✅ Removed node_modules" -ForegroundColor Green
    }
    
    if (Test-Path "pnpm-lock.yaml") {
        Remove-Item "pnpm-lock.yaml" -Force -ErrorAction SilentlyContinue
        Write-Host "✅ Removed pnpm-lock.yaml" -ForegroundColor Green
    }

    # Run pnpm install
    Write-Host "`nRunning pnpm install..." -ForegroundColor Cyan
    $process = Start-Process -FilePath "pnpm" -ArgumentList "install" -Wait -PassThru -NoNewWindow
    
    if ($process.ExitCode -eq 0) {
        Write-Host "✅ pnpm install completed successfully!" -ForegroundColor Green
    } else {
        Write-Host "❌ pnpm install failed with exit code $($process.ExitCode)" -ForegroundColor Red
        Write-Host "`nTrying with --ignore-scripts flag..." -ForegroundColor Yellow
        
        $ignoreProcess = Start-Process -FilePath "pnpm" -ArgumentList "install", "--ignore-scripts" -Wait -PassThru -NoNewWindow
        
        if ($ignoreProcess.ExitCode -eq 0) {
            Write-Host "✅ pnpm install --ignore-scripts completed successfully!" -ForegroundColor Green
            Write-Host "⚠️  Note: Some native modules may not be built" -ForegroundColor Yellow
        } else {
            Write-Host "❌ Installation failed even with --ignore-scripts" -ForegroundColor Red
        }
    }
} catch {
    Write-Host "❌ Error during installation: $($_.Exception.Message)" -ForegroundColor Red
}

# Validate peer dependencies
Write-Host "`n4. Validating peer dependencies..." -ForegroundColor Green
try {
    $cliPath = "cli"
    if (Test-Path $cliPath) {
        Set-Location $cliPath
        $validationProcess = Start-Process -FilePath "pnpm" -ArgumentList "why", "ink-select-input", "ink-text-input", "marked-terminal" -Wait -PassThru -NoNewWindow -RedirectStandardOutput "validation_output.txt"
        
        if (Test-Path "validation_output.txt") {
            $output = Get-Content "validation_output.txt"
            Write-Host "✅ Peer dependency check completed" -ForegroundColor Green
            Write-Host "   Output saved to validation_output.txt" -ForegroundColor Gray
        }
        
        Set-Location ".."
    }
} catch {
    Write-Host "⚠️  Could not validate peer dependencies: $($_.Exception.Message)" -ForegroundColor Yellow
}

# Final recommendations
Write-Host "`n=== RESOLUTION SUMMARY ===" -ForegroundColor Cyan
Write-Host "✅ Environment variables configured" -ForegroundColor Green
Write-Host "✅ .npmrc created with build optimizations" -ForegroundColor Green
Write-Host "✅ Dependencies installation attempted" -ForegroundColor Green
Write-Host ""
Write-Host "📋 NEXT STEPS IF BUILD FAILS:" -ForegroundColor Yellow
Write-Host "1. Install Spectre mitigation libraries via Visual Studio Installer:" -ForegroundColor White
Write-Host "   - Open Visual Studio Installer" -ForegroundColor Gray
Write-Host "   - Modify Visual Studio Build Tools 2022" -ForegroundColor Gray
Write-Host "   - Go to Individual Components tab" -ForegroundColor Gray
Write-Host "   - Search for 'Spectre' and install all Spectre-related components" -ForegroundColor Gray
Write-Host "   - Also install: C++ AddressSanitizer and MSVC v143 compiler toolset" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Alternative: Use pre-built binaries" -ForegroundColor White
Write-Host "   pnpm install --ignore-scripts" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Restart your terminal/IDE after making changes" -ForegroundColor Gray
Write-Host ""
Write-Host "📁 DOCUMENTATION: See WINDOWS_BUILD_AND_DEPENDENCY_RESOLUTION.md" -ForegroundColor Cyan

Write-Host "`n=== Script Complete ===" -ForegroundColor Cyan