/* eslint-disable @typescript-eslint/no-unused-vars */
import type { SettingUIData } from "@/pages/AsklyForm/components/SettingUIDrawer";
import { create } from "zustand";

type FormState = {
  config: SettingUIData;
}

type FormAction = {
  setConfig: (config: SettingUIData) => void
}

const useFormStore = create<FormState & FormAction>((set, get) => ({
  config: {
      title: {
        fontFamily: "nunito",
        fontWeight: "400",
        fontSize: "20",
      },
      question: {
        fontFamily: "nunito",
        fontWeight: "400",
        fontSize: "20",
      },
      text: {
        fontFamily: "nunito",
        fontWeight: "400",
        fontSize: "20",
      },
      color: "#db4437",
      bgColor: "#f8dad7",
    },
  setConfig: (config: SettingUIData) => set({config})
}))

export default useFormStore;