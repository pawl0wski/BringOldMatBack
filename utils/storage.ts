import { storage } from "wxt/storage";

export const active = storage.defineItem<boolean>("local:active", {
  defaultValue: true,
});
