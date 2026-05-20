// All six levels supported by the matrix (Entry 1 through Level 3).
// Order matters: this defines the column order in the matrix and the
// progression of difficulty in the planner.
export const LEVELS = [
  { key: 'e1', label: 'Entry 1', short: 'E1', isDraft: true },
  { key: 'e2', label: 'Entry 2', short: 'E2', isDraft: true },
  { key: 'e3', label: 'Entry 3', short: 'E3', isDraft: true },
  { key: '1',  label: 'Level 1', short: 'L1', isDraft: false },
  { key: '2',  label: 'Level 2', short: 'L2', isDraft: false },
  { key: '3',  label: 'Level 3', short: 'L3', isDraft: false },
];
