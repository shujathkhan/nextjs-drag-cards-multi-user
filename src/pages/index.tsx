/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import React, { useEffect, useState } from 'react';
import { getCards, updateCards } from '../services';
import Card from '../components/Card';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { cloneDeep } from 'lodash';
import { usePubNub } from 'pubnub-react';

export default function Home() {
  const [cards, setCards] = useState([]);
  const [activeCard, setActiveCard] = useState(null);
  const pubnub = usePubNub();
  const [channels] = useState(['dragCards']);

  useEffect(() => {
    getCards().then(response => {
      response.json().then(data => {
        setCards(data);
      });
    });
    document.addEventListener('keydown', event => {
      event.key === 'Escape' && setActiveCard(null);
    });
  }, []);

  const onDragEnd = result => {
    const { destination, source, draggableId } = result;
    if (source.index === destination.index) {
      return;
    } else {
      let cloneCards = cloneDeep(cards);
      cloneCards.splice(
        destination.index,
        0,
        cloneCards.splice(source.index, 1)[0],
      );

      cloneCards.map((card, cardIndex) => (card.position = cardIndex));
      pubnub.publish({ channel: channels[0], message: cloneCards });
      updateCards({ cards: cloneCards });
    }
  };

  const handleDragUpdate = event => {
    const cardsToUpdate = event.message;
    setCards(cardsToUpdate);
  };

  useEffect(() => {
    pubnub.addListener({ message: handleDragUpdate });
    pubnub.subscribe({ channels });
  }, [pubnub, channels]);

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
                {cards?.map((card, index) => (
                  <Draggable
                    key={index}
                    draggableId={'drop-' + index}
                    index={index}>
                    {(provided, snapshot) => (
                      <div
                        onClick={() => setActiveCard(card.id)}
                        ref={provided.innerRef}
                        className={styles['card-draggable']}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}>
                        <Card key={card.title + '-' + index} {...card} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        {activeCard && (
          <>
            <button
              className={styles['card-full-overlay']}
              onClick={() => setActiveCard(null)}></button>

            <img
              className={styles['card-full-img']}
              src={`https://picsum.photos/id/${activeCard}/1000/600`}
              alt={'Full scree Random Image'}
            />
          </>
        )}
      </main>
    </div>
  );
}
