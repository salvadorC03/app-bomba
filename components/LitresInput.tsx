import { useEffect, useState } from "react";
import { TextInput } from "react-native";
import { Ticket } from "types";

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
  const [value, setValue] = useState(ticket.litres.toString());

  useEffect(() => setValue(ticket.litres.toString()), [ticket]);

  return (
    <TextInput
      keyboardType="number-pad"
      onChangeText={(text) => setValue(text)}
      value={value}
      onBlur={() => {
        const text = value.replace(",", ".").trim();
        let litres = parseFloat(text);

        if (text === "" || litres === 0) {
          litres = 1;
        } else if (isNaN(litres)) {
          litres = ticket.litres;
        }
        onEditTicket({ litres, quantity: ticket.quantity }, index);
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
        fontFamily: "sans-serif"
      }}
    />
  );
}
