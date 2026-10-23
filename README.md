# StreamSide

A compact streaming co-pilot, built for GitHub Pages.

Public app: https://lucasli1337unknown.github.io/StreamSide/

## Included

- Local canvas camera processing, manual looks, brightness/contrast/zoom, mirror, auto exposure suggestions, scene cards, lower thirds, particle effects and goal overlays.
- Optional on-device MediaPipe gesture recognition (palm/confetti, victory/hearts, thumb-up/neon) and face landmarks for framing plus tracked glasses, crowns and cheek sparkles. Inference runs in workers, with a throttled main-thread compatibility fallback.
- Mic level meter, local canvas recording with optional microphone, snapshots, and a clean output window for OBS Window Capture.
- Curated random challenge/topic/title/object generators, decision spinner, number and dice tools, saved ideas.
- Browser microphone speech recognition; on-device Translator API when available, or explicit opt-in MyMemory translation. TXT/SRT/JSON transcript exports, JSON imports and URL-encoded shareable transcript snapshots.
- Countdown and standalone timer overlays, bitrate/storage and goal calculators, host-tallied polls, teleprompter, synthesized audio cues.
- Run-of-show segments, pre-stream checklist, session clock, clip markers, rule-based setup recommendations, workspace export/import.

## Run and deploy

Serve this directory with any static web server. Camera, microphone and browser AI APIs need HTTPS or localhost. GitHub Pages publishes main / root. No API key, account, build command or backend is required.

## Honest limits

This is a streaming companion, not an RTMP broadcaster or virtual-camera driver. Use OBS Window Capture for the camera output. No live chat integration or remote voting is implemented. MediaPipe is used instead of YOLO for gestures. Camera correction is digital; the app cannot reposition physical lights or reshape faces. Recordings have a 30-minute memory safety cap and are not uploaded.

Web Speech can be unavailable or process audio at the browser provider. It captures the microphone, not arbitrary stream URLs or uploaded audio. Browser translation varies by device and language; MyMemory is quota-limited and accepts at most 500 UTF-8 bytes per request. Live automatic translation can hit quotas quickly.

Share links contain an unencrypted, static transcript snapshot, not a live server-hosted document. Anyone with the link can read it. Length is limited. Settings, drafts, ideas and plans live in browser storage; exports are recommended for durable copies.

No media starts automatically. Camera frames are processed locally. Optional model downloads and SDK performance metrics may contact Google/CDN. Speech and online translation require their own user actions and notices. Fonts load from Google Fonts.

## Technical references

- MediaPipe Web Vision: https://github.com/google-ai-edge/mediapipe/tree/master/mediapipe/tasks/web/vision
- MediaPipe gesture model: https://ai.google.dev/edge/mediapipe/solutions/vision/gesture_recognizer
- Browser Translator: https://developer.mozilla.org/en-US/docs/Web/API/Translator
- Web Speech: https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition
- MyMemory API: https://mymemory.translated.net/doc/spec.php
- OBS Window Capture: https://obsproject.com/kb/window-capture-sources

## Verification scope

Syntax and utility flows are tested before release. Real camera, microphone, gesture accuracy, face tracking, recognition provider access and device-specific translation availability require a compatible device and granted permissions; unsupported features show errors rather than fabricated results.
