package caching

import "dev/harrysoler/invoicingvenecia/internal/order/domain"

type OrderCachingRepository interface {
    SetOrders(orders []domain.Order) error
    AllOrders() ([]domain.Order, error)
    OrdersWithFilter(filter OrderFilter) ([]domain.Order, error)
}

type OrderFilter struct {
    // Index by clientName, phone, address, products name and references (odoo and client)
    FullTextSearch  string
    Platform        string
    City            string
}
