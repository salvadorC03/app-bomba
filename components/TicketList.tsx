import { RefObject } from "react";
import { LayoutChangeEvent, ScrollView } from "react-native";
import { LayoutItem, Ticket } from "types";
import TicketItem from "./TicketItem";

type TicketListProps = {
  tickets: Ticket[];
  onEditTicket: (ticket: Ticket, index: number) => void;
  onDeleteTicket: (index: number) => void;
  scrollRef?: RefObject<ScrollView | null>;
  onItemLayout?: (item: LayoutItem) => void;
  onScrollLayout?: (event: LayoutChangeEvent) => void;
};

export default function TicketList({
  tickets,
  onEditTicket,
  onDeleteTicket,
  scrollRef,
  onItemLayout,
  onScrollLayout,
}: TicketListProps) {
  return (
    <ScrollView
      onLayout={onScrollLayout}
      ref={scrollRef}
      style={{ flexGrow: 1 }}
      contentContainerStyle={{
        gap: 25,
        flexGrow: 1,
      }}
    >
      {tickets.map((ticket, index) => (
        <TicketItem
          onLayout={(event) =>
            onItemLayout && index === 0 &&
            onItemLayout({ ticket, index, layout: event.nativeEvent.layout })
          }
          key={index + JSON.stringify(ticket)}
          ticket={ticket}
          index={index}
          onEditTicket={onEditTicket}
          onDeleteTicket={onDeleteTicket}
        />
      ))}
    </ScrollView>
  );
}
