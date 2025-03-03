import scalesData from "../data/scalesData";
export const notes = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];
const stringNotes = ["E", "B", "G", "D", "A", "E"];
export const fretNumsArr = [1, 3, 5, 7, 9, 12, 15, 17, 19];

export function extractScaleNames() {
  return scalesData.map((item) => item.Name);
}

export function createFretboardCircleObjects() {
  const fretboardCircles = [];

  // Petlja za svaku žicu gitare
  for (let stringIndex = 0; stringIndex < 6; stringIndex++) {
    const stringNote = stringNotes[stringIndex]; // Dobijanje note za trenutnu žicu

    // Petlja za svaki fret na trenutnoj žici
    for (let fretIndex = 0; fretIndex < 22; fretIndex++) {
      const noteIndex = (notes.indexOf(stringNote) + fretIndex) % notes.length; // Indeks u nizu nota
      const note = notes[noteIndex]; // Dobijanje note na osnovu indeksa

      // Kreiranje objekta sa podacima o fretu
      const fretboardCircle = {
        note: note,
        stringIndex: stringIndex,
        fretIndex: fretIndex,
      };

      // Dodavanje objekta u rezultujući niz
      fretboardCircles.push(fretboardCircle);
    }
  }

  return fretboardCircles;
}

export function findScaleObjectByName(name) {
  return scalesData.filter((scaleObject) => scaleObject.Name === name)[0];
}

export function getNotesForScaleFromRootNote(scaleObject, rootNote) {
  const scaleDegrees = scaleObject.Value.split(";").map(Number); // Razdvajamo i pretvaramo string u niz brojeva
  const rootNoteIndex = notes.indexOf(rootNote); // Indeks korenske note u referentnom nizu

  // Kreiranje niza koji sadrži note za skalu na osnovu korenske note i stepena skale
  const scaleNotes = scaleDegrees.map((degree) => {
    // Računanje indeksa note u odnosu na referentni niz
    const noteIndex = (rootNoteIndex + degree - 1) % notes.length;

    return notes[noteIndex]; // Vraćanje note na osnovu indeksa
  });

  return scaleNotes; // Vraćanje rezultujućeg niza nota
}


