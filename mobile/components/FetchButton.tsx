import { colors } from "@/constants/colors";
import { selectIsLoading } from "@/services/redux/app.selector";
import { Button } from "react-native-paper";
import { useSelector } from "react-redux";

interface Props {
  type: "ADD" | "EDIT";
  onPress: () => void;
}

export const FetchButton = ({ type, onPress }: Props) => {
  const isLoading = useSelector(selectIsLoading);
  const color = type === "ADD" ? colors.success : colors.info;
  const text = type === "ADD" ? "add" : "edit";
  const icon = type === "ADD" ? "plus" : "pencil";
  return (
    <Button
      contentStyle={{ backgroundColor: color }}
      disabled={isLoading}
      loading={isLoading}
      onPress={onPress}
      mode="contained"
      icon={icon}
    >
      {text}
    </Button>
  );
};
