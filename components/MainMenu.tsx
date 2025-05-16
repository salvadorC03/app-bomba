import { Button } from "@react-navigation/elements";
import { useMemo } from "react";
import { Text, View } from "react-native";
import { Ticket } from "types";
import DeleteButton from "./DeleteButton";
import SearchTicketInput from "./SearchTicketInput";

type MainMenuProps = {
  tickets: Ticket[];
  onAddTicket: () => void;
  onDeleteAllTickets: () => void;
  onSearchTicket: (litres: number) => void;
};

export default function MainMenu({
  tickets,
  onAddTicket,
  onDeleteAllTickets,
  onSearchTicket,
}: MainMenuProps) {
  const totalTickets = useMemo(
    () => tickets.reduce((value, ticket) => value + ticket.quantity, 0),
    [tickets]
  );
  const totalLitres = useMemo(
    () =>
      tickets.reduce(
        (value, ticket) => value + ticket.litres * ticket.quantity,
        0
      ),
    [tickets]
  );

  return (
    <>
      <View style={{ alignItems: "center", gap: 35, width: "100%" }}>
        <View style={{ gap: 3, alignItems: "center" }}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 20,
              color: "black",
              fontFamily: "sans-serif",
            }}
          >
            Total en litros: {totalLitres}lts.
          </Text>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 20,
              color: "black",
              fontFamily: "sans-serif",
            }}
          >
            Total en divisas: {totalLitres / 2}$.
          </Text>
        </View>
        <View style={{ width: "70%" }}>
          <SearchTicketInput onSearchTicket={onSearchTicket} />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <Button onPress={onAddTicket}>
          {`+ Agregar ticket (${totalTickets})`}
        </Button>
        <DeleteButton
          color="rgb(200,0,0)"
          onDelete={onDeleteAllTickets}
          title="Borrar todo"
          message="¿Seguro que desea borrar todos los tickets?"
        />
      </View>
    </>
  );
}
