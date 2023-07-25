import { Card, CardValue, CardSuit } from '@/services/card';

/**
 * Deck represetns a set of playing cards.
 */
export class Deck {
  /**
   * Cards.
   */
  readonly cards: Array<Card>;

  /**
   * Constructor.
   */
  constructor() {
    // Generate the
    this.cards = Object.values(CardValue).reduce<Array<Card>>((cards, value) => {
      // Calculate a card count.
      const count = (() => {
        switch (value) {
          case CardValue.Ace:
            return undefined;
          case CardValue.Jack:
          case CardValue.Queen:
          case CardValue.King:
            return 10;
          default:
            return value;
        }
      })();
      Object.values(CardSuit).forEach((suit) => {
        cards.push(new Card(suit, value, count));
      });
      return cards;
    }, []);
  }
}
