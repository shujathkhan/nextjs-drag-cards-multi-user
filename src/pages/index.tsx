import Head from 'next/head';
import styles from '../styles/Home.module.css';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { getCards, updateCards } from '../services';
import Card from '../components/Card';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default function Home() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    getCards().then(response => {
      console.log(response.data);
      setCards(response.data);
    });
  }, []);

  const onDragEnd = result => {
    const { destination, source, draggableId } = result;
    if (source.index === destination.index) {
      return;
    } else {
      let sourceCard = cards.find(card => card.position === source.index);
      let destinationCard = cards.find(
        card => card.position === destination.index,
      );

      updateCards({ source: sourceCard, destination: destinationCard }).then(
        response => {
          console.log(response.data);
          setCards(response.data);
        },
      );
    }
  };

  const sortedCards = cards
    .slice()
    .sort((a, b) =>
      a.position < b.position ? -1 : a.position > b.position ? 1 : 0,
    );

  return (
    <div className={styles.container}>
      <Head>
        <title>We-Think</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"></meta>
        <meta name="theme-color" content="#060A1B"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable" direction="horizontal">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                className={styles['cards-container']}
                {...provided.droppableProps}>
                {sortedCards?.map((card, index) => (
                  <Draggable
                    key={card.id}
                    draggableId={'drop-' + index}
                    index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}>
                        <Card key={card.title + '-' + index} {...card} />
                      </div>
                    )}
                  </Draggable>
                ))}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </main>
    </div>
  );
}
