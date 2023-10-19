import apiCaller from "../apis/contactApi/contactAPI"

export const getContacts = async () => {
    try {
        const response = await apiCaller.get('/contacts')
        const data = response.data
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const getContact = async (id) => {
    try {
        const response = await apiCaller.get(`/contacts/${id}`)
        const data = response.data
        return data;
    } catch (error) {
        console.log(error);
    }
}