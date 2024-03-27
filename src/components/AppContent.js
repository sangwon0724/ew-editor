import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import routes from '../routes'
import NoticeRegist from '../views/post/notice/NoticeRegist'
import FileList from '../views/post/file/FileList'

const AppContent = () => {
  return (
    <CContainer className="px-4" lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            )
          })}
          <Route exact path='notice/detail/:id' element={<NoticeRegist/>} />
          <Route exact path='file/list/:id' element={<FileList/>} />
          <Route path="/" element={<Navigate to={isLogined() ? "dashboard" :"login"} replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  )
}


function isLogined() {
  let member = sessionStorage.getItem("member");
  return member != null;
}

export default React.memo(AppContent)
