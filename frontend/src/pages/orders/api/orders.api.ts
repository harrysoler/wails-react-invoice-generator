import {
  OrderByOdooReference,
  OrdersByFilter,
  OrdersCities,
  OrdersPlatformNames,
} from "@wailsjs/go/main/App";
import { caching } from "@wailsjs/go/models";

export async function getOrdersByFilter(
  filter: caching.OrderFilter,
) {
  return OrdersByFilter(filter);
}

export async function getOrderByOdooReference(odooReference: string) {
  return OrderByOdooReference(odooReference);
}

export async function getPlatformNames() {
  return OrdersPlatformNames();
}

export async function getCities() {
  return OrdersCities();
}
