(() => {
  const MIN_VALUE = 0;
  const MAX_VALUE = 100;

  const MESSAGES = {
    chooseDifficulty:
      'Escolha a dificuldade:\n1 - Fácil (10 tentativas)\n2 - Médio (5 tentativas)\n3 - Difícil (3 tentativas)',
    invalidOption: 'Opção inválida. Tente novamente.',
    gameCanceled: 'Jogo cancelado.',
    guessPrompt: (min, max) => `Adivinhe um número entre ${min} e ${max}:`,
    invalidInput: 'Entrada inválida. Digite um número válido.',
    tooLow: 'Muito baixo!',
    tooHigh: 'Muito alto!',
    win: (attempts) => `Parabéns! Você acertou em ${attempts} tentativa(s)!`,
    lose: (number) => `Você perdeu! O número era ${number}.`,
    remaining: (count) => `Tentativas restantes: ${count}`,
    restart: 'Deseja jogar novamente?',
    thanks: 'Obrigado por jogar!',
    difficultyChosen: (name) => `Você escolheu ${name}. Boa sorte!`,
  };

  const DIFFICULTIES = {
    1: { label: 'Fácil', maxAttempts: 10 },
    2: { label: 'Médio', maxAttempts: 5 },
    3: { label: 'Difícil', maxAttempts: 3 },
  };

  const getRandomNumber = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const promptDifficulty = () => {
    const input = prompt(MESSAGES.chooseDifficulty);

    if (input === null) {
      alert(MESSAGES.gameCanceled);
      return null;
    }

    const difficulty = DIFFICULTIES[input];

    if (!difficulty) {
      alert(MESSAGES.invalidOption);
      return undefined;
    }

    return difficulty;
  };

  const promptGuess = () => {
    const input = prompt(MESSAGES.guessPrompt(MIN_VALUE, MAX_VALUE));

    if (input === null) {
      alert(MESSAGES.gameCanceled);
      return null;
    }

    const guess = Number(input);

    if (Number.isNaN(guess)) {
      alert(MESSAGES.invalidInput);
      return undefined;
    }

    return guess;
  };

  const isGuessCorrect = (guess, secretNumber) => {
    if (guess < secretNumber) {
      alert(MESSAGES.tooLow);
      return false;
    }

    if (guess > secretNumber) {
      alert(MESSAGES.tooHigh);
      return false;
    }

    return true;
  };

  const shouldRestart = () => confirm(MESSAGES.restart);

  let isGameRunning = true;

  while (isGameRunning) {
    const difficulty = promptDifficulty();

    if (difficulty === null) return;
    if (!difficulty) continue;

    const secretNumber = getRandomNumber(MIN_VALUE, MAX_VALUE);
    let attempts = 0;
    let hasWon = false;

    alert(MESSAGES.difficultyChosen(difficulty.label));

    while (attempts < difficulty.maxAttempts && !hasWon) {
      const guess = promptGuess();

      if (guess === null) return;
      if (guess === undefined) continue;

      attempts += 1;

      if (isGuessCorrect(guess, secretNumber)) {
        alert(MESSAGES.win(attempts));
        hasWon = true;
        break;
      }

      const remainingAttempts = difficulty.maxAttempts - attempts;

      if (remainingAttempts > 0) {
        alert(MESSAGES.remaining(remainingAttempts));
      }
    }

    if (!hasWon) {
      alert(MESSAGES.lose(secretNumber));
    }

    if (!shouldRestart()) {
      alert(MESSAGES.thanks);
      isGameRunning = false;
    }
  }
})();