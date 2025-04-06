package excelize

import (
	"dev/harrysoler/invoicingvenecia/internal/order/domain"
	"dev/harrysoler/invoicingvenecia/internal/order/parser"
	"errors"

	"github.com/xuri/excelize/v2"
)

var (
	ErrEmptySheetsFile = errors.New("the file has no sheets")
)

type ExcelizeOrderParser struct {
	orders []domain.Order
}

func NewExcelizeOrderParser() parser.ExcelOrderParser {
	return &ExcelizeOrderParser{}
}

func (repository *ExcelizeOrderParser) SheetsFromFile(path string) ([]string, error) {
	file, err := excelize.OpenFile(path)
	if err != nil {
		return nil, err
	}

	defer file.Close()

	sheets := file.GetSheetList()

	if len(sheets) < 1 {
		return nil, ErrEmptySheetsFile
	}

	return sheets, nil
}

func (repository *ExcelizeOrderParser) ParseFile(path string, sheet string) ([]domain.Order, error) {
	file, err := excelize.OpenFile(path)
	if err != nil {
		return nil, err
	}

	defer file.Close()

	return UnmarshalExcel(file, sheet)
}
