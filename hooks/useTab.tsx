import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

export const useTab = () => {
  const router = useRouter();

  const handleBindTab = ({
    value,
    callback,
  }: {
    value: string;
    callback: Dispatch<SetStateAction<any>>;
  }) => {
    callback(value);
    setTab(value);
  };

  const setTab = (value: string) => {
    router.push(`#${value}`);
  };

  return { handleBindTab, setTab };
};
