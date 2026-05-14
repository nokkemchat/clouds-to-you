"use client";

import { useEffect, useState } from "react";

interface FloatingNotesProps {
  notes: string[];
  isActive: boolean;
}

interface NoteInstance {
  id: number;
  text: string;
  left: number;
  animationDuration: number;
  delay: number;
  scale: number;
}

export default function FloatingNotes({ notes, isActive }: FloatingNotesProps) {
  const [activeNotes, setActiveNotes] = useState<NoteInstance[]>([]);

  useEffect(() => {
    if (isActive && notes.length > 0) {
      // Generate some random floating notes when active
      const newNotes: NoteInstance[] = [];
      for (let i = 0; i < 6; i++) {
        newNotes.push({
          id: Date.now() + i,
          text: notes[Math.floor(Math.random() * notes.length)],
          left: 10 + Math.random() * 80, // 10% to 90%
          animationDuration: 3 + Math.random() * 4, // 3s to 7s
          delay: Math.random() * 2, // 0s to 2s
          scale: 0.6 + Math.random() * 0.6, // 0.6 to 1.2
        });
      }
      setActiveNotes(newNotes);
    } else {
      setActiveNotes([]);
    }
  }, [isActive, notes]);

  if (!isActive || activeNotes.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {activeNotes.map((note) => (
        <div
          key={note.id}
          className="absolute bottom-[-10%] text-white/60 font-medium whitespace-nowrap animate-float-up-fade"
          style={{
            left: `${note.left}%`,
            animationDuration: `${note.animationDuration}s`,
            animationDelay: `${note.delay}s`,
            transform: `scale(${note.scale})`,
            textShadow: "0 0 10px rgba(255,255,255,0.2)",
          }}
        >
          {note.text}
        </div>
      ))}
    </div>
  );
}
