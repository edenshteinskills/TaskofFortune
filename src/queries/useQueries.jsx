import { useState, useEffect, useCallback } from "react";
import mondaySdk from "monday-sdk-js";
import useBoard from "./useBoard";
// import data from "../database/data";

export default () => {
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [index, setIndex] = useState("");
  const [userName, setUserName] = useState("");
  const [statusId, setStatusId] = useState("");
  const monday = mondaySdk();

  const boardId = useBoard();
  console.log(boardId);
  const fetchApi = async () => {
    try {
      if (!boardId) return;
      const allBoards = await monday.api(
        `query {
          boards {
          name
  	      id
  	      description
          }
        }`
      );
      const allItems = await monday.api(
        `query {
          boards (ids:[${boardId}]) {
          name
  	      id
  	      description
  	        items {
    	        name
              id
    	        column_values {
      	        title
      	        id
      	        type
      	        text
  		        }
            }      
          } 
        }`
      );
      const getMe = await monday.api(
        `query {
          me{
            name
            id
          }
        }`
      );

      setUserName(getMe.data.me.name);
      const tempList = allItems.data.boards[0].items.map((item, index) => {
        console.log(item);
        const option = index;
        const itemName = item.name;
        const style = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        const column_values = item.column_values;
        const itemId = item.id;
        setStatusId(
          column_values.find((column) => {
            return column.title === "Status";
          }).id
        );
        // console.log("status id", statusId);
        // const itemStatus = item.column_values[1].text;
        // const priority = item.column_values[index].text;
        return { index, itemId, option, itemName, style, column_values };
      });
      const filteredList = tempList.filter((item) => {
        const priorityColumn = item.column_values.find((column) => {
          return column.title === "Priority" && column.text === "Low";
        });
        const statusColumn = item.column_values.find((column) => {
          return column.id !== statusId && column.text === null;
        });
        // console.log("username", userName);
        //Create a hook
        const personColumn = item.column_values.find((column) => {
          return column.title === "Person" && column.text !== userName;
        });
        return (
          Boolean(priorityColumn) &&
          Boolean(statusColumn) &&
          Boolean(personColumn)
        );
      });
      console.log("templist", tempList);
      console.log("filteredList", filteredList);
      setData(filteredList);
    } catch (err) {
      setErrorMessage("Something went wrong");
    }
  };

  useEffect(() => {
    fetchApi();
    // await  get  board id - as
    // await get items - as

    // const {bid} = await fetchApi();
    // const { data} = await getItem(bid);
    // monday.listen("context", (res) => {

    //   console.log(res);
    //   setBoardId(res.data.boardId);
    //   console.log("id", boardId);
    // });
  }, [boardId]);

  return data;
};
