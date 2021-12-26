import React, { memo, useEffect } from "react";
import { useDrag, DragSourceMonitor } from "react-dnd";

export const Card = memo(
  ({ card, offset, isLastCard }): JSX.Element => {
    const { hidden, id, index, cardType } = card;
    const [{ isDragging, item }, drag, preview] = useDrag({
      item: { cardType, card },
      end: (item: { type: string; card } | undefined, monitor: DragSourceMonitor) => {
        const dropResult = monitor.getDropResult();
        if (item && dropResult) {
          const nextState = dropResult.nextState;
        }
      },
      collect: monitor => ({
        isDragging: monitor.isDragging(),
        item: monitor.getItem()
      }),
      canDrag: () => (card.hidden ? false : true)
    });


    return (
      <img
        alt={card.id}
        ref={card.hidden ? null : drag}
        className="card"
        src={hidden ? require(`../assets/md/1B.svg`) : require(`../assets/md/${id}.svg`)}
        style={{ top: offset, display: card.isDragging ? "none" : undefined }}
        onDragStart={(e): void => {
          if (card.hidden) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
      />
    );
  }
);

export default Card;