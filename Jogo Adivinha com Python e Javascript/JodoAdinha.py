import random

MIN_VALUE = 0
MAX_VALUE = 100

MESSAGES = {
    "choose_difficulty": (
        "Escolha a dificuldade:\n"
        "1 - Fácil (10 tentativas)\n"
        "2 - Médio (5 tentativas)\n"
        "3 - Difícil (3 tentativas)"
    ),
    "invalid_option": "Opção inválida. Tente novamente.",
    "game_canceled": "Jogo cancelado.",
    "guess_prompt": lambda min_v, max_v: f"Adivinhe um número entre {min_v} e {max_v}: ",
    "invalid_input": "Entrada inválida. Digite um número válido.",
    "too_low": "Muito baixo!",
    "too_high": "Muito alto!",
    "win": lambda attempts: f"Parabéns! Você acertou em {attempts} tentativa(s)!",
    "lose": lambda number: f"Você perdeu! O número era {number}.",
    "remaining": lambda count: f"Tentativas restantes: {count}",
    "restart": "Deseja jogar novamente? (s/n): ",
    "thanks": "Obrigado por jogar!",
    "difficulty_chosen": lambda name: f"Você escolheu {name}. Boa sorte!",
}

DIFFICULTIES = {
    "1": {"label": "Fácil", "max_attempts": 10},
    "2": {"label": "Médio", "max_attempts": 5},
    "3": {"label": "Difícil", "max_attempts": 3},
}


def get_random_number(min_value, max_value):
    return random.randint(min_value, max_value)


def prompt_difficulty():
    user_input = input(MESSAGES["choose_difficulty"] + "\n")

    if user_input == "":
        print(MESSAGES["game_canceled"])
        return None

    difficulty = DIFFICULTIES.get(user_input)

    if not difficulty:
        print(MESSAGES["invalid_option"])
        return False

    return difficulty


def prompt_guess():
    user_input = input(MESSAGES["guess_prompt"](MIN_VALUE, MAX_VALUE))

    if user_input == "":
        print(MESSAGES["game_canceled"])
        return None

    try:
        guess = int(user_input)
    except ValueError:
        print(MESSAGES["invalid_input"])
        return False

    return guess


def is_guess_correct(guess, secret_number):
    if guess < secret_number:
        print(MESSAGES["too_low"])
        return False

    if guess > secret_number:
        print(MESSAGES["too_high"])
        return False

    return True


def should_restart():
    answer = input(MESSAGES["restart"]).strip().lower()
    return answer == "s"


def run_game():
    is_game_running = True

    while is_game_running:
        difficulty = prompt_difficulty()

        if difficulty is None:
            return
        if not difficulty:
            continue

        secret_number = get_random_number(MIN_VALUE, MAX_VALUE)
        attempts = 0
        has_won = False

        print(MESSAGES["difficulty_chosen"](difficulty["label"]))

        while attempts < difficulty["max_attempts"] and not has_won:
            guess = prompt_guess()

            if guess is None:
                return
            if guess is False:
                continue

            attempts += 1

            if is_guess_correct(guess, secret_number):
                print(MESSAGES["win"](attempts))
                has_won = True
                break

            remaining_attempts = difficulty["max_attempts"] - attempts

            if remaining_attempts > 0:
                print(MESSAGES["remaining"](remaining_attempts))

        if not has_won:
            print(MESSAGES["lose"](secret_number))

        if not should_restart():
            print(MESSAGES["thanks"])
            is_game_running = False


if __name__ == "__main__":
    run_game()