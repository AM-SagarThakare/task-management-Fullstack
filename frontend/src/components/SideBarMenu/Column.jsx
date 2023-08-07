import { Draggable } from "react-beautiful-dnd";
import QuoteList from "./List";

const Column = (props) => {

  const title = props.title;
  const quotes = props.quotes; // in our case quote is card[]
  const index = props.index;
  return (
    <Draggable draggableId={title} index={index}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.draggableProps}>
          <div isdragging={snapshot.isDragging.toString()}>
            <div
              isdragging={snapshot.isDragging.toString()}
              {...provided.dragHandleProps}
              // aria-label={`${title} quote list`}
            >
              {title}
            </div>
          </div>
          <QuoteList
            listId={title}
            listType="QUOTE"
            //   style={{
            //     backgroundColor: snapshot.isDragging ? colors.G50 : null
            //   }}
            quotes={quotes}
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
