import React, { ComponentType } from 'react'
// @ts-ignore
import Profile from './Profile.tsx'
import { connect } from 'react-redux'
// @ts-ignore
import { getUserProfile, getStatus, updateStatus, savePhoto, updateProfile } from './../../redux/profileReducer.ts'
// @ts-ignore
import { withAuthRedirect } from '../../hoc/WithAuthRedirect.tsx'
import { compose } from 'redux'
// @ts-ignore
import withRouter from '../../hoc/WithRouter.tsx'
// @ts-ignore
import { AppStateType } from './../../redux/reduxStore.ts'
import { ProfileType } from '../../types/types'

type MapStatePropsType = ReturnType<typeof mapStateToProps>
type MapDispatchPropsType = {
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    updateProfile: (profile: ProfileType) => Promise<any>
}
type PropsType = {
    params: any
    history: any
}

class ProfileContainer extends React.Component<MapStatePropsType & MapDispatchPropsType & PropsType> {

    updateProfile() {
        let userId = this.props.params.userId
        if (!userId) {
            userId = this.props.authorizedUserId
            if (!userId) {
                this.props.history.push('/login')
            }
        }
        this.props.getUserProfile(userId);
        this.props.getStatus(userId)
    }

    componentDidMount() {
        this.updateProfile()
    }

    componentDidUpdate(prevProps: PropsType) {
        if (this.props.params.userId !== prevProps.params.userId) {
            this.updateProfile()
        }
    }

    render() {
        return (
            <Profile {...this.props}
                isOwner={!this.props.params.userId}
                profile={this.props.profile}
                status={this.props.status}
                error={this.props.error}
                updateStatus={this.props.updateStatus}
                savePhoto={this.props.savePhoto}
                updateProfile={this.props.updateProfile}
            />
        )
    }
}

const mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
    error: state.profilePage.error
})

export default compose<ComponentType>(
    connect(mapStateToProps, { getUserProfile, getStatus, updateStatus, savePhoto, updateProfile }),
    withRouter,
    withAuthRedirect
)(ProfileContainer)