// NextStop Audio, Speech, Vibration, Web System Notification & Lock-Screen Media Session Engine

class AudioAlarmEngine {
  constructor() {
    this.audioCtx = null;
    this.oscillator = null;
    this.gainNode = null;
    this.isPlaying = false;
    this.intervalId = null;
    this.speechIntervalId = null;
    this.alarmType = 'metro_chime'; // 'metro_chime', 'loud_siren', 'digital_beep'
    this.keepAliveAudio = null;
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

  // Request Web Notifications Permission for Lock Screen System Alarms
  async requestNotificationPermission() {
    if (!('Notification' in window)) {
      return 'unsupported';
    }

    if (Notification.permission === 'granted') {
      this.showBackgroundNotification('🔔 NextStop Metro Notifications Active', 'System alarm alerts will ring over other apps & lock screen!');
      return 'granted';
    }

    if (Notification.permission === 'denied') {
      return 'denied';
    }

    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        this.showBackgroundNotification('🔔 NextStop Metro Notifications Active', 'System alarm alerts will ring over other apps & lock screen!');
      }
      return permission;
    } catch (err) {
      console.warn('Notification permission error:', err);
      return Notification.permission;
    }
  }

  // Active Background Audio & Media Session: Prevents Android Chrome & iOS Safari from freezing GPS when screen is locked or browsing other apps
  startBackgroundHeartbeat() {
    this.initContext();
    try {
      if (!this.keepAliveAudio) {
        this.keepAliveAudio = new Audio('/keepalive.wav');
        this.keepAliveAudio.loop = true;
        this.keepAliveAudio.volume = 0.05;
      }

      this.keepAliveAudio
        .play()
        .then(() => {
          if ('mediaSession' in navigator) {
            navigator.mediaSession.metadata = new MediaMetadata({
              title: 'NextStop GPS Commute Alarm Active',
              artist: 'Real-Time Metro Geofence Tracking',
              album: 'NextStop Metro (Rithwik Mohan)',
              artwork: [{ src: '/train-icon.svg', sizes: '96x96', type: 'image/svg+xml' }],
            });

            navigator.mediaSession.setActionHandler('play', () => {
              if (this.keepAliveAudio) this.keepAliveAudio.play();
            });
            navigator.mediaSession.setActionHandler('pause', () => {});
          }
        })
        .catch((err) => console.warn('Background heartbeat audio session warning:', err));
    } catch (e) {
      console.warn('Background audio session warning:', e);
    }
  }

  stopBackgroundHeartbeat() {
    if (this.keepAliveAudio) {
      try {
        this.keepAliveAudio.pause();
      } catch (e) {}
    }
  }

  // Show System Notification on Lock Screen or over other apps (Instagram / YouTube)
  showBackgroundNotification(title, bodyText) {
    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
          navigator.serviceWorker.ready.then((registration) => {
            registration.showNotification(title, {
              body: bodyText,
              icon: '/train-icon.svg',
              badge: '/train-icon.svg',
              vibrate: [500, 200, 500, 200, 1000, 200, 1000],
              tag: 'nextstop-metro-alarm',
              renotify: true,
              requireInteraction: true,
            });
          });
        } else {
          const notification = new Notification(title, {
            body: bodyText,
            icon: '/train-icon.svg',
            badge: '/train-icon.svg',
            requireInteraction: true,
            vibrate: [500, 200, 500, 200, 1000, 200, 1000],
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

  // Spoken voice announcement (Repeats voice alert every 4 seconds)
  speakAnnouncement(text) {
    if (!('speechSynthesis' in window)) return;

    const playVoice = () => {
      if (!this.isPlaying) return;
      try {
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
      } catch (e) {
        console.warn('Speech synthesis error:', e);
      }
    };

    playVoice();
    if (this.speechIntervalId) clearInterval(this.speechIntervalId);
    this.speechIntervalId = setInterval(playVoice, 4500);
  }

  // Stop tone & clear
  stopAlarm() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.speechIntervalId) {
      clearInterval(this.speechIntervalId);
      this.speechIntervalId = null;
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
