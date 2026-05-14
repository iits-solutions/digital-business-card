import { NextAuthOptions } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";

import bcrypt from "bcrypt";

import { PrismaAdapter } from "@auth/prisma-adapter";

import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {

  adapter: PrismaAdapter(prisma),

  session: {
    strategy: "jwt",
  },

  providers: [

    CredentialsProvider({

      name: "credentials",

      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {

        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
        where: {
        email: credentials.email as string,
        },

        include: {
        profile: true,
        },
      });

        if (!user) {
          return null;
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!passwordMatch) {
          return null;
        }

        return {
        id: user.id,
        email: user.email,
        name: user.profile?.fullName || "",
       };
       },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,
};