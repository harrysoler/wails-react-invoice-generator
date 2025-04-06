package memory

import (
	"dev/harrysoler/invoicingvenecia/internal/order/caching"
	"dev/harrysoler/invoicingvenecia/internal/order/domain"
	"strings"
)

type MemoryOrderCachingRepository struct {
    orders  []domain.Order
}

func NewMemoryOrderCachingRepository() caching.OrderCachingRepository {
    return &MemoryOrderCachingRepository{}
}

func (repository *MemoryOrderCachingRepository) SetOrders(orders []domain.Order) error {
    repository.orders = orders
    return nil
}

func (repository *MemoryOrderCachingRepository) AllOrders() ([]domain.Order, error) {
    return repository.orders, nil
}

func (repository *MemoryOrderCachingRepository) OrdersWithClientName(name string) ([]domain.Order, error) {
    orders := make([]domain.Order, 0)

    for _, order := range repository.orders {
        if strings.Contains(strings.ToLower(order.ClientName), strings.ToLower(name)) {
            orders = append(orders, order)
        }
    }

    return orders, nil
}
