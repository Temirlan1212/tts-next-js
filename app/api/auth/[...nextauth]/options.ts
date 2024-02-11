import CredentialsProvider from "next-auth/providers/credentials";
import { DefaultSession, NextAuthOptions } from "next-auth";
import { IUserCredentials, IUserRole } from "@/models/user";
import connectToDb from "@/lib/mongoose";
import { Role, User } from "@/lib/models/user.model";
import bcrypt from "bcrypt";
import { getServerMessageKey } from "@/helplers/server-messages";
import { setNewError } from "@/helplers/common";

declare module "next-auth" {
  interface User extends IUserCredentials {
    role?: string | null;
  }
}

declare module "next-auth" {
  interface Session {
    user?: {
      username?: string | null;
      email?: string | null;
      role?: IUserRole;
    } & DefaultSession["user"];
  }
}

const setServerErrors = (errors: Record<string, any>) => {
  setNewError(JSON.stringify(errors));
};

const userNotFound = {
  email: getServerMessageKey("userNotFound"),
  username: getServerMessageKey("userNotFound"),
};

const usernameNotFound = {
  username: getServerMessageKey("userNotFound"),
};

const emailNotFound = {
  email: getServerMessageKey("userNotFound"),
};

const passwordNotFound = {
  password: getServerMessageKey("wrongPassword"),
};

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
        },
        email: {
          label: "Username",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        const { password, email, username } = credentials as any;
        await connectToDb();

        try {
          const user: any = await User.findOne({
            $or: [{ email }, { username }],
          });
          // if (!user) setServerErrors(userNotFound);
          // if (user.email === email && user.username === username) {
          //   setServerErrors(userNotFound);
          // }
          // if (user.email === email) setServerErrors(usernameNotFound);
          // if (user.username === username) setServerErrors(emailNotFound);

          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              password,
              user.password
            );

            if (isPasswordCorrect) {
              return user;
            } else {
              setServerErrors(passwordNotFound);
            }
          } else {
            setServerErrors(userNotFound);
          }
        } catch (error: any) {
          setNewError(error);
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      let role = null;

      try {
        role = await Role.findOne({
          _id: user.role,
        });
      } catch (error) {}

      if (user) {
        token.username = user.username;
        token.email = user.email;
        token.role = role ?? user.role ?? "";
      }

      return Promise.resolve(token);
    },
    async session({ session, token, user }) {
      session.user = token;
      return Promise.resolve(session);
    },
  },
  session: {
    maxAge: 60 * 60 * 24,
  },
  pages: {
    signIn: "/signin",
  },
};
