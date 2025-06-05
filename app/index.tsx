import MainMenu from "@/components/MainMenu";
import TicketList from "@/components/TicketList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LayoutItem, Ticket } from "types";

export default function Index() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [initialLoad, setInitialLoad] = useState(true);
  const scrollRef = useRef<ScrollView>(null);
  const [layoutItem, setLayoutItem] = useState<null | LayoutItem>(null);

  const onLayout = (item: LayoutItem) => setLayoutItem(item);

  useEffect(() => console.log("layout", layoutItem), [layoutItem]);

  useEffect(() => {
    new Promise(async () => {
      const storedTickets = await AsyncStorage.getItem("tickets", (error) => {
        if (error)
          console.error("An error ocurred while retrieving tickets:", error);
      });
      if (storedTickets) {
        setTickets(JSON.parse(storedTickets));
      }
      setInitialLoad(false);
    });
  }, []);

  useEffect(() => {
    if (initialLoad) return;
    const timeout = setTimeout(() => {
      AsyncStorage.setItem("tickets", JSON.stringify(tickets), (error) => {
        if (error) {
          console.error("An error ocurred while storing tickets:", error);
        }
      });
    }, 1000);
    return () => clearTimeout(timeout);
  }, [tickets]);

  function searchTicketHandler(litres: number) {
    if (!layoutItem) return;
    const ticketIndex = tickets.findIndex((ticket) => ticket.litres === litres);
    if (ticketIndex < 0) return;
    scrollRef?.current?.scrollTo({ y: layoutItem.layout.height * ticketIndex });
  }

  function addTicketHandler() {
    setTickets((prev) => {
      return [...prev, { litres: 1, quantity: 1 }];
    });
    setTimeout(() => scrollRef?.current?.scrollToEnd(), 200);
  }

  const editTicketHandler = useCallback(
    (ticket: Ticket, i: number) => {
      setTickets((prev) => {
        let newTickets = [...prev];

        newTickets[i] = { ...ticket };
        return newTickets.filter((ticket) => ticket !== null);
      });
    },
    [tickets, setTickets]
  );

  function deleteTicketHandler(i: number) {
    setTickets((prev) => prev.filter((_, index) => index !== i));
  }

  function deleteAllTicketsHandler() {
    setTickets([]);
  }

  return (
    <SafeAreaProvider style={{ position: "relative" }}>
      <View
        style={{
          marginTop: 15,
          width: "100%",
          height: "100%",
          gap: 40,
          alignItems: "center",
          paddingBottom: 70,
        }}
      >
        <MainMenu
          onSearchTicket={searchTicketHandler}
          tickets={tickets}
          onAddTicket={addTicketHandler}
          onDeleteAllTickets={deleteAllTicketsHandler}
        />

        <TicketList
          onItemLayout={onLayout}
          scrollRef={scrollRef}
          tickets={tickets}
          onEditTicket={editTicketHandler}
          onDeleteTicket={deleteTicketHandler}
        />
      </View>
    </SafeAreaProvider>
  );
}
