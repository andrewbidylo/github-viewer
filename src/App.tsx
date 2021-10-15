import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';


type searchUserType = {
  login: string
  id: number
}

type searchResult = {
  items: searchUserType[]
}

type userType = {
  login: string
  id: number
  avatar_url: string
  followers: number
  bio: string
}


let InitialSearchTerm = 'a'


type SearchPropsType = {
  value: string
  onSubmit: (fixedValue: string) => void
}

const Search = (props: SearchPropsType) => {
  const [tempSearch, setTempSearch] = useState(props.value)

  useEffect(() => {
    setTempSearch(props.value)
  }, [props.value])
  return (
    <div className = "search-box">
      <input placeholder='search' value={tempSearch} onChange={(e) => { setTempSearch(e.currentTarget.value) }} />
      <button className= "search-btn" onClick={() => {
        props.onSubmit(tempSearch)
      }}>
        Find
      </button>
      <button className= "reset-btn" onClick={() => props.onSubmit(InitialSearchTerm)}> Reset</button>
    </div>
  )
}


type UsersListPropsType = {
  term: string
  selectedUser: searchUserType | null
  onUserSelected: (user: searchUserType) => void
}
const UsersList = (props: UsersListPropsType) => {
  const [users, setUsers] = useState<searchUserType[]>([])

  useEffect(() => {
    axios
      .get<searchResult>(`https://api.github.com/search/users?q=${props.term}`)
      .then((res) => {
        setUsers(res.data.items)

      })
  }, [props.term])

  return (
    <div className="name-box"> 
    <ul> {users.map(name => <li key={name.id}
      className={props.selectedUser === name ? 'selected' : ''}
      onClick={() => {
        props.onUserSelected(name)
      }}>{name.login}</li>)}</ul>
      </div>
  )
}

type UserDetailsPropsType = {
  user: searchUserType | null

}

type TimerPropsType = {
  seconds: number
  onChange: (actualSeconds: number) => void
  timerKey: string
}

const Timer = (props: TimerPropsType) => {
  const [seconds, setSeconds] = useState(startSeconds)

  useEffect(() => {
    setSeconds(props.seconds)
  }, [props.seconds])

  useEffect(() => {
    props.onChange(seconds)
  }, [seconds])


  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prev) => prev - 1)
    }, 1000);
    return () => { clearInterval(intervalId) }
  }, [props.timerKey])
  
  return (
    <div>
      {seconds}
    </div>
  )
}


const startSeconds = 10
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
          <p className="bio"> <strong>Biography:</strong> {userDetails?.bio} </p>
        </div>
        <div>
          <p> <strong>Followers:</strong>{userDetails?.followers}</p>
        </div>
      </>
    }
    </div>
  )
}


const App = () => {
  const [selectedUser, setSelectedUser] = useState<searchUserType | null>(null)
  const [searchTerm, setSearchTerm] = useState(InitialSearchTerm)

  return (
    <div>
      <header>
        <h1>
          My Application
        </h1>
      </header>

      <div className='container'>

        <div className='left-side'>

          <Search value={searchTerm} onSubmit={(value: string) => { setSearchTerm(value) }} />
          <UsersList term={searchTerm} selectedUser={selectedUser} onUserSelected={setSelectedUser} />
         
        </div>
        <div className='right-side'>
        <UserDetails user={selectedUser} />
        </div>
        
      </div>
    </div>
  );
}

export default App;
