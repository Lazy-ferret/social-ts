import dialogsReducer from "./dialogsReducer"
import profileReducer from "./profileReducer"

const store = {
    _state: {
        profilePage: {
            posts: [
                { id: 1, message: 'Hi, how are you?', likesCount: 5 },
                { id: 2, message: "It's my first post", likesCount: 15 },
            ],
            newPostText: ''
        },
        dialogsPage: {
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
            ],
            newMessageText: ''
        }
    },

    _callSubscriber() {
        console.log('state is changed')
    },

    getState() {
        return this._state
    },

    subscribe(observer) {
        this._callSubscriber = observer
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._callSubscriber(this._state)        
    }
}

export default store
window.store = store
