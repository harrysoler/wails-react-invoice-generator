package invoice

import (
    "dev/harrysoler/invoicingvenecia/internal/order/domain"
    _ "embed"
)

var (
    //go:embed assets/checkbox.png
    CheckboxImage   []byte
    //go:embed assets/stamp_logo.png
    LogoImage       []byte
)

type InvoicePath string

type InvoiceService interface {
    GenerateInvoice(order domain.Order, copies int) (InvoicePath, error)
}
