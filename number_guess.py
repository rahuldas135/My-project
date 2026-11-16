print("Think of a number between 1 and 100.")

low = 1
high = 100

while low <= high:
	guess = (low + high) // 2
	answer = input(f"Is your number {guess}? (h/l/c): ").lower()

	if answer == "c":
		print("I guessed your number!")
		break
	elif answer == "h":
		low = guess + 1
	elif answer == "l":
		high = guess - 1
	else:
		print("Please enter h, l, or c.")
else:
	print("Those answers don't seem consistent. Let's try again!")
