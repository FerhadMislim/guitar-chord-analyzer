// Define constants for notes and intervals
const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const OPEN_STRINGS = ["E", "B", "G", "D", "A", "E"]; // High E to Low E

// Color scheme for different notes
const NOTE_COLORS = {
  C: "#e74c3c", // Red
  "C#": "#e67e22", // Orange
  D: "#f1c40f", // Yellow
  "D#": "#2ecc71", // Green
  E: "#1abc9c", // Turquoise
  F: "#3498db", // Blue
  "F#": "#2980b9", // Dark Blue
  G: "#9b59b6", // Purple
  "G#": "#8e44ad", // Dark Purple
  A: "#e84393", // Pink
  "A#": "#d81b60", // Dark Pink
  B: "#c0392b", // Dark Red
};

// Chord formulas (intervals from the root note)
const CHORD_FORMULAS = {
  major: [0, 4, 7],
  minor: [0, 3, 7],
  7: [0, 4, 7, 10],
  maj7: [0, 4, 7, 11],
  min7: [0, 3, 7, 10],
  sus2: [0, 2, 7],
  sus4: [0, 5, 7],
  dim: [0, 3, 6],
  aug: [0, 4, 8],
  9: [0, 4, 7, 10, 14],
  add9: [0, 4, 7, 14],
};

// Common chord progressions - these are the actual chord indices in the key
const PROGRESSIONS = {
  major: [
    [0, 3, 4], // I, IV, V
    [0, 5, 3, 4], // I, vi, IV, V
    [0, 4, 5, 3], // I, V, vi, IV
    [1, 4, 0], // ii, V, I
    [0, 3, 1, 4], // I, IV, ii, V
  ],
  minor: [
    [0, 3, 4], // i, iv, v
    [0, 5, 2, 6], // i, VI, III, VII
    [0, 3, 6, 2], // i, iv, VII, III
    [0, 6, 5, 6], // i, VII, VI, VII
    [0, 4, 5, 4], // i, v, VI, v
  ],
};

// Define major and minor scales (intervals from root)
const SCALES = {
  major: [0, 2, 4, 5, 7, 9, 11],
  minor: [0, 2, 3, 5, 7, 8, 10],
};

// Common chord shapes (string, fret pairs with finger numbers)
const CHORD_SHAPES = {
  "C-major": [
    { string: 0, fret: 0, finger: "Open" },
    { string: 1, fret: 1, finger: "1" },
    { string: 2, fret: 0, finger: "Open" },
    { string: 3, fret: 2, finger: "2" },
    { string: 4, fret: 3, finger: "3" },
    { string: 5, fret: -1, finger: "X" }, // -1 means don't play
  ],
  "G-major": [
    { string: 0, fret: 3, finger: "3" },
    { string: 1, fret: 0, finger: "Open" },
    { string: 2, fret: 0, finger: "Open" },
    { string: 3, fret: 0, finger: "Open" },
    { string: 4, fret: 2, finger: "1" },
    { string: 5, fret: 3, finger: "2" },
  ],
  "D-major": [
    { string: 0, fret: 2, finger: "2" },
    { string: 1, fret: 3, finger: "3" },
    { string: 2, fret: 2, finger: "1" },
    { string: 3, fret: 0, finger: "Open" },
    { string: 4, fret: -1, finger: "X" },
    { string: 5, fret: -1, finger: "X" },
  ],
  // Add more chord shapes here...
  // 'A-major': [
  //     { string: 0, fret: 0, finger: "Open" },
  //     { string: 1, fret: 2, finger: "1" },
  //     { string: 2, fret: 2, finger: "2" },
  //     { string: 3, fret: 2, finger: "3" },
  //     { string: 4, fret: 0, finger: "Open" },
  //     { string: 5, fret: -1, finger: "X" }
  // ],
};

// Initialize the fretboard
function initFretboard() {
  const fretboard = document.getElementById("fretboard");
  fretboard.innerHTML = "";

  // Create strings (from high E to low E)
  for (let i = 0; i < 6; i++) {
    const string = document.createElement("div");
    string.className = "string";
    string.dataset.string = i;

    // Create frets for each string
    for (let j = 0; j < 6; j++) {
      const fret = document.createElement("div");
      fret.className = "fret";
      fret.dataset.fret = j;

      // Add fret markers
      if (i === 5 && (j === 2 || j === 4)) {
        const marker = document.createElement("div");
        marker.className = "fret-marker";
        marker.textContent = j + 1;
        fret.appendChild(marker);
      }

      string.appendChild(fret);
    }

    fretboard.appendChild(string);
  }
}

// Calculate note at a specific fret and string
function getNoteAtPosition(stringIndex, fret) {
  const openNote = OPEN_STRINGS[stringIndex];
  const openNoteIndex = NOTES.indexOf(openNote);
  const noteIndex = (openNoteIndex + fret) % 12;
  return NOTES[noteIndex];
}

// Get chord notes based on root and type
function getChordNotes(rootNote, chordType) {
  const rootIndex = NOTES.indexOf(rootNote);
  const intervals = CHORD_FORMULAS[chordType];

  return intervals.map((interval) => {
    const noteIndex = (rootIndex + interval) % 12;
    return NOTES[noteIndex];
  });
}

// Show chord on the fretboard
function showChord(rootNote, chordType) {
  clearFretboard();

  const chordNotes = getChordNotes(rootNote, chordType);
  let chordPositions = [];

  // Try to find a predefined chord shape
  const chordKey = `${rootNote}-${chordType}`;
  if (chordKey in CHORD_SHAPES) {
    chordPositions = CHORD_SHAPES[chordKey];
  } else {
    // Create a simple chord diagram
    // This is a simplified approach - in a real app we would have a database of chord shapes
    for (let stringIndex = 0; stringIndex < 6; stringIndex++) {
      for (let fret = 0; fret < 6; fret++) {
        const noteAtPosition = getNoteAtPosition(stringIndex, fret);
        if (chordNotes.includes(noteAtPosition)) {
          // Find a note for this string, prioritizing lower frets
          chordPositions.push({
            string: stringIndex,
            fret: fret,
            note: noteAtPosition,
          });
          break;
        }
      }
    }
  }

  // Place notes on the fretboard
  chordPositions.forEach((position) => {
    if (position.fret >= 0) {
      // Don't show if fret is -1 (don't play)
      const string = document.querySelector(
        `.string[data-string="${position.string}"]`
      );
      const fret = string.querySelector(`.fret[data-fret="${position.fret}"]`);

      const noteAtPos = getNoteAtPosition(position.string, position.fret);
      const note = document.createElement("div");
      note.className = "note";
      note.textContent = noteAtPos;

      // Set color based on the note
      note.style.backgroundColor = NOTE_COLORS[noteAtPos];

      // Darker text for bright background colors
      if (["D", "D#", "F", "F#", "G", "G#"].includes(noteAtPos)) {
        note.style.color = "#2c3e50";
      } else {
        note.style.color = "#ffffff";
      }

      fret.appendChild(note);
    }
  });

  // Update chord title
  document.getElementById(
    "chord-title"
  ).textContent = `${rootNote} ${formatChordType(chordType)} Chord`;

  // Update chord info
  updateChordInfo(rootNote, chordType, chordNotes, chordPositions);
}

// Format chord type for display
function formatChordType(chordType) {
  const displayNames = {
    major: "Major",
    minor: "Minor",
    7: "7",
    maj7: "Major 7",
    min7: "Minor 7",
    sus2: "Sus2",
    sus4: "Sus4",
    dim: "Diminished",
    aug: "Augmented",
    9: "9",
    add9: "Add9",
  };
  return displayNames[chordType] || chordType;
}

// Clear all notes from the fretboard
function clearFretboard() {
  const notes = document.querySelectorAll(".note");
  notes.forEach((note) => note.remove());
}

// Update chord information section
function updateChordInfo(rootNote, chordType, chordNotes, positions) {
  const chordInfo = document.getElementById("chord-info");
  const chordDescription = document.getElementById("chord-description");
  const fingerPositions = document.getElementById("finger-positions");

  // Set chord description
  chordDescription.innerHTML = `
        <strong>${rootNote} ${formatChordType(
    chordType
  )}</strong> consists of the notes: 
        ${chordNotes
          .map(
            (note) => `<span style="color:${NOTE_COLORS[note]}">${note}</span>`
          )
          .join(", ")}
    `;

  // Show finger positions
  fingerPositions.innerHTML = "";
  if (positions.length > 0 && "finger" in positions[0]) {
    positions.forEach((pos) => {
      if (pos.fret >= 0) {
        const stringNames = ["E (high)", "B", "G", "D", "A", "E (low)"];
        const stringName = stringNames[pos.string];
        const fp = document.createElement("div");
        fp.className = "finger-position";
        fp.innerHTML = `${stringName}: Fret ${pos.fret} (Finger ${pos.finger})`;
        fingerPositions.appendChild(fp);
      } else {
        const stringNames = ["E (high)", "B", "G", "D", "A", "E (low)"];
        const stringName = stringNames[pos.string];
        const fp = document.createElement("div");
        fp.className = "finger-position";
        fp.innerHTML = `${stringName}: Don't play`;
        fingerPositions.appendChild(fp);
      }
    });
  }
}

// Suggest chord progressions
function suggestProgression(rootNote, chordType) {
  const progressionList = document.getElementById("progression-list");
  progressionList.innerHTML = "";

  // Determine if we should use major or minor progression templates
  const scaleType =
    chordType.includes("minor") || chordType === "min7" ? "minor" : "major";
  const progressionChoices = PROGRESSIONS[scaleType];

  // Get random progression
  const randomIndex = Math.floor(Math.random() * progressionChoices.length);
  const progression = progressionChoices[randomIndex];

  // Get the scale for this key
  const rootIndex = NOTES.indexOf(rootNote);
  const scale = SCALES[scaleType];

  // Generate chords for the progression
  progression.forEach((degreeIndex) => {
    // Get the root note for this chord in the progression
    const noteIndex = (rootIndex + scale[degreeIndex]) % 12;
    const chordRootNote = NOTES[noteIndex];

    // Determine chord type based on its position in the scale
    let chordQuality;
    if (scaleType === "major") {
      // Major scale chord qualities: maj, min, min, maj, maj, min, dim
      const qualities = [
        "major",
        "minor",
        "minor",
        "major",
        "major",
        "minor",
        "dim",
      ];
      chordQuality = qualities[degreeIndex];
    } else {
      // Natural minor scale chord qualities: min, dim, maj, min, min, maj, maj
      const qualities = [
        "minor",
        "dim",
        "major",
        "minor",
        "minor",
        "major",
        "major",
      ];
      chordQuality = qualities[degreeIndex];
    }

    // Create chord button
    const chordButton = document.createElement("div");
    chordButton.className = "progression-chord";
    chordButton.textContent = `${chordRootNote} ${formatChordType(
      chordQuality
    )}`;
    chordButton.style.backgroundColor = NOTE_COLORS[chordRootNote];

    // Darker text for bright background colors
    if (["D", "D#", "F", "F#", "G", "G#"].includes(chordRootNote)) {
      chordButton.style.color = "#2c3e50";
    } else {
      chordButton.style.color = "#ffffff";
    }

    // Add click event to show the chord
    chordButton.addEventListener("click", () => {
      document.getElementById("root-note").value = chordRootNote;
      document.getElementById("chord-type").value = chordQuality;
      showChord(chordRootNote, chordQuality);
    });

    progressionList.appendChild(chordButton);
  });
}

// Initialize the app
document.addEventListener("DOMContentLoaded", () => {
  initFretboard();

  // Event listeners
  document.getElementById("show-chord").addEventListener("click", () => {
    const rootNote = document.getElementById("root-note").value;
    const chordType = document.getElementById("chord-type").value;
    showChord(rootNote, chordType);
  });

  document
    .getElementById("suggest-progression")
    .addEventListener("click", () => {
      const rootNote = document.getElementById("root-note").value;
      const chordType = document.getElementById("chord-type").value;
      suggestProgression(rootNote, chordType);
    });

  // Show a default chord on load
  showChord("C", "major");
  suggestProgression("C", "major");
});
