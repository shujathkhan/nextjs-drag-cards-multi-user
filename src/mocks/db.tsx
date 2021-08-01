import { factory, primaryKey } from '@mswjs/data';

export const db = factory({
  // Create a "card" model,
  card: {
    id: primaryKey(Number),
    title: String,
    type: String,
    position: Number,
  },
});

db.card.create({
  type: 'bank-draft',
  title: 'Bank Draft',
  position: 0,
  id: 70,
});
db.card.create({
  type: 'bill-of-lading',
  title: 'Bill of Lading',
  position: 1,
  id: 15,
});
db.card.create({
  type: 'invoice',
  title: 'Invoice',
  position: 2,
  id: 56,
});
db.card.create({
  type: 'bank-draft-2',
  title: 'Bank Draft 2',
  position: 3,
  id: 3,
});
db.card.create({
  type: 'bill-of-lading-2',
  title: 'Bill of Lading 2',
  position: 4,
  id: 33,
});
