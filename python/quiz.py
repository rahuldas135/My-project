"""A beginner-friendly terminal quiz to practise Python basics.

Run from the project folder: python python/quiz.py
The website quiz is implemented separately in js/app.js.
"""

QUESTIONS = [
    {
        "question": "Which function displays text in the terminal?",
        "options": ["A. echo()", "B. print()", "C. show()"],
        "answer": "B",
        "explanation": "print() displays a value or message.",
    },
    {
        "question": "Which symbol starts a single-line Python comment?",
        "options": ["A. //", "B. #", "C. <!--"],
        "answer": "B",
        "explanation": "Python comments start with #.",
    },
    {
        "question": "What is the result of 3 ** 2?",
        "options": ["A. 6", "B. 9", "C. 5"],
        "answer": "B",
        "explanation": "** raises a number to a power: 3 squared is 9.",
    },
    {
        "question": "Which keyword defines a function?",
        "options": ["A. def", "B. function", "C. make"],
        "answer": "A",
        "explanation": "Use def followed by the function name.",
    },
    {
        "question": "Which collection can be changed after it is created?",
        "options": ["A. tuple", "B. list", "C. string"],
        "answer": "B",
        "explanation": "Lists are mutable, so their contents can be changed.",
    },
    {
        "question": "Which built-in function gives the number of items in a list?",
        "options": ["A. count()", "B. size()", "C. len()"],
        "answer": "C",
        "explanation": "len() returns the number of items in a collection.",
    },
    {
        "question": "Which collection stores key-value pairs?",
        "options": ["A. dictionary", "B. tuple", "C. range"],
        "answer": "A",
        "explanation": "A dictionary maps keys to values.",
    },
    {
        "question": "What does 10 % 3 return?",
        "options": ["A. 3", "B. 1", "C. 0"],
        "answer": "B",
        "explanation": "% returns the remainder; 10 divided by 3 leaves 1.",
    },
    {
        "question": "What is the first index in a Python list?",
        "options": ["A. 1", "B. -1", "C. 0"],
        "answer": "C",
        "explanation": "Python sequence indexes start at zero.",
    },
    {
        "question": "Which keyword begins a loop over items?",
        "options": ["A. for", "B. repeat", "C. loop"],
        "answer": "A",
        "explanation": "A for loop iterates over items in an iterable.",
    },
    {
        "question": "Which values are Python's Boolean values?",
        "options": ["A. Yes and No", "B. True and False", "C. On and Off"],
        "answer": "B",
        "explanation": "Python Boolean values are True and False.",
    },
    {
        "question": "What does input() return by default?",
        "options": ["A. A string", "B. An integer", "C. A Boolean"],
        "answer": "A",
        "explanation": "input() returns entered text as a string.",
    },
    {
        "question": "Which keyword handles an exception after try?",
        "options": ["A. catch", "B. except", "C. error"],
        "answer": "B",
        "explanation": "Python uses except to handle exceptions raised in a try block.",
    },
    {
        "question": "Which keyword skips to the next loop iteration?",
        "options": ["A. continue", "B. stop", "C. pass"],
        "answer": "A",
        "explanation": "continue skips the rest of the current iteration.",
    },
    {
        "question": "Which value represents no value in Python?",
        "options": ["A. null", "B. None", "C. void"],
        "answer": "B",
        "explanation": "None is Python's special value representing no value.",
    },
]


def run_quiz():
    """Ask each multiple-choice question and print the final score."""
    score = 0
    print("\nPython Basics Quiz")
    print("Type A, B, or C and press Enter.\n")

    for number, item in enumerate(QUESTIONS, start=1):
        print(f"{number}. {item['question']}")
        for option in item["options"]:
            print(f"   {option}")

        while True:
            answer = input("Your answer: ").strip().upper()
            if answer in {"A", "B", "C"}:
                break
            print("Please enter A, B, or C.")

        if answer == item["answer"]:
            score += 1
            print("Correct!", item["explanation"], "\n")
        else:
            print(f"Not quite. The answer is {item['answer']}. {item['explanation']}\n")

    print(f"Final score: {score}/{len(QUESTIONS)}")
    if score == len(QUESTIONS):
        print("Perfect score. Great work!")
    elif score >= 9:
        print("Good job. Keep practising!")
    else:
        print("Keep learning and try again!")


if __name__ == "__main__":
    run_quiz()
