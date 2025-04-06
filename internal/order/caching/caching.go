package caching

import "dev/harrysoler/invoicingvenecia/internal/order/domain"

type OrderCachingRepository interface {
    SetOrders(orders []domain.Order) error
    AllOrders() ([]domain.Order, error)
    OrdersWithClientName(name string) ([]domain.Order, error)
}
