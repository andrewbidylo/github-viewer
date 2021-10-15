import { useEffect, useState } from 'react';

export let InitialSearchTerm = 'a'

export type SearchPropsType = {
  value: string
  onSubmit: (fixedValue: string) => void
}

const Search = (props: SearchPropsType) => {
  const [tempSearch, setTempSearch] = useState(props.value)

  useEffect(() => {
    setTempSearch(props.value)
  }, [props.value])
  return (
    <div className="search-box">
      <input placeholder='search' value={tempSearch} onChange={(e) => { setTempSearch(e.currentTarget.value) }} />
      <button className="search-btn" onClick={() => {
        props.onSubmit(tempSearch)
      }}>
        Find
      </button>
      <button className="reset-btn" onClick={() => props.onSubmit(InitialSearchTerm)}> Reset</button>
    </div>
  )
}

export default Search