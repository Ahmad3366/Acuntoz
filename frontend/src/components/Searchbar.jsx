import { useState } from "react";
import { useContractsContext } from "../hooks/useContractsContext";
import { useUsersContext } from '../hooks/useUsersContext'

const Searchbar = ({type}) => {
    const {dispatch} = useContractsContext()
    const {dispatch: userDispatch} = useUsersContext()

    const [query, setQuery] = useState('');
    const [placeholder, setPlaceholder] = useState('');

    const handleClick = (e) =>{
        if (type === 'contracts') {
            dispatch({type: 'SEARCH_CONTRACTS', payload: query})
            setPlaceholder('Enter Contract Ref #')
        }
        if (type == 'users') {
            userDispatch({type: 'SEARCH_USERS', payload: query})
            setPlaceholder('')
        }
    }

    return ( 
        <div className="searchbar">
            <input type="search" placeholder={placeholder} onChange={e => setQuery(e.target.value)}/>
            <button onClick={handleClick}>Search</button>
        </div>
     );
}
 
export default Searchbar;