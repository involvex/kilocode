#!/usr/bin/env node

/**
 * Comprehensive Node.js/TypeScript Build Environment Diagnostic Tool
 * Analyzes all aspects of Windows development environment for build failures
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const colors = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function runCommand(command, description, options = {}) {
    log(`🔄 ${description}...`, 'cyan');
    try {
        const result = execSync(command, { 
            encoding: 'utf8', 
            stdio: 'pipe',
            timeout: 30000, // 30 second timeout
            ...options
        });
        log(`✅ ${description} completed`, 'green');
        return result.trim();
    } catch (error) {
        log(`❌ ${description} failed: ${error.message}`, 'red');
        return null;
    }
}

function checkFileExists(filePath, description) {
    if (fs.existsSync(filePath)) {
        log(`✅ ${description} exists`, 'green');
        return true;
    } else {
        log(`❌ ${description} missing`, 'red');
        return false;
    }
}

function analyzeDependencies() {
    log('\n📦 DEPENDENCY ANALYSIS', 'magenta');
    log('========================', 'magenta');
    
    // Check pnpm lock file
    const hasPnpmLock = checkFileExists('pnpm-lock.yaml', 'pnpm-lock.yaml');
    
    // Check node_modules
    const nodeModulesExists = checkFileExists('node_modules', 'node_modules directory');
    
    // Analyze package.json
    if (checkFileExists('package.json', 'package.json')) {
        try {
            const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
            log(`📋 Package: ${packageJson.name}`, 'blue');
            log(`📋 Version: ${packageJson.version}`, 'blue');
            log(`📋 Engine: ${packageJson.engines?.node || 'Not specified'}`, 'blue');
            
            // Check for potential conflicts
            const deps = packageJson.dependencies || {};
            const devDeps = packageJson.devDependencies || {};
            const allDeps = { ...deps, ...devDeps };
            
            // Look for known problematic packages
            const problematicPackages = [
                '@vscode/sqlite3', 'keytar', '@tailwindcss/oxide', 
                'puppeteer-chromium-resolver', 'esbuild'
            ];
            
            const foundProblematic = Object.keys(allDeps).filter(pkg => 
                problematicPackages.some(prob => pkg.includes(prob))
            );
            
            if (foundProblematic.length > 0) {
                log(`⚠️  Native dependencies found: ${foundProblematic.join(', ')}`, 'yellow');
            }
            
        } catch (error) {
            log(`❌ Failed to parse package.json: ${error.message}`, 'red');
        }
    }
    
    // Check pnpm store
    const pnpmStore = runCommand('pnpm store path', 'pnpm store location');
    if (pnpmStore) {
        log(`📦 pnpm store: ${pnpmStore}`, 'blue');
    }
    
    return { hasPnpmLock, nodeModulesExists };
}

function analyzeBuildTools() {
    log('\n🔧 BUILD TOOLS ANALYSIS', 'magenta');
    log('========================', 'magenta');
    
    // Node.js version
    const nodeVersion = runCommand('node --version', 'Node.js version');
    const npmVersion = runCommand('npm --version', 'npm version');
    const pnpmVersion = runCommand('pnpm --version', 'pnpm version');
    
    // Python configuration
    const pythonPath = runCommand('where python', 'Python installation');
    const pythonVersion = runCommand('python --version', 'Python version');
    const npmPythonConfig = runCommand('npm config get python', 'npm Python config');
    
    // Visual Studio Build Tools
    const msbuildPath = runCommand('where msbuild', 'MSBuild location');
    const vsInstallations = runCommand('dir "C:\\Program Files (x86)\\Microsoft Visual Studio" 2>nul || echo "No VS installations found"', 'VS installations');
    
    // node-gyp configuration
    const nodeGypVersion = runCommand('node-gyp --version', 'node-gyp version');
    
    // Check for Spectre libraries (indirect check via VS components)
    const vswherePath = 'C:\\Program Files (x86)\\Microsoft Visual Studio\\Installer\\vswhere.exe';
    if (checkFileExists(vswherePath, 'vswhere.exe')) {
        try {
            const vsInfo = execSync(`"${vswherePath}" -latest -products * -includes 2`, {
                encoding: 'utf8',
                stdio: 'pipe'
            });
            log('🏗️  Visual Studio installations:', 'blue');
            console.log(vsInfo);
        } catch (error) {
            log('⚠️  Could not query VS installations', 'yellow');
        }
    }
    
    return {
        nodeVersion, npmVersion, pnpmVersion,
        pythonPath, pythonVersion, npmPythonConfig,
        msbuildPath, vsInstallations, nodeGypVersion
    };
}

function testNativeCompilation() {
    log('\n🔨 NATIVE MODULE COMPILATION TEST', 'magenta');
    log('===================================', 'magenta');
    
    // Check for native module source files
    const nativeModules = [
        'node_modules/.pnpm/@vscode+sqlite3*/node_modules/@vscode/sqlite3',
        'node_modules/.pnpm/keytar*/node_modules/keytar',
        'node_modules/.pnpm/@tailwindcss+oxide*/node_modules/@tailwindcss/oxide'
    ];
    
    let foundNativeModules = [];
    nativeModules.forEach(pattern => {
        // Simple glob matching
        const parts = pattern.split('/');
        const moduleName = parts[1].replace('*', '');
        
        if (fs.existsSync('node_modules/.pnpm')) {
            const pnpmModules = fs.readdirSync('node_modules/.pnpm')
                .filter(dirent => dirent.startsWith(moduleName.split('@')[1] || moduleName))
                .map(dirent => path.join('node_modules/.pnpm', dirent, pattern.split('/').slice(2).join('/')));
            
            pnpmModules.forEach(modulePath => {
                if (fs.existsSync(modulePath)) {
                    foundNativeModules.push(modulePath);
                    log(`✅ Found native module: ${modulePath}`, 'green');
                }
            });
        }
    });
    
    // Test node-gyp functionality
    if (foundNativeModules.length > 0) {
        const testModule = foundNativeModules[0];
        log(`🧪 Testing compilation of: ${path.basename(testModule)}`, 'cyan');
        
        try {
            // Try to run node-gyp in the module directory
            const buildResult = execSync('node-gyp rebuild --verbose', {
                encoding: 'utf8',
                stdio: 'pipe',
                cwd: testModule,
                timeout: 60000 // 1 minute timeout
            });
            log('✅ Native compilation successful', 'green');
        } catch (error) {
            log('❌ Native compilation failed:', 'red');
            log(`Error: ${error.message}`, 'red');
            
            // Analyze specific failure patterns
            if (error.message.includes('MSB8040')) {
                log('💡 Missing Spectre mitigation libraries - see BUILD_FIX_GUIDE.md', 'yellow');
            } else if (error.message.includes('MSBuild')) {
                log('💡 Visual Studio Build Tools PATH issue', 'yellow');
            } else if (error.message.includes('Python')) {
                log('💡 Python configuration issue', 'yellow');
            }
        }
    } else {
        log('ℹ️  No native modules found to test compilation', 'blue');
    }
    
    return foundNativeModules;
}

function analyzeFilesystemIssues() {
    log('\n📁 FILESYSTEM ERROR ANALYSIS', 'magenta');
    log('=============================', 'magenta');
    
    // Check for common problematic directories
    const problematicDirs = [
        'node_modules',
        '.pnpm-store',
        'dist',
        'build',
        'out',
        'bin',
        '.turbo'
    ];
    
    problematicDirs.forEach(dir => {
        const fullPath = path.join(process.cwd(), dir);
        if (fs.existsSync(fullPath)) {
            try {
                const stats = fs.statSync(fullPath);
                const isDirectory = stats.isDirectory();
                
                if (isDirectory) {
                    const fileCount = fs.readdirSync(fullPath, { withFileTypes: true }).length;
                    log(`📁 ${dir}: ${fileCount} items`, 'blue');
                } else {
                    log(`📄 ${dir}: file (${stats.size} bytes)`, 'blue');
                }
            } catch (error) {
                log(`❌ ${dir}: Access denied or corrupted - ${error.message}`, 'red');
            }
        }
    });
    
    // Check for ENOENT patterns in recent logs
    const logFiles = ['npm-debug.log', 'yarn-debug.log', 'pnpm-debug.log'];
    logFiles.forEach(logFile => {
        if (checkFileExists(logFile, logFile)) {
            try {
                const content = fs.readFileSync(logFile, 'utf8');
                const enoentErrors = content.split('\n').filter(line => 
                    line.includes('ENOENT') || line.includes('ENOFILE')
                );
                if (enoentErrors.length > 0) {
                    log(`⚠️  Found ${enoentErrors.length} ENOENT errors in ${logFile}`, 'yellow');
                    // Show first few errors as examples
                    enoentErrors.slice(0, 3).forEach(error => {
                        log(`   ${error.trim()}`, 'yellow');
                    });
                }
            } catch (error) {
                log(`❌ Could not read ${logFile}: ${error.message}`, 'red');
            }
        }
    });
}

function testBuildPipeline() {
    log('\n🏗️  BUILD PIPELINE TESTING', 'magenta');
    log('============================', 'magenta');
    
    const tests = [
        { name: 'TypeScript compilation', command: 'pnpm run check-types', cwd: 'webview-ui' },
        { name: 'Webview UI build', command: 'pnpm run build', cwd: 'webview-ui' },
        { name: 'Extension bundling', command: 'pnpm run bundle', cwd: 'src' },
        { name: 'VSIX packaging', command: 'pnpm run vsix', cwd: 'src' }
    ];
    
    const results = [];
    
    for (const test of tests) {
        const fullPath = path.join(process.cwd(), test.cwd);
        if (fs.existsSync(fullPath)) {
            try {
                log(`🧪 Testing: ${test.name}`, 'cyan');
                const result = execSync(test.command, {
                    encoding: 'utf8',
                    stdio: 'pipe',
                    cwd: fullPath,
                    timeout: 300000 // 5 minute timeout
                });
                log(`✅ ${test.name} - PASSED`, 'green');
                results.push({ name: test.name, status: 'PASSED' });
            } catch (error) {
                log(`❌ ${test.name} - FAILED`, 'red');
                log(`Error: ${error.message}`, 'red');
                results.push({ name: test.name, status: 'FAILED', error: error.message });
            }
        } else {
            log(`⚠️  ${test.name} - SKIPPED (directory not found: ${test.cwd})`, 'yellow');
            results.push({ name: test.name, status: 'SKIPPED' });
        }
    }
    
    return results;
}

function generateReport(dependencies, buildTools, nativeModules, buildResults) {
    log('\n📊 COMPREHENSIVE DIAGNOSTIC REPORT', 'magenta');
    log('====================================', 'magenta');
    
    // Environment Summary
    log('\n🌍 Environment Summary:', 'blue');
    log(`Node.js: ${buildTools.nodeVersion || 'NOT FOUND'}`, buildTools.nodeVersion ? 'green' : 'red');
    log(`npm: ${buildTools.npmVersion || 'NOT FOUND'}`, buildTools.npmVersion ? 'green' : 'red');
    log(`pnpm: ${buildTools.pnpmVersion || 'NOT FOUND'}`, buildTools.pnpmVersion ? 'green' : 'red');
    log(`Python: ${buildTools.pythonVersion || 'NOT FOUND'}`, buildTools.pythonVersion ? 'green' : 'red');
    log(`MSBuild: ${buildTools.msbuildPath ? 'FOUND' : 'NOT FOUND'}`, buildTools.msbuildPath ? 'green' : 'red');
    
    // Dependency Status
    log('\n📦 Dependency Status:', 'blue');
    log(`pnpm-lock.yaml: ${dependencies.hasPnpmLock ? 'EXISTS' : 'MISSING'}`, dependencies.hasPnpmLock ? 'green' : 'yellow');
    log(`node_modules: ${dependencies.nodeModulesExists ? 'EXISTS' : 'MISSING'}`, dependencies.nodeModulesExists ? 'green' : 'yellow');
    
    // Native Modules
    log('\n🔨 Native Module Status:', 'blue');
    log(`Found modules: ${nativeModules.length}`, nativeModules.length > 0 ? 'green' : 'yellow');
    
    // Build Pipeline Results
    log('\n🏗️  Build Pipeline Results:', 'blue');
    buildResults.forEach(result => {
        const status = result.status === 'PASSED' ? 'green' : 
                      result.status === 'SKIPPED' ? 'yellow' : 'red';
        log(`${result.name}: ${result.status}`, status);
        if (result.error) {
            log(`  Error: ${result.error.substring(0, 100)}...`, 'red');
        }
    });
    
    // Recommendations
    log('\n💡 Recommendations:', 'yellow');
    if (!buildTools.nodeVersion) {
        log('1. Install Node.js 20.19.2', 'yellow');
    }
    if (!buildTools.pythonVersion) {
        log('2. Install Python 3.9.x for node-gyp compatibility', 'yellow');
    }
    if (!buildTools.msbuildPath) {
        log('3. Install Visual Studio Build Tools', 'yellow');
    }
    if (nativeModules.length === 0) {
        log('4. Install dependencies with: pnpm install', 'yellow');
    }
    if (buildResults.some(r => r.status === 'FAILED')) {
        log('5. Address failed build steps individually', 'yellow');
    }
    
    log('\n🔧 Available Fix Commands:', 'cyan');
    log('- pnpm run diagnose-build  (environment analysis)', 'cyan');
    log('- pnpm run fix-build-env    (automated fixes)', 'cyan');
    log('- pnpm run test-build       (comprehensive testing)', 'cyan');
}

function main() {
    log('🔬 COMPREHENSIVE BUILD ENVIRONMENT DIAGNOSTIC', 'magenta');
    log('================================================', 'magenta');
    log(`Working Directory: ${process.cwd()}`, 'blue');
    log(`Timestamp: ${new Date().toISOString()}`, 'blue');
    
    try {
        // Phase 1: Dependency Analysis
        const dependencies = analyzeDependencies();
        
        // Phase 2: Build Tools Analysis
        const buildTools = analyzeBuildTools();
        
        // Phase 3: Native Compilation Test
        const nativeModules = testNativeCompilation();
        
        // Phase 4: Filesystem Analysis
        analyzeFilesystemIssues();
        
        // Phase 5: Build Pipeline Testing
        const buildResults = testBuildPipeline();
        
        // Phase 6: Generate Report
        generateReport(dependencies, buildTools, nativeModules, buildResults);
        
    } catch (error) {
        log(`❌ Diagnostic failed: ${error.message}`, 'red');
        process.exit(1);
    }
}

if (import.meta.url === `file://${process.argv[1]}`) {
    main();
}