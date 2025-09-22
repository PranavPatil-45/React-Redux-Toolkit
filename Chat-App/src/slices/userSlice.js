import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { store, auth } from "../Firebase/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


export const addUser = createAsyncThunk(
  "users/addUser",
  async ({ name, email, password }) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const docRef = await addDoc(collection(store, "users"), {
      uid: user.uid,
      name,
      email,
      createdAt: new Date(),
    });

    return { id: docRef.id, uid: user.uid, name, email };
  }
);

export const signInUser = createAsyncThunk(
  "users/signIn",
  async ({ email, password }) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return { uid: user.uid, email: user.email, displayName: user.displayName };
  }
);

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const querySnapshot = await getDocs(collection(store, "users"));
  const users = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return users;
});

const initialState = {
  currentUser: null,
  users: [],
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    signOut: (state) => {
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUser.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(addUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.users.push(action.payload);
        state.isLoading = false;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })

      .addCase(signInUser.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isLoading = false;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.error = action.error.message || "Failed to sign in";
        state.isLoading = false;
      })

      .addCase(fetchUsers.pending, (state) => { state.isLoading = true; })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchUsers.rejected, (state) => { state.isLoading = false; state.error = "Failed to fetch users"; });
  },
});

export const { signOut } = userSlice.actions;
export default userSlice.reducer;
