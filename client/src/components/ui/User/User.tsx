 
import { Avatar, AvatarFallback, AvatarImage } from '..'
import { UserProps } from './User.types'

const User: React.FC<UserProps> = ({ img, name }) => {
  return (
    <div className="user">
      <Avatar>
        <AvatarImage src={img} alt={name} />
        <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
      {name}
    </div>
  )
}

export { User }
