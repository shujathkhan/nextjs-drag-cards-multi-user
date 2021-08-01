import axios from 'axios';

export const getCards = () => fetch('/cards');
export const updateCards = data =>
  fetch('/cards', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      body: JSON.stringify(data),
    },
    body: JSON.stringify(data),
  });
