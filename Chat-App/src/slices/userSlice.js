import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db, auth } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

// Create user signup - auth
const signUpUser = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = {
    uid: userCredential.user.uid, 
    email: userCredential.user.email,
    displayName: userCredential.user.displayName,
    image: userCredential.user.photoURL,
  }; 
  return user;
};

export const signInUser = createAsyncThunk(
  "users/signIn",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      console.log("Signing in user:", email);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      
      const user = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
        image: userCredential.user.photoURL,
      };
      
      console.log("User signed in successfully:", user);
      return user;
    } catch (error) {
      console.error("Sign in error:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const listenToAuthChanges = () => (dispatch) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        image: user.photoURL,
      };
      dispatch(setCurrentUser(userData));
    } else {
      dispatch(setCurrentUser(null));
    }
  });
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const querySnapshot = await getDocs(collection(db, "users"));
  const users = querySnapshot.docs.map((doc) => {
    return {
      ...doc.data(),
      id: doc.id
    }
  });
  return users;
});

export const addUser = createAsyncThunk(
  "users/addUser",
  async ({ email, password, name }, { rejectWithValue }) => {
    try {
      console.log("Creating user:", email);
      const user = await signUpUser(email, password);
      
      if (user) {
        console.log("Adding user to Firestore");
        const docRef = await addDoc(collection(db, "users"), {
          uid: user.uid, 
          email: email,
          name: name,
          createdAt: new Date().toISOString(),
        });
        
        return { 
          id: docRef.id, 
          uid: user.uid,
          name: name, 
          email: email 
        };
      }
      return null;
    } catch (error) {
      console.error("Add user error:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const updateUser = () => { };

export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
  await deleteDoc(doc(db, "users", id));
  return id;
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
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.currentUser = null;
      auth.signOut();
    }
  }, 
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.error.message || "Can't fetch users!";
        state.isLoading = false;
      })
      .addCase(addUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        if (action.payload) {
          const user = action.payload;
          state.currentUser = user;
          state.users.push(user);
        }
        state.isLoading = false;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.error = action.payload || "Error while adding user!";
        state.isLoading = false;
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        const id = action.payload;
        state.users = state.users.filter((user) => user.id !== id);
        state.isLoading = false;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.error.message || "Error while deleting user!";
        state.isLoading = false;
      })
      .addCase(signInUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        console.log("Sign in fulfilled:", action.payload);
        state.currentUser = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(signInUser.rejected, (state, action) => {
        console.log("Sign in rejected:", action.payload);
        state.error = action.payload || "User not found!";
        state.isLoading = false;
        state.currentUser = null;
      });
  }, 
});

export const { setCurrentUser, clearError, logout } = userSlice.actions;
export default userSlice.reducer;