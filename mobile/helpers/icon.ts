import { colors } from "@/constants/colors";
import { Task } from "./backend";

export const getIconBasedOnStatus = (status: Task["status"]) => {
  if (status === "IN_PROGRESS") {
    return {
      color: colors.success,
      icon: "checkbox-marked-circle-outline",
    };
  }
  if (status === "TO_DO") {
    return {
      color: colors.info,
      icon: "checkbox-blank-circle-outline",
    };
  }
  return {
    color: colors.black,
    icon: "checkbox-blank-circle",
  };
};
