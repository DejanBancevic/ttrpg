// src/Redux/counterSlice.js
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPosts = createAsyncThunk(
    'main/fetchPosts',
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch('api/post');
            if (!res.ok) return rejectWithValue(await res.json());
            return await res.json();
        } catch {
            return rejectWithValue({ error: 'Fetch Failed' });
        }
    }
)

export const patchPostData = createAsyncThunk(
    'main/patchPostData',
    async (postData: { postId?: string, health?: Partial<healthData>, basics?: Partial<basicsData> }, { rejectWithValue }) => {
        try {
            const res = await fetch('/api/post', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(postData),
            });

            if (!res.ok) {
                const err = await res.json();
                return rejectWithValue(err);
            }

            return await res.json();
        } catch (err) {
            return rejectWithValue({ error: 'Patch failed' });
        }
    }
);

export const deletePost = createAsyncThunk(
    'main/deletePost',
    async (postData: { postId?: String }, { rejectWithValue }) => {
        try {
            const res = await fetch('/api/post', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(postData),
            });

            if (!res.ok) {
                const err = await res.json();
                return rejectWithValue(err);
            }

            return await res.json();
        } catch (err) {
            return rejectWithValue({ error: 'Patch failed' });
        }
    }
)

interface MainState {
    posts: post[];
    activePostId: string;
    locks: locks;
}

const initialState: MainState = {
    posts: [
        {
            id: "0",
            healthData: {
                hpCurrent: "0",
                hpMax: "0",
                hpTemp: "0",
                ac: "0",
                stressCurrent: "0",
                stressMax: "0",
                // Labels
                hpLabel: "HP",
                hpTempLabel: "Temp",
                acLabel: "AC",
                stressLabel: "Addons",
            },
            basicsData: {
                imageUrl: "0",
                name: "John Doe",
                desc: "No description",
                level: "0",
                xp: "0",
                levelLabel: "Level",
                xpLabel: "XP",
            },
        }
    ],
    activePostId: "0",

    locks: {
        inputLock: true,
        labelLock: true,
        deleteLock: true,
    }

};

interface post {
    id: string;
    healthData: healthData;
    basicsData: basicsData;
}


interface healthData {
    hpCurrent: string;
    hpMax: string;
    hpTemp: string;
    ac: string;
    stressCurrent: string;
    stressMax: string;
    // Labels
    hpLabel: string;
    hpTempLabel: string;
    acLabel: string;
    stressLabel: string;
}

interface basicsData {
    imageUrl: string;
    name: string;
    desc: string;
    level: string;
    xp: string;
    levelLabel: string;
    xpLabel: string;
}

interface locks {
    inputLock: boolean;
    labelLock: boolean;
    deleteLock: boolean;
}

const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: { // za sinhrone akcije
        updateHealthData: (state, action: PayloadAction<{ key: string, value: string }>) => {
            const activePost = state.posts.find(p => p.id === state.activePostId)
            if (!activePost) return;

            activePost.healthData[action.payload.key as keyof typeof activePost.healthData] = action.payload.value
        },
        updateBasicsData: (state, action: PayloadAction<{ key: string, value: string }>) => {
            const activePost = state.posts.find(p => p.id === state.activePostId)
            if (!activePost) return;

            activePost.basicsData[action.payload.key as keyof typeof activePost.basicsData] = action.payload.value
        },
        updateLocks: (state, action: PayloadAction<{ key: keyof locks, value: boolean }>) => {
            state.locks[action.payload.key] = action.payload.value;
        },
        setActivePostId: (state, action: PayloadAction<string>) => {
            state.activePostId = action.payload;
        }
    },
    extraReducers: (builder) => {  // za asinhrone akcije
        builder
            .addCase(fetchPosts.fulfilled, (state, action) => {
                const posts = action.payload.data;
                state.posts = posts.map((post: any): post => ({
                    id: post.id,
                    healthData: post.health,
                    basicsData: post.basics,
                }));
                state.activePostId = posts[0]?.id ?? null;
            })
            .addCase(patchPostData.fulfilled, (state, action) => {
                const updatedPost = action.payload.data;
                const newPost = {
                    id: updatedPost.id,
                    healthData: updatedPost.health,
                    basicsData: updatedPost.basics,
                };

                const index = state.posts.findIndex(p => p.id === newPost.id);
                if (index !== -1) {
                    state.posts[index] = newPost;
                } else {
                    state.posts.push(newPost);
                }

                state.activePostId = updatedPost.id;
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                const deletedId = action.payload.id;
                state.posts = state.posts.filter(post => post.id !== deletedId)
                
                if (state.posts.length > 0) {
                    state.activePostId = state.posts[0].id;
                } else {
                    state.activePostId = ''; // or null
                }
        })
    }
});


// Export the actions to be used in components
export const { updateHealthData, updateBasicsData, updateLocks, setActivePostId } = mainSlice.actions;

// Export the reducer to be used in the store
export default mainSlice.reducer;