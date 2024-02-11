import { getServerMessage } from "@/helplers/server-messages";
import { signIn } from "next-auth/react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { UseFormReset, UseFormSetError } from "react-hook-form";
import { IUserFormSchema } from "./form-schema";

interface IAuthProps {
  credentials: IUserFormSchema;
  options: {
    setError: UseFormSetError<any>;
    reset: UseFormReset<any>;
    router: AppRouterInstance;
  };
}

export const authentication = async (props: IAuthProps) => {
  const { email, username, password } = props.credentials;
  const { setError, reset, router } = props.options;

  const credentials = { email, username, password };
  const res = await signIn("credentials", { ...credentials, redirect: false });

  if (!res?.ok && res?.error) {
    let errors: Record<string, any> | null = null;
    try {
      errors = JSON?.parse(res?.error ?? "");
    } catch (error) {}

    if (errors != null) {
      Object.keys(errors)?.map((key) => {
        const message = getServerMessage(errors?.[key]);
        setError(key, { message: message ?? "" });
      });
    }
  } else {
    reset();
    router.push("/");
    router.refresh();
  }
};
