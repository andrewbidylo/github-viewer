import { useEffect, useState } from 'react'
import axios from 'axios'

export type searchUserType = {
    login: string
    id: number
  }
  type searchResult = {
    items: searchUserType[]
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
  export default UsersList