package parser

import "dev/harrysoler/invoicingvenecia/internal/order/domain"

type ExcelOrderParser interface {
	SheetsFromFile(path string) ([]string, error)
	ParseFile(path string, sheet string) ([]domain.Order, error)
}
