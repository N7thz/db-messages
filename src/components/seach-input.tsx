import { ArrowRightIcon, SearchIcon } from "lucide-react";
import { useId } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const SearchInput = () => {

  const id = useId();

  return (
    <div className="relative">
      <Input
        className="peer ps-9 pe-9 rounded-full"
        id={id}
        placeholder="Pesquisar mensagens..."
        type="search"
      />
      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
        <SearchIcon size={16} />
      </div>
    </div>
  )
}
