import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
   GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,     
    }),
    // ...add more providers here
  ],
  secret: 4affa296ca40342521551b1851cfae5b,
}
export default NextAuth(authOptions)