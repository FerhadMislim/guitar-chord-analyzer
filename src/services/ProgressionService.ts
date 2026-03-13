import type { Chord, Progression, NoteName, ChordQuality, ScaleType } from '../types';
import { MusicTheoryService } from './MusicTheoryService';

const DIATONIC_CHORD_QUALITIES: Record<string, ChordQuality[]> = {
  'major': ['major', 'minor', 'minor', 'major', 'major', 'minor', 'dim'],
  'minor': ['minor', 'dim', 'major', 'minor', 'minor', 'major', 'major'],
  'harmonic minor': ['minor', 'dim', 'aug', 'minor', 'major', 'major', 'dim'],
  'melodic minor': ['minor', 'minor', 'aug', 'major', 'major', 'dim', 'dim'],
  'pentatonic major': ['major', 'minor', 'major', 'minor', 'major'],
  'pentatonic minor': ['minor', 'minor', 'major', 'minor', 'major'],
  'blues': ['major', 'major', 'minor', 'major', 'major', 'minor'],
  'dorian': ['minor', 'minor', 'major', 'major', 'minor', 'dim', 'major'],
  'phrygian': ['minor', 'major', 'minor', 'major', 'minor', 'major', 'major'],
  'lydian': ['major', 'major', 'minor', 'dim', 'major', 'minor', 'minor'],
  'mixolydian': ['major', 'minor', 'dim', 'major', 'minor', 'minor', 'major'],
  'locrian': ['dim', 'major', 'minor', 'major', 'minor', 'major', 'major'],
};

const COMMON_PROGRESSIONS: Record<string, number[][]> = {
  'major': [
    [0, 3, 4],
    [0, 4, 3],
    [0, 5, 3, 4],
    [0, 4, 5, 3],
    [1, 4, 0],
    [0, 3, 1, 4],
    [2, 5, 0],
    [0, 2, 4],
  ],
  'minor': [
    [0, 3, 4],
    [0, 5, 2, 6],
    [0, 3, 6, 2],
    [0, 6, 5, 6],
    [0, 4, 5, 4],
    [1, 6, 4, 0],
  ],
  'harmonic minor': [
    [0, 4, 6],
    [0, 3, 5, 6],
    [0, 4, 5, 3],
    [1, 4, 0],
  ],
  'melodic minor': [
    [0, 4, 5],
    [0, 3, 4, 5],
    [1, 4, 0],
  ],
  'pentatonic major': [
    [0, 1, 2, 3, 4],
    [0, 2, 3, 4],
    [0, 1, 3, 4],
  ],
  'pentatonic minor': [
    [0, 1, 2, 3, 4],
    [0, 2, 3, 4],
  ],
  'blues': [
    [0, 3, 4],
    [0, 3, 4, 0],
    [0, 3, 5, 3],
  ],
  'dorian': [
    [0, 3, 4],
    [0, 4, 3],
    [1, 4, 0],
  ],
  'phrygian': [
    [0, 3, 4],
    [0, 4, 3],
  ],
  'lydian': [
    [0, 3, 4],
    [0, 1, 3],
  ],
  'mixolydian': [
    [0, 3, 4],
    [0, 4, 3],
    [1, 4, 0],
  ],
  'locrian': [
    [0, 2, 4],
    [0, 3, 5],
  ],
};

export const ProgressionService = {
  getDiatonicChords(root: NoteName, scaleType: ScaleType): Chord[] {
    const qualities = DIATONIC_CHORD_QUALITIES[scaleType] || DIATONIC_CHORD_QUALITIES['major'];
    const scale = MusicTheoryService.getScale(root, scaleType);
    
    return qualities.map((quality, degree) => {
      const chordRoot = scale.notes[degree % scale.notes.length];
      return MusicTheoryService.getChord(chordRoot, quality);
    });
  },

  getCommonProgressions(root: NoteName, scaleType: ScaleType): Progression[] {
    const diatonicChords = this.getDiatonicChords(root, scaleType);
    const progressionIndices = COMMON_PROGRESSIONS[scaleType] || COMMON_PROGRESSIONS['major'];
    
    return progressionIndices.map((indices, idx) => {
      const chords = indices.map(i => diatonicChords[i % diatonicChords.length]);
      const numerals = indices.map(i => MusicTheoryService.getRomanNumeral(i, scaleType === 'minor'));
      
      return {
        name: `Progression ${idx + 1}`,
        numerals,
        chords,
      };
    });
  },

  getProgressionChords(progression: Progression): Chord[] {
    return progression.chords;
  },

  getChordInKey(root: NoteName, degree: number, scaleType: ScaleType): Chord {
    const diatonicChords = this.getDiatonicChords(root, scaleType);
    return diatonicChords[degree % diatonicChords.length];
  },

  getScaleDegrees(scaleType: ScaleType): string[] {
    const degrees: Record<string, string[]> = {
      'major': ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii'],
      'minor': ['i', 'ii\u00b0', 'III', 'iv', 'v', 'VI', 'VII'],
      'harmonic minor': ['i', 'ii\u00b0', 'III+', 'iv', 'V', 'VI', 'vii\u00b0'],
      'melodic minor': ['i', 'ii', 'III+', 'IV', 'V', 'vi\u00b0', 'vii\u00b0'],
      'pentatonic major': ['I', 'ii', 'III', 'V', 'vi'],
      'pentatonic minor': ['i', 'III', 'IV', 'v', 'VII'],
      'blues': ['I', 'IV', 'V', 'bV', 'VI', 'bVII'],
      'dorian': ['i', 'ii', 'III', 'IV', 'v', 'vi\u00b0', 'VII'],
      'phrygian': ['i', 'II', 'III', 'IV', 'v', 'VI', 'vii'],
      'lydian': ['I', 'II', 'iii', '#iv', 'V', 'vi', 'vii'],
      'mixolydian': ['I', 'ii', 'iii\u00b0', 'IV', 'v', 'vi', 'VII'],
      'locrian': ['i\u00b0', 'II', 'iii', 'iv', 'V', 'VI', 'vii'],
    };
    
    return degrees[scaleType] || degrees['major'];
  },
};

export default ProgressionService;
