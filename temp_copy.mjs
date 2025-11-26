import { cp } from 'fs/promises';
import { join } from 'path';

const srcDir = 'deps/vscode/src';
const destDir = 'jetbrains/host/deps/vscode/src';

console.log(`Copying from ${srcDir} to ${destDir}`);

try {
  await cp(srcDir, destDir, { recursive: true });
  console.log('Copy completed successfully');
} catch (error) {
  console.error('Copy failed:', error);
}
