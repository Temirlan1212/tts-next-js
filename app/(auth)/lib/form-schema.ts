import * as z from "zod";

const emailSchema = z.union([z.literal(""), z.string().email()]);

enum MinMax {
  passwordMin = 2,
  passwordMax = 50,
  usernameMin = 2,
  usernameMax = 50,
}

export const userFormSchema = z.object({
  password: z
    .string()
    .min(
      MinMax.passwordMin,
      `Строка должна содержать не менее ${MinMax.passwordMin} символов`
    )
    .max(
      MinMax.passwordMax,
      `Строка должна содержать не более ${MinMax.passwordMax} символов`
    ),
  username: z
    .string()
    .min(
      MinMax.usernameMin,
      `Строка должна содержать не менее ${MinMax.usernameMin} символов`
    )
    .max(
      MinMax.usernameMax,
      `Строка должна содержать не более ${MinMax.usernameMax} символов`
    ),
  email: emailSchema,
});

export type IUserFormSchema = z.infer<typeof userFormSchema>;
