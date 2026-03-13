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
  numFrets = 5,
  onPositionClick,
}: FretboardProps) {
  const defaultPositions = useMemo(() => {
    if (positions && positions.length > 0) return positions;
    
    const chordNotesSet = new Set(chord.notes);
    const defaultPos: ChordPosition[] = [];
    
    for (let stringIndex = 0; stringIndex < 6; stringIndex++) {
      let found = false;
      for (let fret = 0; fret <= numFrets; fret++) {
        const note = MusicTheoryService.getNoteAtFret(stringIndex, fret);
        if (chordNotesSet.has(note)) {
          defaultPos.push({
            string: stringIndex,
            fret,
            finger: fret <= 3 ? 1 : 2,
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
    const openNote = OPEN_STRINGS[stringIndex].openNote;
    const isMuted = defaultPositions[stringIndex]?.fret === -1;
    const activeFret = defaultPositions[stringIndex]?.fret;
    const noteAtPosition = activeFret !== undefined && activeFret >= 0 
      ? MusicTheoryService.getNoteAtFret(stringIndex, activeFret)
      : null;

    return (
      <div key={stringIndex} className="fretboard-string">
        <div className="string-indicator">
          {isMuted ? '✕' : openNote}
        </div>
        {Array.from({ length: numFrets }, (_, fretIndex) => {
          const fretNumber = fretIndex + 1;
          const note = MusicTheoryService.getNoteAtFret(stringIndex, fretNumber);
          const isHighlighted = highlightedNotes?.includes(note) || chord.notes.includes(note);
          const isActive = activeFret === fretNumber;
          const color = isHighlighted ? MusicTheoryService.getNoteColor(note) : undefined;
          
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
              {isActive && noteAtPosition && (
                <div 
                  className="note-marker" 
                  style={{ backgroundColor: color }}
                >
                  {noteAtPosition}
                </div>
              )}
              {fretNumber === 12 && showFretNumbers && (
                <div className="double-fret-marker">••</div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="fretboard">
      <div className="fretboard-header">
        {Array.from({ length: numFrets }, (_, i) => (
          <div key={i} className="fret-number">
            {showFretNumbers && FRET_MARKERS.includes(i + 1) ? i + 1 : ''}
          </div>
        ))}
      </div>
      <div className="fretboard-body">
        {[0, 1, 2, 3, 4, 5].map(renderString)}
      </div>
      <div className="fretboard-nut" />
    </div>
  );
}

export default Fretboard;
