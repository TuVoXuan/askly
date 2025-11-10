import { Button } from "@/components/ui/button";
import PageItem from "./PageItem";
import CustomField from "./CustomField";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const AsklyFormSchema = Yup.object().shape({
  customFields: Yup.array().of(
    Yup.object().shape({
      question: Yup.string().required("Question is required!"),
      isRequired: Yup.boolean(),
      fieldType: Yup.string().required("Field type is required!"),
      min: Yup.number().when(
        ["fieldType", "max"],
        ([fieldType, max], schema) => {
          return fieldType && max && fieldType === "number"
            ? schema.max(max, `Min value must be less than ${max}`)
            : schema;
        }
      ),
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
      minLength: Yup.number().when(
        ["fieldType", "maxLength"],
        ([fieldType, maxLength], schema) => {
          return fieldType === "string" && maxLength
            ? schema.max(
                maxLength,
                `Min Length value must lest than ${maxLength}`
              )
            : schema;
        }
      ),
      maxLength: Yup.number(),
      length: Yup.number(),
      listOption: Yup.string(),
      format: Yup.string(),
      isMultipleFiles: Yup.boolean(),
      maxFileSize: Yup.number(),
    })
  ),
});

type AsklyFormDataType = Yup.InferType<typeof AsklyFormSchema>;

export default function AsklyForm() {
  const {} = useForm({
    resolver: yupResolver(AsklyFormSchema),
  });

  return (
    <div className="flex flex-1 w-full">
      <div className="shrink-0 p-4 border-r space-y-2">
        <div className="flex items-center flex-col">
          <PageItem />
          <span>Page 1</span>
        </div>
      </div>
      <div className="flex-1 p-4 space-y-3">
        <Button variant={"outline"}>Add Field</Button>
        <CustomField />
      </div>
    </div>
  );
}
