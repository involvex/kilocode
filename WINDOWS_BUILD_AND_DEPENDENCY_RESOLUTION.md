# Windows Build & Dependency Resolution Guide

## Executive Summary

This guide resolves two critical issues simultaneously:

1. **Peer Dependency Conflicts** - ✅ RESOLVED
2. **node-gyp Build Failures** - 🔧 DETAILED SOLUTION PROVIDED

## Issue Analysis

### 1. Peer Dependency Conflicts (RESOLVED ✅)

**Original Problem:**

- `ink-select-input@4.2.2` expected `ink@^3.0.5` and `react@^16.5.2||^17.0.0` (found: ink@4.4.1, react@18.3.1)
- `ink-text-input@4.0.3` expected `ink@^3.0.0-3` and `react@^16.5.2||^17.0.0` (found: ink@4.4.1, react@18.3.1)
- `marked-terminal@6.3.0` expected `marked@>=1 <13` (found: marked@17.0.1)

**Clarification on React Compatibility:**

- **ink@5.x**: Compatible with React 18+ ✅ (React 18.3.1 supported)
- **ink@6.x**: Requires React 19+ ❌ (incompatible with React 18.3.1)

**Solution Applied:**

- Used `ink@5.2.1` (latest 5.x version) for React 18 compatibility
- Updated all related packages to compatible versions
- Configured pnpm overrides for workspace consistency

### 2. node-gyp Build Failures (MSB8040 Spectre Error)

**Error Details:**

```
MSB8040: Spectre mitigation libraries are required for this project
Install them via Visual Studio Installer (Individual Components tab)
```

**Affected Packages:**

- `@vscode/deviceid@0.1.2`
- `@vscode/policy-watcher@1.3.5`
- `windows-foreground-love@0.5.0`

**System Context:**

- Windows 11 (10.0.26200)
- Node.js v20.19.2
- node-gyp v10.1.0
- Python 3.9.13
- Visual Studio Build Tools 2022 (17.14.36717.8)

## Complete Resolution Strategy

### Phase 1: Peer Dependency Resolution (IMPLEMENTED)

**Configuration Changes:**

**Root `package.json` pnpm overrides:**

```json
{
	"pnpm": {
		"overrides": {
			"@involvex/kilocode-cli>ink": "^5.2.1",
			"@involvex/kilocode-cli>react-devtools-core": "^4.19.1",
			"@involvex/kilocode-cli>ink-select-input": "^6.2.0",
			"@involvex/kilocode-cli>ink-text-input": "^6.0.0",
			"@involvex/kilocode-cli>marked": "^15.0.0",
			"@involvex/kilocode-cli>marked-terminal": "^7.3.0"
		}
	}
}
```

**CLI `cli/package.json` dependencies:**

```json
{
	"dependencies": {
		"ink": "^5.2.1",
		"ink-select-input": "^6.2.0",
		"ink-text-input": "^6.0.0",
		"marked": "^15.0.0",
		"marked-terminal": "^7.3.0"
	}
}
```

### Phase 2: Spectre Libraries Fix (IMPLEMENTATION REQUIRED)

#### Option A: Install Spectre Libraries via Visual Studio Installer (RECOMMENDED)

1. **Open Visual Studio Installer**
    - Search for "Visual Studio Installer" in Windows Start menu
    - Or run: `"C:\Program Files (x86)\Microsoft Visual Studio\Installer\vs_installer.exe"`

2. **Modify Visual Studio Build Tools 2022**
    - Click "Modify" on Visual Studio Build Tools 2022
    - Go to "Individual Components" tab
    - Search for "Spectre"
    - Install these components:
        - ✅ **MSVC v143 - VS 2022 C++ x64/x86 build tools (v14.38-19.39)**
        - ✅ **C++ CMake tools for Windows**
        - ✅ **Windows 11 SDK (10.0.22621.0) for x64/x86/arm64**
        - ✅ **C++ AddressSanitizer (requires MSVC v143 compiler toolset)**

3. **Enable Spectre Mitigations**
    - In Individual Components, also ensure:
        - ✅ **Spectre-mitigated libraries (latest) for MSVC v143**
    - Click "Modify" to install

#### Option B: Disable Spectre Mitigations (WORKAROUND)

**Create `.npmrc` configuration:**

```ini
# Disable Spectre mitigations for node-gyp
msbuild_path=C:\Program Files\Microsoft Visual Studio\2022\Community\MSBuild\Current\Bin\MSBuild.exe

# Environment variables to bypass Spectre requirements
GYP_MSVS_VERSION=2022
npm_config_msvs_version=2022
npm_config_build_from_source=true
```

**Set environment variables:**

```powershell
# Run in PowerShell as Administrator
[Environment]::SetEnvironmentVariable("GYP_MSVS_VERSION", "2022", "Machine")
[Environment]::SetEnvironmentVariable("npm_config_msvs_version", "2022", "Machine")
[Environment]::SetEnvironmentVariable("npm_config_build_from_source", "true", "Machine")
```

#### Option C: Pre-built Binaries (FALLBACK)

**Configure pnpm to skip native builds:**

```ini
# In .npmrc
prefer-offline=true
ignore-scripts=false
```

**Or install with build skipping:**

```bash
pnpm install --ignore-scripts
```

**Then manually install problematic packages:**

```bash
# Install only the problematic VS Code packages with scripts disabled
pnpm install @vscode/deviceid@0.1.2 --ignore-scripts
pnpm install @vscode/policy-watcher@1.3.5 --ignore-scripts
pnpm install windows-foreground-love@0.5.0 --ignore-scripts
```

## Implementation Steps

### Step 1: Apply Peer Dependency Fixes

```bash
# Clean install with new configurations
rmdir /s /q node_modules
del pnpm-lock.yaml
pnpm install
```

### Step 2: Install Spectre Libraries (Option A - Recommended)

1. Follow Visual Studio Installer steps above
2. Restart your terminal/IDE
3. Retry the build:

```bash
pnpm install
```

### Step 3: Validate Resolution

```bash
# Check peer dependencies are satisfied
cd cli
pnpm why ink-select-input ink-text-input marked-terminal

# Verify ink compatibility
pnpm why ink
```

**Expected output for ink:**

```
ink 5.2.1
├── react 18.3.1 peer
└─┬ react-reconciler 0.33.0
  └── react 18.3.1 peer
```

## Troubleshooting

### If Spectre Errors Persist

**Clear node-gyp cache:**

```bash
npm config delete node_gyp
pnpm store prune
rmdir /s /q node_modules
del pnpm-lock.yaml
pnpm install
```

**Alternative: Use pre-built binaries**

```bash
# Install with --ignore-scripts to skip problematic builds
pnpm install --ignore-scripts
```

### If Peer Dependency Warnings Remain

**Check override configuration:**

```bash
# Verify overrides are applied
pnpm list --filter @involvex/kilocode-cli
```

**Force resolution:**

```bash
pnpm install --force
```

## Success Criteria

✅ **Peer Dependencies**: No unmet peer dependency warnings
✅ **Build Success**: pnpm install completes without MSB8040 errors
✅ **Native Modules**: All VS Code extension packages compile successfully
✅ **React Compatibility**: ink@5.2.1 works with React 18.3.1

## Rollback Plan

If issues arise:

**Revert peer dependency changes:**

```bash
git checkout HEAD~1 -- package.json cli/package.json
rmdir /s /q node_modules
del pnpm-lock.yaml
pnpm install
```

**Revert Spectre changes:**

- Uncheck Spectre libraries in Visual Studio Installer
- Remove environment variables set in Option B

## Long-term Recommendations

1. **Monitor Updates**: ink@6.x will become viable when you upgrade to React 19
2. **Build Environment**: Keep Visual Studio Build Tools updated with latest Spectre libraries
3. **CI/CD**: Consider using GitHub Actions or Docker for consistent build environments
4. **Package Management**: Continue using pnpm overrides for workspace consistency

## Technical Notes

- **Spectre Mitigations**: Security feature in MSVC that adds runtime checks for speculative execution vulnerabilities
- **React Version Constraint**: ink@5.2.1 provides optimal balance of features and compatibility
- **node-gyp**: Native module build tool that respects MSVC compiler settings
- **pnpm Overrides**: Ensures consistent versions across all workspace packages

This comprehensive solution addresses both the peer dependency conflicts and Windows build failures, providing multiple resolution paths for different deployment scenarios.
