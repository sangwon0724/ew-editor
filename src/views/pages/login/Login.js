import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const Login = () => {
  const [idValue, setId] = useState('');
  const [pwValue, setPw] = useState('');
  const [visible_id, setVisible_id] = useState(false);
  const [visible_pw, setVisible_pw] = useState(false);

  const saveUserId = event => {
    setId(event.target.value);
  };

  const saveUserPw = event => {
    setPw(event.target.value);
  };

  function login(){
    if(idValue == null || idValue == ""){
      //alert("아이디를 입력해주세요.");
      setVisible_id(true);
      return;
    }

    if(pwValue == null || pwValue == ""){
      //alert("비밀번호를 입력해주세요.");
      setVisible_pw(true);
      return;
    }
  
    let member = {"id":"abc", "pw":"123"};
    sessionStorage.setItem("member", JSON.stringify(member));
    location.href = "/"
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CModal
        visible={visible_id}
        onClose={() => setVisible_id(false)}
        aria-labelledby="LiveDemoExampleLabel"
      >
        <CModalHeader onClose={() => setVisible_id(false)}>
          <CModalTitle id="LiveDemoExampleLabel">알림</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>아이디를 입력해주세요.</p>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible_id(false)}>
            확인
          </CButton>
        </CModalFooter>
      </CModal>
      <CModal
        visible={visible_pw}
        onClose={() => setVisible_pw(false)}
        aria-labelledby="LiveDemoExampleLabel"
      >
        <CModalHeader onClose={() => setVisible_pw(false)}>
          <CModalTitle id="LiveDemoExampleLabel">알림</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>비밀번호를 입력해주세요.</p>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible_pw(false)}>
            확인
          </CButton>
        </CModalFooter>
      </CModal>
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput 
                        placeholder="Id" 
                        autoComplete="id" 
                        value={idValue}
                        onChange={saveUserId}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={pwValue}
                        onChange={saveUserPw}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={login}>
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
