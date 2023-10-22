import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useLoaderData, Form as RTForm, redirect } from 'react-router-dom';
import apiCaller from '../apis/contactApi/contactAPI';
import store from '../redux/store';
import { editContact } from '../redux/contacts/contactSlice';

export const saveEditedContactAction = async ({params, request}) => {
  console.log('params: ', params);
  console.log('request:', request);
  const contactId = params.contactId
  let formData = Object.fromEntries(await request.formData());
  if (formData.isFavorite) {
    formData.isFavorite = true
  } else {
    formData.isFavorite = false
  }
  console.log('formData: ', formData)
  try {
    const res = await apiCaller.patch(`/contacts/${contactId}`, formData)
    console.log('Save Ediited contact: ', res);
    store.dispatch(editContact({...formData, id: parseInt(contactId)}))
    return redirect(`/contacts/${contactId}`)
  } catch (error) {
    console.log(error);
  }
  return null
}

function EditContact() {
  const contact = useLoaderData()
  const [formData, setFormData] = useState(contact)

  const handleFormChange = (e) => {
    const {name, type, checked, id, value} = e.target
    const val = type === 'checkbox' ? checked : value
    setFormData({
      ...formData,
      [name]: val
    })
  }

  return (
    <div className='container d-flex justify-content-center'>
      <RTForm method='post' className='max-w-450' >
        <Row>
          <Col className='col-6'>
            <Form.Group controlId='firstName'>
              <Form.Label>First Name:</Form.Label>
              <Form.Control
                type='text'
                name='firstname'
                placeholder='your first name'
                value={formData.firstname}
                onChange={handleFormChange}
              />
            </Form.Group>
          </Col>
          <Col className='col-6'>
            <Form.Group controlId='lastName'>
              <Form.Label>Last Name:</Form.Label>
              <Form.Control
                type='text'
                name='lastname'
                placeholder='your last name'
                value={formData.lastname}
                onChange={handleFormChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className='mt-3'>
          <Form.Group controlId='twitterLink'>
            <Form.Label>Twitter:</Form.Label>
            <Form.Control
              type='text'
              name='twitterLink'
              placeholder='twitter'
              value={formData.twitterLink}
              onChange={handleFormChange}
            />
          </Form.Group>
        </Row>
        <Row className='mt-3'>
          <Form.Group controlId='note'>
            <Form.Label>Note:</Form.Label>
            <Form.Control
              type='text'
              name='note'
              placeholder='note'
              value={formData.note}
              onChange={handleFormChange}
            />
          </Form.Group>
        </Row>
        <Row className='mt-3'>
          <Form.Group controlId='avatar'>
            <Form.Label>Avatar:</Form.Label>
            <Form.Control
              type='text'
              name='avatar'
              placeholder='avatar link'
              value={formData.avatar}
              onChange={handleFormChange}
            />
          </Form.Group>
        </Row>
        <Row className='mt-3'>
          <Form.Group controlId='fav'>
            <Form.Check
              id='favorite'
              name='isFavorite'
              label='Favorite'
              checked={formData.checked}
              onChange={handleFormChange}
            />
          </Form.Group>
        </Row>
        <Row className='mt-3'>
          <Form.Group>
            <Button className='col-12' variant='primary' type='submit'>
              Save Contact
            </Button>
          </Form.Group>
        </Row>
      </RTForm>
    </div>
  );
}

export default EditContact;