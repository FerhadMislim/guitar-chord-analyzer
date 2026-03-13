import type { NoteName } from '../types';

interface NoteSelectorProps {
  value: NoteName;
  onChange: (value: NoteName) => void;
  label?: string;
}

const NOTES: NoteName[] = ['C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb', 'B'];

export function NoteSelector({ value, onChange, label }: NoteSelectorProps) {
  return (
    <div className="note-selector">
      {label && <label>{label}</label>}
      <div className="note-grid">
        {NOTES.map((note) => (
          <button
            key={note}
            className={`note-button ${value === note ? 'active' : ''}`}
            onClick={() => onChange(note)}
          >
            {note}
          </button>
        ))}
      </div>
    </div>
  );
}

export default NoteSelector;
