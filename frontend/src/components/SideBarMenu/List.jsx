import { Droppable, Draggable } from "react-beautiful-dnd";
import React from "react";
import QuoteItem from "./Item";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useForm } from "react-hook-form";

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
  const [isAddCardVisible, setIsAddCardVisible] = useState(false);
  const [globalIndex, setGlobalIndex] = useState(-1);
  const { register, handleSubmit, reset } = useForm();
  console.log(props);
  const title = props.title ? <div>{props.title}</div> : null;
  const submitCard = async (formData, list) => {};
  return (
    <div>
      {title}
      <div ref={dropProvided.innerRef}>
        <InnerQuoteList quotes={quotes} />
        {dropProvided.placeholder}
      </div>
      {/* {isAddCardVisible && globalIndex === index ? (
        <form
          className="p-2 text-light list-bg-color rounded-3 pointer col-3 d-flex flex-column align-items-start gap-2 end-0 w-100"
          onSubmit={handleSubmit((formData) =>
            submitCard(formData, {
              // listID: "checkkkkkk",
              listIndex: index,
            })
          )}
        >
          <input
            className="rounded px-2 text-light w-100"
            placeholder="enter card name"
            style={{
              backgroundColor: "#22272B",
              border: "1px solid #85B8FF",
            }}
            {...register("cardTitle", { required: true })}
          />

          <div className="d-flex align-items-center gap-2 ">
            <button className="btn btn-sm btn-warning">Add card </button>
            <RxCross2
              size={25}
              onClick={() => setIsAddCardVisible(!isAddCardVisible)}
            />
          </div>
        </form>
      ) : (
        <div
          className="p-2 hoverEffect rounded pointer"
          onClick={() => {
            setIsAddCardVisible(!isAddCardVisible);
            setGlobalIndex(index);
          }}
        >
          + add new card
        </div>
      )} */}
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

  // console.log(props);

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
          <div>here</div>
        </div>
      )}
    </Droppable>
  );
}
