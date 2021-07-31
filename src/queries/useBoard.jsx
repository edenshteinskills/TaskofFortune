import { useState, useEffect, useCallback } from "react";
import mondaySdk from "monday-sdk-js";

export default () => {
  const [errorMessage, setErrorMessage] = useState("");
  const monday = mondaySdk();
  const [boardId, setBoardId] = useState("");

  const fetchApi = async () => {
    try {
      await monday.listen("context", (res) => {
        console.log(res);
        setBoardId(res.data.boardId);
        console.log("id", boardId);
      });
    } catch (err) {
      setErrorMessage("Something went wrong");
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return boardId;
};
