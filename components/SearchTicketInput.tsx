import { Button } from "@react-navigation/elements";
import { useState } from "react";
import { TextInput, View } from "react-native";

type SearchTicketInputProps = {
  onSearchTicket: (litres: number) => void;
};

export default function SearchTicketInput({
  onSearchTicket,
}: SearchTicketInputProps) {
  const [value, setValue] = useState("");

  const searchTicketHandler = (value: string) => {
    const litres = parseInt(value);
    if (isNaN(litres)) return;
    onSearchTicket(litres);
  };

  return (
    <View style={{ width: "100%", gap: 10 }}>
      <TextInput
        placeholderTextColor="black"
        placeholder="Buscar ticket por cantidad de litros..."
        keyboardType="number-pad"
        onChangeText={(text) => setValue(text)}
        value={value}
        onBlur={() => {
          const text = value.replace(",", ".").trim();
          let litres = parseFloat(text);

          if (text === "") {
            setValue("");
            return;
          }

          if (litres === 0 || isNaN(litres)) {
            setValue((prev) => {
              const value = isNaN(parseInt(prev)) ? "1" : prev;
              searchTicketHandler(value);
              return value;
            });
            return;
          }
          setValue(litres.toString());
          searchTicketHandler(litres.toString());
        }}
        style={{
          borderRadius: 10,
          color: "black",
          height: 45,
          width: "100%",
          borderWidth: 0.5,
          borderColor: "black",
          textAlign: "center",
          backgroundColor: "rgba(247, 246, 167,0.4)",
          fontFamily: "sans-serif",
        }}
      />
      <Button onPress={() => searchTicketHandler(value)}>Buscar</Button>
    </View>
  );
}
