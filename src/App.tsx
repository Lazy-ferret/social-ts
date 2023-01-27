import React, { Suspense } from 'react'
import { connect } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
// @ts-ignore
import HeaderContainer from './components/Header/HeaderContainer.tsx'
// @ts-ignore
import Login from './components/Login/Login.tsx'
// @ts-ignore
import Music from './components/Music/Music.tsx'
// @ts-ignore
import Navbar from './components/Navbar/Navbar.tsx'
import News from './components/News/News'
// @ts-ignore
import Settings from './components/Settings/Settings.tsx'
// @ts-ignore
import UsersContainer from './components/Users/UsersContainer.tsx'
// @ts-ignore
import { initializeApp } from './../src/redux/appReducer.ts'
import { compose } from 'redux'
// @ts-ignore
import withRouter from './hoc/WithRouter.tsx'
// @ts-ignore
import Preloader from './components/common/Preloader/Preloader.tsx'
import { ComponentType } from 'react'
// @ts-ignore
import { AppStateType } from './redux/reduxStore.ts'

// @ts-ignore
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer.tsx'))
// @ts-ignore
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer.tsx'))

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializeApp: () => void
}
class App extends React.Component<MapPropsType & DispatchPropsType> {

  catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
    alert('Some error ')
  }

  componentDidMount() {
    this.props.initializeApp()
    window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
  }

  componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }

    return (


      <div className="app-wrapper">
        <HeaderContainer />

        <Navbar />

        <div className='app-wrapper-content'>
          <Suspense fallback={<Preloader />}>
            <Routes >

              <Route 
              // exact  
              path="/" element={<Navigate to={'/profile'} />} />

              <Route path="/profile/" element={<ProfileContainer />}>
                <Route path=":userId" element={<ProfileContainer />} />
              </Route>

              <Route
                path="/dialogs/*"
                element={<DialogsContainer />}
              />

              <Route
                path="/users"
                element={<UsersContainer pageTitle='Users' />} />

              <Route
                path="/login"
                element={<Login />} />

              <Route path="/news"
                element={<News />} />

              <Route
                path="/music"
                element={<Music />} />

              <Route
                path="/settings"
                element={<Settings />} />

              <Route
                path="*"
                element={<div>404 NOT FOUND</div>} />
            </Routes>
          </Suspense>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized
})

export default compose<ComponentType>(
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App);
