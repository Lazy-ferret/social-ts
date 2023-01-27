// @ts-ignore
import { actions } from '../../../redux/profileReducer.ts'
// @ts-ignore
import MyPostsMemo from './MyPosts.tsx'
import { connect } from 'react-redux'
// @ts-ignore
import { AppStateType } from '../../../redux/reduxStore.ts'
import { MyPostsDispatchPropsType, MyPostsStatePropsType } from './MyPosts'

const mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}

const MyPostsContainer = connect<MyPostsStatePropsType, MyPostsDispatchPropsType, {}, AppStateType>(mapStateToProps, {
    addPost: actions.addPostCreator
})(MyPostsMemo)

export default MyPostsContainer