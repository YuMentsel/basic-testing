import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 3, b: 1, action: Action.Subtract, expected: 2 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 1, b: 2, action: Action.Multiply, expected: 2 },
  { a: 2, b: 2, action: Action.Multiply, expected: 4 },
  { a: 8, b: 2, action: Action.Divide, expected: 4 },
  { a: 6, b: 2, action: Action.Divide, expected: 3 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 4, b: 2, action: Action.Exponentiate, expected: 16 },
  { a: 2, b: 2, action: 'action', expected: null },
  { a: 3, b: 2, action: 'mult', expected: null },
  { a: '2', b: 3, action: Action.Add, expected: null },
  { a: 2, b: '3', action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(`should take the table as a variable`, ({ a, b, action, expected }) => {
    const result = simpleCalculator({ a, b, action });
    expect(result).toBe(expected);
  });
});
