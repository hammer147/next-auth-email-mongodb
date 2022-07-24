# Passwordless Authentication in Next.js with NextAuth.js Email and MongoDB

This Next.js project written in Typescript demonstrates the use of NextAuth.js v4 for passwordless authentication.
It also shows how to add role-based authorization to protect certain routes via middleware.

- it stores an encrypted JWT (JWE) in the session cookie
- uses the Email provider that sends "magic links" via email that the user can click on to sign in
- uses MongoDB as a database

It has a layout component that wraps the app to provide the main navigation.
The items shown in the navigation depend on the user's authentication (signed in or not) and authorization (user.role):

- the home page: is public and can be accessed by unauthenticated users
- the protected page: can only be accessed by authenticated users
- the member page: can only be accessed by authenticated users that have a role of member or admin
- the admin page: can only be accessed by authenticated users that have a role of admin

These routes are protected via middleware (run at the Edge).

## The environmental variables (.env.local) needed

```env
# Create a db with a users collection
# Replace <username>, <password>, <dbname> in the string below:
# MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/<dbname>?retryWrites=true&w=majority"
MONGODB_URI=""

# In production, change this to the real URL.
# When you deploy to Vercel you don't have to define this variable if 
# "Automatically expose System Environment Variables" is checked in your Project Settings.
# https://next-auth.js.org/configuration/options
NEXTAUTH_URL="http://localhost:3000"

# Random Secret - You can make one with $ openssl rand -base64 32
# When using JWT, you need to generate a HS512 key: $ openssl rand -base64 172 | tr -d '\n'
# Use a Git Bash terminal if the command doesn't work
# https://next-auth.js.org/configuration/options
NEXTAUTH_SECRET=""

# SMTP outgoing server
# EMAIL_FROM must be same as EMAIL_SERVER_USER (or an alias)
EMAIL_SERVER_USER=""
EMAIL_SERVER_PASSWORD=""
EMAIL_SERVER_HOST=""
EMAIL_SERVER_PORT="587"
EMAIL_FROM=""

# SMTP Example for Gmail
# EMAIL_SERVER_USER="mygmailusername@gmail.com"
# EMAIL_SERVER_PASSWORD="MyGmailPassword"
# EMAIL_SERVER_HOST="smtp.gmail.com"
# EMAIL_SERVER_PORT="587"
# EMAIL_FROM="mygmailusername@gmail.com"
```

Note that NextAuth.js comes with default pages to sign in, sign out, etc.
These pages can tweaked a little via the theme option as shown in this demo (brand color, logo, ...).
In a real application however, you will probably want to use your own pages.
This is very easy and is well explained in the [docs](https://next-auth.js.org/configuration/pages).
