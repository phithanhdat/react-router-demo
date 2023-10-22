import { Form, Link, Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { loadContactFromServer } from "../redux/contacts/contactSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getContacts } from "../contactDataSource/datasource";

export const loader = async () => {
  const data = await getContacts();
  return { contacts: data }
}


function Root() {
  const contacts = useSelector(state => state.contacts.value)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [filteredContact, setFilteredContact] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(loadContactFromServer())
  }, []);

  useEffect(() => {
    setFilteredContact(contacts)
  }, [contacts])


  // const { contacts } = useLoaderData()

  const navigate = useNavigate()

  const handeSearch = (e) => {
    const value = e.target.value
    console.log('keyword: ', value);
    setSearchKeyword(value)
  }

  useEffect(() => {
    if (searchKeyword !== '') {
      console.log('fileter filteredContact: ', filteredContact);
      const newList = contacts.filter(e => {
        const name = e.firstname.toLowerCase() + e.lastname.toLowerCase()
        return name.includes(searchKeyword.toLowerCase())
      })
      console.log('filter: newList: ', newList);
      setFilteredContact(newList)
    } else {
      setFilteredContact(contacts)
    }
  }, [searchKeyword])


  return (
    <>
      <div id='sidebar'>
        <h1>Reacr Router Contacts</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search Contacts"
              placeholder="Search"
              type="search"
              name="q"
              onChange={handeSearch}
            />
            <div
              id="search-spinner"
              aria-hidden
              hidden={true}
            />
            <div
              className="sr-only"
              aria-live="polite"
            />
          </form>
          <button  type="submit" onClick={() => navigate('/new-contact')}>New</button>
        </div>
        <nav>
          {
            filteredContact ? (
              <ul>
                {filteredContact.map(contact => (
                  <li>
                    <Link to={`/contacts/${contact.id}`}>
                      {contact.firstname + ' ' + contact.lastname}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (<i>No contacts</i>)
          }
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}

export default Root;