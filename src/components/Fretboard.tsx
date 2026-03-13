import { useMemo } from 'react';
import type { Chord, ChordPosition, NoteName } from '../types';
import { OPEN_STRINGS } from '../types';
import { MusicTheoryService } from '../services';

interface FretboardProps {
  chord: Chord;
  positions?: ChordPosition[];
  highlightedNotes?: NoteName[];
  showFretNumbers?: boolean;
  numFrets?: number;
  onPositionClick?: (position: ChordPosition) => void;
}

const FRET_MARKERS = [3, 5, 7, 9, 12, 15, 17, 19, 21];

export function Fretboard({
  chord,
  positions,
  highlightedNotes,
  showFretNumbers = true,
  numFrets = 15,
  onPositionClick,
}: FretboardProps) {
  const defaultPositions = useMemo(() => {
    if (positions && positions.length > 0) return positions;
    
    const chordNotesSet = new Set(chord.notes);
    const defaultPos: ChordPosition[] = [];
    
    for (let stringIndex = 0; stringIndex < 6; stringIndex++) {
      let found = false;
      // Check from fret 0 (open) to numFrets
      for (let fret = 0; fret <= numFrets; fret++) {
        const note = MusicTheoryService.getNoteAtFret(stringIndex, fret);
        if (chordNotesSet.has(note)) {
          defaultPos.push({
            string: stringIndex,
            fret,
            finger: fret === 0 ? 'open' : 1,
            note,
          });
          found = true;
          break;
        }
      }
      if (!found) {
        defaultPos.push({ string: stringIndex, fret: -1, finger: 'x' });
      }
    }
    
    return defaultPos;
  }, [chord, positions, numFrets]);

  const renderString = (stringIndex: number) => {
    const isMuted = defaultPositions[stringIndex]?.fret === -1;
    const activeFret = defaultPositions[stringIndex]?.fret;
    const openNote = OPEN_STRINGS[stringIndex].openNote;
    const isOpenActive = activeFret === 0;

    return (
      <div key={stringIndex} className="fretboard-string">
        {/* Open string area */}
        <div className={`open-fret ${isOpenActive ? 'active' : ''} ${isMuted ? 'muted' : ''}`}>
          {isMuted ? (
            <span className="mute-x">✕</span>
          ) : (
            <div 
              className={`open-note-indicator ${isOpenActive ? 'playing' : ''}`}
              style={isOpenActive ? { backgroundColor: MusicTheoryService.getNoteColor(openNote) } : {}}
            >
              {isOpenActive ? openNote : openNote}
            </div>
          )}
        </div>

        {/* Fretted area */}
        <div className="string-line" />
        
        {Array.from({ length: numFrets }, (_, fretIndex) => {
          const fretNumber = fretIndex + 1;
          const note = MusicTheoryService.getNoteAtFret(stringIndex, fretNumber);
          const isHighlighted = highlightedNotes?.includes(note);
          const isActive = activeFret === fretNumber;
          const color = MusicTheoryService.getNoteColor(note);
          
          return (
            <div
              key={fretNumber}
              className={`fret ${isActive ? 'active' : ''}`}
              onClick={() => {
                if (onPositionClick) {
                  const pos = defaultPositions[stringIndex];
                  if (pos && pos.fret === fretNumber) {
                    onPositionClick(pos);
                  }
                }
              }}
            >
              {isActive && (
                <div 
                  className="note-marker" 
                  data-note={note}
                  style={{ backgroundColor: color, color: 'white', outlineColor: color }}
                >
                  {note}
                </div>
              )}
              {/* Scale highlight (dimmer) */}
              {isHighlighted && !isActive && (
                <div 
                  className="note-marker scale-highlight" 
                  data-note={note}
                  style={{ borderColor: color, color: color }}
                >
                  {note}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="fretboard-container-wrapper">
      <div className="fretboard">
        <div className="fretboard-header">
          <div className="open-fret-label" />
          {Array.from({ length: numFrets }, (_, i) => (
            <div key={i} className="fret-number">
              {showFretNumbers && FRET_MARKERS.includes(i + 1) ? i + 1 : ''}
            </div>
          ))}
        </div>
        
        <div className="fretboard-body">
          <div className="fretboard-nut" />
          {[0, 1, 2, 3, 4, 5].map(renderString)}
          
          {/* Fret markers (dots) */}
          <div className="fret-dots">
            {FRET_MARKERS.map(fretNum => {
              if (fretNum > numFrets) return null;
              if (fretNum === 12) {
                return (
                  <div key={fretNum} className="double-dot" style={{ left: `${40 + (fretNum - 0.5) * 60}px` }}>
                    <div className="dot" />
                    <div className="dot" />
                  </div>
                );
              }
              return (
                <div key={fretNum} className="single-dot" style={{ left: `${40 + (fretNum - 0.5) * 60}px` }}>
                  <div className="dot" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Fretboard;
