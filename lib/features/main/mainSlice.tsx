// src/Redux/counterSlice.js
import { createSlice, PayloadAction , createAsyncThunk } from '@reduxjs/toolkit';

interface MainState {
    healthData: healthData;
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

const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: { // za sinhrone akcije
        updateHealthData: (state, action: PayloadAction<{ key: keyof healthData; value: string }>) => {
            state.healthData[action.payload.key] = action.payload.value;
        },
    },
    extraReducers: (builder) => {  // za asinhrone akcije
       
    }
});

// Export the actions to be used in components
export const { updateHealthData,  } = mainSlice.actions;

// Export the reducer to be used in the store
export default mainSlice.reducer;