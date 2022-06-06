import { FC, ReactNode } from 'react'
import MainNavigation from './main-navigation'
import styles from './layout.module.css'

type Props = { children: ReactNode }

const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <MainNavigation />
      <main className={styles.main}>
        {children}
      </main>
    </>
  )
}

export default Layout
