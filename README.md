# Guitar Chord Analyzer

A professional-grade guitar chord analyzer application built with modern web technologies.

## Overview

This project analyzes guitar chords, scales, and progressions with precision. It provides an interactive fretboard visualization, chord information, and common chord progressions.

## Tech Stack

- **React** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **tonal** - Music theory library for chord detection and analysis
- **ESLint** - Code linting

## Project Structure

```
src/
├── components/           # UI Components
│   ├── NoteSelector.tsx       - Note selection grid
│   ├── ChordTypeSelector.tsx  - Chord quality dropdown
│   ├── ScaleTypeSelector.tsx - Scale type selector
│   ├── Fretboard.tsx          - Guitar fretboard visualization
│   ├── ChordInfo.tsx          - Chord details panel
│   └── ProgressionList.tsx    - Chord progressions
├── services/             # Business Logic
│   ├── MusicTheoryService.ts  - Chord/scale analysis via tonal
│   └── ProgressionService.ts  - Progression generation
├── hooks/                # React Hooks
│   └── useMusic.ts           - State management for chords/scales
├── types/                # TypeScript Definitions
│   └── index.ts              - Strong types for music entities
├── styles/               # Styling
│   └── global.css            - Modern dark theme
├── App.tsx               # Main Application
└── main.tsx              # Entry Point
```

## Architecture Decisions

### 1. Music Theory Integration
- Uses **tonal** library for robust chord detection, scales, and note handling
- Supports all common chord qualities (major, minor, 7th, maj7, min7, dim, aug, sus2, sus4, etc.)
- Supports multiple scale types (major, minor, harmonic minor, pentatonic, modes)

### 2. Separation of Concerns
- **UI Components**: Pure presentation logic, render fretboard and controls
- **Services**: Business logic isolated from React components
- **Hooks**: State management separated from components

### 3. Type Safety
- Full TypeScript coverage with music-specific types
- Strong typing for notes, chords, scales, and progressions

### 4. Modern UI
- Dark theme with CSS variables
- Responsive design for all screen sizes
- Smooth animations and transitions

## Features

- **Chord Analysis**: Select root note and chord type to visualize on fretboard
- **Scale Explorer**: Browse multiple scale types across all keys
- **Chord Progressions**: View common progressions (I-IV-V, ii-V-I, etc.)
- **Interactive Fretboard**: Click-enabled fretboard display with note markers
- **Roman Numeral Analysis**: See chord functions in progressions

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build |

## Key Types

```typescript
type NoteName = 'C' | 'C#' | 'Db' | ... | 'B';
type ChordQuality = 'major' | 'minor' | '7' | 'maj7' | ...;
type ScaleType = 'major' | 'minor' | 'pentatonic major' | ...;
```

## Development

The original implementation is preserved in the `archive/` directory.

## License

MIT
