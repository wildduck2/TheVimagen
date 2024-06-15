import { Dispatch } from 'react'
import { NavigateFunction } from 'react-router-dom'
import { AnyAction } from 'redux'

export interface useAuthEmailProps extends useAuthGithubProps {
  email: string
  password: string
}

export interface useAuthGithubProps {
  dispatch: Dispatch<AnyAction>
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  setEmailValid: React.Dispatch<React.SetStateAction<boolean>>
  setPasswordValid: React.Dispatch<React.SetStateAction<boolean>>
  route: NavigateFunction
}
