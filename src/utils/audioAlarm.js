// NextStop Audio, Speech, Vibration & Web System Notification Engine

class AudioAlarmEngine {
  constructor() {
    this.audioCtx = null;
    this.oscillator = null;
    this.gainNode = null;
    this.isPlaying = false;
    this.intervalId = null;
    this.alarmType = 'metro_chime'; // 'metro_chime', 'loud_siren', 'digital_beep'
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
    if ('Notification' in window) {
      if (Notification.permission === 'default') {
        const permission = await Notification.requestPermission();
        return permission === 'granted';
      }
      return Notification.permission === 'granted';
    }
    return false;
  }

  // Show System Notification while doomscrolling other apps
  showBackgroundNotification(title, bodyText) {
    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        const notification = new Notification(title, {
          body: bodyText,
          icon: '/train-icon.svg',
          requireInteraction: true, // Keep notification visible until dismissed
          vibrate: [500, 200, 500, 200, 1000],
          tag: 'nextstop-metro-alarm',
        });

        notification.onclick = () => {
          window.focus();
          notification.close();
        };
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
          gain.gain.setValueAtTime(0.8, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);

          osc.start(now);
          osc.stop(now + 0.5);
        } else if (type === 'digital_beep') {
          osc.type = 'square';
          osc.frequency.setValueAtTime(1046.5, now);
          gain.gain.setValueAtTime(0.6, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

          osc.start(now);
          osc.stop(now + 0.2);
        } else {
          // Classic Metro Two-Tone Chime
          osc.type = 'sine';
          osc.frequency.setValueAtTime(659.25, now);
          gain.gain.setValueAtTime(0.7, now);
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
            gain2.gain.setValueAtTime(0.7, now2);
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
