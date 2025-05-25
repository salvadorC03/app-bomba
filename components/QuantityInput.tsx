import { Ticket } from "types";
import NumericInput from "./NumericInput";

type QuantityInputProps = {
  ticket: Ticket;
  index: number;
  onEditTicket: (ticket: Ticket, index: number) => void;
};

export default function QuantityInput({
  ticket,
  index,
  onEditTicket,
}: QuantityInputProps) {
  const blurInputHandler = (value: number) => {
    onEditTicket({ ...ticket, quantity: value }, index);
  };

  return (
    <NumericInput
      value={ticket.quantity.toString()}
      onBlur={blurInputHandler}
    />
  );
}
