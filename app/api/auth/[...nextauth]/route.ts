import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { verifyUserCredentials } from "@/lib/server/auth";
import { z } from "zod";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

const providers = [
  Credentials({
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) {
          return null;
        }
        if (!process.env.DATABASE_URL) {
          return {
            id: "demo-user",
            email: parsed.data.email,
            name: "Demo User",
            role: "ENTREPRENEUR"
          } as any;
        }
        const user = await verifyUserCredentials(parsed.data.email, parsed.data.password);
        if (!user) {
          return null;
        }
        return {
          id: user.id,
          email: user.email,
          name: user.full_name ?? user.email,
          role: user.role
        } as any;
      }
    })
];

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  );
}

const handler = NextAuth({
  providers,
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role ?? token.role ?? "USER";
        token.sub = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
        session.user.role = (token as any).role ?? "USER";
      }
      return session;
    }
  }
});

export { handler as GET, handler as POST };
