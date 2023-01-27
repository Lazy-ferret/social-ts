import React from 'react'
// @ts-ignore
import styles from './ProfileInfo.module.css'
import { Field, Form } from 'react-final-form'
// @ts-ignore
import { Input, Textarea } from '../../common/FormsControl/FormsControl.tsx'
// @ts-ignore
import style from './../../Login/Login.module.css'
import { ProfileType } from '../../../types/types'

type ProfileDataFormPropsType = {
    profile: ProfileType
    saveFormData: (values: ProfileDataFormValuesType) => void
    error: string | null
}

export type ProfileDataFormValuesType = { 
    fullName: string
    lookingForAJob: boolean
    aboutMe: string
}

const ProfileDataForm: React.FC<ProfileDataFormPropsType> = ({ profile, saveFormData, error }) => {

    return (

        <Form
            initialValues={profile}
            onSubmit={saveFormData}>
            {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>

                    <div>
                        <span><b>Full Name:</b></span>
                        <Field
                            component={Input}
                            name={'fullName'}
                            placeholder={'Full Name'} />
                    </div>

                    <div>
                        <span><b>Open to work:</b></span>
                        <Field component={Input} name={'lookingForAJob'} type={'checkbox'} />
                    </div>

                    <div>
                        <span><b>My skills:</b></span>
                        <Field
                            component={Textarea}
                            name={'lookingForAJobDescription'}
                            placeholder={'Describe your skills'} />
                    </div>
                    <div>
                        <span><b>About me:</b></span>
                        <Field component={Input} name={'aboutMe'} placeholder={'About me'} />
                    </div>

                    <div className={styles.contacts}>
                        <span><b>Contacts:</b></span>
                        {Object.keys(profile.contacts).map(key => {
                            return (
                                <div key={key}>
                                    <b>{key}:</b>
                                    <Field component={Input} name={`contacts.${key}`} placeholder={key} />
                                </div>
                            )
                        })}
                    </div>

                    {error && <div className={style.formError}>{error}</div>}

                    <div>
                        <button >save</button>
                    </div>

                </form>
            )}
        </Form>
    )
}

export default ProfileDataForm