let audioContext: AudioContext | null = null;

export const playHoverSound = () => {
  try {
    // Only initialize AudioContext after user interaction to comply with browser policies
    if (!audioContext) {
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    if (audioContext.state === "suspended") {
      audioContext.resume();
    }

    const osc = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    // Create a soft, airy "whoosh" sound
    osc.type = "sine";
    // Start at a low-mid frequency and quickly drop (creates a soft whoosh)
    osc.frequency.setValueAtTime(300, audioContext.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.15);
    
    // Quick fade in, then slow fade out
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.03, audioContext.currentTime + 0.05); // Very low volume (0.03)
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.4);
    
    osc.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    osc.start();
    osc.stop(audioContext.currentTime + 0.4);
  } catch (error) {
    console.error("Audio playback failed:", error);
  }
};
