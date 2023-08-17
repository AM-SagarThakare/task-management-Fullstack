import React from "react";

function CardItem(props) {
  const { card, isDragging, isGroupedOver, provided, isClone, index } = props;
  // console.log(props);

  return (
    <div
      isdragging={isDragging}
      isgroupedover={isGroupedOver}
      isclone={isClone}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      {/* actual card title */}
      <div className="px-2 py-1 my-2 rounded card-bg-color pointer opacity-decrease">
        {card.cardTitle}
      </div>
    </div>
  );
}

export default CardItem;
