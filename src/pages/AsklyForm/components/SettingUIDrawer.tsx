import SelectColor from "@/components/SelectColor";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useGenerateSubColor from "@/hooks/color/useGenerateSubColor";
import useFormStore, { defaultValueConfig } from "@/store/FormStore";
import { yupResolver } from "@hookform/resolvers/yup";
import { cloneDeep, debounce } from "lodash";
import { Palette } from "lucide-react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import {
  FontFamily,
  FontSizeQuestion,
  FontSizeText,
  FontSizeTitle,
  FontWeights,
} from "./FakeData";

const ColorOptions = [
  "#db4437",
  "#673ab7",
  "#3f51b5",
  "#4285f4",
  "#03a9f4",
  "#00bcd4",
  "#ff5722",
  "#ff9800",
  "#009688",
  "#4caf50",
  "#607d8b",
  "#9e9e9e",
];

interface ISettingUIDrawer {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SettingUISchema = Yup.object().shape({
  title: Yup.object().shape({
    fontFamily: Yup.string().required("Font family is required."),
    fontWeight: Yup.string().required("Font weight is required."),
    fontSize: Yup.string().required("Font size is required."),
  }),
  question: Yup.object().shape({
    fontFamily: Yup.string().required("Font family is required."),
    fontWeight: Yup.string().required("Font weight is required."),
    fontSize: Yup.string().required("Font size is required."),
  }),
  text: Yup.object().shape({
    fontFamily: Yup.string().required("Font family is required."),
    fontWeight: Yup.string().required("Font weight is required."),
    fontSize: Yup.string().required("Font size is required."),
  }),
  color: Yup.string().required("Color is required."),
  bgColor: Yup.string().required("Background color is required."),
});

export type SettingUIData = Yup.InferType<typeof SettingUISchema>;

export default function SettingUIDrawer({
  open,
  onOpenChange,
}: ISettingUIDrawer) {
  const { setConfig } = useFormStore();
  const { control, handleSubmit, watch, setValue } = useForm({
    resolver: yupResolver(SettingUISchema),
    defaultValues: cloneDeep(defaultValueConfig),
  });
  const watchFormValue = watch();
  const subColors = useGenerateSubColor(watchFormValue.color);

  useEffect(() => {
    if (subColors.length > 0) {
      setValue("bgColor", subColors[0]);
    }
  }, [watchFormValue.color]);

  function onSubmit(data: SettingUIData) {
    setConfig(data);
  }

  const debounceSubmit = debounce(() => {
    handleSubmit(onSubmit)();
  }, 500);

  useEffect(() => {
    debounceSubmit();
    return () => debounceSubmit.cancel();
  }, [watchFormValue]);

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerContent>
        <DrawerHeader className="border-b">
          <DrawerTitle className="flex items-center gap-x-3">
            <Palette className="text-gray-500" /> User Interface
          </DrawerTitle>
          <DrawerDescription className="hidden"></DrawerDescription>
        </DrawerHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-4">
            <h3 className="text-[20px] font-medium">Text style</h3>

            <div className="space-y-2 mt-3">
              <Label>Title</Label>

              <div className="flex gap-x-2">
                <Controller
                  control={control}
                  name="title.fontFamily"
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => (
                    <div>
                      <Select value={value} onValueChange={onChange}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Font family" />
                        </SelectTrigger>
                        <SelectContent>
                          {FontFamily.map((font) => (
                            <SelectItem key={font.value} value={font.value}>
                              {font.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {error?.message && (
                        <p className="mt-1 text-xs text-red-400">
                          {error.message}
                        </p>
                      )}
                    </div>
                  )}
                />

                <Controller
                  control={control}
                  name="title.fontWeight"
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => (
                    <div>
                      <Select value={value} onValueChange={onChange}>
                        <SelectTrigger className="w-[100px]">
                          <SelectValue placeholder="Select a fruit" />
                        </SelectTrigger>
                        <SelectContent>
                          {FontWeights.map((weight) => (
                            <SelectItem key={weight.value} value={weight.value}>
                              {weight.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {error?.message && (
                        <p className="mt-1 text-xs text-red-400">
                          {error.message}
                        </p>
                      )}
                    </div>
                  )}
                />

                <Controller
                  control={control}
                  name="title.fontSize"
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => (
                    <div>
                      <Select value={value} onValueChange={onChange}>
                        <SelectTrigger className="w-[70px]">
                          <SelectValue placeholder="Select a fruit" />
                        </SelectTrigger>
                        <SelectContent>
                          {FontSizeTitle.map((size) => (
                            <SelectItem key={size.value} value={size.value}>
                              {size.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {error?.message && (
                        <p className="mt-1 text-xs text-red-400">
                          {error.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>

            <div className="space-y-2 mt-3">
              <Label>Question</Label>

              <div className="flex gap-x-2">
                <Controller
                  control={control}
                  name="question.fontFamily"
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => (
                    <div>
                      <Select value={value} onValueChange={onChange}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select a fruit" />
                        </SelectTrigger>
                        <SelectContent>
                          {FontFamily.map((font) => (
                            <SelectItem key={font.value} value={font.value}>
                              {font.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {error?.message && (
                        <p className="mt-1 text-xs text-red-400">
                          {error.message}
                        </p>
                      )}
                    </div>
                  )}
                />

                <Controller
                  control={control}
                  name="question.fontWeight"
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => (
                    <div>
                      <Select value={value} onValueChange={onChange}>
                        <SelectTrigger className="w-[100px]">
                          <SelectValue placeholder="Select a fruit" />
                        </SelectTrigger>
                        <SelectContent>
                          {FontWeights.map((weight) => (
                            <SelectItem key={weight.value} value={weight.value}>
                              {weight.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {error?.message && (
                        <p className="mt-1 text-xs text-red-400">
                          {error.message}
                        </p>
                      )}
                    </div>
                  )}
                />

                <Controller
                  control={control}
                  name="question.fontSize"
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => (
                    <div>
                      <Select value={value} onValueChange={onChange}>
                        <SelectTrigger className="w-[70px]">
                          <SelectValue placeholder="Select a fruit" />
                        </SelectTrigger>
                        <SelectContent>
                          {FontSizeQuestion.map((size) => (
                            <SelectItem key={size.value} value={size.value}>
                              {size.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {error?.message && (
                        <p className="mt-1 text-xs text-red-400">
                          {error.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>

            <div className="space-y-2 mt-3">
              <Label>Text</Label>

              <div className="flex gap-x-2">
                <Controller
                  control={control}
                  name="text.fontFamily"
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => (
                    <div>
                      <Select value={value} onValueChange={onChange}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select a fruit" />
                        </SelectTrigger>
                        <SelectContent>
                          {FontFamily.map((font) => (
                            <SelectItem key={font.value} value={font.value}>
                              {font.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {error?.message && (
                        <p className="mt-1 text-xs text-red-400">
                          {error.message}
                        </p>
                      )}
                    </div>
                  )}
                />

                <Controller
                  control={control}
                  name="text.fontWeight"
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => (
                    <div>
                      <Select value={value} onValueChange={onChange}>
                        <SelectTrigger className="w-[100px]">
                          <SelectValue placeholder="Select a fruit" />
                        </SelectTrigger>
                        <SelectContent>
                          {FontWeights.map((weight) => (
                            <SelectItem key={weight.value} value={weight.value}>
                              {weight.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {error?.message && (
                        <p className="mt-1 text-xs text-red-400">
                          {error.message}
                        </p>
                      )}
                    </div>
                  )}
                />

                <Controller
                  control={control}
                  name="text.fontSize"
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => (
                    <div>
                      <Select value={value} onValueChange={onChange}>
                        <SelectTrigger className="w-[70px]">
                          <SelectValue placeholder="Select a fruit" />
                        </SelectTrigger>
                        <SelectContent>
                          {FontSizeText.map((size) => (
                            <SelectItem key={size.value} value={size.value}>
                              {size.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {error?.message && (
                        <p className="mt-1 text-xs text-red-400">
                          {error.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="h-px w-full bg-muted"></div>

          <div className="p-4 space-y-3">
            <h3 className="text-[20px] font-medium">Color</h3>
            <Controller
              control={control}
              name="color"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <div>
                  <SelectColor
                    options={ColorOptions}
                    value={value}
                    onValueChange={onChange}
                  />
                  {error?.message && (
                    <p className="mt-1 text-xs text-red-400">{error.message}</p>
                  )}
                </div>
              )}
            />

            <div className="flex items-center gap-x-3">
              <span>Background</span>
              <Controller
                control={control}
                name="bgColor"
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <div>
                    <SelectColor
                      options={[...subColors, "#f6f6f6"]}
                      value={value}
                      onValueChange={onChange}
                    />
                    {error?.message && (
                      <p className="mt-1 text-xs text-red-400">
                        {error.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
          </div>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
