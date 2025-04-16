package maroto

import (
	"dev/harrysoler/invoicingvenecia/internal/invoice"
	"dev/harrysoler/invoicingvenecia/internal/invoice/helper"
	"dev/harrysoler/invoicingvenecia/internal/order/domain"
	"fmt"
	"path/filepath"
	"strings"

	"github.com/johnfercher/maroto/v2"
	"github.com/johnfercher/maroto/v2/pkg/components/code"
	"github.com/johnfercher/maroto/v2/pkg/components/col"
	"github.com/johnfercher/maroto/v2/pkg/components/image"
	"github.com/johnfercher/maroto/v2/pkg/components/line"
	"github.com/johnfercher/maroto/v2/pkg/components/page"
	"github.com/johnfercher/maroto/v2/pkg/components/row"

	"github.com/johnfercher/maroto/v2/pkg/components/text"
	"github.com/johnfercher/maroto/v2/pkg/config"
	"github.com/johnfercher/maroto/v2/pkg/consts/align"
	"github.com/johnfercher/maroto/v2/pkg/consts/breakline"
	"github.com/johnfercher/maroto/v2/pkg/consts/extension"
	"github.com/johnfercher/maroto/v2/pkg/consts/fontstyle"
	"github.com/johnfercher/maroto/v2/pkg/core"
	"github.com/johnfercher/maroto/v2/pkg/props"
)

type MarotoStampsRepository struct{}

func NewMarotoStampsRepository() invoice.InvoiceService {
	return &MarotoStampsRepository{}
}

func (repository *MarotoStampsRepository) GenerateInvoice(order domain.Order, quantity int) (invoice.InvoicePath, error) {
	path, err := helper.GetPath()
	if err != nil {
		return "", err
	}

	m, err := getMaroto(order, quantity)
	if err != nil {
		return "", err
	}

	document, err := m.Generate()
	if err != nil {
		return "", err
	}

	filename := strings.ReplaceAll(order.ClientName, " ", "_") + "_guias.pdf"
	path = filepath.Join(path, filename)

	err = document.Save(path)
	if err != nil {
		return "", err
	}

	return invoice.InvoicePath(path), nil
}

func getMaroto(order domain.Order, quantity int) (core.Maroto, error) {
	cfg := config.NewBuilder().
		WithDimensions(74, 105).
		WithDebug(false).
		WithLeftMargin(5).
		WithRightMargin(5).
		WithTopMargin(5).
		WithBottomMargin(5).
		Build()

	mrt := maroto.New(cfg)
	m := maroto.NewMetricsDecorator(mrt)

	err := m.RegisterFooter(getPageFooter())
	if err != nil {
		return nil, err
	}

	for stampIndex := range quantity {
		p := page.New()

		m.AddPages(p)

		m.AddAutoRow(
			image.NewFromBytesCol(9, invoice.LogoImage, extension.Png, props.Rect{
				Center:             true,
				Percent:            50,
				JustReferenceWidth: true,
			}),
			col.New(3).Add(
				text.New("UNIDAD", props.Text{
					Size:  8,
					Align: align.Center,
					Style: fontstyle.Bold,
				}),
				text.New(fmt.Sprintf("%v/%v", stampIndex+1, quantity), props.Text{
					Size:  10,
					Top:   3,
					Align: align.Center,
					Style: fontstyle.Bold,
				}),
			),
		)

		m.AddAutoRow(
			col.New(3).Add(
				text.New("ID ODOO:", props.Text{
					Size:  7,
					Align: align.Left,
					Style: fontstyle.Bold,
				}),
				text.New(order.OdooReference, props.Text{
					Size:              8,
					Top:               3,
					Align:             align.Left,
					Style:             fontstyle.Bold,
					BreakLineStrategy: breakline.DashStrategy,
				}),
			),
			col.New(9).Add(
				text.New("ID CLIENTE:", props.Text{
					Size:  7,
					Align: align.Left,
					Style: fontstyle.Bold,
				}),
				text.New(order.ClientReference, props.Text{
					Size:              8,
					Top:               3,
					Align:             align.Left,
					Style:             fontstyle.Bold,
					BreakLineStrategy: breakline.DashStrategy,
				}),
			),
		)

		m.AddRow(1)

		m.AddAutoRow(
			code.NewBarCol(9, order.OdooReference, props.Barcode{
				Center:  true,
				Percent: 85,
			}),
			text.NewCol(3, order.PlatformName, props.Text{
				BreakLineStrategy: breakline.EmptySpaceStrategy,
				Align:             align.Center,
				Size:              6,
				Style:             fontstyle.Bold,
				// Top: 1,
			}),
		)

		m.AddRow(2, line.NewCol(12, props.Line{
			Thickness:     0.1,
			OffsetPercent: 50,
			SizePercent:   100,
		}))

		m.AddAutoRow(
			text.NewCol(12, order.ClientName, props.Text{
				BreakLineStrategy: breakline.EmptySpaceStrategy,
				Align:             align.Left,
				Style:             fontstyle.Bold,
				Size:              8,
			}),
		)

		m.AddRow(1)

		m.AddAutoRow(
			text.NewCol(12, order.Address, props.Text{
				BreakLineStrategy: breakline.EmptySpaceStrategy,
				Align:             align.Left,
				// Style: fontstyle.Bold,
				Size: 8,
			}),
		)

		m.AddRow(1)

		m.AddAutoRow(
			text.NewCol(12, order.City, props.Text{
				BreakLineStrategy: breakline.EmptySpaceStrategy,
				Align:             align.Left,
				// Style: fontstyle.Bold,
				Size: 8,
			}),
		)

		m.AddAutoRow(
			text.NewCol(12, fmt.Sprintf("TEL: %v", order.PhoneNumber), props.Text{
				BreakLineStrategy: breakline.DashStrategy,
				Align:             align.Left,
				// Style: fontstyle.Bold,
				Size: 8,
			}),
		)

		m.AddRow(2)

		for productIndex, product := range order.Products {
			m.AddAutoRow(
				image.NewFromBytesCol(1, invoice.CheckboxImage, extension.Png, props.Rect{
					Center:             true,
					JustReferenceWidth: true,
					Percent:            70,
					// Top: 1,
				}),

				// image.NewFromFileCol(1, "assets/checkbox.png", props.Rect{
				//     Center: true,
				//     JustReferenceWidth: true,
				//     Percent: 70,
				//     // Top: 1,
				// }),
				text.NewCol(11, product.Name, props.Text{
					Size:              7,
					Align:             align.Left,
					BreakLineStrategy: breakline.EmptySpaceStrategy,
				}),
			)

			if productIndex != len(order.Products)-1 {
				m.AddRow(2)

				// m.AddRow(2,
				//     line.NewCol(12, props.Line{
				//         Thickness: 0.1,
				//         OffsetPercent: 75,
				//     }),
				// )
			}
		}

		if stampIndex != quantity-1 {
			m.AddPages(page.New())
		}
	}

	return m, nil
}

func getPageFooter() core.Row {
	return row.New(5).Add(
		col.New(6).Add(
			text.New("Servicio al cliente:", props.Text{
				Size:  6,
				Style: fontstyle.Bold,
			}),
			text.New("sachogarvenecia@gmail.com", props.Text{
				Size: 6,
				Top:  2,
			}),
		),
		col.New(6).Add(
			text.New("Teléfono: ", props.Text{
				Size:  6,
				Style: fontstyle.Bold,
			}),
			text.New("3228511000", props.Text{
				Size: 6,
				Top:  2,
			}),
		),
	)
}
