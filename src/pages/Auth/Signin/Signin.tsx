import Icons from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ERoutePath } from "@/routes/route-path.enum";
import { Link } from "react-router-dom";

export default function Signin() {
  return (
    <section className="h-screen w-full flex items-center justify-center bg-gray-100">
      <div className="flex flex-col px-10 py-8 rounded-md bg-white shadow-sm">
        <h1 className="w-full text-center text-2xl font-semibold mb-4">
          Sign In
        </h1>

        <form className="space-y-4">
          <div className="flex flex-col gap-y-2">
            <label>Email</label>
            <Input
              type="email"
              placeholder="Enter your email"
              className="w-[300px]"
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <label>Password</label>
            <Input
              type="password"
              placeholder="Enter your password"
              className="w-[300px]"
            />
          </div>

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
          If you don't have account :{" "}
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
