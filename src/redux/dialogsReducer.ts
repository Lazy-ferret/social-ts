import { InferActionsTypes } from './reduxStore'

const ADD_MESSAGE = 'social-network/dialogs/ADD-MESSAGE'

type MessageType = {
    id: number
    message: string
}

type DialogType = {
    id: number
    name: string
}

type ActionsType = InferActionsTypes<typeof actions>

export type InitialStateType = typeof initialState

const initialState = {
    messages: [
        { id: 1, message: 'Hi' },
        { id: 2, message: 'How are you doing?' },
        { id: 3, message: 'Oh shit' }
    ] as Array<MessageType>,
    dialogs: [
        { id: 1, name: 'Alex' },
        { id: 2, name: 'Ksu' },
        { id: 3, name: 'Nickel' },
        { id: 4, name: 'Lisa' },
        { id: 5, name: 'Myshka' }
    ] as Array<DialogType>
}

export const actions = {
    addMessage: (newMessage: string) => ({ type: ADD_MESSAGE, newMessage } as const)
}

const dialogsReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case ADD_MESSAGE:
            const newMessage = {
                id: 5,
                message: action.newMessage
            }
            return {
                ...state,
                messages: [...state.messages, newMessage]
            }
        default:
            return state
    }
}

export default dialogsReducer