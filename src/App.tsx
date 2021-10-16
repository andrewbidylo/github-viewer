import {useState } from 'react'
import './App.css'
import Search from './Components/Search'
import UsersList from './Components/UserList'
import UserDetails from './Components/UserDetails'
import {InitialSearchTerm} from './Components/Search'
import {searchUserType} from './Components/UserList'

const App = () => {
  const [selectedUser, setSelectedUser] = useState<searchUserType | null>(null)
  const [searchTerm, setSearchTerm] = useState(InitialSearchTerm)

  return (
    <div>
      <header>
        <h1>
          GitHub Viewer
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
      <footer>
       @ Created by Andrew Bidylo
     </footer>
    </div>
    
  );
}

export default App;
