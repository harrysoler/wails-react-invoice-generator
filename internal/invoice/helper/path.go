package helper

import (
	"os"
	"path/filepath"
)

func GetPath() (string, error) {
    ex, err := os.Executable()
    // ex, err := os.Getwd()
    if err != nil {
        return "", err
    }

    return filepath.Dir(ex), nil
}
