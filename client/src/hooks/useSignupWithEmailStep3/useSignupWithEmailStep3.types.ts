export type useSignupIWthEmailStep3Props = {
  first_name: string
  last_name: string
  pronounce: string
  age: string
  profession: string
  years_of_exprience: string
  bio: string
}

export type error = {
  first_name: boolean
  last_name: boolean
  age: boolean
  profession: boolean
  years_of_exprience: boolean
  pronounce: boolean
  bio: boolean
} | null
