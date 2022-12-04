import profileReducer, { addPostCreator, deletePostCreator } from "./profileReducer";

const state = {
    posts: [
        { id: 1, message: 'Hi, how are you?', likesCount: 5 },
        { id: 2, message: "It's my first post", likesCount: 15 },
    ]
}

test('length of posts should be incremented', () => {
    let action = addPostCreator('new post text')
    let newState = profileReducer(state, action)
    expect(newState.posts.length).toBe(3);
});

test('new post should be added with right message', () => {
    let action = addPostCreator('new post text')
    let newState = profileReducer(state, action)
    expect(newState.posts[2].message).toBe('new post text');
});

test('new post should be added with no likes', () => {
    let action = addPostCreator('new post text')
    let newState = profileReducer(state, action)
    expect(newState.posts[2].likesCount).toBe(0);
});

test('length of posts after deleting should be dencremented', () => {
    let action = deletePostCreator(1)
    let newState = profileReducer(state, action)
    expect(newState.posts.length).toBe(1);
});



