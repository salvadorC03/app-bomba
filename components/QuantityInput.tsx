import { useEffect, useState } from "react";
import { TextInput } from "react-native";
import { Ticket } from "types";

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
  const [value, setValue] = useState(ticket.quantity.toString());

  useEffect(() => setValue(ticket.quantity.toString()), [ticket]);

  return (
    <TextInput
      keyboardType="number-pad"
      onChangeText={(text) => setValue(text)}
      value={value}
      onBlur={() => {
        const text = value.replace(",", ".").trim();
        let quantity = parseInt(text);

        if (text === "" || quantity === 0) {
          quantity = 1;
        } else if (isNaN(quantity)) {
          quantity = ticket.quantity;
        }
        onEditTicket({ quantity, litres: ticket.litres }, index);
      }}
      style={{
        borderRadius: 10,
        color: "black",
        height: 45,
        width: "100%",
        textAlign: "center",
        borderWidth: 0.5,
        borderColor: "black",
        backgroundColor: "rgba(247, 246, 167,0.4)",
        fontFamily: "sans-serif",
      }}
    />
  );
}
