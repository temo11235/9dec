import fs from 'node:fs';
import { Mp3Encoder } from '@breezystack/lamejs';
const wav = fs.readFileSync('/tmp/engagement-music.wav');
const dataOffset = wav.indexOf(Buffer.from('data')) + 8;
const channels = wav.readUInt16LE(22);
const sampleRate = wav.readUInt32LE(24);
const samples = new Int16Array(wav.buffer, wav.byteOffset + dataOffset, (wav.length - dataOffset) / 2);
const left = new Int16Array(samples.length / channels);
const right = new Int16Array(samples.length / channels);
for (let i = 0; i < left.length; i += 1) {
  left[i] = samples[i * channels];
  right[i] = samples[i * channels + 1] ?? samples[i * channels];
}
const encoder = new Mp3Encoder(2, sampleRate, 128);
const chunks = [];
const block = 1152;
for (let i = 0; i < left.length; i += block) {
  const buffer = encoder.encodeBuffer(left.subarray(i, i + block), right.subarray(i, i + block));
  if (buffer.length) chunks.push(Buffer.from(buffer));
}
const final = encoder.flush();
if (final.length) chunks.push(Buffer.from(final));
fs.writeFileSync('public/audio/engagement-music.mp3', Buffer.concat(chunks));
console.log('mp3 written', fs.statSync('public/audio/engagement-music.mp3').size, 'bytes');
