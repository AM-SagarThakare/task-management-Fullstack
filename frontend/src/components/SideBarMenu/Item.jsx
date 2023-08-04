import React from "react";

function QuoteItem(props) {
  const { quote, isDragging, isGroupedOver, provided, style, isClone, index } =
    props;

  return (
    <div
      isDragging={isDragging}
      isGroupedOver={isGroupedOver}
      isClone={isClone}
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
      <div>quoteitem</div>
    </div>
  );
}

export default QuoteItem;
