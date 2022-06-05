import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'

const Home: NextPage = () => {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <>Loading...</>
  }


  if (status === 'authenticated') {
    return (
      <>
        Signed in as {session!.user!.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
        <Link href='/protected-page'>
          <a>Go to protected page</a>
        </Link>
      </>
    )
  }

  // status === 'unauthenticated'
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>

      {/* <Link href='/api/auth/signin'>
        <a>Sign in</a>
      </Link> */}

      <Link href='/protected-page'>
        <a>Go to protected page</a>
      </Link>

    </>
  )

}

export default Home
