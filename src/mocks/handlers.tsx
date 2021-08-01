// src/mocks/handlers.js
import { rest } from 'msw';
import { db } from './db';

interface ICard {
  title?: string;
  type?: string;
  id: number;
  position: number;
}

interface ICardRequestBody {
  source: ICard;
  destination: ICard;
}

export const handlers = [
  // Handles a GET /user request
  rest.get<Array<ICard>>('/cards', (req, res, ctx) => {
    let cards = db.card.getAll();

    cards = cards.sort((a, b) =>
      a.position < b.position ? -1 : a.position > b.position ? 1 : 0,
    );

    if (!cards) {
      return res(ctx.status(404));
    }

    return res(ctx.json(cards));
  }),

  rest.post<ICardRequestBody>('/cards', (req, res, ctx) => {
    const { source, destination } = req.body;

    const updateSource = db.card.update({
      // Query for the entity to modify.
      where: {
        id: {
          equals: source.id,
        },
      },
      data: {
        position: destination.position,
      },
    });
    const updateDestination = db.card.update({
      // Query for the entity to modify.
      where: {
        id: {
          equals: destination.id,
        },
      },
      data: {
        position: source.position,
      },
    });

    if (!(updateSource || updateDestination)) {
      return res(ctx.status(404));
    }
    return res(ctx.status(200));
  }),
];
