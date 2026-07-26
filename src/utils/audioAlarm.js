// NextStop Audio, Speech, Vibration, Web System Notification & Background Media Session Engine

class AudioAlarmEngine {
  constructor() {
    this.audioCtx = null;
    this.oscillator = null;
    this.gainNode = null;
    this.isPlaying = false;
    this.intervalId = null;
    this.alarmType = 'metro_chime'; // 'metro_chime', 'loud_siren', 'digital_beep'
    this.silentAudioElement = null;
  }

  initContext() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  // Request Web Notifications Permission for Background Alarm (Doomscrolling mode)
  async requestNotificationPermission() {
    if (!('Notification' in window)) {
      return 'unsupported';
    }

    if (Notification.permission === 'granted') {
      this.showBackgroundNotification('🔔 NextStop Metro Notifications Active', 'System alarm alerts will ring over other apps!');
      return 'granted';
    }

    if (Notification.permission === 'denied') {
      return 'denied';
    }

    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        this.showBackgroundNotification('🔔 NextStop Metro Notifications Active', 'System alarm alerts will ring over other apps!');
      }
      return permission;
    } catch (err) {
      console.warn('Notification permission error:', err);
      return Notification.permission;
    }
  }

  // Keep-Alive Background Audio Session to prevent Mobile OS from throttling GPS when screen is locked
  startBackgroundHeartbeat() {
    this.initContext();
    try {
      if (!this.silentAudioElement) {
        // Low-frequency 0.1s audible heartbeat tone loop
        const silentWavBase64 =
          'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAA==';
        this.silentAudioElement = new Audio(silentWavBase64);
        this.silentAudioElement.loop = true;
      }

      this.silentAudioElement
        .play()
        .then(() => {
          if ('mediaSession' in navigator) {
            navigator.mediaSession.metadata = new MediaMetadata({
              title: 'NextStop Commute GPS Alarm',
              artist: 'Active Metro Geofence Tracking',
              album: 'NextStop Metro',
              artwork: [{ src: '/train-icon.svg', sizes: '96x96', type: 'image/svg+xml' }],
            });

            navigator.mediaSession.setActionHandler('play', () => {});
            navigator.mediaSession.setActionHandler('pause', () => {});
          }
        })
        .catch((err) => console.warn('Background heartbeat audio play warning:', err));
    } catch (e) {
      console.warn('Background audio session warning:', e);
    }
  }

  stopBackgroundHeartbeat() {
    if (this.silentAudioElement) {
      try {
        this.silentAudioElement.pause();
      } catch (e) {}
    }
  }

  // Show System Notification on Lock Screen or over other apps
  showBackgroundNotification(title, bodyText) {
    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
          navigator.serviceWorker.ready.then((registration) => {
            registration.showNotification(title, {
              body: bodyText,
              icon: '/train-icon.svg',
              badge: '/train-icon.svg',
              vibrate: [500, 200, 500, 200, 1000],
              tag: 'nextstop-metro-alarm',
              renotify: true,
            });
          });
        } else {
          const notification = new Notification(title, {
            body: bodyText,
            icon: '/train-icon.svg',
            badge: '/train-icon.svg',
            requireInteraction: true,
            vibrate: [500, 200, 500, 200, 1000],
            tag: 'nextstop-metro-alarm',
            renotify: true,
          });

          notification.onclick = () => {
            window.focus();
            notification.close();
          };
        }
      } catch (err) {
        console.warn('Notification trigger error:', err);
      }
    }
  }

  setAlarmType(type) {
    this.alarmType = type;
  }

  // Play synthetic alarm tone loop
  startTone(type = this.alarmType) {
    this.initContext();
    if (this.isPlaying) return;
    this.isPlaying = true;

    if (!this.audioCtx) return;

    const playBeepPattern = () => {
      if (!this.isPlaying) return;

      try {
        const now = this.audioCtx.currentTime;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        if (type === 'loud_siren') {
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(880, now);
          osc.frequency.exponentialRampToValueAtTime(1320, now + 0.4);
          gain.gain.setValueAtTime(0.9, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);

          osc.start(now);
          osc.stop(now + 0.5);
        } else if (type === 'digital_beep') {
          osc.type = 'square';
          osc.frequency.setValueAtTime(1046.5, now);
          gain.gain.setValueAtTime(0.8, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

          osc.start(now);
          osc.stop(now + 0.2);
        } else {
          // Classic Metro Two-Tone Chime
          osc.type = 'sine';
          osc.frequency.setValueAtTime(659.25, now);
          gain.gain.setValueAtTime(0.8, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

          osc.start(now);
          osc.stop(now + 0.4);

          setTimeout(() => {
            if (!this.isPlaying || !this.audioCtx) return;
            const osc2 = this.audioCtx.createOscillator();
            const gain2 = this.audioCtx.createGain();
            const now2 = this.audioCtx.currentTime;

            osc2.type = 'sine';
            osc2.frequency.setValueAtTime(523.25, now2);
            gain2.gain.setValueAtTime(0.8, now2);
            gain2.gain.exponentialRampToValueAtTime(0.01, now2 + 0.6);

            osc2.connect(gain2);
            gain2.connect(this.audioCtx.destination);

            osc2.start(now2);
            osc2.stop(now2 + 0.6);
          }, 300);
        }
      } catch (e) {
        console.error('Audio synthesis error:', e);
      }
    };

    playBeepPattern();
    this.intervalId = setInterval(playBeepPattern, 1200);

    if ('vibrate' in navigator) {
      try {
        navigator.vibrate([500, 200, 500, 200, 1000]);
      } catch (e) {
        console.warn('Vibration API error:', e);
      }
    }
  }

  // Spoken voice announcement
  speakAnnouncement(text) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.1;
      utterance.volume = 1.0;

      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(
        (v) => v.lang.includes('en-IN') || v.lang.includes('en-GB') || v.lang.includes('en-US')
      );
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      window.speechSynthesis.speak(utterance);
    }
  }

  // Stop tone & clear
  stopAlarm() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if ('vibrate' in navigator) {
      navigator.vibrate(0);
    }
  }
}

export const audioAlarm = new AudioAlarmEngine();
