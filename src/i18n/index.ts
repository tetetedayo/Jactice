import { createI18n } from 'vue-i18n';

const i18n = createI18n({
  locale: 'ja',
  fallbackLocale: 'en',
  messages: {
    ja: {
      pages: {
        home: {
          labels: {
            dealer: 'ディーラー',
            player: 'あなた',
            correct: '正解です！',
            incorrect: '残念不正解です',
          },
          buttons: {
            hit: 'ヒット',
            stand: 'スタンド',
            double: 'ダブルダウン',
            split: 'スプリット',
            surrender: 'サレンダー',
            retry: 'もう一度',
          },
        },
      },
    },
    en: {
      pages: {
        home: {
          labels: {
            dealer: 'Dealer',
            player: 'You',
          },
          buttons: {
            hit: 'Hit',
            stand: 'Stand',
            double: 'Double Down',
            split: 'Split',
            surrender: 'Surrender',
            retry: 'Paly Again',
          },
        },
      },
    },
  },
});

export default i18n;
