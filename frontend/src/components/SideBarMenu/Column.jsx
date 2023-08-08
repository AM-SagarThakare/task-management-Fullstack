import { Draggable } from "react-beautiful-dnd";
import QuoteList from "./List";

const Column = (props) => {
  const title = props.title;
  const cards = props.cards; // in our case quote is card[]
  const index = props.index;

  return (
    <Draggable draggableId={title} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="list-bg-color col-6 col-sm-4 col-lg-3 p-3 m-2 rounded"
        >
          <div
            isdragging={snapshot.isDragging.toString()}
            {...provided.dragHandleProps}
            className=" p-1"
          >
            {title}
          </div>
          <QuoteList
            listId={title}
            listType="QUOTE"
            cards={cards}
            internalScroll={props.isScrollable}
            isCombineEnabled={Boolean(props.isCombineEnabled)}
            useClone={Boolean(props.useClone)}
          />
        </div>
      )}
    </Draggable>
  );
};

export default Column;
