import axios from 'axios';

export const getCards = () => axios.get('/cards');
export const updateCards = data => axios.post('/cards', data);
