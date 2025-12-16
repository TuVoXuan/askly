import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ERoutePath } from "@/routes/route-path.enum";

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

type SignupFormValues = Yup.InferType<typeof SignupSchema>;

export default function Signup() {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(SignupSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: SignupFormValues) {
    console.log(data);
  }

  return (
    <section className="h-screen w-full flex items-center justify-center bg-gray-100">
      <div className="flex flex-col px-10 py-8 rounded-md bg-white shadow-sm">
        <h1 className="w-full text-center text-2xl font-semibold mb-4">
          Sign Up
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

          <Button className="w-full mt-2">Sign Up</Button>
        </form>

        <div className="text-black/50 text-sm text-center mt-4">
          If you have account :
          <Link
            to={`/${ERoutePath.SIGN_IN}`}
            className="text-blue-500 underline"
          >
            Sign In here
          </Link>
        </div>
      </div>
    </section>
  );
}
