import { useEffect, useState } from 'react'
import axios from 'axios'
import {startSeconds} from './Timer'
import Timer from './Timer'
import {searchUserType} from './UserList'

type userType = {
    login: string
    id: number
    avatar_url: string
    followers: number
    bio: string
    public_repos: number
    name:string
  }

type UserDetailsPropsType = {
    user: searchUserType | null
  }
  
  const UserDetails = (props: UserDetailsPropsType) => {
    const [userDetails, setUserDetails] = useState<userType | null>(null)
    const [seconds, setSeconds] = useState(startSeconds)
  
    useEffect(() => {
      if (seconds < 1) {
        setUserDetails(null)
      }
    }, [seconds])
  
    useEffect(() => {
      if (!!props.user) {
        axios
          .get<userType>(`https://api.github.com/users/${props.user.login}`)
          .then((res) => {
            setSeconds(startSeconds)
            setUserDetails(res.data)
          })
      }
    }, [props.user])
  
    return (
      <div className='user-detales'> {userDetails &&
        <>
          <h2>{userDetails?.login}</h2>
          <Timer seconds={seconds} onChange={setSeconds} timerKey={userDetails.id.toString()} />
          <img alt='avatar' src={userDetails?.avatar_url} />
          <div>
          <p> <strong>Name: </strong>{userDetails?.name}</p>
          </div>
          <div>
            <p className="bio"> <strong>Biography:</strong> {userDetails?.bio} </p>
          </div>
          <div>
            <p> <strong>Followers: </strong>{userDetails?.followers}</p>
          </div>
          <div>
          <p> <strong>Public repos: </strong>{userDetails?.public_repos}</p>
          </div>
        </>
      }
      </div>
    )
  }
export default UserDetails