// src/mocks/handlers.js
import { rest } from 'msw';
import { cardStorage } from './storage';
interface ICard {
  title?: string;
  type?: string;
  id: number;
  position: number;
}

interface ICardRequestBody {
  cards: Array<ICard>;
}

export const handlers = [
  // Handles a GET /user request
  rest.get<Array<ICard>>('/cards', (req, res, ctx) => {
    let cards = cardStorage.value;

    cards = cards.sort((a, b) =>
      a.position < b.position ? -1 : a.position > b.position ? 1 : 0,
    );

    if (!cards.length) {
      return res(ctx.status(404));
    }

    return res(ctx.json(cards));
  }),

  rest.post<ICardRequestBody>('/cards', (req, res, ctx) => {
    const { cards } = req.body;
    cardStorage.update(prevCards => cards);
    if (!cardStorage.value) {
      return res(ctx.status(404));
    }
    return res(ctx.status(200));
  }),
];
