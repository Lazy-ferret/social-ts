import React from 'react'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'
// @ts-ignore
import { AppStateType } from '../redux/reduxStore.ts'

type MapStatePropsType = {
    isAuth: boolean
}

type MapDispatchPropsType = {}

export function withAuthRedirect<WrappedComponentProps>(WrappedComponent: React.ComponentType<WrappedComponentProps>) {

    const RedirectComponent: React.FC<WrappedComponentProps & MapStatePropsType & MapDispatchPropsType> = (props) => {
        const { isAuth, ...restProps } = props
        if (!isAuth) return <Navigate to={'/login'} />
        // @ts-ignore
        return <WrappedComponent {...restProps as WrappedComponentProps} />
    }

    const mapStateToPropsForRedirect = (state: AppStateType) => ({
        isAuth: state.auth.isAuth
    } as MapStatePropsType)
    // @ts-ignore
    let ConnectedAuthRedirectComponent = connect<MapStatePropsType, MapDispatchPropsType, WrappedComponentProps, AppStateType>(mapStateToPropsForRedirect)(RedirectComponent)

    return ConnectedAuthRedirectComponent
}