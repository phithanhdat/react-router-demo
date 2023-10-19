import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import {Form as RouterForm } from 'react-router-dom'
import { redirect } from "react-router-dom";
import apiCaller from '../apis/contactApi/contactAPI';
import store from '../redux/store';
import { addNewContact } from '../redux/contacts/contactSlice';

export const saveContactAction = async ({params, request}) => {
    // e.preventDefault()
    let formData = Object.fromEntries(await request.formData());

    const data = JSON.stringify({
        firstname: formData.name,
        lastname: '',
        avatar: formData.avatar,
        twitterLink: formData.link,
        note: formData.note,
        isFavorite: formData.favorite
    });
    const customConfig = {
        headers: {
        'Content-Type': 'application/json'
        }
    };
    try {
        const result = await apiCaller.post('/contacts', data, customConfig);
        const newContact = result.data;
        store.dispatch(addNewContact(newContact))
        return redirect(`/contacts/${newContact.id}`)
    } catch (error) {
        console.log(error);
    }
    
    return null
}

function NewContact() {
    return ( 
    <>
    <RouterForm method='post' action="/new-contact">
        <div className='d-flex flex-column'>
            <label htmlFor="contact-name">Name:</label>
            <input type="text" id="contact-name" name='name' />
            <label htmlFor="social-link">Twitter:</label>
            <input type="text" id="social-link" name='link' />
            <label htmlFor="note">Note:</label>
            <input type="text" id="note" name='note' className='mb-3'/>
            <label htmlFor="avatar">Avatar:</label>
            <input type="text" id="avatar" name='avatar' className='mb-3'/>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check name='favorite' type="checkbox" label="Favorite" />
            </Form.Group>
            <Button variant='primary' type="submit" >Save Contact</Button>
                {/* <button type='submit'>Save Contact</button> */}
        </div>
    </RouterForm>
    
    </>);
}

export default NewContact;