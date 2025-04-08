package memory

import (
	"dev/harrysoler/invoicingvenecia/internal/order/caching"
	"dev/harrysoler/invoicingvenecia/internal/order/domain"
	"strings"
)

type MemoryOrderCachingRepository struct {
	orders []domain.Order
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

func (repository *MemoryOrderCachingRepository) OrdersWithFilter(filter caching.OrderFilter) ([]domain.Order, error) {
	orders := make([]domain.Order, 0)

	for _, order := range repository.orders {
		orderSearchIndex := getOrderSearchIndex(order)
		isMatchingSearch := strings.Contains(orderSearchIndex, strings.ToLower(filter.FullTextSearch))

		isCityEqual := order.City == filter.City || filter.City == ""
		isPlatformEqual := order.PlatformName == filter.Platform || filter.Platform == ""

		if isMatchingSearch && isCityEqual && isPlatformEqual {
			orders = append(orders, order)
		}
	}

	return orders, nil
}

func getOrderSearchIndex(order domain.Order) string {
	var sb strings.Builder

	sb.WriteString(strings.ToLower(order.OdooReference))
	sb.WriteString(strings.ToLower(order.ClientReference))
	sb.WriteString(strings.ToLower(order.ClientName))
	sb.WriteString(strings.ToLower(order.Address))
	sb.WriteString(strings.ToLower(order.PhoneNumber))

	for _, product := range order.Products {
		sb.WriteString(strings.ToLower(product.Name))
	}

	return sb.String()
}
