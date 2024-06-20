export type useSignupIWthEmailStep3Props = {
  firstName: string
  lastName: string
  pronounce: string
  age: string
  profession: string
  yearsOfExprience: string
  bio: string
}

export type error = {
  firstName: boolean
  lastName: boolean
  age: boolean
  profession: boolean
  yearsOfExprience: boolean
  pronounce: boolean
  bio: boolean
} | null
