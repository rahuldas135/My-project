class myself:
    def __init__(self, marks):
        self.marks = marks
        
    def display_info(self):
            print("name:", self.name)
            print("position:", self.position)
            print("marks:", self.marks)
            
    def set_info(self, name, position):
        self.name = name
        self.position = position
        print("Information set successfully.")
        print(f"Name: {self.name}, Position: {self.position}, Marks: {self.marks}")
class Rahul(myself):
    def __init__(self, marks):
        super().__init__(marks)
        self.position = "student"
        self.name = "Rahul"
        
    def display_info(self):
     super().display_info()
s1 = Rahul(90)
s1.display_info()