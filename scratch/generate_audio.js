import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sampleRate = 8000;
const durationSeconds = 2;
const totalSamples = sampleRate * durationSeconds;
const dataSize = totalSamples * 2;
const buffer = Buffer.alloc(44 + dataSize);

buffer.write('RIFF', 0);
buffer.writeUInt32LE(36 + dataSize, 4);
buffer.write('WAVE', 8);

buffer.write('fmt ', 12);
buffer.writeUInt32LE(16, 16);
buffer.writeUInt16LE(1, 20);
buffer.writeUInt16LE(1, 22);
buffer.writeUInt32LE(sampleRate, 24);
buffer.writeUInt32LE(sampleRate * 2, 28);
buffer.writeUInt16LE(2, 32);
buffer.writeUInt16LE(16, 34);

buffer.write('data', 36);
buffer.writeUInt32LE(dataSize, 40);

for (let i = 0; i < totalSamples; i++) {
  let sampleValue = 0;
  if ((i % 8000) < 400) {
    const t = (i % 8000) / sampleRate;
    sampleValue = Math.sin(2 * Math.PI * 220 * t) * 1500;
  }
  buffer.writeInt16LE(Math.round(sampleValue), 44 + i * 2);
}

const outputPath = path.join(__dirname, '..', 'public', 'keepalive.wav');
fs.writeFileSync(outputPath, buffer);
console.log('Successfully generated public/keepalive.wav (size:', buffer.length, 'bytes)');
