
export const playNotificationSound = () => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  
  const playTone = (freq: number, startTime: number, duration: number) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(freq, startTime);
    
    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(0.2, startTime + 0.05);
    gainNode.gain.linearRampToValueAtTime(0, startTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start(startTime);
    oscillator.stop(startTime + duration);
  };

  // Play a "happy" double beep
  playTone(880, audioContext.currentTime, 0.3);
  playTone(1046.5, audioContext.currentTime + 0.2, 0.4);
};
