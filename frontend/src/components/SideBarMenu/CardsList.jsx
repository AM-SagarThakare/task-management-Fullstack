import { Droppable, Draggable } from "react-beautiful-dnd";
import React from "react";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useForm } from "react-hook-form";
import CardItem from "./CardItem";

const InnerCardList = function InnerCardList(props) {
  return props.cards.map((card, index) => (
    <Draggable key={card._id} draggableId={card._id} index={index}>
      {(dragProvided, dragSnapshot) => (
        <CardItem
          key={card._id}
          card={card}
          isdragging={dragSnapshot.isDragging.toString()}
          isgroupedover={Boolean(dragSnapshot.combineTargetFor)}
          provided={dragProvided}
        />
      )}
    </Draggable>
  ));
};

function InnerCards(props) {
  const { cards, dropProvided } = props;
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
        <InnerCardList cards={cards} />
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

export default function CardsList(props) {
  const {
    ignoreContainerClipping,
    isDropDisabled,
    isCombineEnabled,
    listId = "LIST",
    listType,
    cards,
    title,
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
          isdraggingover={dropSnapshot.isDraggingOver.toString()}
          isdropdisabled={isDropDisabled}
          isdraggingfrom={Boolean(dropSnapshot.draggingFromThisWith).toString()}
          {...dropProvided.droppableProps}
        >
          <InnerCards cards={cards} title={title} dropProvided={dropProvided} />
          <div>here</div>
        </div>
      )}
    </Droppable>
  );
}
