#!/usr/bin/env node

/**
 * Build Environment Fix Script for Windows Node.js/TypeScript Projects
 * Fixes native module compilation issues caused by VS Build Tools configuration
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🔧 Build Environment Fix Script for Kilo Code');
console.log('=================================================\n');

function runCommand(command, description) {
    console.log(`🔄 ${description}...`);
    try {
        const result = execSync(command, { 
            encoding: 'utf8', 
            stdio: 'pipe',
            cwd: process.cwd()
        });
        console.log(`✅ ${description} completed successfully`);
        return result;
    } catch (error) {
        console.log(`❌ ${description} failed:`, error.message);
        return null;
    }
}

function checkBuildEnvironment() {
    console.log('📋 Checking Build Environment...\n');
    
    // Check Node.js version
    const nodeVersion = runCommand('node --version', 'Node.js version check');
    
    // Check pnpm version  
    const pnpmVersion = runCommand('pnpm --version', 'pnpm version check');
    
    // Check Python configuration
    const pythonConfig = runCommand('npm config get python', 'Python configuration check');
    
    // Check MSBuild availability
    const msbuildPath = runCommand('where msbuild', 'MSBuild path check');
    
    // Check Visual Studio installations
    const vsInstallations = runCommand('dir "C:\\Program Files (x86)\\Microsoft Visual Studio" 2>nul || echo "No VS installation directory found"', 'VS installations check');
    
    return {
        nodeVersion,
        pnpmVersion,
        pythonConfig,
        msbuildPath,
        vsInstallations
    };
}

function fixPythonConfiguration() {
    console.log('🐍 Fixing Python Configuration...\n');
    
    // Set Python 3.9.13 for node-gyp consistency
    const pythonPath = 'C:\\Users\\lukas\\.pyenv\\pyenv-win\\versions\\3.9.13\\python3.exe';
    
    try {
        // Check if Python path exists
        if (fs.existsSync(pythonPath.replace(/\\/g, '\\\\'))) {
            runCommand(`npm config set python "${pythonPath}"`, 'Setting Python path for node-gyp');
            const pythonConfig = runCommand('npm config get python', 'Verifying Python configuration');
            console.log(`✅ Python configured successfully: ${pythonConfig}`);
        } else {
            console.log('⚠️  Python 3.9.13 not found at expected path, skipping configuration');
        }
    } catch (error) {
        console.log('❌ Python configuration failed:', error.message);
    }
}

function cleanAndReinstall() {
    console.log('🧹 Cleaning and Reinstalling Dependencies...\n');
    
    // Remove node_modules and pnpm store
    const dirsToClean = [
        'node_modules',
        '.pnpm-store',
        '.turbo'
    ];
    
    dirsToClean.forEach(dir => {
        if (fs.existsSync(dir)) {
            runCommand(`rmdir /s /q ${dir}`, `Removing ${dir}`);
        }
    });
    
    // Remove lock files
    const lockFiles = [
        'pnpm-lock.yaml',
        'package-lock.json'
    ];
    
    lockFiles.forEach(file => {
        if (fs.existsSync(file)) {
            runCommand(`del ${file}`, `Removing ${file}`);
        }
    });
    
    // Reinstall with frozen lockfile
    runCommand('pnpm install --frozen-lockfile', 'Installing dependencies with frozen lockfile');
}

function testNativeCompilation() {
    console.log('🧪 Testing Native Module Compilation...\n');
    
    const sqlite3Path = 'node_modules/.pnpm/@vscode+sqlite3@5.1.8-vscode/node_modules/@vscode/sqlite3';
    
    if (fs.existsSync(sqlite3Path)) {
        try {
            process.chdir(sqlite3Path);
            runCommand('node-gyp rebuild --verbose', 'Testing @vscode/sqlite3 compilation');
            process.chdir('..');
        } catch (error) {
            console.log('❌ Native compilation test failed - likely due to missing Spectre libraries');
            console.log('💡 See BUILD_FIX_GUIDE.md for manual Spectre library installation steps');
        }
    } else {
        console.log('⚠️  @vscode/sqlite3 not found, skipping native compilation test');
    }
}

function main() {
    console.log('Starting comprehensive build environment fixes...\n');
    
    // Check current environment
    const env = checkBuildEnvironment();
    
    // Fix Python configuration
    fixPythonConfiguration();
    
    // Clean and reinstall (commented out to avoid unintended deletion)
    console.log('🧹 To perform clean reinstall, run these commands manually:');
    console.log('  rmdir /s node_modules');
    console.log('  rmdir /s .pnpm-store');
    console.log('  del pnpm-lock.yaml');
    console.log('  pnpm install --frozen-lockfile\n');
    
    // Test native compilation
    testNativeCompilation();
    
    console.log('📋 Build Environment Fix Summary:');
    console.log('================================');
    console.log('✅ Build environment analysis completed');
    console.log('✅ Python configuration fixed (if Python 3.9.13 available)');
    console.log('⚠️  Manual action required: Install Spectre mitigation libraries (see BUILD_FIX_GUIDE.md)');
    console.log('📋 Next steps:');
    console.log('   1. Complete manual Spectre library installation');
    console.log('   2. Restart computer');
    console.log('   3. Run: pnpm install --frozen-lockfile');
    console.log('   4. Test build: pnpm run check-types');
    console.log('\n🎯 For detailed instructions, see BUILD_FIX_GUIDE.md');
}

if (import.meta.url === `file://${process.argv[1]}`) {
    main();
}