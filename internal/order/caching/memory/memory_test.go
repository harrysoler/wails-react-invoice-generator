package memory

import (
	"dev/harrysoler/invoicingvenecia/internal/order/domain"
	"reflect"
	"strings"
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
		City:            "TUNJA",
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

func TestReturnsSuccessWhenSettingOrders(t *testing.T) {
	repository := NewMemoryOrderCachingRepository()

	err := repository.SetOrders(mockOrders[:])
	if err != nil {
		t.Errorf("SetOrders(<mock-orders>) = %q, want <mock-orders>", err)
		return
	}

	t.Run("returns all orders from memory", func(t *testing.T) {
		got, err := repository.AllOrders()
		if err != nil {
			t.Errorf("AllOrders() = <any>, %q, want <mock-orders>", err)
		}

		if !reflect.DeepEqual(got, mockOrders) {
			t.Errorf("AllOrders() = %#v, nil, want %#v", got, mockOrders)
		}
	})

	t.Run("returns orders with client name", func(t *testing.T) {
		want := []domain.Order{mockOrders[0]}
		searchParameter := strings.ToLower(want[0].ClientName)

		got, err := repository.OrdersWithClientName(searchParameter)
		if err != nil {
			t.Errorf("OrdersWithClientName(%q) = <any>, %q, want %#v", searchParameter, err, want)
		}

		if !reflect.DeepEqual(got, want) {
			t.Errorf("OrdersWithClientName(%q) = %#v, nil, want %#v", searchParameter, got, want)
		}
	})
}
