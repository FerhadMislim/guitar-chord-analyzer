import { Chord, Note, Scale } from 'tonal';
import type { NoteName, ChordQuality, Chord as ChordType, Scale as ScaleType, ChordPosition, ChordShape } from '../types';
import { OPEN_STRINGS } from '../types';

const NOTE_COLORS: Record<string, string> = {
  C: '#e74c3c',
  'C#': '#e67e22',
  Db: '#e67e22',
  D: '#f1c40f',
  'D#': '#2ecc71',
  Eb: '#2ecc71',
  E: '#1abc9c',
  F: '#3498db',
  'F#': '#2980b9',
  Gb: '#2980b9',
  G: '#9b59b6',
  'G#': '#8e44ad',
  Ab: '#8e44ad',
  A: '#e84393',
  'A#': '#d81b60',
  Bb: '#d81b60',
  B: '#c0392b',
};

const CHORD_QUALITY_MAP: Record<string, ChordQuality> = {
  '': 'major',
  'maj': 'major',
  'm': 'minor',
  'min': 'minor',
  'dim': 'dim',
  'aug': 'aug',
  'sus2': 'sus2',
  'sus4': 'sus4',
  '7': '7',
  'maj7': 'maj7',
  'm7': 'min7',
  'dim7': 'dim7',
  'mMaj7': 'minMaj7',
  '9': '9',
  'maj9': 'maj9',
  'm9': 'min9',
  '11': '11',
  '13': '13',
  'add9': 'add9',
  '6': '6',
  'm6': 'min6',
};

const SCALE_TYPE_MAP: Record<string, string> = {
  'major': 'major',
  'minor': 'minor',
  'natural minor': 'minor',
  'harmonic minor': 'harmonic minor',
  'melodic minor': 'melodic minor',
  'pentatonic major': 'major pentatonic',
  'pentatonic minor': 'minor pentatonic',
  'blues': 'blues',
  'dorian': 'dorian',
  'phrygian': 'phrygian',
  'lydian': 'lydian',
  'mixolydian': 'mixolydian',
  'locrian': 'locrian',
};

function normalizeNoteName(note: string): NoteName {
  const normalized = Note.enharmonic(note).replace(/\d/g, '') as NoteName;
  return normalized || 'C';
}

export const MusicTheoryService = {
  getNoteIndex(note: NoteName): number {
    const midi = Note.midi(`${note}4`);
    return midi ?? 0;
  },

  getNoteAtFret(stringIndex: number, fret: number): NoteName {
    if (fret < 0) return 'C';
    const openNote = OPEN_STRINGS[stringIndex].openNote;
    const note = Note.transpose(`${openNote}4`, `${fret}p`);
    return normalizeNoteName(note);
  },

  getChord(root: NoteName, quality: ChordQuality): ChordType {
    const chordName = quality === 'major' ? root : `${root}${quality}`;
    const tonalChord = Chord.get(chordName);
    
    const notes = tonalChord.notes.length > 0 
      ? tonalChord.notes.map(n => normalizeNoteName(n))
      : [root];
    
    const intervals = this.parseIntervals(tonalChord.intervals);

    return {
      root,
      quality,
      notes,
      intervals,
      symbol: tonalChord.name || root,
    };
  },

  parseIntervals(intervals: string[]): number[] {
    const intervalMap: Record<string, number> = {
      '1P': 0, '2m': 1, '2M': 2, '3m': 3, '3M': 4, 
      '4P': 5, '5P': 7, '6m': 8, '6M': 9, '7m': 10, '7M': 11,
      '1': 0, '2': 2, '3': 4, '4': 5, '5': 7, '6': 9, '7': 11,
    };
    return intervals.map(i => intervalMap[i] ?? 0);
  },

  getScale(root: NoteName, type: string): ScaleType {
    const tonalType = SCALE_TYPE_MAP[type] || type;
    const scaleName = `${root} ${tonalType}`;
    const tonalScale = Scale.get(scaleName);
    
    const notes = tonalScale.notes.length > 0
      ? tonalScale.notes.map(n => normalizeNoteName(n))
      : [root];
    
    const intervals = this.parseIntervals(tonalScale.intervals);

    return {
      root,
      type: type as ScaleType['type'],
      notes,
      intervals,
    };
  },

  getChordNotes(chord: ChordType): NoteName[] {
    return chord.notes;
  },

  isNoteInChord(note: NoteName, chord: ChordType): boolean {
    return chord.notes.includes(note);
  },

  getNoteColor(note: NoteName): string {
    return NOTE_COLORS[note] || '#888';
  },

  getIntervalName(interval: number): string {
    const names = ['', 'm2', 'M2', 'm3', 'M3', 'P4', 'TT', 'P5', 'm6', 'M6', 'm7', 'M7'];
    return names[interval % 12] || '';
  },

  getRomanNumeral(degree: number, isMinor: boolean): string {
    const numerals = ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii\u00b0'];
    const minorNumerals = ['i', 'ii\u00b0', 'III', 'iv', 'v', 'VI', 'VII'];
    return isMinor ? minorNumerals[degree % 7] : numerals[degree % 7];
  },

  detectChordFromNotes(notes: NoteName[]): ChordType | null {
    if (notes.length === 0) return null;
    
    const detected = Chord.detect(notes);
    if (!detected || detected.length === 0) return null;
    
    const chordName = detected[0];
    const tonalChord = Chord.get(chordName);
    const root = normalizeNoteName(tonalChord.root || notes[0]);
    const quality = CHORD_QUALITY_MAP[tonalChord.aliases[0] || ''] || 'major';
    
    return this.getChord(root, quality);
  },

  generateChordShapes(chord: ChordType, maxFret: number = 12): ChordShape[] {
    const shapes: ChordShape[] = [];
    const chordNotes = new Set(chord.notes);

    for (let baseFret = 1; baseFret <= 5; baseFret++) {
      const positions: ChordPosition[] = [];
      
      for (let stringIndex = 0; stringIndex < 6; stringIndex++) {
        let foundNote: NoteName | null = null;
        
        for (let fret = baseFret; fret <= Math.min(baseFret + 4, maxFret); fret++) {
          const note = this.getNoteAtFret(stringIndex, fret);
          if (chordNotes.has(note)) {
            foundNote = note;
            positions.push({
              string: stringIndex,
              fret,
              finger: fret === baseFret ? 1 : fret === baseFret + 1 ? 2 : fret === baseFret + 2 ? 3 : 4,
              note,
            });
            break;
          }
        }
        
        if (!foundNote) {
          positions.push({ string: stringIndex, fret: -1, finger: 'x' });
        }
      }

      const rootPosition = positions.find(p => p.note === chord.root);
      if (rootPosition && rootPosition.fret > 0) {
        shapes.push({
          chord,
          positions,
          baseFret,
          difficulty: baseFret <= 3 ? 'beginner' : baseFret <= 5 ? 'intermediate' : 'advanced',
        });
      }
    }

    return shapes.slice(0, 5);
  },
};

export default MusicTheoryService;
