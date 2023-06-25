import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    users: [],
    posts: [],
    allPosts: [],
    conversation: [],
    currentChat: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.accessToken
        },
        setUserData: (state, action) => {
            state.user = action.payload.user
        },
        setLogout: (state) => {
            state.user = null
            state.token = null
            state.users= []
            state.allPosts= []
            state.posts=[]
            state.conversation = []
            state.currentChat = null
        },
        setFriends: (state, action) => {
            if (state.user) {
                state.user.friends = action.payload.friends;
            } else {
                console.error("user friends non-existent :(");
            }
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts
        },
        setAllposts: (state, action) => {
            state.allPosts = action.payload.posts
        },
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if (post?._id === action.payload.posts._id) return action.payload.posts;
                return post;
            })
            state.posts = updatedPosts
        },
        setDeletePost: (state, action) => {
            state.posts = state.posts.filter(post => post._id !== action.payload.id)
        },
        setAllUsers: (state, action) => {
            const users = action.payload.users
            state.users = users
        },
        setCurrentChat: (state, action) => {
            const currentChat = action.payload
            state.currentChat = currentChat
        },
        setConversation: (state, action) => {
            const conversation = action.payload
            state.conversation = conversation
        },
    }
})

export const { islogin,
    setLogin, setLogout,
    setPost, setPosts,
    setFriends, setUserData,
    setAllUsers, setAllposts,
    setDeletePost, setCurrentChat, setConversation
} = userSlice.actions

export default userSlice.reducer;