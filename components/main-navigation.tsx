import { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSession, signIn, signOut } from 'next-auth/react'
import styles from './main-navigation.module.css'

const MainNavigation: FC = () => {
  const { data: session, status } = useSession()

  return (
    <header className={styles.header}>
      <Link href="/">
        <a>
          <div className={styles.logo}>
            <Image
              src="/logo.png"
              alt="logo"
              width={80}
              height={80}
            />
            Brand Name
          </div>
        </a>
      </Link>
      <nav>
        <ul>

          {(status === 'unauthenticated') && (
            <li>
              {/* <Link href='/api/auth/signin'>Sign In</Link> */}
              <button onClick={() => signIn()}>Sign In</button>
            </li>
          )}

          {session && (
            <li>
              <Link href="/protected">Protected</Link>
            </li>
          )}

          {/* {session && ((session.user.role === 'member') || (session.user.role === 'admin')) && ( */}
          {session?.user.role && (['member', 'admin']).includes(session.user.role) && (
            <li>
              <Link href="/member">Member</Link>
            </li>
          )}

          {(session?.user.role === 'admin') && (
            <li>
              <Link href="/admin">Admin</Link>
            </li>
          )}

          {(status === 'authenticated') && (
            <>
              <li>
                {/* <Link href='/api/auth/signout'>Sign Out</Link> */}
                <button onClick={() => signOut({ callbackUrl: '/' })}>Sign Out</button>
              </li>
              <li>
                {session.user.email}
              </li>
            </>
          )}

        </ul>
      </nav>
    </header>
  )
}

export default MainNavigation
