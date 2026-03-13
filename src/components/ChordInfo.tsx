import type { Chord } from '../types';
import { MusicTheoryService } from '../services';

interface ChordInfoProps {
  chord: Chord;
}

export function ChordInfo({ chord }: ChordInfoProps) {
  const notes = chord.notes;
  const root = chord.root;
  const quality = chord.quality;
  const symbol = chord.symbol;

  return (
    <div className="chord-info-panel">
      <div className="chord-header">
        <h2 className="chord-name">{symbol || `${root} ${quality}`}</h2>
        <span className="chord-quality">{quality}</span>
      </div>
      
      <div className="chord-notes">
        <h3>Notes</h3>
        <div className="notes-list">
          {notes.map((note, index) => (
            <div 
              key={index} 
              className="note-chip"
              style={{ backgroundColor: MusicTheoryService.getNoteColor(note) }}
            >
              {note}
            </div>
          ))}
        </div>
      </div>

      <div className="chord-intervals">
        <h3>Intervals</h3>
        <div className="intervals-list">
          {chord.intervals.map((interval, index) => (
            <span key={index} className="interval-chip">
              {MusicTheoryService.getIntervalName(interval)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChordInfo;
