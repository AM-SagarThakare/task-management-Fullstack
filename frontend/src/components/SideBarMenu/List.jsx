import { Droppable, Draggable } from "react-beautiful-dnd";
import React from "react";
import QuoteItem from "./Item";

const InnerQuoteList = function InnerQuoteList(props) {
  return props.quotes.map((quote, index) => (
    <Draggable key={quote._id} draggableId={quote._id} index={index}>
      {(dragProvided, dragSnapshot) => (
        <QuoteItem
          key={quote._id}
          quote={quote}
          isdragging={dragSnapshot.isDragging.toString()}
          isgroupedover={Boolean(dragSnapshot.combineTargetFor)}
          provided={dragProvided}
        />
      )}
    </Draggable>
  ));
};

function InnerList(props) {
  const { quotes, dropProvided } = props;
  //   console.log(props);
  const title = props.title ? <div>{props.title}</div> : null;

  return (
    <div>
      {title}
      <div ref={dropProvided.innerRef}>
        <InnerQuoteList quotes={quotes} />
        {dropProvided.placeholder}
      </div>
    </div>
  );
}

export default function QuoteList(props) {
  const {
    ignoreContainerClipping,
    internalScroll,
    scrollContainerStyle,
    isDropDisabled,
    isCombineEnabled,
    listId = "LIST",
    listType,
    style,
    quotes,
    title,
    useClone,
  } = props;

  return (
    <Droppable
      droppableId={listId}
      type={listType}
      ignoreContainerClipping={ignoreContainerClipping}
      isdropdisabled={isDropDisabled}
      isCombineEnabled={isCombineEnabled}
    >
      {(dropProvided, dropSnapshot) => (
        <div
          //   style={style}
          
          isdraggingover={dropSnapshot.isDraggingOver.toString()}
          isdropdisabled={isDropDisabled}
          isdraggingfrom={Boolean(dropSnapshot.draggingFromThisWith).toString()}
          {...dropProvided.droppableProps}
        >
          <InnerList
            quotes={quotes}
            title={title}
            dropProvided={dropProvided}
          />
        </div>
      )}
    </Droppable>
  );
}
