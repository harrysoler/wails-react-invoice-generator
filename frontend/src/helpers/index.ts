import { domain } from "@wailsjs/go/models";

export function getOrderEntry(order: domain.Order): string {
  return order.ClientName.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
}
