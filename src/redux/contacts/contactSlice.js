import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import  apiCaller from '../../apis/contactApi/contactAPI' 

const initialState = {
    value: []
}

export const loadContactFromServer = createAsyncThunk(
    "contactSlice/loadContactFromServer",
    async () => {
        try {
            const response = await apiCaller.get('/contacts')
            const data = response.data
            return data
        } catch (error) {
            console.log(error);
        }
    }
)


const contactSlice = createSlice({
    name: 'contactSlice',
    initialState,
    reducers: {
        loadLocalData: (state, action) => {
            state.value = action.payload
        },
        addNewContact: (state, action) => {
            state.value.push(action.payload)
        },
        deleteContact: (state, action) => {
            const newlist = state.value.filter(e => e.id !== parseInt(action.payload))
            state.value = newlist
        },
        editContact: (state, action) => {
            const editedContact = action.payload
            console.log('redux: editedContact: ', editedContact);
            const newlist = state.value.map((e) => {
                if (e.id === editedContact.id) {
                    return editedContact
                }
                return e
            })
            console.log('new List: ', newlist);
            state.value = newlist
        }
    },
    extraReducers: {
        [loadContactFromServer.pending]: (state, action) => {
            state.loading = true;
        },
        [loadContactFromServer.fulfilled]: (state, action) => {
            state.loading = false;
            state.value = action.payload
        }
    }
})

export const { loadLocalData, addNewContact, deleteContact, editContact } = contactSlice.actions;

export default contactSlice.reducer