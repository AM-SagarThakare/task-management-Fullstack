
// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    // console.log('list',list);
    const result = Array.from(list);
    // console.log('reorder     end');
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

  
    return result;
  };
  
  export default reorder;

export const reorderQuoteMap = ({ quoteMap, source, destination }) => {
  console.log('in reorderQuoteMap');
  // console.log('quoteMap',quoteMap,source, destination);
    // console.log("reorderQuoteMap",quoteMap)
    const current = [...quoteMap[source.droppableId]];
    const next = [...quoteMap[destination.droppableId]];
    const target = current[source.index];
  
    // moving to same list
    if (source.droppableId === destination.droppableId) {
      const reordered = reorder(current, source.index, destination.index);
      const result = {
        ...quoteMap,
        [source.droppableId]: reordered
      };
      return {
        quoteMap: result
      };
    }
  
    // moving to different list
  
    // remove from original
    current.splice(source.index, 1);
    // insert into next
    next.splice(destination.index, 0, target);
  
    const result = {
      ...quoteMap,
      [source.droppableId]: current,
      [destination.droppableId]: next
    };
    console.log('result',result);
  
    return {
      quoteMap: result
    };
  };