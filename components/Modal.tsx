import { Button } from "@react-navigation/elements";
import { Modal as RNModal, Text, View } from "react-native";

type ModalProps = {
  visible: boolean;
  onAccept: () => void;
  onCancel: () => void;
  message: string;
};

export default function Modal({
  visible,
  onAccept,
  onCancel,
  message,
}: ModalProps) {
  return (
    <RNModal transparent visible={visible}>
      <View
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            width: 300,
            height: 140,
            alignItems: "center",
            gap: 20,
            paddingTop: 30,
          }}
        >
          <Text
            style={{
              color: "black",
              fontSize: 16,
              textAlign: "center",
              fontFamily: "sans-serif",
            }}
          >
            {message}
          </Text>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Button onPress={onAccept}>Aceptar</Button>
            <Button onPress={onCancel}>Cancelar</Button>
          </View>
        </View>
      </View>
    </RNModal>
  );
}
