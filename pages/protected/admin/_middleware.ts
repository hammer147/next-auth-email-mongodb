import { withAuth } from "next-auth/middleware"

export default withAuth({
  callbacks: {
    authorized: ({ token }) => token?.role === "admin",
  },
})

// With the above code, you just made sure that only user's with the admin role can 
// access any of the pages under the /admin route. 
// (Including nested routes as well, like /admin/settings etc.).
// Users without the admin role are redirected to the login page.