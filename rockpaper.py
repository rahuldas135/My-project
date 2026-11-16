import random

choices = ["rock", "paper", "scissors"]
computer = random.choice(choices)
player = input("Choose rock, paper, or scissors: ").strip().lower()

if player not in choices:
	print("Please choose rock, paper, or scissors.")
else:
	print("You chose {player}; computer chose {computer}.")
	if player == computer:
		print("It's a tie!")
	elif (player, computer) in (("rock", "scissors"), ("paper", "rock"), ("scissors", "paper")):
		print("You win!")
	else:
		print("Computer wins!")
