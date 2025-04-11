import { faker } from "@faker-js/faker";
import { domain } from "@wailsjs/go/models";

export function getOrderEntry(order: domain.Order): string {
  return order.OdooReference.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
}

export function getMockOrder(): domain.Order {
  return new domain.Order({
    OdooReference: faker.string.nanoid(7),
    ClientReference: faker.string.uuid(),
    ClientName: faker.person.fullName(),
    PlatformName: faker.company.name(),
    Address: faker.location.streetAddress(),
    City: faker.location.city(),
    PhoneNumber: faker.phone.number({ style: "human" }),
    Products: faker.helpers.multiple(() => ({
      Name: faker.commerce.productName(),
      Quantity: faker.number.int({ min: 1, max: 10 }),
    })),
  });
}
