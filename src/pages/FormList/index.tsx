import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TableForms from "./TableForms";

export default function FormList() {
  return (
    <section>
      <div className="flex items-center justify-between py-3 px-5 border-b-px border-b">
        <h1 className="text-2xl font-semibold">Askly</h1>

        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <TableForms />
    </section>
  );
}
