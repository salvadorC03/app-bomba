declare module "types" {
  import { LayoutRectangle } from "react-native";

  export type LayoutItem = {
    ticket: Ticket;
    index: number;
    layout: LayoutRectangle;
  };

  export type Ticket = {
    litres: number;
    quantity: number;
  };
}
