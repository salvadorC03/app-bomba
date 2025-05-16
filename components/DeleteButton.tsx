import { Button } from "@react-navigation/elements";
import { useState } from "react";
import Modal from "./Modal";

type DeleteButtonProps = {
  onDelete: () => void;
  message?: string;
  title?: string;
  color?: string;
};

export default function DeleteButton({
  onDelete,
  message,
  title,
  color,
}: DeleteButtonProps) {
  const [visible, setVisible] = useState(false);

  function deleteHandler() {
    setVisible(true);
  }

  const acceptHandler = () => {
    setTimeout(() => onDelete(), 100);
    setVisible(false);
  };

  const cancelHandler = () => {
    setVisible(false);
  };

  return (
    <>
      <Modal
        visible={visible}
        message={message || "¿Seguro que desea borrar este ticket?"}
        onAccept={acceptHandler}
        onCancel={cancelHandler}
      />
      <Button color={color || "red"} onPress={deleteHandler}>
        {title || "Borrar"}
      </Button>
    </>
  );
}
