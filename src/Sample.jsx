import { useState } from "react";

//숫자인지 확인
const isNumber = (value) => {
  return !isNaN(value)
};

const useInput = (initialValue, validator) => {
  console.log("호출!");
  console.log("============================================")
  const [value, setValue] = useState(() => initialValue);
  const handleInputValue = (event) => {
    console.log("이 때 호출?")
    console.log("event.nativeEvent.isComposing : " + event.nativeEvent.isComposing)

    const newValue = event.target.value;
    console.log("1 : value : " + value + " / newValue : " + newValue) //콘솔
    let isValid = false; //유효성 검증 통과 여부
    if (typeof validator === 'function') {
      isValid = validator(newValue);
    }
    console.log("2 : isValid : " + isValid)
    if(isValid){
      setValue(newValue);
    } else {
      //후속 조치
      console.log("숫자 아님");
    }
    console.log("3 : value : " + value + " / newValue : " + newValue) //콘솔
    console.log("============================================")
  }

  return { value, handleInputValue};
}

const Sample = () => {
  const birthYear = useInput(2024, isNumber);

  return (
    <>
      <h1>useInput 연습하기</h1>
      <input placeholder="몇 년도에 태어나셨나요?" value={birthYear.value} onChange={birthYear.handleInputValue} />
    </>
  );
};

export default Sample;