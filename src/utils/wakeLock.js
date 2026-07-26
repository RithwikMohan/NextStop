// Screen Wake Lock API Utility

let wakeLock = null;

export async function requestWakeLock() {
  if ('wakeLock' in navigator) {
    try {
      wakeLock = await navigator.wakeLock.request('screen');
      console.log('Screen Wake Lock active');
      return true;
    } catch (err) {
      console.warn(`Screen Wake Lock failed: ${err.name}, ${err.message}`);
      return false;
    }
  }
  return false;
}

export async function releaseWakeLock() {
  if (wakeLock !== null) {
    try {
      await wakeLock.release();
      wakeLock = null;
      console.log('Screen Wake Lock released');
    } catch (err) {
      console.warn('Error releasing Wake Lock:', err);
    }
  }
}
