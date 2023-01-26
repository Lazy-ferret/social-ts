// @ts-ignore
import { actions } from '../../redux/dialogsReducer.ts'
// @ts-ignore
import Dialogs from './Dialogs.tsx'
import { connect } from 'react-redux'
// @ts-ignore
import { withAuthRedirect } from '../../hoc/WithAuthRedirect.tsx'
import { compose } from 'redux'
import { AppStateType } from '../../redux/reduxStore'
import { ComponentType } from 'react'


const mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: state.dialogsPage,
    }
}

export default compose<ComponentType>(
    connect(mapStateToProps, { addMessage: actions.addMessage }),
    withAuthRedirect
)(Dialogs)