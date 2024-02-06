import { Dispatch, SetStateAction, useState } from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTab } from "@/hooks/useTab";

export function ModelCombox({
  setTab,
  models,
}: {
  setTab: Dispatch<SetStateAction<any>>;
  models: { label: string; value: string }[];
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const { handleBindTab } = useTab();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? models.find((framework) => framework.value === value)?.label
            : "Выберите модель"}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Поиск модели..." className="h-9" />
          <CommandEmpty>Ничего не найдено.</CommandEmpty>
          <CommandGroup>
            {models.map((model) => (
              <CommandItem
                key={model.value}
                value={model.value}
                onSelect={(currentValue: string) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                  handleBindTab({ value: currentValue, callback: setTab });
                }}
              >
                {model.label}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === model.value ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
