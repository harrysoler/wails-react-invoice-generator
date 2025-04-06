package excelize

import (
	"dev/harrysoler/invoicingvenecia/internal/order/domain"
	"errors"
	"fmt"
	"maps"
	"slices"
	"strconv"

	"github.com/xuri/excelize/v2"
)

var (
	ErrNotEnoughData = errors.New("the sheet doesn't have enough rows")
)

type orderField int

const (
	OdooReferenceField orderField = iota
	ClientReferenceField
	ClientNameField
	PlatformNameField
	AddressField
	CityField
	PhoneNumberField

	ProductNameField
	ProductQuantityField
)

var orderFields = map[orderField]string{
	OdooReferenceField:   " Referencia del pedido ",
	ClientReferenceField: "Referencia del cliente",
	ClientNameField:      "Cliente",
	PlatformNameField:    "Campaña",
	AddressField:         " Dirección de entrega/Calle ",
	CityField:            " Dirección de entrega/Ciudad ",
	PhoneNumberField:     " Cliente/Teléfono ",
	ProductNameField:     " Líneas del pedido/Producto ",
	ProductQuantityField: " Líneas del pedido/Cantidad ",
}

func (field orderField) String() string {
	return orderFields[field]
}

type columnIndexes map[orderField]int

// Skip useless rows
var axisRow = 2

func ErrInRow(row int, err error) error {
    return fmt.Errorf("in row %v: %w", row + axisRow + 1, err)
}

func UnmarshalExcel(file *excelize.File, sheet string) ([]domain.Order, error) {
	rows, err := file.GetRows(sheet)
	if err != nil {
		return nil, err
	}

	if !isEnoughData(rows) {
		return nil, ErrNotEnoughData
	}

	// Excel rows start at 1, Slice rows at 0
	titleRow := rows[axisRow-1]
	dataRows := rows[axisRow:]

	columnIndexes, err := ColumnIndexes(titleRow)
	if err != nil {
		return nil, err
	}

	return unmarshalRows(dataRows, columnIndexes)
}

func isEnoughData(rows [][]string) bool {
	return len(rows) > 1
}

func ColumnIndexes(titleRow []string) (columnIndexes, error) {
	indexes := make(map[orderField]int)

	for key, title := range orderFields {
		index := slices.Index(titleRow, title)

		if index == -1 {
			return nil, fmt.Errorf("the column %q wasnt found in sheet", title)
		}

		indexes[key] = index
	}

	return indexes, nil
}

func unmarshalRows(rows [][]string, indexes columnIndexes) ([]domain.Order, error) {
	clientOrderMap := make(map[string]domain.Order)

    for index, row := range rows {
        clientName := row[indexes[ClientNameField]]

        order, isOrderInMap := clientOrderMap[clientName]

        if isOrderInMap {
            product, err := unmarshalProduct(row, indexes)
            if err != nil {
                return nil, ErrInRow(index, err)
            }

            order.Products = append(order.Products, product)
            clientOrderMap[clientName] = order
            continue
        }

        order, err := unmarshalOrder(row, indexes)
        if err != nil {
            return nil, ErrInRow(index, err)
        }

        clientOrderMap[clientName] = order
    }

    return slices.Collect(maps.Values(clientOrderMap)), nil
}

func unmarshalOrder(row []string, indexes columnIndexes) (domain.Order, error) {
	product, err := unmarshalProduct(row, indexes)
	if err != nil {
		return domain.Order{}, err
	}

	order := domain.Order{
		OdooReference:   row[indexes[OdooReferenceField]],
		ClientReference: row[indexes[ClientReferenceField]],
		ClientName:      row[indexes[ClientNameField]],
		PlatformName:    row[indexes[PlatformNameField]],
		Products:        []domain.Product{product},
		Address:         row[indexes[AddressField]],
		PhoneNumber:     row[indexes[PhoneNumberField]],
		City:            row[indexes[CityField]],
	}

	err = order.Validate()
	if err != nil {
		return domain.Order{}, fmt.Errorf("in client %s: %w", order.ClientName, err)
	}

	return order, nil
}

func unmarshalProduct(row []string, indexes columnIndexes) (domain.Product, error) {
	quantity, err := parseQuantity(row[indexes[ProductQuantityField]])
	if err != nil {
		return domain.Product{}, err
	}

	product := domain.Product{
		Name:     row[indexes[ProductNameField]],
		Quantity: quantity,
	}

	err = product.Validate()
	if err != nil {
		return domain.Product{}, err
	}

	return product, nil
}

func parseQuantity(value string) (int, error) {
	quantity, err := strconv.Atoi(value)
	if err != nil {
		return 0, fmt.Errorf("in column %q: %w", ProductQuantityField.String(), err)
	}

	return quantity, nil
}
