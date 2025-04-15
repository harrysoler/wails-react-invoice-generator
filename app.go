package main

import (
	"context"
	"dev/harrysoler/invoicingvenecia/internal/invoice"
	"dev/harrysoler/invoicingvenecia/internal/invoice/maroto"
	"dev/harrysoler/invoicingvenecia/internal/order/caching"
	"dev/harrysoler/invoicingvenecia/internal/order/caching/memory"
	"dev/harrysoler/invoicingvenecia/internal/order/domain"
	"dev/harrysoler/invoicingvenecia/internal/order/parser"
	"dev/harrysoler/invoicingvenecia/internal/order/parser/excelize"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

type App struct {
	excelOrderParser parser.ExcelOrderParser
	orderRepository  caching.OrderCachingRepository
	invoiceService   invoice.InvoiceService

	ctx context.Context
}

func NewApp() *App {
	return &App{
		excelOrderParser: excelize.NewExcelizeOrderParser(),
		orderRepository:  memory.NewMemoryOrderCachingRepository(),
		invoiceService:   maroto.NewMarotoStampsRepository(),
	}
}

func (app *App) startup(ctx context.Context) {
	app.ctx = ctx
}

func (app *App) OpenExcelFile() (string, error) {
	path, err := runtime.OpenFileDialog(app.ctx, runtime.OpenDialogOptions{
		ShowHiddenFiles: false,
		Filters: []runtime.FileFilter{
			{
				DisplayName: "Spreadsheet (*.xlsx)",
				Pattern:     "*.xlsx",
			},
			{
				DisplayName: "Macro Spreadsheet (*.xlsm)",
				Pattern:     "*.xlsm",
			},
		},
	})
	if err != nil {
		return "", err
	}

	return path, nil
}

func (app *App) SheetsFromExcelFile(path string) ([]string, error) {
	return app.excelOrderParser.SheetsFromFile(path)
}

func (app *App) ParseOrdersExcelFile(path string, sheet string) error {
	orders, err := app.excelOrderParser.ParseFile(path, sheet)
	if err != nil {
		return err
	}

	err = app.orderRepository.SetOrders(orders)
	if err != nil {
		return err
	}

	return nil
}

func (app *App) OrdersByFilter(filter caching.OrderFilter) ([]domain.Order, error) {
	return app.orderRepository.OrdersWithFilter(filter)
}

func (app *App) OrdersPlatformNames() []string {
	return app.orderRepository.Platforms()
}

func (app *App) OrdersCities() []string {
	return app.orderRepository.Cities()
}
