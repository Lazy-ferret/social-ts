import React from 'react'
import { Field, Form } from 'react-final-form'
// @ts-ignore
import { composeValidators, maxLengthCreator, requiredField } from '../../../../utils/validators/validators.ts'
// @ts-ignore
import { Textarea } from '../../../common/FormsControl/FormsControl.tsx'

type AddPostFormPropsType = {
    onSubmit: (values: AddPostFormValuesType) => void
}

export type AddPostFormValuesType = { newPostText: string }

const AddPostForm: React.FC<AddPostFormPropsType> = ({ onSubmit }) => {
    return (
        <Form
            initialValues={{
                newPostText: ''
            }}
            onSubmit={onSubmit}
        >
            {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <div>
                        <Field component={Textarea}
                            validate={composeValidators(requiredField, maxLengthCreator(50))}
                            name={'newPostText'}
                            placeholder={'Enter your post text'}
                        />
                    </div>
                    <div>
                        <button>Add post</button>
                    </div>

                </form>
            )}
        </Form>
    )
}

export default AddPostForm