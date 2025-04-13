package memory

import (
	"dev/harrysoler/invoicingvenecia/internal/order/caching"
	"dev/harrysoler/invoicingvenecia/internal/order/domain"
	"slices"
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
	platforms := make([]string, 0)

	for _, order := range repository.orders {
		if !slices.Contains(platforms, order.PlatformName) {
			platforms = append(platforms, order.PlatformName)
		}
	}

	return platforms
}

func (repository *MemoryOrderCachingRepository) Cities() []string {
	cities := make([]string, 0)

	for _, order := range repository.orders {
		if !slices.Contains(cities, order.City) {
			cities = append(cities, order.City)
		}
	}

	return cities
}

func (repository *MemoryOrderCachingRepository) OrdersWithFilter(filter caching.OrderFilter) ([]domain.Order, error) {
	orders := make([]domain.Order, 0)

	for _, order := range repository.orders {
		orderSearchIndex := OrderSearchIndex(order)
		isSearchIncluded := strings.Contains(orderSearchIndex, strings.ToLower(filter.FullTextSearch)) || filter.FullTextSearch == ""

		// isCityIncluded := StringSliceIncludes(order.City, filter.Cities) || len(filter.Cities) == 0
		// isPlatformIncluded := StringSliceIncludes(order.PlatformName, filter.Platforms) || len(filter.Platforms) == 0

        isCityIncluded := slices.Contains(filter.Cities, order.City) || len(filter.Cities) == 0
        isPlatformIncluded := slices.Contains(filter.Platforms, order.PlatformName) || len(filter.Platforms) == 0

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
