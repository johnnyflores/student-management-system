package main

import (
	"encoding/json"
	"fmt"
	"os"
)

func saveStudents() {

	file, err := os.Create("students.json")

	if err != nil {
		fmt.Println("Error creating file:", err)
		return
	}

	defer file.Close()

	encoder := json.NewEncoder(file)

	err = encoder.Encode(students)

	if err != nil {
		fmt.Println("Error saving students:", err)
		return
	}

	fmt.Println("Data saved successfully")
}

func loadStudents() {

	file, err := os.Open("students.json")

	if err != nil {
		return
	}

	defer file.Close()

	decoder := json.NewDecoder(file)

	err = decoder.Decode(&students)

	if err != nil {
		fmt.Println("Error loading students:", err)
	}
}