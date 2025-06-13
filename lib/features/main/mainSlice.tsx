// src/Redux/counterSlice.js
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

export const patchPostData = createAsyncThunk(
    'main/patchPostData ',
    async (postData: { health?: Partial<healthData>, basics?: Partial<basicsData> } ,{ rejectWithValue }) => {
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



interface MainState {
    healthData: healthData;
    basicsData: basicsData;
    locks: locks;
}

const initialState: MainState = {
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
        stressLabel: "Stress",
    },
    basicsData: {
        imageUrl: "0",
        name: "0",
        desc: "0",
        level: "0",
        xp: "0",
        levelLabel: "Level",
        xpLabel: "XP",
    },
    locks: {
        inputLock: true,
        labelLock: true,
        deleteLock: true,
    }

};

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
            state.healthData[action.payload.key as keyof typeof state.healthData] = action.payload.value;
        },
        updateBasicsData: (state, action: PayloadAction<{ key: string, value: string }>) => {
            state.basicsData[action.payload.key as keyof typeof state.basicsData] = action.payload.value;
        },
        updateLocks: (state, action: PayloadAction<{ key: keyof locks, value: boolean }>) => {
            state.locks[action.payload.key] = action.payload.value;
        }
    },
    extraReducers: (builder) => {  // za asinhrone akcije
        builder
            .addCase(patchPostData.fulfilled, (state, action) => {
                const post = action.payload.data;
                if (post.health) state.healthData = post.health;
                if (post.basics) state.basicsData = post.basics;
            })
    }
});

// Export the actions to be used in components
export const { updateHealthData, updateBasicsData, updateLocks } = mainSlice.actions;

// Export the reducer to be used in the store
export default mainSlice.reducer;