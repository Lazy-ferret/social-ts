import React from "react";
import styles from './ProfileInfo.module.css'
import Contact from "./Contact";

const ProfileData = ({ profile, isOwner, toEditMode }) => {
    return (
        <div className={styles.description}>
            <div className={styles.name}>{profile.fullName}</div>

            {profile.aboutMe && <div>
                {<span><b>About me:</b>{profile.aboutMe}</span>}
            </div>}

            <div>
                {<span><b>Open to work:</b>{profile.lookingForAJob ? 'YES' : 'NO'}</span>}
            </div>

            {profile.lookingForAJob && profile.lookingForAJobDescription &&
                <span><b>My skills:</b>{profile.lookingForAJobDescription}</span>
            }

            <div className={styles.contacts}>
                <b>Contacts:</b>
                {Object.keys(profile.contacts).map(key => {
                    return profile.contacts[key] &&
                        <Contact key={key}
                            contactTitle={key}
                            contactValue={profile.contacts[key]} />
                })}
            </div>
            {isOwner && <div><button onClick={toEditMode}>edit</button></div>}
        </div>
    )
}

export default ProfileData