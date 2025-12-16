/* eslint-disable @typescript-eslint/no-unused-vars */
import type { SettingUIData } from "@/pages/AsklyForm/components/SettingUIDrawer";
import { cloneDeep } from "lodash";
import { create } from "zustand";

export const defaultValueConfig: SettingUIData = {
  title: {
    fontFamily: "nunito",
    fontWeight: "600",
    fontSize: "24",
  },
  question: {
    fontFamily: "nunito",
    fontWeight: "400",
    fontSize: "12",
  },
  text: {
    fontFamily: "nunito",
    fontWeight: "400",
    fontSize: "11",
  },
  color: "#db4437",
  bgColor: "#f8dad7",
};

type FormState = {
  config: SettingUIData;
};

type FormAction = {
  setConfig: (config: SettingUIData) => void;
};

const useFormStore = create<FormState & FormAction>((set, get) => ({
  config: cloneDeep(defaultValueConfig),
  setConfig: (config: SettingUIData) => set({ config }),
}));

export default useFormStore;
