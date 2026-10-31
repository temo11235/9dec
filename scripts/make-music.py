"""Generates an original, gentle piano-style instrumental loop.
No external samples are used: every note is synthesised from sine partials.
"""
import math, random, struct, wave

SR = 44100
BPM = 66
BEAT = 60 / BPM
BAR = 4 * BEAT
LENGTH = 48.0
N = int(SR * LENGTH)
left = [0.0] * N
right = [0.0] * N
random.seed(7)

def midi_hz(n):
    return 440.0 * (2 ** ((n - 69) / 12))

def add_note(start, dur, midi, vel, pan=0.0):
    f = midi_hz(midi)
    s0 = int(start * SR)
    total = int((dur + 1.4) * SR)
    lg = math.log(0.5) / (dur * 0.9)
    for i in range(total):
        idx = s0 + i
        if idx >= N:
            break
        t = i / SR
        attack = min(1.0, t / 0.012)
        env = attack * math.exp(lg * t)
        if env < 0.0004:
            continue
        # felt-piano-ish partials
        s = (math.sin(2 * math.pi * f * t) * 0.72
             + math.sin(2 * math.pi * f * 2.001 * t) * 0.17
             + math.sin(2 * math.pi * f * 3.002 * t) * 0.06
             + math.sin(2 * math.pi * f * 4.003 * t) * 0.03)
        s *= env * vel * 0.26
        lpan = math.sqrt((1 - pan) / 2)
        rpan = math.sqrt((1 + pan) / 2)
        left[idx] += s * lpan
        right[idx] += s * rpan

def add_pad(start, dur, midis, vel):
    for midi in midis:
        f = midi_hz(midi)
        s0 = int(start * SR)
        total = int(dur * SR)
        for i in range(total):
            idx = s0 + i
            if idx >= N:
                break
            t = i / SR
            env = min(1.0, t / 0.8) * min(1.0, (dur - t) / 1.0)
            if env <= 0:
                continue
            s = (math.sin(2 * math.pi * f * t) + 0.35 * math.sin(2 * math.pi * f * 1.0015 * t)
                 + 0.12 * math.sin(2 * math.pi * f * 2 * t))
            s *= env * vel * 0.026
            left[idx] += s
            right[idx] += s

# Warm, romantic progression in C / A-minor colours (two passes).
prog = [
    (48, [60, 64, 67, 71]),   # Cmaj7
    (45, [57, 60, 64, 67]),   # Am7
    (41, [53, 57, 60, 65]),   # Fmaj7
    (43, [55, 59, 62, 67]),   # G
    (40, [52, 55, 59, 64]),   # Em7
    (45, [55, 57, 60, 64]),   # Am7
    (38, [50, 53, 57, 60]),   # Dm7
    (43, [50, 55, 59, 62]),   # G7
]
melody = [76, 74, 72, 71, 72, 67, 69, 71, 76, 79, 72, 74, 71, 67, 64, 67]

for repetition in range(2):
    for b, (bass, chord) in enumerate(prog):
        t0 = repetition * 8 * BAR + b * BAR
        # soft bass
        add_note(t0, 3.1, bass, 0.55, 0.0)
        add_note(t0 + 2 * BEAT, 2.4, bass + 7, 0.3, 0.12)
        # gentle arpeggio
        pattern = [0, 2, 1, 3, 2, 1, 3, 2]
        for k, p in enumerate(pattern):
            add_note(t0 + k * BEAT / 2, 1.5, chord[p] + 12, 0.3 + (k % 2) * 0.08,
                     0.28 if k % 2 else -0.22)
        # sparse melody in the upper register
        m1 = melody[(b * 2) % len(melody)]
        m2 = melody[(b * 2 + 1) % len(melody)]
        add_note(t0 + 0.25, 2.3, m1, 0.36, -0.1)
        add_note(t0 + 2.2, 1.8, m2, 0.28, 0.16)
        # airy sustained pad
        add_pad(t0, BAR, [n - 12 for n in chord[2:]], 0.7)

# Soft feedback-style echo for depth.
delay = int(0.315 * SR)
for i in range(delay, N):
    left[i] += left[i - delay] * 0.13
    right[i] += right[i - delay] * 0.11

peak = max(max(abs(x) for x in left), max(abs(x) for x in right), 0.001)
scale = 0.8 / peak
frames = bytearray()
for i in range(N):
    a = int(max(-1, min(1, left[i] * scale)) * 32767)
    b = int(max(-1, min(1, right[i] * scale)) * 32767)
    frames += struct.pack('<hh', a, b)

with wave.open('/tmp/engagement-music.wav', 'wb') as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes(frames)
print('wrote /tmp/engagement-music.wav', LENGTH, 'seconds')
