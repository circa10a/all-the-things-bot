const halloweenEmojis = [
  '🤡',
  '💀',
  '☠️',
  '👻',
  '🧛‍♂️',
  '⚰️',
  '🧟',
  '🦇',
  '🎃',
  '🕸️',
  '🕷️',
  '🕯️',
];

const randomEmoji = () => halloweenEmojis[Math.floor(Math.random() * halloweenEmojis.length)];
module.exports = randomEmoji;
