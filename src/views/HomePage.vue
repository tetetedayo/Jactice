<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Jactice</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div class="content-container">
        <div class="main-container">
          <div class="dealer-container">
            <div class="dealer-avatar-container">
              <img src="/imgs/casino_dealer.png" width="64" height="64" />
              <span>{{ $t('pages.home.labels.dealer') }}</span>
            </div>
            <div class="dealer-card-container">
              <img :src="`/imgs/${dealerCard.suit}${dealerCard.value}.png`" height="120" />
            </div>
          </div>
          <div class="player-container">
            <div class="player-avatar-container">
              <img src="/imgs/casino_player.png" width="64" height="64" />
              <span>{{ $t('pages.home.labels.player') }}</span>
            </div>
            <div class="player-card-container">
              <img :src="`/imgs/${playerCards[0].suit}${playerCards[0].value}.png`" height="120" />
              <img :src="`/imgs/${playerCards[1].suit}${playerCards[1].value}.png`" height="120" />
            </div>
          </div>
          <div class="correction-container">
            <template v-if="status === 'correct'">
              <img class="correction-image" src="/imgs/mark_correct.png" />
              <div class="correction-label correction-label-correct">
                <p>{{ $t('pages.home.labels.correct') }}</p>
              </div>
            </template>
            <template v-if="status === 'incorrect'">
              <img class="correction-image" src="/imgs/mark_incorrect.png" />
              <div class="correction-label correction-label-incorrect">
                <p>{{ $t('pages.home.labels.incorrect') }}</p>
              </div>
            </template>
          </div>
        </div>
        <div class="action-button-container">
          <ion-button class="action-button" strong @click="onActionButtonClick(Action.Hit)">{{ $t('pages.home.buttons.hit') }}</ion-button>
          <ion-button class="action-button" strong @click="onActionButtonClick(Action.Stand)">{{ $t('pages.home.buttons.stand') }}</ion-button>
          <ion-button class="action-button" strong @click="onActionButtonClick(Action.DoubleDown)">{{ $t('pages.home.buttons.double') }}</ion-button>
          <ion-button class="action-button" strong @click="onActionButtonClick(Action.Split)">{{ $t('pages.home.buttons.split') }}</ion-button>
          <ion-button class="action-button" strong @click="onActionButtonClick(Action.Surrender)">{{ $t('pages.home.buttons.surrender') }}</ion-button>
        </div>
        <div class="retry-button-container">
          <ion-button class="retry-button" strong expand="full" color="success" @click="onRetryButtonClick()">{{ $t('pages.home.buttons.retry') }}</ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage, IonButton, IonHeader, IonToolbar, IonTitle } from '@ionic/vue';
import { ref } from 'vue';

import { Card } from '@/services/card';
import { Deck } from '@/services/deck';
import { Shoe } from '@/services/shoe';
import { BasicStrategy, ActionValue, Action } from '@/services/strategy';

// Prepare the shoe and strategy.
const shoe = new Shoe([new Deck()]);
const strategy = new BasicStrategy();

// Define the function to draw player cards.
const drawPlayerCards = (): Array<Card> => {
  const ACE_COUNT = 11;
  const BLACKJACK_COUNT = 21;

  const playerCards = shoe.draw(2)!;
  // Re-Draw if the total count of the player cards is 21.
  if ((playerCards[0].count || ACE_COUNT) + (playerCards[1].count || ACE_COUNT) === BLACKJACK_COUNT) {
    shoe.reset();
    return drawPlayerCards();
  }
  return playerCards;
};

// Whether the selected action is correct or not.
const status = ref<'correct' | 'incorrect'>();

// Draw cards.
const dealerCard = ref(shoe.draw(1)!);
const playerCards = ref(drawPlayerCards());

// Invoked when the action button is clicked.
const onActionButtonClick = (action: ActionValue) => {
  status.value = undefined;
  // Delay the judgement by about 50 ms to indicate that the result has switched clearly.
  setTimeout(() => {
    status.value = strategy.judge(dealerCard.value, playerCards.value) === action ? 'correct' : 'incorrect';
  }, 50);
};

// Invoked when the retry button is clicked.
const onRetryButtonClick = () => {
  shoe.reset();
  status.value = undefined;
  playerCards.value = drawPlayerCards();
  dealerCard.value = shoe.draw(1)!;
};
</script>

<style scoped lang="scss">
.content-container {
  min-width: 320px;
  max-width: 320px;
  margin: 32px auto;
}

.action-button-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin: 32px auto;

  .action-button {
    min-width: 140px;
  }
}

.main-container {
  position: relative;
  margin: 0 auto;

  .dealer-container,
  .player-container {
    display: flex;
    align-items: center;

    .dealer-avatar-container,
    .player-avatar-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-width: 120px;
      min-height: 120px;
    }
  }

  .correction-container {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;

    .correction-image {
      width: 100%;
      height: 100%;
      object-fit: contain;
      opacity: 0.5;
    }

    .correction-label {
      position: absolute;
      top: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      font-size: 24px;
      font-weight: bold;
      color: var(--ion-color-primary);
    }
  }
}
</style>
