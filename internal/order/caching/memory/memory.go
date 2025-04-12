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

func (repository *MemoryOrderCachingRepository) Platforms() []string {
    platforms := make([]string, len(repository.orders))

    for index, order := range repository.orders {
        platforms[index] = order.PlatformName
    }

    return platforms
}

func (repository *MemoryOrderCachingRepository) Cities() []string {
    platforms := make([]string, len(repository.orders))

    for index, order := range repository.orders {
        platforms[index] = order.City
    }

    return platforms
}

func (repository *MemoryOrderCachingRepository) OrdersWithFilter(filter caching.OrderFilter) ([]domain.Order, error) {
	orders := make([]domain.Order, 0)

	for _, order := range repository.orders {
		orderSearchIndex := OrderSearchIndex(order)
		isSearchIncluded := strings.Contains(orderSearchIndex, strings.ToLower(filter.FullTextSearch))

		isCityIncluded := strings.Contains(strings.ToLower(order.City), strings.ToLower(strings.Join(filter.Cities, "")))
		isPlatformIncluded := strings.Contains(strings.ToLower(order.PlatformName), strings.ToLower(strings.Join(filter.Platforms, "")))

		if isSearchIncluded && isCityIncluded && isPlatformIncluded {
			orders = append(orders, order)
		}
	}

	return orders, nil
}

func OrderSearchIndex(order domain.Order) string {
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

func StringSliceContains(value string, slice []string) bool {
	return strings.Contains(strings.ToLower(value), strings.ToLower(strings.Join(slice, "")))
}
