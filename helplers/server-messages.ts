import { SERVER_MESSAGES } from "@/lib/server-messages";

export const getServerMessageKey = (
  searchedKey: keyof typeof SERVER_MESSAGES
) => {
  return Object.keys(SERVER_MESSAGES).find(
    (key) =>
      SERVER_MESSAGES[key as keyof typeof SERVER_MESSAGES] ===
      SERVER_MESSAGES[searchedKey]
  );
};

export const getServerMessage = (
  value: keyof typeof SERVER_MESSAGES
): string | null => {
  return SERVER_MESSAGES?.[value] ?? null;
};
