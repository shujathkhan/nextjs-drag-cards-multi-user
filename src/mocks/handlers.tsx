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
    const users = db.card.getAll();

    if (!users) {
      return res(ctx.status(404));
    }

    return res(ctx.json(users));
  }),

  rest.post<ICardRequestBody, Array<ICard>>('/cards', (req, res, ctx) => {
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
    const updatedCards = db.card.getAll();
    return res(ctx.json(updatedCards));
  }),
];
