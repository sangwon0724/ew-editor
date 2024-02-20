import { useState } from "react";


const items = [
  {
    tabName: "첫번째 버튼",
    content: "첫번째 내용"
  },
  {
    tabName: "두번째 버튼",
    content: "두번째 내용"
  },
  {
    tabName: "세번째 버튼",
    content: "세번째 내용"
  }
];

const useTabs = (initialTab, allTabs) => {
  if(!allTabs || !Array.isArray(allTabs)){
      return; 
  }
  const [currentIndex, setCurrentIndex] = useState(() => initialTab);
  return {
      currentItem : allTabs[currentIndex],
      changeItem : setCurrentIndex
  };
};

const Sample = () => {
  const {currentItem, changeItem} = useTabs(0, items);

  return (
    <>
      <h1>useTabs 연습하기</h1>
      {items.map((item, index) => <button key={index} onClick={() => changeItem(index)}>{item.tabName}</button>)}
      <div>{currentItem.content}</div>
    </>
  );
};

export default Sample;