package models

import "time"

type Teacher struct {
	ID         int               `json:"id"`
	FirstName  string            `json:"firstName"`
	LastName   string            `json:"lastName"`
	Email      string            `json:"email"`
	Speciality TeacherSpeciality `json:"speciality"`
	CreatedAt  time.Time         `json:"createdAt"`
	UpdatedAt  time.Time         `json:"updatedAt"`
}

type TeacherSpeciality string

const (
	SpecialityEngineering TeacherSpeciality = "Engineering"
	SpecialityProgramming TeacherSpeciality = "Programming"
	SpecialityMathematics TeacherSpeciality = "Mathematics"
	SpecialityChemistry   TeacherSpeciality = "Chemistry"
	SpecialityPsychology  TeacherSpeciality = "Psychology"
	SpecialityBiology     TeacherSpeciality = "Biology"
)

func (s TeacherSpeciality) IsValid() bool {
	switch s {
	case SpecialityEngineering, SpecialityProgramming, SpecialityMathematics, SpecialityChemistry, SpecialityPsychology, SpecialityBiology:
		return true
	default:
		return false
	}
}
