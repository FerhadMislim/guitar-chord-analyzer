export type NoteName = 
  | 'C' | 'C#' | 'Db' | 'D' | 'D#' | 'Eb'
  | 'E' | 'F' | 'F#' | 'Gb' | 'G' | 'G#'
  | 'Ab' | 'A' | 'A#' | 'Bb' | 'B';

export type ChordQuality = 
  | 'major' | 'minor' | 'dim' | 'aug' | 'sus2' | 'sus4'
  | '7' | 'maj7' | 'min7' | 'dim7' | 'minMaj7'
  | '9' | 'maj9' | 'min9' | '11' | '13'
  | 'add9' | '6' | 'min6';

export interface Note {
  name: NoteName;
  octave?: number;
  frequency?: number;
}

export interface Chord {
  root: NoteName;
  quality: ChordQuality;
  bass?: NoteName;
  notes: NoteName[];
  intervals: number[];
  symbol: string;
}

export interface ChordPosition {
  string: number;
  fret: number;
  finger?: number | 'open' | 'x';
  note?: NoteName;
}

export interface ChordShape {
  chord: Chord;
  positions: ChordPosition[];
  barre?: { fromFret: number; toString: number };
  baseFret: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface Scale {
  root: NoteName;
  type: ScaleType;
  notes: NoteName[];
  intervals: number[];
}

export type ScaleType = 
  | 'major' | 'minor' | 'harmonic minor' | 'melodic minor'
  | 'pentatonic major' | 'pentatonic minor' | 'blues'
  | 'dorian' | 'phrygian' | 'lydian' | 'mixolydian' | 'locrian';

export interface Progression {
  name: string;
  numerals: string[];
  chords: Chord[];
}

export interface FretboardString {
  stringNumber: number;
  openNote: NoteName;
}

export const OPEN_STRINGS: FretboardString[] = [
  { stringNumber: 1, openNote: 'E' },
  { stringNumber: 2, openNote: 'B' },
  { stringNumber: 3, openNote: 'G' },
  { stringNumber: 4, openNote: 'D' },
  { stringNumber: 5, openNote: 'A' },
  { stringNumber: 6, openNote: 'E' },
];
