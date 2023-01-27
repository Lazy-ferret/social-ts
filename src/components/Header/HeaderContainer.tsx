import React from 'react'
import { connect } from 'react-redux'
// @ts-ignore
import Header from './Header.tsx'
// @ts-ignore
import { logout } from './../../redux/authReducer.ts'
// @ts-ignore
import { AppStateType } from './../../redux/reduxStore.ts'
import { HeaderDispatchPropsType, HeaderStatePropsType } from './Header'

class HeaderContainer extends React.Component<HeaderDispatchPropsType & HeaderStatePropsType> {
    render() {
        return (
            <Header {...this.props} />
        )
    }
}

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

export default connect<HeaderStatePropsType, HeaderDispatchPropsType, {}, AppStateType>(mapStateToProps, { logout })(HeaderContainer)