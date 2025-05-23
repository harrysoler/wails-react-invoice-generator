package memory

import (
	"dev/harrysoler/invoicingvenecia/internal/order/caching"
	"dev/harrysoler/invoicingvenecia/internal/order/domain"
	"fmt"
	"reflect"
	"slices"
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
	{
		ClientName:      "OTRO NOMBRE",
		OdooReference:   "S3857691",
		ClientReference: "16829129585634",
		PlatformName:    "FL",
		Address:         "CALLE 34 Nª 86 A - 67 BLOQ 3 APTO 322 UND RESIDENCIAL GUADARAMA 2",
		City:            "BOGOTA",
		PhoneNumber:     "30077117411",
		Products: []domain.Product{
			{
				Name:     "COJIN DECORATIVO BALLS COLORS",
				Quantity: 7,
			},
			{
				Name:     "CUADRO ELEFANTE BEBE M (70X45)",
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

func TestReturnsPlatformNamesFromMemory(t *testing.T) {
	repository, err := NewTestMemoryRepository()
	if err != nil {
		t.Error(err)
		return
	}

	want := []string{
		mockOrders[0].PlatformName,
		mockOrders[1].PlatformName,
		mockOrders[2].PlatformName,
	}

	slices.Sort(want)

	got := repository.Platforms()

	if !reflect.DeepEqual(got, want) {
		t.Errorf("Platforms() = %#v, want %#v", got, want)
	}
}

func TestReturnsCitiesFromMemory(t *testing.T) {
	repository, err := NewTestMemoryRepository()
	if err != nil {
		t.Error(err)
		return
	}

	want := []string{
		mockOrders[0].City,
		mockOrders[1].City,
	}
	slices.Sort(want)

	got := repository.Cities()

	if !reflect.DeepEqual(got, want) {
		t.Errorf("Cities() = %#v, want %#v", got, want)
	}
}

func TestReturnOrderByOdooReference(t *testing.T) {
	repository, err := NewTestMemoryRepository()
	if err != nil {
		t.Error(err)
		return
	}

	want := mockOrders[0]
	index := want.OdooReference
	got, err := repository.OrderWithOdoo(index)
	if err != nil {
		t.Errorf("OrderWithOdoo(%#v) = <order>, %q, want <order>, nil", index, err)
		return
	}

	if !reflect.DeepEqual(got, want) {
		t.Errorf("OrderWithOdoo(%#v) = %#v, nil, want <order>, nil", index, got)
		return
	}
}

func TestReturnErrorByWrongOdooReference(t *testing.T) {
	repository, err := NewTestMemoryRepository()
	if err != nil {
		t.Error(err)
		return
	}

	index := "RandomOdooRefNonExistentInMockOrders"
	want := errOrderNotFound(index)

	got, err := repository.OrderWithOdoo(index)
	if err == nil {
		t.Errorf("OrderWithOdoo(%#v) = %#v, nil, want nil, %q", index, got, want)
		return
	}
}

func TestReturnOrdersWhenFilteringBy(t *testing.T) {
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
				Platforms: []string{mockOrders[1].PlatformName},
			},
			result: []domain.Order{mockOrders[1]},
		},
		"City": {
			input: caching.OrderFilter{
				Cities: []string{mockOrders[0].City},
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
		t.Run(field, func(t *testing.T) {
			t.Parallel()

			repository, err := NewTestMemoryRepository()
			if err != nil {
				t.Error(err)
				return
			}

			got, err := repository.OrdersWithFilter(test.input)
			if err != nil {
				t.Errorf("OrdersWithFilter(%#v) = <any>, %q, want <orders>, nil", test.input, err)
				return
			}

			if !reflect.DeepEqual(test.result, got) {
				t.Errorf("OrdersWithFilter(%#v) = %#v, nil, want <order>, nil", test.input, got)
			}
		})
	}
}
