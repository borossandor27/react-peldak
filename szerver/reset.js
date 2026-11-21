// Törli a data/ mappát -> a következő indításkor újra az alapadatokból indul a szerver.
import { rmSync } from 'node:fs';
import { join } from 'node:path';

rmSync(join(import.meta.dirname, 'data'), { recursive: true, force: true });
console.log('Az adatok visszaállítva az alapadatokra.');
