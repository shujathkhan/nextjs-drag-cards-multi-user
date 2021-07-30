/* eslint-disable @next/next/no-img-element */
import React from 'react';

const Card = (props: {
  type: string;
  title: string;
  position: number;
  id: number;
}) => {
  const styles = {
    card: {
      margin: 20,
    },
  };

  return (
    <div style={styles.card}>
      <h4>{props.title}</h4>
      <img
        src={`https://picsum.photos/id/${props.id}/200/200`}
        alt={'Random Image'}
      />
    </div>
  );
};

export default Card;
