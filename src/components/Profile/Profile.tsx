import React from 'react'
// @ts-ignore
import MyPostsContainer from './MyPosts/MyPostsContainer.tsx'
import ProfileInfo from './ProfileInfo/ProfileInfo'

const Profile = ({ profile, status, updateStatus, isOwner, savePhoto, updateProfile, error }) => {

    return (
        <div >
            <ProfileInfo
                isOwner={isOwner}
                profile={profile}
                status={status}
                updateStatus={updateStatus}
                savePhoto={savePhoto}
                updateProfile={updateProfile} 
                error={error}/>
            <MyPostsContainer />
        </div>
    )
}

export default Profile 