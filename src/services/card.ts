export const CardSuit = {
  Heart: 'heart',
  Diamond: 'diamond',
  Spade: 'spade',
  Club: 'club',
} as const;

export const CardValue = {
  Ace: 1,
  Two: 2,
  Three: 3,
  Four: 4,
  Five: 5,
  Six: 6,
  Seven: 7,
  Eight: 8,
  Nine: 9,
  Ten: 10,
  Jack: 11,
  Queen: 12,
  King: 13,
} as const;

/**
 * Card represents a playing card.
 */
export class Card {
  constructor(
    readonly suit: (typeof CardSuit)[keyof typeof CardSuit],
    readonly value: (typeof CardValue)[keyof typeof CardValue],
    readonly count?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10,
  ) {}
}
