import { Button } from "@react-navigation/elements";
import { ReactNode } from "react";
import {
  Modal as RNModal,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from "react-native";

type ModalProps = {
  visible?: boolean;
  onAccept?: () => void;
  onCancel?: () => void;
  message?: string;
  children?: ReactNode;
  rootStyles?: StyleProp<ViewStyle>;
};

export default function Modal({
  visible = false,
  onAccept = () => {},
  onCancel = () => {},
  message = "",
  children,
  rootStyles,
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
        {children || (
          <View
            style={{
              backgroundColor: "white",
              width: "70%",
              height: "auto",
              alignItems: "center",
              gap: 20,
              padding: 30,
              ...(rootStyles as Object),
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
        )}
      </View>
    </RNModal>
  );
}
