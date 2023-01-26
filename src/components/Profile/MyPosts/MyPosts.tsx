import React from 'react'
import { PostsType } from '../../../types/types'
import { AddPostFormValuesType } from './AddPostForm/AddPostForm'
// @ts-ignore
import AddPostForm from './AddPostForm/AddPostForm.tsx'
import s from './MyPosts.module.css'
import Post from './Post/Post'

type PropsType = {
    posts: Array<PostsType>
    addPost: (newPostText: string) => void
}

const MyPosts: React.FC<PropsType> = (props) => {
    const postsElements = [...props.posts]
        .reverse()
        .map(post => <Post message={post.message} likesCount={post.likesCount} key={post.id} />)

    const onAddPost = (values: AddPostFormValuesType) => {
        props.addPost(values.newPostText)
        values.newPostText = ''
    }

    return (
        <div className={s.posts_block}>
            <h3>My posts</h3>
            <AddPostForm onSubmit={onAddPost} />
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}

const MyPostsMemo = React.memo(MyPosts)

export default MyPostsMemo
