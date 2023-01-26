// @ts-ignore
import { actions } from '../../../redux/profileReducer.ts'
// @ts-ignore
import MyPostsMemo from './MyPosts.tsx'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addPost: (newPostText) => {
            dispatch(actions.addPostCreator(newPostText))
        }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPostsMemo)

export default MyPostsContainer