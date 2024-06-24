import React from 'react'
import { useNavigate } from '@tanstack/react-router'
import { RequireAuthType } from './RequireAuth.types'
import { useSelector } from 'react-redux'
import { RootState } from '@/context'

export const RequireAuth = ({ children }: RequireAuthType) => {
  const user = useSelector((state: RootState) => state.user.user)
  const navigate = useNavigate()

  React.useEffect(() => {
    if (!user) {
      navigate({ to: '/auth/signin' })
    }
  }, [user, navigate])

  return children
}
