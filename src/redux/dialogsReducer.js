const ADD_MESSAGE = 'social-network/dialogs/ADD-MESSAGE'

const initialState = {
    messages: [
        { id: 1, message: 'Hi' },
        { id: 2, message: 'How are you doing?' },
        { id: 3, message: 'Oh shit' }
    ],
    dialogs: [
        { id: 1, name: 'Alex' },
        { id: 2, name: 'Ksu' },
        { id: 3, name: 'Nickel' },
        { id: 4, name: 'Lisa' },
        { id: 5, name: 'Myshka' }
    ]
}

const dialogsReducer = (state = initialState, action) => {
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

export const addMessageCreator = (newMessage) => ({ type: ADD_MESSAGE, newMessage })

