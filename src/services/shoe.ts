import { Card } from '@/services/card';
import { Deck } from '@/services/deck';

type DrawedCard<T extends number> = T extends 1 ? Card : Array<Card>;

/**
 * Shoe represents a dealing shoe.
 */
export class Shoe {
  /**
   * Cards.
   */
  readonly cards: Array<Card>;

  /**
   * Index.
   */
  private index: number;

  /**
   * Constructor.
   */
  constructor(decks: Array<Deck>, shuffled = true) {
    this.index = 0;
    this.cards = decks
      .map((deck) => {
        return deck.cards;
      })
      .flat();

    if (shuffled) {
      this.shuffle();
    }
  }

  /**
   * Reset the shoe.
   */
  reset() {
    this.index = 0;
    this.shuffle();
  }

  /**
   * Shuffle cards.
   */
  shuffle() {
    this.cards.sort(() => {
      return 0.5 - Math.random();
    });
  }

  /**
   * Draw a card.
   */
  draw<T extends number>(num: T): DrawedCard<T> | null {
    // Return null if the specified number of cards cannot be drawn from the shoe or is less than zero.
    if (this.cards.length < this.index + num || num <= 0) {
      return null;
    }
    const cards = [...Array(num)].map(() => {
      return this.cards[this.index++];
    });
    return <DrawedCard<T>>(num === 1 ? cards[0] : cards);
  }
}
