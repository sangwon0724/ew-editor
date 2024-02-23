import { useState } from "react";

//숫자인지 확인
const isNumber = (value) => {
  return !isNaN(value)
};

const Editor = () => {
  const birthYear = useInput(2024, isNumber);

  return (
    <>
      <h1>아이콘 목록</h1>
      <textarea id="ewEditor"></textarea>
    </>
  );
};

export default Editor;