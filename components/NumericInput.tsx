import { RefObject, useEffect, useRef, useState } from "react";
import { Keyboard, TextInput, TextInputProps } from "react-native";

export default function NumericInput({
  value = "",
  onBlur = () => {},
  ref,
  ...rest
}: Omit<TextInputProps, "onBlur"> & {
  onBlur?: (number: number) => void;
  ref?: RefObject<TextInput | null>;
}) {
  const _ref = ref || useRef<TextInput>(null);
  const [stateValue, setStateValue] = useState(value);

  useEffect(() => setStateValue(value), [value]);

  Keyboard.addListener("keyboardDidHide", () => _ref?.current?.blur());

  return (
    <TextInput
      ref={_ref}
      keyboardType="number-pad"
      onChangeText={(text) => setStateValue(text)}
      value={stateValue}
      onBlur={() => {
        const text = stateValue.replace(",", ".").trim();
        let number = parseFloat(text);

        if (text === "" || number === 0) {
          number = 1;
        } else if (isNaN(number)) {
          number = parseFloat(value);
        }
        onBlur(number);
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
      {...rest}
    />
  );
}
