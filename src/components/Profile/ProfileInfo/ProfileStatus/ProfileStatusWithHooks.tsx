import React, { ChangeEvent } from 'react'
import { useEffect, useState } from 'react'

type PropsType = {
    status: string
    updateStatus: (status: string) => void
}

const ProfileStatusWithHooks: React.FC<PropsType> = (props) => {
    const [editMode, setEditMode] = useState(false)
    const [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    return (
        <div>
            {
                !editMode &&

                <div>
                    <b>Status:</b>
                    <span
                        onDoubleClick={activateEditMode}
                    >{props.status || '-------------'}</span>
                </div>
            }
            {
                editMode &&
                <div>
                    <input autoFocus={true}
                        value={status}
                        onBlur={deactivateEditMode}
                        onChange={onInputChange} />
                </div>
            }
        </div >
    )
}

export default ProfileStatusWithHooks