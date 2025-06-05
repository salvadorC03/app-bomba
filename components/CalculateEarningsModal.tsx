import { Button } from "@react-navigation/elements";
import { useEffect, useRef, useState } from "react";
import { Text, TextInput, View } from "react-native";
import Modal from "./Modal";
import NumericInput from "./NumericInput";

type CalculateEarningsModalProps = {
  totalLitres: number;
  onCancel?: () => void;
  visible?: boolean;
};

const initialSlides = [
  {
    title: "Introducir cantidad de efectivo en divisas:",
    value: 0,
  },
  {
    title: "Introducir cantidad de efectivo en bolívares:",
    value: 0,
  },
  {
    title: "Introducir tasa del dólar oficial BCV:",
    value: 0,
  },
];

export default function CalculateEarningsModal({
  totalLitres,
  onCancel = () => {},
  visible,
}: CalculateEarningsModalProps) {
  const [index, setIndex] = useState(0);
  const [slides, setSlides] = useState(initialSlides);
  const ref = useRef<TextInput>(null);

  const [currentValue, setCurrentValue] = useState("");

  const enterInputHandler = () => {
    if (index >= slides.length) {
      return onCancel();
    }

    if (ref.current?.isFocused()) {
      ref.current.blur()
      return
    }

    if (isNaN(parseFloat(currentValue)) || parseFloat(currentValue) === 0)
      return;

    setSlides((prev) => {
      const newSlides = [...prev];
      newSlides[index].value = parseFloat(currentValue);

      return newSlides;
    });
    setIndex((prev) => {
      const newValue = prev + 1;
      setCurrentValue("");
      return newValue;
    });
  };

  useEffect(() => {
    setSlides(initialSlides);
    setIndex(0);
    setCurrentValue("");
  }, [visible]);

  return (
    <Modal visible={visible}>
      <View
        style={{
          gap: 20,
          backgroundColor: "white",
          width: "90%",
          height: "auto",
          alignItems: "center",
          padding: 30,
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
            color: "black",
            fontFamily: "sans-serif",
            textAlign: "center",
          }}
        >
          {slides.at(index)?.title || (
            <View style={{ gap: 30 }}>
              <View style={{ flexDirection: "row", gap: 5 }}>
                <Text style={{ fontWeight: "bold", fontFamily: "sans-serif" }}>
                  Tasa del dólar oficial BCV:
                </Text>
                <Text>{slides[2].value}Bs.</Text>
              </View>
              <View style={{ gap: 10 }}>
                <Text style={{ fontWeight: "bold", fontFamily: "sans-serif" }}>
                  Ventas por punto/biopago:
                </Text>
                <Text style={{ fontFamily: "sans-serif" }}>
                  Litros surtidos: {totalLitres}lts.
                </Text>
                <Text style={{ fontFamily: "sans-serif" }}>
                  Equivalente en divisas: {totalLitres / 2}$
                </Text>
                <Text style={{ fontFamily: "sans-serif" }}>
                  Equivalente en bolívares:{" "}
                  {(totalLitres / 2) * slides[2].value}
                  Bs.
                </Text>
              </View>
              <View style={{ gap: 10 }}>
                <Text style={{ fontWeight: "bold", fontFamily: "sans-serif" }}>
                  Efectivo generado en divisas:
                </Text>
                <Text style={{ fontFamily: "sans-serif" }}>
                  Total: {slides[0].value}$
                </Text>
                <Text style={{ fontFamily: "sans-serif" }}>
                  Litros surtidos: {slides[0].value * 2}lts.
                </Text>
                <Text style={{ fontFamily: "sans-serif" }}>
                  Equivalente en bolívares: {slides[0].value * slides[2].value}
                  Bs.
                </Text>
              </View>
              <View style={{ gap: 10 }}>
                <Text style={{ fontWeight: "bold", fontFamily: "sans-serif" }}>
                  Efectivo generado en bolívares:
                </Text>
                <Text style={{ fontFamily: "sans-serif" }}>
                  Total: {slides[1].value}Bs.
                </Text>
                <Text style={{ fontFamily: "sans-serif" }}>
                  Litros surtidos: {(slides[1].value / slides[2].value) * 2}lts.
                </Text>
                <Text style={{ fontFamily: "sans-serif" }}>
                  Equivalente en divisas: {slides[1].value / slides[2].value}$
                </Text>
              </View>
              <View style={{ gap: 10 }}>
                <Text style={{ fontWeight: "bold", fontFamily: "sans-serif" }}>
                  Resumen:
                </Text>
                <Text style={{ fontFamily: "sans-serif" }}>
                  Total de litros surtidos:{" "}
                  {totalLitres +
                    slides[0].value * 2 +
                    (slides[1].value / slides[2].value) * 2}
                  lts.
                </Text>
                <Text style={{ fontFamily: "sans-serif" }}>
                  Equivalente en divisas:{" "}
                  {totalLitres / 2 +
                    slides[0].value +
                    slides[1].value / slides[2].value}
                  $
                </Text>
                <Text style={{ fontFamily: "sans-serif" }}>
                  Equivalente en bolívares:{" "}
                  {totalLitres * slides[2].value +
                    slides[0].value * slides[2].value +
                    slides[1].value}
                  Bs.
                </Text>
              </View>
            </View>
          )}
        </Text>
        {index < slides.length && (
          <NumericInput
            ref={ref}
            onBlur={(value) => setCurrentValue(value.toString())}
            value={currentValue.toString()}
          />
        )}
        <View
          style={{
            width: "100%",
            justifyContent: "space-evenly",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Button onPress={enterInputHandler}>
            {index < slides.length ? "Siguiente" : "Aceptar"}
          </Button>
          {index < slides.length && (
            <Button onPress={onCancel}>Cancelar</Button>
          )}
        </View>
      </View>
    </Modal>
  );
}
