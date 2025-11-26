#!/usr/bin/env node

/**
 * Comprehensive Build Testing and Validation Script
 * Tests all aspects of the Node.js/TypeScript build pipeline after fixes
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

function runTest(name, command, expected = 'success') {
    log(`\n🧪 Testing: ${name}`, 'cyan');
    try {
        const result = execSync(command, { 
            encoding: 'utf8', 
            stdio: 'pipe',
            timeout: 120000 // 2 minute timeout
        });
        log(`✅ ${name} - PASSED`, 'green');
        return { success: true, output: result };
    } catch (error) {
        log(`❌ ${name} - FAILED`, 'red');
        log(`Error: ${error.message}`, 'red');
        return { success: false, error: error.message };
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

function main() {
    log('🔬 Comprehensive Build Pipeline Test Suite', 'magenta');
    log('=============================================\n', 'magenta');
    
    const results = {
        environment: {},
        dependencies: {},
        compilation: {},
        build: {},
        packaging: {}
    };
    
    // Phase 1: Environment Validation
    log('📋 Phase 1: Environment Validation', 'blue');
    results.environment.node = runTest('Node.js version', 'node --version');
    results.environment.pnpm = runTest('pnpm version', 'pnpm --version');
    results.environment.python = runTest('Python availability', 'python --version');
    results.environment.msbuild = runTest('MSBuild availability', 'where msbuild');
    
    // Phase 2: Dependency Resolution
    log('\n📦 Phase 2: Dependency Resolution', 'blue');
    
    if (!checkFileExists('pnpm-lock.yaml', 'pnpm-lock.yaml')) {
        log('⚠️  No lock file found - will test installation', 'yellow');
        results.dependencies.install = runTest('Dependency installation', 'pnpm install --frozen-lockfile');
    } else {
        log('✅ Lock file found - testing installation with frozen lockfile', 'green');
        results.dependencies.install = runTest('Dependency installation', 'pnpm install --frozen-lockfile');
    }
    
    // Check key native dependencies
    const nativeDeps = [
        'node_modules/.pnpm/@vscode+sqlite3*/node_modules/@vscode/sqlite3',
        'node_modules/.pnpm/@tailwindcss+oxide*/node_modules/@tailwindcss/oxide',
        'node_modules/.pnpm/keytar*/node_modules/keytar'
    ];
    
    nativeDeps.forEach(dep => {
        const files = fs.readdirSync('node_modules/.pnpm', { withFileTypes: true })
            .filter(dirent => dirent.isDirectory() && dep.includes('*'))
            .map(dirent => `node_modules/.pnpm/${dirent.name}/${dep.split('*')[1]}`);
        
        files.forEach(file => {
            checkFileExists(file, `Native dependency: ${path.basename(file)}`);
        });
    });
    
    // Phase 3: TypeScript Compilation
    log('\n🔤 Phase 3: TypeScript Compilation', 'blue');
    results.compilation.types = runTest('TypeScript type checking', 'pnpm run check-types');
    results.compilation.eslint = runTest('ESLint validation', 'pnpm run lint');
    
    // Phase 4: Build Pipeline
    log('\n🏗️  Phase 4: Build Pipeline', 'blue');
    results.build.bundle = runTest('Extension bundling', 'cd src && pnpm run bundle');
    
    // Test individual package builds
    const packages = [
        'src',
        'webview-ui', 
        'packages/telemetry',
        'packages/ipc'
    ];
    
    packages.forEach(pkg => {
        if (checkFileExists(`${pkg}/package.json`, `${pkg} package.json`)) {
            results.build[pkg] = runTest(`${pkg} build`, `cd ${pkg} && pnpm run build`);
        }
    });
    
    // Phase 5: VSIX Packaging (if applicable)
    log('\n📦 Phase 5: Packaging', 'blue');
    results.packaging.vsix = runTest('VSIX extension packaging', 'cd src && pnpm run vsix');
    
    // Summary
    log('\n📊 Test Results Summary', 'magenta');
    log('========================', 'magenta');
    
    const totalTests = Object.values(results).flat().length;
    const passedTests = Object.values(results).flat().filter(test => test.success).length;
    const failedTests = totalTests - passedTests;
    
    log(`Total Tests: ${totalTests}`, 'blue');
    log(`Passed: ${passedTests}`, 'green');
    log(`Failed: ${failedTests}`, failedTests > 0 ? 'red' : 'green');
    
    if (failedTests > 0) {
        log('\n❌ Failed Tests:', 'red');
        Object.entries(results).forEach(([phase, tests]) => {
            Object.entries(tests).forEach(([testName, testResult]) => {
                if (!testResult.success) {
                    log(`  - ${phase}: ${testName}`, 'red');
                }
            });
        });
        
        log('\n💡 Next Steps:', 'yellow');
        log('1. Check BUILD_FIX_GUIDE.md for manual Spectre library installation', 'yellow');
        log('2. Ensure Visual Studio 2022 BuildTools with Spectre libraries are installed', 'yellow');
        log('3. Restart computer after installing Spectre libraries', 'yellow');
        log('4. Run: pnpm install --frozen-lockfile', 'yellow');
        log('5. Re-run this test suite', 'yellow');
    } else {
        log('\n🎉 All tests passed! Build pipeline is working correctly.', 'green');
    }
    
    return {
        total: totalTests,
        passed: passedTests,
        failed: failedTests,
        results
    };
}

if (import.meta.url === `file://${process.argv[1]}`) {
    main();
}