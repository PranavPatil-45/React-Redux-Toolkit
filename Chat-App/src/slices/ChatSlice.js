import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../firebase/firebase'
import { setDoc, collection, doc } from 'firebase/firestore'


export const createChat = createAsyncThunk("chat/createChat", async ({sender, chats}) => {
    console.log("create chat called .... ");
    await setDoc(doc(db, "chatroom", sender), {
        sender: "admin@gmail.com",
        message: "hello user 45",
        timestamp: new Date(),
    });
    console.log("chat created .... ");
    return sender;
});

export const fetchChats = createAsyncThunk("chat/fetchChats", async ({sender}) => {

});

const sendMessage = createAsyncThunk("chat/sendMessage", async () => {

});





const initialState = {
    isLoding: true,
    error: null,
    chats: []
};

//todo chat slice
const chatSlice = createSlice({
    name: "chats",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createChat.fulfilled, (state, action) => {
            console.log("chat created .... ", action.payload);
        })
    }
});

export default chatSlice.reducer;