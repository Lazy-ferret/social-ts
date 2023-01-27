import React from 'react'
import { Field, Form } from 'react-final-form'
import { InitialStateType } from '../../redux/dialogsReducer'
// @ts-ignore
import { composeValidators, maxLengthCreator, requiredField } from '../../utils/validators/validators.ts'
// @ts-ignore
import { Textarea } from '../common/FormsControl/FormsControl.tsx'
// @ts-ignore
import DialogItem from './DialogItem/DialogItem.tsx'
// @ts-ignore
import s from './Dialogs.module.css'
// @ts-ignore
import Message from './Message/Message.tsx'

type PropsType = {
    dialogsPage: InitialStateType
    addMessage: (newMessageText: string) => void
}

const Dialogs: React.FC<PropsType> = (props) => {
    const state = props.dialogsPage
    const dialogsElements = state.dialogs.map(dialog => <DialogItem name={dialog.name} key={dialog.id} id={dialog.id} />)
    const messagesElements = state.messages.map(message => <Message message={message.message} key={message.id} />)

    const onAddNewMessageClick = (values: { newMessageText: string }) => {
        props.addMessage(values.newMessageText)
        values.newMessageText = ''
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogs_items}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <AddMessageForm onSubmit={onAddNewMessageClick} />
            </div>
        </div>
    )
}

type AddMessageFormPropsType = {
    onSubmit: (values: { newMessageText: string }) => void
}

const AddMessageForm: React.FC<AddMessageFormPropsType> = ({ onSubmit }) => {

    return (
        <Form
            initialValues={{
                newMessageText: ''
            }}
            onSubmit={onSubmit}
        >
            {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>

                    <div>
                        <Field component={Textarea}
                            name={'newMessageText'}
                            placeholder={'Enter your message'}
                            validate={composeValidators(requiredField, maxLengthCreator(10))}
                        />
                    </div>
                    <div>
                        <button>Send</button>
                    </div>

                </form>
            )}
        </Form>
    )
}

export default Dialogs