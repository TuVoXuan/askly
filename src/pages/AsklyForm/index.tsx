/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EItemField } from "@/types/enum";
import { yupResolver } from "@hookform/resolvers/yup";
import { Plus } from "lucide-react";
import { useState } from "react";
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
} from "react-hook-form";
import * as Yup from "yup";
import ItemFieldList from "./components/ItemFieldList";
import PageItem from "./components/PageItem";

const AsklyFormSchema = Yup.object().shape({
  name: Yup.string().required("Title of form is required."),
  description: Yup.string(),
  pages: Yup.array()
    .of(
      Yup.object().shape({
        itemFields: Yup.array()
          .of(
            Yup.object().shape({
              type: Yup.string()
                .oneOf(Object.values(EItemField), "Invalid enum type")
                .required(),
              customField: Yup.object()
                .shape({
                  question: Yup.string().required("Question is required!"),
                  isRequired: Yup.boolean(),
                  fieldType: Yup.string().required("Field type is required!"),
                  image: Yup.mixed()
                    .optional()
                    .test(
                      "fileType",
                      "Unsupported File Format",
                      (value: any) => {
                        if (!value) return true; // Skip validation if no file is provided
                        const supportedFormats = [
                          "image/jpg",
                          "image/jpeg",
                          "image/png",
                          "image/gif",
                        ];
                        return supportedFormats.includes(value?.type);
                      }
                    )
                    .test(
                      "fileSize",
                      "File size is too large",
                      (value: any) => {
                        if (!value) return true; // Skip validation if no file is provided
                        const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
                        return value?.size <= maxSizeInBytes;
                      }
                    ),
                  min: Yup.number(),
                  max: Yup.number().when(
                    ["fieldType", "min"],
                    ([fieldType, min], schema) => {
                      return min && fieldType === "number"
                        ? schema.min(
                            min,
                            `Max value must be greater than ${min}`
                          )
                        : schema;
                    }
                  ),
                  minLength: Yup.number(),
                  maxLength: Yup.number().when(
                    ["fieldType", "minLength"],
                    ([fieldType, minLength], schema) => {
                      return minLength && fieldType === "string"
                        ? schema.min(
                            minLength,
                            `Max length must be greater than ${minLength}`
                          )
                        : schema;
                    }
                  ),
                  length: Yup.number(),
                  listOptions: Yup.string(),
                  maxSelectedItems: Yup.number(),
                  format: Yup.string(),
                  isMultipleFiles: Yup.boolean(),
                  maxFileSize: Yup.number(),
                })
                .when("type", {
                  is: EItemField.CUSTOM_FIELD,
                  then: (schema) => schema,
                  otherwise: (schema) => schema.strip(),
                })
                .optional(),
              titleField: Yup.object()
                .shape({
                  title: Yup.string().required("Title is required."),
                  description: Yup.string(),
                })
                .when("type", {
                  is: EItemField.TITLE_FIELD,
                  then: (schema) => schema,
                  otherwise: (schema) => schema.strip(),
                })
                .optional(),
            })
          )
          .min(1, "Page must have at least 1 field.")
          .required("Custom fields are required."),
      })
    )
    .min(1, "Form must be has 1 page.")
    .required("Page must be required."),
});

type AsklyFormDataType = Yup.InferType<typeof AsklyFormSchema>;

export default function AsklyForm() {
  const [activePageIndex, setActivePageIndex] = useState<number>(0);
  const [activeItemField, setActiveItemField] = useState<string>();

  const methods = useForm({
    resolver: yupResolver(AsklyFormSchema),
    defaultValues: {
      pages: [
        {
          itemFields: [
            {
              type: EItemField.CUSTOM_FIELD,
              customField: {
                question: "",
                isRequired: false,
                fieldType: "",
              },
            },
          ],
        },
      ],
    },
  });

  const {
    fields: pageFields,
    append: appendPage,
    remove: removePage,
  } = useFieldArray({
    control: methods.control,
    name: "pages",
  });

  function handleAppendPage() {
    appendPage({
      itemFields: [
        {
          type: EItemField.CUSTOM_FIELD,
          customField: {
            question: "",
            isRequired: false,
            fieldType: "",
          },
        },
      ],
    });
    setActivePageIndex((prev) => prev + 1);
  }

  function onSubmit(data: AsklyFormDataType) {
    console.log("data: ", data);
  }

  return (
    <div className="flex h-[calc(100%-57px)] ">
      <div className="flex flex-col border-r">
        <div className="flex-1 p-4 space-y-2 overflow-y-auto">
          <div className="flex items-center flex-col gap-y-3">
            {pageFields.map((page, index) => (
              <PageItem
                key={page.id}
                active={index === activePageIndex}
                onClick={() => setActivePageIndex(index)}
                showDelete={pageFields.length > 1}
                onClickDelete={() => removePage(index)}
                hasError={Boolean(
                  methods.formState.errors.pages &&
                    methods.formState.errors.pages[index]
                )}
              >
                Page {index + 1}
              </PageItem>
            ))}

            <Button
              className="w-full"
              variant={"outline"}
              onClick={handleAppendPage}
            >
              <Plus className="size-4" /> Add New Page
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between p-4">
          <Button
            size={"sm"}
            variant={"outline"}
            onClick={methods.handleSubmit(onSubmit)}
          >
            Save
          </Button>
          <Button size={"sm"} variant={"outline"}>
            Publish
          </Button>
        </div>
      </div>
      <FormProvider {...methods}>
        <div className="flex-1 p-4 space-y-3 overflow-y-auto">
          {activePageIndex === 0 && (
            <div className="p-4 rounded-sm border w-[800px] space-y-3">
              <Controller
                control={methods.control}
                name="name"
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <Input
                    className="text-4xl! py-8!"
                    placeholder="Form doesn't have title..."
                    value={value}
                    onChange={onChange}
                    helperText={error?.message}
                  />
                )}
              />

              <Controller
                control={methods.control}
                name="description"
                render={({ field: { value, onChange } }) => (
                  <Textarea
                    placeholder="Form description..."
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </div>
          )}
          {pageFields.map((page, index) => (
            <ItemFieldList
              key={page.id}
              pageIndex={index}
              show={index === activePageIndex}
              onSetActiveItemField={setActiveItemField}
              activeItemField={activeItemField}
            />
          ))}
        </div>
      </FormProvider>
    </div>
  );
}
