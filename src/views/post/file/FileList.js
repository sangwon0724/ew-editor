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
  CFormCheck,
  CButton,
} from '@coreui/react'
import { useEffect, useState } from 'react';
import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';
import { useParams } from 'react-router-dom';

/**
 * 파일 목록 반환
 */
async function getFiles(){
  return await fetch("http://localhost:8080/files",{
      method: "GET",
    },)
    .then((response) => response.json())
    .then((data) => data);
}

/**
 * 상세 페이지 이동
 * @param {*} no 
 */
function goDetail(path) {
  location.href= "/#/file/list" + path;
}

const NoticeList = () => {
  const [files, setFiles] = useState([]);
  const [checkItems, setCheckItems] = useState([]);
  const { id } = useParams();

  useEffect(() => {
      getFiles(response => response.json())
      .then(jsonData => setFiles(jsonData))
      .catch(error => console.error(error));
  }, []);

  const _FileList = Array.from(files).map((item, index)=>{
    return <>
      <CTableRow key={item.id}>
        <CTableHeaderCell scope="row">
          <CFormCheck id="flexCheckDefault" label="" onChange={(e) => handleSingleCheck(e.target.checked, item.id)} checked={checkItems.includes(item.id) ? true : false}/>
        </CTableHeaderCell>
        <CTableDataCell><CIcon icon={icon.cilImage} size="xl" style={{"marginRight" : "10px"}}/>{item.oldFileNm}</CTableDataCell>
      </CTableRow>
    </>;
  });
  
  const folders = [
    {id: 999, title: '/icon'},
    {id: 888, title: '/editor'},
    {id: 777, title: '/event'},
    {id: 666, title: '/profile'}
  ];
  
  const _FolderList = id == null || id == "" ? folders.map((item, index)=>{
    return <>
      <CTableRow key={item.id}>
        <CTableHeaderCell scope="row">
          <CFormCheck id="" label="" name='check' onChange={(e) => handleSingleCheck(e.target.checked, item.id)} checked={checkItems.includes(item.id) ? true : false}/>
        </CTableHeaderCell>
        <CTableDataCell onClick={(e) => goDetail(item.title)}><CIcon icon={icon.cilFolderOpen} size="xl" style={{"marginRight" : "10px", "letterSpacing": "7px"}}/>{item.title}</CTableDataCell>
      </CTableRow>
    </>;
  }) : <>
  <CTableRow>
    <CTableHeaderCell scope="row">
      <CFormCheck id="" label="" name='check' disabled/>
    </CTableHeaderCell>
    <CTableDataCell onClick={(e) => goDetail('')}><CIcon icon={icon.cilFolderOpen} size="xl" style={{"marginRight" : "10px"}}/>../</CTableDataCell>
  </CTableRow>
</>;
  
  // 체크박스 단일 선택
  const handleSingleCheck = (checked, id) => {
    if (checked) {
      // 단일 선택 시 체크된 아이템을 배열에 추가
      setCheckItems(prev => [...prev, id]);
    } else {
      // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
      setCheckItems(checkItems.filter((el) => el !== id));
    }
  };

  // 체크박스 전체 선택
  const handleAllCheck = (checked) => {
    if(checked) {
      // 전체 선택 클릭 시 데이터의 모든 아이템(id)를 담은 배열로 checkItems 상태 업데이트
      const idArray = [];
      folders.forEach((el) => idArray.push(el.id));
      files.forEach((el) => idArray.push(el.id));
      setCheckItems(idArray);
    }
    else {
      // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
      setCheckItems([]);
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCol xs={12} className="position-relative" style={{"marginBottom" : "15px", "display": "flex", "justifyContent": "flex-start", "fontSize": "20px", "fontWeight": "bold"}}>
          현재 경로 : {id == null || id == "" ? `/` : `/${id}`}
        </CCol>
        <CTable hover className="mb-4">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col" style={{"width" : "5%"}}>
                <CFormCheck id="allCheck" label="" name='check' onChange={(e) => handleAllCheck(e.target.checked)} checked={checkItems.length > 0 && checkItems.length === (folders.length + files.length) ? true : false} />
              </CTableHeaderCell>
              <CTableHeaderCell scope="col" style={{"width" : "95%"}}>파일명</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {_FolderList}
            {_FileList}
          </CTableBody>
        </CTable>
          <CCol xs={12} className="position-relative" style={{"marginTop" : "35px", "marginBottom" : "30px", "display": "flex", "justifyContent": "flex-end"}}>
            <CButton color="primary" type="button" style={{"marginRight": "10px"}}>
              등록
            </CButton>
            <CButton color="primary" type="button">
              삭제
            </CButton>
          </CCol>
      </CCol>
    </CRow>
  )
}

export default NoticeList
