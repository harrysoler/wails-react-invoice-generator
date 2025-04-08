package main

import (
	"dev/harrysoler/invoicingvenecia/internal/invoice"
	"dev/harrysoler/invoicingvenecia/internal/invoice/maroto"
	"dev/harrysoler/invoicingvenecia/internal/order/caching"
	"dev/harrysoler/invoicingvenecia/internal/order/caching/memory"
	"dev/harrysoler/invoicingvenecia/internal/order/domain"
	"dev/harrysoler/invoicingvenecia/internal/order/parser"
	"dev/harrysoler/invoicingvenecia/internal/order/parser/excelize"
)

type App struct {
    excelOrderParser    parser.ExcelOrderParser
    orderRepository     caching.OrderCachingRepository
    invoiceService      invoice.InvoiceService
}

func NewApp() *App {
	return &App{
        excelOrderParser: excelize.NewExcelizeOrderParser(),
        orderRepository: memory.NewMemoryOrderCachingRepository(),
        invoiceService: maroto.NewMarotoStampsRepository(),
    }
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
