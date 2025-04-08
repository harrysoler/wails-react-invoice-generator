package memory

import (
	"dev/harrysoler/invoicingvenecia/internal/order/caching"
	"dev/harrysoler/invoicingvenecia/internal/order/domain"
	"fmt"
	"reflect"
	"testing"
)

var mockOrders = []domain.Order{
	{
		ClientName:      "JUAN PABLO MORENO",
		OdooReference:   "S269382",
		ClientReference: "TF072",
		PlatformName:    "EXITO",
		Address:         "CALLE 6 # 18-96",
		City:            "TUNJA",
		PhoneNumber:     "3116191763",
		Products: []domain.Product{
			{
				Name:     "SILLA VIENA DICOSTA TAUPE (METALICA NATURAL)",
				Quantity: 3,
			},
			{
				Name:     "SILLA LYON SKY GRIS",
				Quantity: 1,
			},
		},
	},
	{
		ClientName:      "GUTIERREZ LOPEZ NEIDER JAVIER",
		OdooReference:   "S270121",
		ClientReference: "13925521",
		PlatformName:    "HOME",
		Address:         "Carrera 48 # 82-71",
		City:            "BOGOTA",
		PhoneNumber:     "3007711741",
		Products: []domain.Product{
			{
				Name:     "BUTACO KENTUCKY DICOSTA TRIGO (MATIZ CAOBA)",
				Quantity: 7,
			},
			{
				Name:     "SOFA TOULOUSE DUSTER GRIS (MATIZ NATURAL)",
				Quantity: 3,
			},
		},
	},
}

type TestMemoryRepository struct {
	caching.OrderCachingRepository
}

func NewTestMemoryRepository() (*TestMemoryRepository, error) {
	repository := NewMemoryOrderCachingRepository()

	err := repository.SetOrders(mockOrders[:])
	if err != nil {
		return nil, fmt.Errorf("SetOrders(<mock-orders>) = %q, want <mock-orders>", err)
	}

	return &TestMemoryRepository{repository}, nil
}

func TestReturnsSuccessWhenSettingOrders(t *testing.T) {
	repository, err := NewTestMemoryRepository()
	if err != nil {
		t.Error(err)
		return
	}

	got, err := repository.AllOrders()
	if err != nil {
		t.Errorf("AllOrders() = <any>, %q, want <mock-orders>", err)
	}

	if !reflect.DeepEqual(got, mockOrders) {
		t.Errorf("AllOrders() = %#v, nil, want %#v", got, mockOrders)
	}
}

func TestReturnSuccessWhenFilteringOrders(t *testing.T) {
	filterTests := map[string]struct {
		input  caching.OrderFilter
		result []domain.Order
	}{
		"OdooReference": {
			input: caching.OrderFilter{
				FullTextSearch: mockOrders[0].OdooReference,
			},
			result: []domain.Order{mockOrders[0]},
		},
		"ClientReference": {
			input: caching.OrderFilter{
				FullTextSearch: mockOrders[1].ClientReference,
			},
			result: []domain.Order{mockOrders[1]},
		},
		"ClientName": {
			input: caching.OrderFilter{
				FullTextSearch: mockOrders[0].ClientName,
			},
			result: []domain.Order{mockOrders[0]},
		},
		"Address": {
			input: caching.OrderFilter{
				FullTextSearch: mockOrders[1].Address,
			},
			result: []domain.Order{mockOrders[1]},
		},
		"Phone": {
			input: caching.OrderFilter{
				FullTextSearch: mockOrders[0].PhoneNumber,
			},
			result: []domain.Order{mockOrders[0]},
		},
		"Platform": {
			input: caching.OrderFilter{
				Platform: mockOrders[1].PlatformName,
			},
			result: []domain.Order{mockOrders[1]},
		},
		"City": {
			input: caching.OrderFilter{
				City: mockOrders[0].City,
			},
			result: []domain.Order{mockOrders[0]},
		},
        "Product": {
            input: caching.OrderFilter{
                FullTextSearch: mockOrders[1].Products[0].Name,
            },
            result: []domain.Order{mockOrders[1]},
        },
	}

	for field, test := range filterTests {
		t.Run("returns order when filtering by "+field, func(t *testing.T) {
			t.Parallel()

			repository, err := NewTestMemoryRepository()
			if err != nil {
				t.Error(err)
				return
			}

			got, err := repository.OrdersWithFilter(test.input)
			if err != nil {
				t.Errorf("OrdersWithFilter(%#v) = <orders>, %q, want <orders>, nil", test.input, err)
				return
			}

			if !reflect.DeepEqual(test.result, got) {
				t.Errorf("OrdersWithFilter(%#v) = %#v, nil, want <order>, nil", test.input, got)
			}
		})
	}
}
