package domain

import "github.com/go-playground/validator/v10"

type Order struct {
	OdooReference   string `validate:"required"`
	ClientReference string `validate:"required"`
	ClientName      string `validate:"required"`
	PlatformName    string `validate:"required"`
	Address         string
	City            string `validate:"required"`
	PhoneNumber     string
	Products        []Product `validate:"required,dive,required"`
}

func (order *Order) Validate() error {
	validate := validator.New(
		validator.WithRequiredStructEnabled(),
	)

	return validate.Struct(order)
}

type Product struct {
	Name     string `validate:"required"`
	Quantity int    `validate:"gt=0"`
}

func (product *Product) Validate() error {
	validate := validator.New(
		validator.WithRequiredStructEnabled(),
	)

	return validate.Struct(product)
}
