# Invoicing - Hogar Venecia

![GitHub go.mod Go version](https://img.shields.io/github/go-mod/go-version/harrysoler/wails-react-invoice-generator)
[![Go Wails Framework](https://img.shields.io/badge/Wails-red?label=Go&color=af0505)](https://wails.io)
![React Typescript](https://img.shields.io/badge/React_TS-gray?logo=react)
[![Shadcn components](https://img.shields.io/badge/shadcn%2Fui-gray?logo=shadcnui)](https://ui.shadcn.com/)
[![Storybook](https://raw.githubusercontent.com/storybooks/brand/master/badge/badge-storybook.svg)](https://github.com/storybooks/storybook)

![Screenshots](/assets/readme-screenshot.png?raw=true)

Desktop application for PDF invoice generation parsed from an excel file of product orders.

> [!IMPORTANT]
> This application is implemented for internal usage at Hogar Venecia Muebles company, it is licensed under the MIT license for portfolio and open source purposes.

## Installation

Make sure to have the webkit runtime for your OS:

* Windows: [WebView2](https://developer.microsoft.com/en-us/microsoft-edge/webview2/)
* Linux: libwebkit package

### From Release
On the [latest release](https://github.com/harrysoler/wails-react-invoice-generator/releases) page, you can download the portable application for Linux and Windows platforms (AMD64).

### From Source

The following dependencies are required:

* Go 1.21+ (macOS 15+ requires Go 1.23.3+)
* [Wails](https://wails.io) framework (follow their install guide)

```
git clone https://github.com/harrysoler/wails-react-invoice-generator.git
cd wails-react-invoice-generator
wails build
```

The binary will be in the `build/bin` folder

## Architecture

![Screenshots](/assets/architecture.jpg?raw=true)

> [!NOTE]
> The gopdf adapter was deprecated for utf-8 encoding errors so was changed in favor or the maroto library which is easier to use.

## Testing

Each adapter have unit tests based on their respective port methods. The change to hexagonal architecture for the effective development of end-to-end tests is planned.

On the frontend side, each React component has an Storybook entry accesible running `npm storybook` in the `frontend` directory.
