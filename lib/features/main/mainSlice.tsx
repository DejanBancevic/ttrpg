// src/Redux/counterSlice.js
import { createSlice, PayloadAction , createAsyncThunk } from '@reduxjs/toolkit';
import { BlobOptions } from 'buffer';

export const patchHealthData = createAsyncThunk(
    'main/patchHealthData',
    async (partial: Partial<healthData>, { rejectWithValue }) => {
        try {
            const res = await fetch('/api/health', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(partial),
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
    locks: {
        labelLock: true,
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

interface locks{
    labelLock: boolean;
}

const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: { // za sinhrone akcije
        updateHealthData: (state, action: PayloadAction<{ key: string, value: string }>) => {
            state.healthData[action.payload.key as keyof typeof state.healthData] = action.payload.value;
        },
        updateLocks: (state, action: PayloadAction<{ key: keyof locks, value: boolean }>) => {
            state.locks[action.payload.key ] = action.payload.value;
        }
    },
    extraReducers: (builder) => {  // za asinhrone akcije
        builder
            .addCase(patchHealthData.fulfilled, (state, action) => {
                console.log('Posted successfully:', action.payload);
            })
    }
});

// Export the actions to be used in components
export const { updateHealthData, updateLocks } = mainSlice.actions;

// Export the reducer to be used in the store
export default mainSlice.reducer;