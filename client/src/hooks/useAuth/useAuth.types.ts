import { NavigateFunction } from 'react-router-dom'

export interface useAuthEmailProps extends useAuthGithubProps {
  email: string
  password: string
}

export interface useAuthGithubProps {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  route: NavigateFunction
}
