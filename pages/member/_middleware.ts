import { withAuth } from "next-auth/middleware"

export default withAuth({
  callbacks: {
    authorized: ({ token }) => token?.role === "member" || token?.role === "admin",
  },
})

// With the above code, you just made sure that only user's with the member or admin role can 
// access any of the pages under the /member route. 
// (Including nested routes as well, like /member/settings etc.).
// Users without the member or admin role are redirected to the sign-in page.