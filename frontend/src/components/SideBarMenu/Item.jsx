import React from "react";

function QuoteItem(props) {
  const { quote, isDragging, isGroupedOver, provided, isClone, index } =
    props;

  return (
    <div
      isdragging={isDragging}
      isgroupedover={isGroupedOver}
      isclone={isClone}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}

      // href={quote.author.url}
      // colors={quote.author.colors}
      // style={getStyle(provided, style)}
      // data-is-dragging={isDragging}
      // data-testid={quote.id}
      // data-index={index}
      // aria-label={`${quote.author.name} quote ${quote.content}`}
    >
      {/* actual card title */}
      <div className="px-2 py-1 my-2 rounded card-bg-color pointer">{quote.cardTitle}</div>
    </div>
  );
}

export default QuoteItem;
