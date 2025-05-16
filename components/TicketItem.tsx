import { LayoutChangeEvent, Text, View } from "react-native";
import { Ticket } from "types";
import DeleteButton from "./DeleteButton";
import LitresInput from "./LitresInput";
import QuantityInput from "./QuantityInput";

type TicketItemProps = {
  ticket: Ticket;
  index: number;
  onEditTicket: (ticket: Ticket, index: number) => void;
  onDeleteTicket: (index: number) => void;
  onLayout?: (event: LayoutChangeEvent) => void;
};

export default function TicketItem({
  ticket,
  index,
  onEditTicket,
  onDeleteTicket,
  onLayout,
}: TicketItemProps) {
  return (
    <View
      onLayout={onLayout}
      style={{ alignItems: "center", marginHorizontal: 30, gap: 3 }}
    >
      <View
        style={{
          gap: 3,
          flexDirection: "row",
          backgroundColor: "white",
          width: "100%",
        }}
      >
        <View
          style={{
            borderRadius: 10,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            alignItems: "center",
            gap: 5,
            width: "50%",
            borderWidth: 1,
            borderColor: "black",
            paddingHorizontal: 5,
            paddingVertical: 6,
          }}
        >
          <Text
            style={{
              color: "black",
              fontSize: 16,
              fontFamily: "sans-serif",
            }}
          >
            Cantidad
          </Text>
          <QuantityInput
            index={index}
            ticket={ticket}
            onEditTicket={onEditTicket}
          />
        </View>
        <View
          style={{
            borderRadius: 10,
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            gap: 5,
            alignItems: "center",
            width: "50%",
            borderWidth: 1,
            borderColor: "black",
            paddingHorizontal: 5,
            paddingVertical: 6,
          }}
        >
          <Text
            style={{
              color: "black",
              fontSize: 16,
              fontFamily: "sans-serif",
            }}
          >
            Litros
          </Text>
          <LitresInput
            ticket={ticket}
            index={index}
            onEditTicket={onEditTicket}
          />
        </View>
      </View>
      <View style={{ width: "100%" }}>
        <DeleteButton onDelete={() => onDeleteTicket(index)} />
      </View>
    </View>
  );
}
