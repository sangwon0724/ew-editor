import {
  CCol,
  CRow,
  CPagination,
  CPaginationItem,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
} from '@coreui/react'
import { useEffect, useState } from 'react';

/**
 * 게시글 목록 반환
 */
async function getPosts(){
  return await fetch("http://localhost:8080/posts",{
      method: "GET",
    },)
    .then((response) => response.json())
    .then((data) => data);

  /*return [
    {
      id: 10,
      title: "[공지] 2024년 3월 경영회의 회의록",
      regDate: "2024-03-12 16:52",
      views: "20",
      viewYn: "Y",
    },
    {
      id: 9,
      title: "[공지] 2024년 3월 경영회의 회의록",
      regDate: "2024-03-11 11:05",
      views: "27",
      viewYn: "Y",
    },
    {
      id: 8,
      title: "[공지] 2024년 3월 경영회의 회의록",
      regDate: "2024-03-11 10:52",
      views: "6",
      viewYn: "Y",
    },
    {
      id: 7,
      title: "[공지] 2024년 3월 경영회의 회의록",
      regDate: "2024-03-11 10:52",
      views: "6",
      viewYn: "Y",
    },
    {
      id: 6,
      title: "[공지] 2024년 3월 경영회의 회의록",
      regDate: "2024-03-11 10:52",
      views: "6",
      viewYn: "Y",
    },
    {
      id: 5,
      title: "[공지] 2024년 3월 경영회의 회의록",
      regDate: "2024-03-11 10:52",
      views: "6",
      viewYn: "Y",
    },
    {
      id: 4,
      title: "[공지] 2024년 3월 경영회의 회의록",
      regDate: "2024-03-11 10:52",
      views: "6",
      viewYn: "Y",
    },
    {
      id: 3,
      title: "[공지] 2024년 3월 경영회의 회의록",
      regDate: "2024-03-11 10:52",
      views: "6",
      viewYn: "Y",
    },
    {
      id: 2,
      title: "[공지] 2024년 3월 경영회의 회의록",
      regDate: "2024-03-11 10:52",
      views: "6",
      viewYn: "Y",
    },
    {
      id: 1,
      title: "[공지] 2024년 3월 경영회의 회의록",
      regDate: "2024-03-11 10:52",
      views: "6",
      viewYn: "Y",
    },
  ];*/
}

/**
 * 상세 페이지 이동
 * @param {*} no 
 */
function goDetail(no) {
  location.href= "/#/post/detail/" + no;
}

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
      getPosts(response => response.json())
      .then(jsonData => setPosts(jsonData))
      .catch(error => console.error(error));
  }, []);

  console.log(posts)
  const _postList = Array.from(posts).map((item, index)=>{
    return <>
      <CTableRow key={item.id} onClick={() => {goDetail(item.id)}}>
        <CTableHeaderCell scope="row">{item.title}</CTableHeaderCell>
        <CTableDataCell>{item.regDate}</CTableDataCell>
        <CTableDataCell>{item.views}</CTableDataCell>
        <CTableDataCell>{item.viewYn}</CTableDataCell>
      </CTableRow>
    </>;
  });

  return (
    <CRow>
      <CCol xs={12}>
        <CTable hover className="mb-4">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col" className="w-45">제목</CTableHeaderCell>
              <CTableHeaderCell scope="col" className="w-20">작성일</CTableHeaderCell>
              <CTableHeaderCell scope="col" className="w-20">조회 수</CTableHeaderCell>
              <CTableHeaderCell scope="col" className="w-15">노출 여부</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {_postList}
          </CTableBody>
        </CTable>
        <CCol xs={12} className="position-relative" style={{"marginBottom" : "15px", "display": "flex", "justifyContent": "flex-end"}}>
          <CButton color="primary" type="button" style={{"marginRight" : "10px"}} onClick={() => location.href = "/#/post/regist"}>
            등록
          </CButton>
        </CCol>
        <CPagination aria-label="Page navigation example">
          <CPaginationItem aria-label="Previous" disabled>
            <span aria-hidden="true">&laquo;</span>
          </CPaginationItem>
          <CPaginationItem active>1</CPaginationItem>
          <CPaginationItem>2</CPaginationItem>
          <CPaginationItem>3</CPaginationItem>
          <CPaginationItem aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </CPaginationItem>
        </CPagination>
      </CCol>
    </CRow>
  )
}

export default PostList
