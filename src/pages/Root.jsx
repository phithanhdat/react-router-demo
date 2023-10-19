import { Form, Link, Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { loadContactFromServer } from "../redux/contacts/contactSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getContacts } from "../contactDataSource/datasource";

export const loader = async () => {
  const data = await getContacts();
  return { contacts: data }
}


function Root() {
  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(loadContactFromServer())
  }, []);


  // const { contacts } = useLoaderData()

  const navigate = useNavigate()
  const contacts = useSelector(state => state.contacts.value)
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
            contacts ? (
              <ul>
                {contacts.map(contact => (
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