import {
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

export async function getPlatformNames() {
  const platforms = await OrdersPlatformNames();
  console.log(platforms)
  return platforms
}

export async function getCities() {
  return OrdersCities();
}
