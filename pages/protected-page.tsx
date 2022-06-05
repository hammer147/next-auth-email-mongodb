import { useSession, signIn } from 'next-auth/react'
// import { useRouter } from 'next/router'

const ProtectedPage = () => {
  // const router = useRouter()

  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      signIn() // or use the router to navigate to signin
      // router.push('/api/auth/signin')
    }
  })

  if (status === 'loading') {
    return 'Loading or not authenticated...'
  }

  return 'User is logged in'
}

export default ProtectedPage
