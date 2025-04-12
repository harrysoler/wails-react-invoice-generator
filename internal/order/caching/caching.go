package caching

import "dev/harrysoler/invoicingvenecia/internal/order/domain"

type OrderCachingRepository interface {
    SetOrders(orders []domain.Order) error
    OrdersWithFilter(filter OrderFilter) ([]domain.Order, error)
    Platforms() []string
    Cities() []string
}

type OrderFilter struct {
    // Index by clientName, phone, address, products name and references (odoo and client)
    FullTextSearch  string
    Platforms       []string
    Cities          []string
}
