import NextAuth from 'next-auth'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import EmailProvider from 'next-auth/providers/email'
import clientPromise from '../../../lib/mongodb'

export default NextAuth({
  // For more information on each option (and a full list of options) go to
  // https://next-auth.js.org/configuration/options
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt' // overwrite 'database' which is the default when using an adapter
    // maxAge: 30 * 24 * 60 * 60, // seconds until an idle session expires (default 30 days)
  },
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    // https://next-auth.js.org/providers/email
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD
        }
      },
      from: process.env.EMAIL_FROM
      // maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h)
    })
  ],
  // https://next-auth.js.org/configuration/callbacks
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      session.user.role = token.role as string // Add role value to user object so it is passed along with session
      // We need to create types/next-auth.d.ts to add role to the user object type
      return session
    }
  }
})
