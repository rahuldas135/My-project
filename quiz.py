from os import name

player_play_counts = {}
game_history = []


def show_history():
	print("\n Player History (up to 40 games) ")
	for player, play_number, marks, total in game_history[-40:]:
		print(f"{player} | Play #{play_number} | Marks: {marks}/{total}")
	print("\n")

def play_quiz():
	questions = [
		("What is the capital of France?", ["Berlin", "Paris", "Rome", "Madrid"], "B"),
		("Which planet is called the Red Planet?", ["Earth", "Venus", "Mars", "Jupiter"], "C"),
		("How many sides does a triangle have?", ["2", "3", "4", "5"], "B"),
		("What is 5 + 7?", ["10", "11", "12", "13"], "C"),
		("Which language is this quiz written in?", ["Java", "C++", "Python", "Ruby"], "C"),
	]
	name = input("Enter your name: ").strip() 
	score = 0
	print(f"\nWelcome, {name}! Choose A, B, C, or D.\n")
	for number, (question, options, correct) in enumerate(questions, 1):
		print(f"{number}. {question}")
		for letter, option in zip("ABCD", options):
			print(f"  {letter}. {option}")
		answer = input("Your answer: ").strip().upper()
		while len(answer) != 1 or answer not in "ABCD":
			answer = input("Enter A, B, C, or D: ").strip().upper()
		if answer == correct:
			print("Correct!\n")
			score += 1
		else:
			print(f"Incorrect. The correct answer is {correct}.\n")
	percent = score / len(questions) * 100
	performance = "Excellent!" if percent >= 80 else "Good job!" if percent >= 50 else "Keep practicing!"
	print(f"{name}: {score}/{len(questions)} ({percent:.0f}%). {performance}")
	player_key = name.casefold()
	player_play_counts[player_key] = player_play_counts.get(player_key, 0) + 1
	game_history.append((name, player_play_counts[player_key], score, len(questions)))
	show_history()


if __name__ == "__main__":
	print("\n=== sQuiz Application ===")
	while True:
		play_quiz()
		if input("Play again? (Y/N): ").strip().upper() != "Y":
			print("Thanks for playing!")
			break
