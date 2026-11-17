student ={
    "name": "John",
    "age": 20,
    "dept": "Computer Science",
    "marks": 85
}
print("Student Name:", student["name"])
print("Student Age:", student["age"])
student["city"] = "bangalore"
student["marks"] = 90
student.pop("age")
print(student)
for key, value in student.items():
    print(key, ":", value)
    print(student.keys())
    print(student.values())    