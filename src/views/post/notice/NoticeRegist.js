import React, { useEffect, useMemo, useRef, useState } from 'react'
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
import ReactQuill, { Quill } from 'react-quill';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';
import './../../../css/custom.css';
import ImageResize from 'quill-image-resize';
import { useParams } from 'react-router-dom';
Quill.register('modules/ImageResize', ImageResize);

function goList() {
  location.href = "/#/notice/list";
}

const NoticeRegist = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [visible, setVisible] = useState(false);
  const [visible_title, setVisible_title] = useState(false);
  const [visible_content, setVisible_content] = useState(false);
  const quillRef = useRef();
  const handleTitleChange = (e) => {
    //console.log(e.currentTarget.value);
    setTitle(e.currentTarget.value);
  };

  /**
   * 게시글 상세 반환
   */
  async function getPost(id){
    return await fetch("http://localhost:8080/posts/" + id,{
        method: "GET",
      },)
      .then((response) => response.json())
      .then((data) => data);
  }

  useEffect(() => {
    console.log("id", id)
    if(id != null && id != ""){
      getPost(id)
      .then(jsonData => {
        setTitle(jsonData.title);
        setContent(jsonData.content);
      })
      .catch(error => console.error(error));
    }
  }, []);
  const handleContentChange = async (newContent) => {
    await setContent(newContent);
  
    const editor = quillRef.current.getEditor();
    editor.setContent(newContent);
  };
  const handleSubmit = async () => {
    const date = new Date();

    if(title == null || title == ""){
      setVisible_title(true);
      return;
    }

    if(content == null || content == ""){
      setVisible_content(true);
      return;
    }

    try {
      await createPost({
        id: id,
        title: title,
        content: content,
        date,
        views: 0,
        viewYn: 'Y'
      }).then((res) => {
        //console.log(res);
        setVisible(true);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const imageHandler = () => {
    console.log('에디터에서 이미지 버튼을 클릭하면 이 핸들러가 시작됩니다!');
  
    // 1. 이미지를 저장할 input type=file DOM을 만든다.
    const input = document.createElement('input');
    // 속성 써주기
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click(); // 에디터 이미지버튼을 클릭하면 이 input이 클릭된다.
    // input이 클릭되면 파일 선택창이 나타난다.
  
    // input에 변화가 생긴다면 = 이미지를 선택
    input.addEventListener('change', async () => {
      console.log('온체인지');
      const file = input.files[0];
      // multer에 맞는 형식으로 데이터 만들어준다.
      const formData = new FormData();
      formData.append('file', file); // formData는 키-밸류 구조
      // 백엔드 multer라우터에 이미지를 보낸다.
      try {
        const result = await axios.post("http://localhost:8080/files/regist", formData, { headers: {'Content-Type': 'multipart/form-data;'}});
        
        /*fetch("http://localhost:8080/files/regist",{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },)*/
        var imageUrl = `http://localhost:8080${result.data.url}`;
        console.log('imageUrl', imageUrl);
        const IMG_URL = imageUrl;

        const editor = quillRef.current.getEditor(); // 에디터 객체 가져오기
        const range = editor.getSelection();
        editor.insertEmbed(range.index, 'image', IMG_URL);
      } catch (error) {
        console.log('실패했습니다.');
      }
    });
  };
  
  async function createPost (data) {
    //axios 적용하기
      /*const result = await axios.post('http://localhost:8080/', data, {
        withCredentials: true // 쿠키 cors 통신 설정
      });*/
      let method = "POST";
      let url = "http://localhost:8080/posts"
      if(id != null && id != ""){
        method = "PUT";
        url += "/" + id;
      }
      fetch(url,{
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },)
      .then((response) => response.json())
      .then((data) => console.log(data));
    return Promise.resolve(data);
  }
  const modules = useMemo(()=>{
    return {
      toolbar: {
        container: [
          ["image"],
          [{ header: [1, 2, 3, 4, 5, false] }],
          ["bold", "underline"],
        ],
        handlers: {
          image: imageHandler, //핸들러가 있으면 setContent했을 때 에디터가 사라짐
        },
      },
      ImageResize: {
        parchment: Quill.import('parchment')
      }
    };
  }, []);

  return (
    <CRow>
      <CModal
        visible={visible_title}
        onClose={() => setVisible_title(false)}
        aria-labelledby="LiveDemoExampleLabel"
      >
        <CModalHeader onClose={() => setVisible_title(false)}>
          <CModalTitle id="LiveDemoExampleLabel">알림</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>제목을 입력해주세요.</p>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible_title(false)}>
            확인
          </CButton>
        </CModalFooter>
      </CModal>
      <CModal
        visible={visible_content}
        onClose={() => setVisible_content(false)}
        aria-labelledby="LiveDemoExampleLabel"
      >
        <CModalHeader onClose={() => setVisible_content(false)}>
          <CModalTitle id="LiveDemoExampleLabel">알림</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>내용을 입력해주세요.</p>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible_content(false)}>
            확인
          </CButton>
        </CModalFooter>
      </CModal>
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
            <CFormInput type="text" id="exampleFormControlInput1" placeholder="제목을 입력해주세요." value={title} onChange={handleTitleChange}/>
          </div>
          <div className="mb-3">
            <CFormLabel htmlFor="exampleFormControlTextarea1">내용</CFormLabel>
            <ReactQuill
              ref={quillRef}
              theme="snow"
              placeholder="내용을 입력해주세요."
              style={{ width: "800px", height: "600px" }}
              value={content}
              onChange={handleContentChange}
              modules={modules}
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

export default NoticeRegist
