package excelize

import (
	"slices"
	"testing"
)

const testFilePath = "../testdata/test_excel.xlsm"

// TODO: Improve test by checking the returned orders
func TestExcelizeFile(t *testing.T) {
	const sheet = "BD_ORDENES"

	parser := NewExcelizeOrderParser()

	_, err := parser.ParseFile(testFilePath, sheet)
	if err != nil {
		t.Errorf(`ParseFile(%s, %s) = [orders], %q, want order list`, testFilePath, sheet, err)
		return
	}
}

func TestExcelizeSheets(t *testing.T) {
	parser := NewExcelizeOrderParser()
	want := []string{
		"TE", "BD_ORDENES", "LISTA DE DESPACHO", "BD_GUIAS", "DPCache_Sheet1",
	}

	sheets, err := parser.SheetsFromFile(testFilePath)
	if !slices.Equal(sheets, want) || err != nil {
		t.Errorf("SheetsFromFile(%s) = %+q, %#v, want %+q", testFilePath, sheets, err, want)
	}
}
