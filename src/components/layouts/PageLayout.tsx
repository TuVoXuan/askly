import { Outlet } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function PageLayout() {
  return (
    <section className="flex flex-col h-screen">
      <div className="flex items-center justify-between py-3 px-5 border-b-px border-b">
        <h1 className="text-2xl font-semibold">Askly</h1>

        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <Outlet />
    </section>
  );
}
