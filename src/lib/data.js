/**
 * Ceangal — puzzle data
 *
 * Structure:
 *   export const allPuzzles = [{ id, title, categories }]
 *   categories: [{ name, color: 't1'|'t2'|'t3'|'t4', words: [{ w, t }] }]
 *     w = Irish word/phrase
 *     t = English translation (shown only when GA→EN toggle is on)
 *
 * getTodaysPuzzle() returns the puzzle for today based on launch date offset.
 * getPuzzleById(id) returns a specific puzzle by id.
 */
 
export const allPuzzles = [
  {
    id: 1,
    title: "Sa Chaife",
    categories: [
      {
        name: "Deochanna",
        color: "t1",
        words: [
          { w: "Caife",       t: "Coffee"        },
          { w: "Tae",         t: "Tea"           },
          { w: "Uisce",       t: "Water"         },
          { w: "Sú oráiste",  t: "Orange juice"  },
        ],
      },
      {
        name: "Bia",
        color: "t2",
        words: [
          { w: "Toirtín",   t: "Muffin"   },
          { w: "Cáca",      t: "Cake"     },
          { w: "Arán",      t: "Bread"    },
          { w: "Brioscaí",  t: "Biscuits" },
        ],
      },
      {
        name: "Cad deir tú leis an freastalaí?",
        color: "t3",
        words: [
          { w: "Le do thoil",          t: "Please"      },
          { w: "Go raibh maith agat",  t: "Thank you"   },
          { w: "An féidir liom?",      t: "May I?"      },
          { w: "An bhfuil sé saor?",   t: "Is it free?" },
        ],
      },
      {
        name: "Ag ordú le hól anseo",
        color: "t4",
        words: [
          { w: "Anseo",          t: "To stay in"  },
          { w: "Le tabhairt leat", t: "To take away" },
          { w: "Cupán mór",      t: "Large cup"   },
          { w: "Bainne oats",    t: "Oat milk"    },
        ],
      },
    ],
  },
  // … add remaining puzzles following the same structure
  // See full puzzle set in the Ceangal design document
];
 
// ── Helpers ────────────────────────────────────────────────────
 
const LAUNCH_DATE = new Date("2025-10-01"); // adjust to actual launch
 
export function getTodaysPuzzle() {
  const today = new Date();
  const dayOffset = Math.floor((today - LAUNCH_DATE) / 86_400_000);
  return allPuzzles[((dayOffset % allPuzzles.length) + allPuzzles.length) % allPuzzles.length];
}
 
export function getPuzzleById(id) {
  return allPuzzles.find((p) => p.id === id) ?? allPuzzles[0];
}
 
// Legacy export — keeps existing game components working without changes
// Maps our structure to the shape the base repo expects:
//   { startingGroups: [{ title, color, members }] }
export function toGameFormat(puzzle) {
  const colorMap = { t1: "yellow", t2: "green", t3: "blue", t4: "purple" };
  return {
    startingGroups: puzzle.categories.map((cat) => ({
      title: cat.name,
      color: colorMap[cat.color],
      members: cat.words.map((w) => w.w),
      // non-standard extra fields Ceangal components will use:
      _ceangalColor: cat.color,
      _translations: Object.fromEntries(cat.words.map((w) => [w.w, w.t])),
    })),
  };
}
