import { Button } from "@/components/ui/button";
import PageItem from "./PageItem";
import CustomField from "./CustomField";
import * as Yup from "yup";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const initialCustomFieldValue = {
  question: "",
  isRequired: false,
  fieldType: "",
};

const AsklyFormSchema = Yup.object().shape({
  customFields: Yup.array().of(
    Yup.object().shape({
      question: Yup.string().required("Question is required!"),
      isRequired: Yup.boolean(),
      fieldType: Yup.string().required("Field type is required!"),
      min: Yup.number(),
      max: Yup.number().when(
        ["fieldType", "min"],
        ([fieldType, min], schema) => {
          return min && fieldType === "number"
            ? schema.min(min, `Max value must be less than ${min}`)
            : schema;
        }
      ),
      isDependOn: Yup.string(),
      compare: Yup.string().when("isDependOn", ([isDependOn], schema) => {
        return isDependOn ? schema.required() : schema;
      }),
      minLength: Yup.number(),
      maxLength: Yup.number().when(
        ["fieldType, minLength"],
        ([fieldType, minLength], schema) => {
          return fieldType === "string" && minLength
            ? schema.min(
                minLength,
                `Max Length value must greater than ${minLength}`
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
  ),
});

type AsklyFormDataType = Yup.InferType<typeof AsklyFormSchema>;

export default function AsklyForm() {
  const { control, handleSubmit, watch } = useForm({
    resolver: yupResolver(AsklyFormSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "customFields",
  });

  function handleAppendCustomField() {
    append(initialCustomFieldValue);
  }

  function onSubmit(data: AsklyFormDataType) {
    console.log("data: ", data);
  }

  return (
    <div className="flex h-[calc(100%-57px)] ">
      <div className="flex flex-col border-r">
        <div className="flex-1 p-4 space-y-2 overflow-y-auto">
          <div className="flex items-center flex-col">
            <PageItem />
            <span>Page 1</span>
          </div>
        </div>
        <div className="flex items-center justify-between p-4">
          <Button
            size={"sm"}
            variant={"outline"}
            onClick={handleSubmit(onSubmit)}
          >
            Save
          </Button>
          <Button size={"sm"} variant={"outline"}>
            Publish
          </Button>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        <Button variant={"outline"} onClick={handleAppendCustomField}>
          Add Field
        </Button>
        {fields.map((item, index) => (
          <CustomField
            key={item.id}
            control={control}
            watch={watch}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
