import React, { useState } from 'react'
import {
  CCol,
  CRow,
  CForm,
  CFormLabel,
  CFormInput,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from '@coreui/react'
import ReactQuill from 'react-quill';
import axios from 'axios';

function goList() {
  location.href = "/#/post/list";
}

const PostRegist = () => {
  const modules = {
    toolbar: {
      container: [
        ["image"],
        [{ header: [1, 2, 3, 4, 5, false] }],
        ["bold", "underline"],
      ],
    },
  };
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [visible, setVisible] = useState(false);
  const handleTitleChange = (e) => {
    setTitle(e.currentTarget.value);
  };
  const handleSubmit = async () => {
    const date = new Date();
    try {
      await createPost({
        title: title,
        content,
        date,
      }).then((res) => {
        //console.log(res);
        setVisible(true);
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  async function createPost (data) {
    //axios 적용하기
      const result = await axios.post('http://localhost:8080/', data, {
        withCredentials: true // 쿠키 cors 통신 설정
      });
      console.log('성공 시, 백엔드가 보내주는 데이터', result.data);
    return Promise.resolve(data);
  }

  return (
    <CRow>
      <CModal
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="LiveDemoExampleLabel"
      >
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle id="LiveDemoExampleLabel">알림</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>저장되었습니다.</p>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={goList}>
            확인
          </CButton>
        </CModalFooter>
      </CModal>
      <CCol xs={12}>
        <CForm>
          <div className="mb-3">
            <CFormLabel htmlFor="exampleFormControlInput1">제목</CFormLabel>
            <CFormInput type="email" id="exampleFormControlInput1" placeholder="제목을 입력해주세요." onChange={handleTitleChange}/>
          </div>
          <div className="mb-3">
            <CFormLabel htmlFor="exampleFormControlTextarea1">내용</CFormLabel>
            <ReactQuill
              style={{ width: "800px", height: "600px" }}
              modules={modules}
              onChange={setContent}
            />
          </div>
          <CCol xs={12} className="position-relative" style={{"marginTop" : "70px", "marginBottom" : "30px"}}>
            <CButton color="primary" type="button" style={{"marginRight" : "10px"}} onClick={handleSubmit}>
              저장
            </CButton>
            <CButton color="primary" type="button" onClick={goList}>
              목록
            </CButton>
          </CCol>
        </CForm>
      </CCol>
    </CRow>
  )
}

export default PostRegist
