import React, { useState } from "react";
import Preloader from "../../common/Preloader/Preloader";
import styles from './ProfileInfo.module.css'
// import ProfileStatus from "./ProfileStatus/ProfileStatus";
import ProfileStatusWithHooks from "./ProfileStatus/ProfileStatusWithHooks";
import userPhoto from './../../../assets/images/user.jpg'
import ProfileDataForm from "./ProfileDataForm";
import ProfileData from "./ProfileData";

const ProfileInfo = ({ profile, savePhoto, isOwner, status, updateStatus, updateProfile, error }) => {
    const [editMode, setEditMode] = useState(false)

    if (!profile) {
        return <Preloader />
    }

    const onMainPhotoChanged = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    const saveFormData = (formData) => {
        updateProfile(formData)
            .then(() => setEditMode(false))
    }

    return (
        <div >
            <div >
                <img className={styles.profilePhoro} src={profile.photos.large || userPhoto} alt='profile_photo' />
                {isOwner && <input type='file' onChange={onMainPhotoChanged} />}
                {editMode
                    ? <ProfileDataForm
                        profile={profile}
                        saveFormData={saveFormData}
                        error={error} />
                    : <ProfileData profile={profile}
                        isOwner={isOwner}
                        toEditMode={() => setEditMode(true)} />}
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
                {/* <ProfileStatus status={props.status} updateStatus={props.updateStatus} /> */}
            </div>
        </div>
    )
}

export default ProfileInfo