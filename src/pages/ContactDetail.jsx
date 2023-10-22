import { Form, useLoaderData, useNavigate } from "react-router-dom";
import { getContact } from "../contactDataSource/datasource";
import apiCaller from "../apis/contactApi/contactAPI";
import store from "../redux/store";
import { deleteContact as deleteContactRedux } from '../redux/contacts/contactSlice'

export const loader = async ({ params }) => {
  const id = params.contactId
  const contact = getContact(id)
  return contact
}

export const deleteContact = async ({params}) => {
  const id = params.contactId
  try {
    const res = await apiCaller.delete(`/contacts/${id}`) // GET, POST, PUT, PATCH, DELETE
    store.dispatch(deleteContactRedux(id))
  } catch (error) {
    console.log(error);
  }
  return null
}

function ContactDetail() {

  const nav = useNavigate()

  const contact = useLoaderData()
  return (
    <div id="contact">
      <div>
        <img
          key={contact.avatar}
          src={contact.avatar || null}
        />
      </div>

      <div>
        <h1>
          {contact.firstname || contact.lastname ? (
            <>
              {contact.firstname} {contact.lastname}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite contact={contact} />
        </h1>

        {contact.twitterLink && (
          <p>
            <a
              target="_blank"
              href={`${contact.twitterLink}`}
            >
              {contact.twitterLink}
            </a>
          </p>
        )}

        {contact.note && <p>{contact.note}</p>}

        <div>
          <button onClick={() => nav('./edit')} type="submit">Edit</button>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (
                !window.confirm(
                  "Please confirm you want to delete this record."
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

function Favorite({ contact }) {
  // yes, this is a `let` for later
  let favorite = contact.isFavorite;
  return (
    <Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={
          favorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
      >
        {favorite ? "★" : "☆"}
      </button>
    </Form>
  );
}

export default ContactDetail;