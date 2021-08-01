import { LiveStorage } from '@mswjs/storage';

export const cardStorage = new LiveStorage('cards', []);

if (!cardStorage.value.length) {
  cardStorage.value = [
    { type: 'bank-draft', title: 'Bank Draft', position: 0, id: 70 },
    {
      type: 'bill-of-lading',
      title: 'Bill of Lading',
      position: 1,
      id: 15,
    },
    {
      type: 'invoice',
      title: 'Invoice',
      position: 2,
      id: 56,
    },
    {
      type: 'bank-draft-2',
      title: 'Bank Draft 2',
      position: 3,
      id: 3,
    },
    {
      type: 'bill-of-lading-2',
      title: 'Bill of Lading 2',
      position: 4,
      id: 33,
    },
  ];
}
