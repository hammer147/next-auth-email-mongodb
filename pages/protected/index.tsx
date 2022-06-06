import { FC } from 'react'

const Protected: FC = () => {
  return (
    <div>
      <h1>Protected</h1>
      <p>
        This page can only be accessed by authenticated users.
      </p>
    </div>
  )
}

export default Protected
