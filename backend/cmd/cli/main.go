package main

import (
	"student-management-system/cli"
	"student-management-system/internal/app"
)


func main() {

	service, err := app.NewStudentService()

	if err != nil {
		panic(err)
	}


	cli.Start(service)
}