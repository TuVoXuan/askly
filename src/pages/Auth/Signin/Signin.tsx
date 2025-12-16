import Icons from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ERoutePath } from "@/routes/route-path.enum";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const SigninSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  rememberMe: Yup.boolean(),
});

type SigninFormValues = Yup.InferType<typeof SigninSchema>;

export default function Signin() {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(SigninSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  function onSubmit(data: SigninFormValues) {
    console.log(data);
  }

  return (
    <section className="h-screen w-full flex items-center justify-center bg-gray-100">
      <div className="flex flex-col px-10 py-8 rounded-md bg-white shadow-sm">
        <h1 className="w-full text-center text-2xl font-semibold mb-4">
          Sign In
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <div className="flex flex-col gap-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={value}
                  onChange={onChange}
                  type="email"
                  placeholder="Enter your email"
                  className="w-[300px]"
                  helperText={error ? error.message : undefined}
                />
              </div>
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <div className="flex flex-col gap-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  value={value}
                  onChange={onChange}
                  type="password"
                  placeholder="Enter your password"
                  className="w-[300px]"
                  helperText={error ? error.message : undefined}
                />
              </div>
            )}
          />

          <Controller
            control={control}
            name="rememberMe"
            render={({ field: { value, onChange } }) => (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={value}
                  onCheckedChange={onChange}
                />
                <Label htmlFor="terms" className="font-normal">
                  Remember me
                </Label>
              </div>
            )}
          />

          <Button className="w-full mt-2">Sign In</Button>
        </form>

        <div className="flex items-center gap-x-2 mt-5">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <div className="flex w-full justify-center mt-5">
          <Button
            size={"icon-lg"}
            variant={"ghost"}
            className="rounded-full p-7 cursor-pointer"
          >
            <Icons.Google className="size-10" />
          </Button>
        </div>

        <div className="text-black/50 text-sm text-center mt-4">
          If you don't have account :
          <Link
            to={`/${ERoutePath.SIGN_UP}`}
            className="text-blue-500 underline"
          >
            Sign up here
          </Link>
        </div>
      </div>
    </section>
  );
}
