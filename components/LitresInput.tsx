import { Ticket } from "types";
import NumericInput from "./NumericInput";

type LitresInputProps = {
  ticket: Ticket;
  index: number;
  onEditTicket: (ticket: Ticket, index: number) => void;
};

export default function LitresInput({
  ticket,
  index,
  onEditTicket,
}: LitresInputProps) {
  const blurInputHandler = (value: number) => {
    onEditTicket({ ...ticket, litres: value }, index);
  };

  return (
    <NumericInput value={ticket.litres.toString()} onBlur={blurInputHandler} />
  );
}
