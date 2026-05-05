import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';

const OUT_DIR = path.join(process.cwd(), 'out');

function flattenNextPayloads() {
  let copied = 0;

  const flattenPayloadDirectory = (routeDir: string, payloadRoot: string, currentDir = payloadRoot) => {
    const payloadRootName = path.basename(payloadRoot);
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const full = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        flattenPayloadDirectory(routeDir, payloadRoot, full);
        continue;
      }

      if (!entry.isFile() || !entry.name.endsWith('.txt')) {
        continue;
      }

      const relativeParts = path.relative(payloadRoot, full).split(path.sep);
      const flatName = [payloadRootName, ...relativeParts].join('.');
      const destination = path.join(routeDir, flatName);

      fs.copyFileSync(full, destination);
      copied += 1;
    }
  };

  const walk = (dir: string) => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const full = path.join(dir, entry.name);

      if (!entry.isDirectory()) {
        continue;
      }

      if (entry.name.startsWith('__next.')) {
        flattenPayloadDirectory(dir, full);
      }

      walk(full);
    }
  };

  walk(OUT_DIR);
  console.warn(`Prepared ${copied} static RSC payload aliases`);
}

async function main() {
  if (!fs.existsSync(OUT_DIR)) {
    console.warn('out/ directory not found; skip post-export optimizations');
    return;
  }

  flattenNextPayloads();

  console.warn('Building Pagefind search index...');
  const pagefindBinary = path.join(
    process.cwd(),
    'node_modules',
    '.bin',
    process.platform === 'win32' ? 'pagefind.cmd' : 'pagefind'
  );

  if (!fs.existsSync(pagefindBinary)) {
    console.warn('Pagefind binary not found; skip search indexing');
    return;
  }

  const result =
    process.platform === 'win32'
      ? spawnSync('cmd.exe', ['/c', pagefindBinary, '--site', OUT_DIR], {
          stdio: 'inherit',
        })
      : spawnSync(pagefindBinary, ['--site', OUT_DIR], {
          stdio: 'inherit',
        });

  if (result.status !== 0) {
    throw new Error(`Pagefind indexing failed with exit code ${result.status ?? 'unknown'}`);
  }

  console.warn('Post-export optimizations complete');
}

main().catch((err) => {
  console.error('Post-export failed', err);
  process.exit(1);
});
