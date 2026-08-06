package utils

import (
	"bufio"
	"os"
	"strings"
)

var Reader = bufio.NewReader(os.Stdin)

func ReadString(message string) string {

	print(message)

	text, _ := Reader.ReadString('\n')

	return strings.TrimSpace(text)
}
