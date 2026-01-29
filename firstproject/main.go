package main

import (
	"bufio"
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
	"time"
)

// Struct definition
type Student struct {
	Name  string
	Age   int
	Grade string
}

// Function with return
func greetUser(name string) string {
	return "Welcome, " + name + "!"
}

// Function returning multiple values
func calculateStats(scores []int) (int, float64) {
	sum := 0
	for _, score := range scores {
		sum += score
	}
	avg := float64(sum) / float64(len(scores))
	return sum, avg
}

func printProgramEnd() {
	fmt.Println("Program execution completed. (via defer)")
}

func main() {

	// --- defer example ---
	defer printProgramEnd()

	// --- time package usage ---
	currentTime := time.Now()
	fmt.Println("Current Time:", currentTime.Format("02-Jan-2006 15:04:05"))

	// Sleep for 1 second just to show time delay (optional)
	// time.Sleep(time.Second * 1)
	// Input
	reader := bufio.NewReader(os.Stdin)
	fmt.Print("Enter your name: ")
	nameInput, _ := reader.ReadString('\n')
	name := strings.TrimSpace(nameInput)

	// --- strings package usage ---
	fmt.Println("Uppercase name:", strings.ToUpper(name))
	fmt.Println("Has prefix 'Mr.':", strings.HasPrefix(name, "Mr."))
	fmt.Println("Name length:", len(name))

	// Function + Print
	fmt.Println(greetUser(name))

	// Variables and :=
	subject1 := 85
	subject2 := 90
	var subject3 int = 78

	// Arrays
	var arr [3]int = [3]int{subject1, subject2, subject3}
	fmt.Println("Array of marks:", arr)
	fmt.Println("Length of Array:", len(arr))
	var arr1 = [3]int{subject1, subject2, subject3}
	fmt.Println("Array1 of marks:", arr1)
	var arr2 [3]bool
	fmt.Println("Array2 of booleans:", arr2)

	// Slices + append + capacity
	marks := []int{subject1, subject2, subject3}
	marks = append(marks, 88)
	numbers := make([]int, 3, 5)
	numbers = append(numbers, 4, 4, 4)
	fmt.Println("Slice:", numbers)
	fmt.Println("Length:", len(numbers))
	fmt.Println("Capacity:", cap(numbers))

	// If-Else
	if subject1 > 80 {
		fmt.Println("Great score in subject 1!")
	} else {
		fmt.Println("Needs improvement.")
	}

	// For loop with index
	fmt.Println("All Marks:")
	for i, val := range marks {
		fmt.Printf("Subject %d: %d\n", i+1, val)
	}

	// --- Map usage ---
	studentMarks := map[string]int{
		"Math":    85,
		"Science": 90,
	}
	studentMarks["English"] = 78

	fmt.Println("Student Marks Map:")
	for subject, mark := range studentMarks {
		fmt.Printf("%s: %d\n", subject, mark)
	}

	// Map: check if key exists
	if val, exists := studentMarks["History"]; exists {
		fmt.Println("History marks:", val)
	} else {
		fmt.Println("History not found in map.")
	}

	// Map: delete key
	delete(studentMarks, "Science")
	fmt.Println("Map after deleting Science:", studentMarks)

	// --- Switch ---
	grade := "B"
	switch grade {
	case "A":
		fmt.Println("Excellent!")
	case "B":
		fmt.Println("Good job!")
	default:
		fmt.Println("Keep trying!")
	}

	// --- Struct ---
	student := Student{
		Name:  name,
		Age:   20,
		Grade: "B",
	}
	fmt.Println("Student Struct:", student)
	fmt.Println("Student Name:", student.Name)

	// --- Pointers ---
	var x int = 10
	var p *int = &x
	fmt.Println("Value of x:", x)
	fmt.Println("Address of x:", p)
	fmt.Println("Value via pointer:", *p)

	// Modify through pointer
	*p = 20
	fmt.Println("Modified x via pointer:", x)

	// Pointer to struct
	ptrStudent := &student
	ptrStudent.Grade = "A"
	fmt.Println("Updated Grade via pointer:", student.Grade)

	// --- Function returning multiple values and using _ ---
	sum, avg := calculateStats(marks)
	fmt.Printf("Total: %d, Average: %.2f\n", sum, avg)

	sum1, _ := calculateStats(marks)
	fmt.Printf("Total without average: %d\n", sum1)

	// --- Type Conversion ---
	fmt.Println("\n--- Data Conversion ---")

	// int to float64
	var intVal int = 100
	var floatVal float64 = float64(intVal)
	fmt.Println("Int to Float64:", floatVal)

	// float64 to int
	var f float64 = 99.99
	var i int = int(f)
	fmt.Println("Float64 to Int (truncated):", i)

	// int to string
	strFromInt := strconv.Itoa(intVal)
	fmt.Println("Int to String:", strFromInt)

	// string to int
	str := "123"
	num, err := strconv.Atoi(str)
	if err == nil {
		fmt.Println("String to Int:", num)
	} else {
		fmt.Println("Conversion failed:", err)
	}

	// string to float64
	strFloat := "98.6"
	floatFromStr, err := strconv.ParseFloat(strFloat, 64)
	if err == nil {
		fmt.Println("String to Float64:", floatFromStr)
	} else {
		fmt.Println("Float conversion failed:", err)
	}

	// --- 📝 File Handling ---
	fmt.Println("\n--- File Handling ---")

	// Create file and write data
	file, err := os.Create("student.txt")
	if err != nil {
		fmt.Println("Failed to create file:", err)
		return
	}
	defer file.Close()

	// Write student info to file
	_, err = file.WriteString("Name: " + student.Name + "\n")
	_, err = file.WriteString("Age: " + strconv.Itoa(student.Age) + "\n")
	_, err = file.WriteString("Grade: " + student.Grade + "\n")
	if err != nil {
		fmt.Println("Error writing to file:", err)
		return
	}
	fmt.Println("Student info written to student.txt")

	// Read from file
	fileRead, err := os.Open("student.txt")
	if err != nil {
		fmt.Println("Failed to open file:", err)
		return
	}
	defer fileRead.Close()

	fmt.Println("\nReading from file:")
	content, err := io.ReadAll(fileRead)
	if err != nil {
		fmt.Println("Error reading file:", err)
		return
	}
	fmt.Println(string(content))
}
