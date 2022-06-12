import { NextMiddleware, NextRequest, NextResponse } from "next/server"
import type { JWT } from "next-auth/jwt"

import { withAuth } from "next-auth/middleware"

// // @ts-ignore
// const middleware: NextMiddleware = (req: NextRequest & { nextauth: { token: JWT } }) => {
//   console.log("Middleware token", req.nextauth.token)
//   return NextResponse.next()
// }

const middleware: NextMiddleware = (req) => {
  const token = (req as NextRequest & { nextauth: { token: JWT } }).nextauth.token
  console.log("Middleware token", token)
  return NextResponse.next()
}

export default withAuth(
  middleware,
  {
    callbacks: {
      authorized: ({ token }) => token?.role === "admin",
    },
  }
)

// An example on how to wrap middleware.
// The middleware function will only be invoked if the authorized callback returns true.
