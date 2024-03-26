import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import routes from '../routes'
import PostRegist from '../views/post/PostRegist'

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
          <Route exact path='post/detail/:id' element={<PostRegist/>} />
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
