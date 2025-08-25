import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { featsData, featInstanceData } from '../interfaces/interfaces';

export const createFeatSlotInstance = createAsyncThunk(
    'main/createFeatSlotInstance',
    async (id: string, { rejectWithValue }) => {
        try {
            const res = await fetch('/api/feats/featSlotInstance/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
            });

            if (!res.ok) {
                const err = await res.json();
                return rejectWithValue(err);
            }

            return await res.json();
        } catch (err) {
            return rejectWithValue({ error: 'createFeatSlotInstance failed' });
        }
    }
);

export const createFeatInstance = createAsyncThunk(
    'main/createFeatInstance',
    async (id: string, { rejectWithValue }) => {
        try {
            const res = await fetch('/api/feats/featInstance/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
            });

            if (!res.ok) {
                const err = await res.json();
                return rejectWithValue(err);
            }

            return await res.json();
        } catch (err) {
            return rejectWithValue({ error: 'createFeatInstance failed' });
        }
    }
);

export const updateFeats = createAsyncThunk(
    'main/updateFeats',
    async (postData: { postId: string, feats: Partial<featsData> }, { rejectWithValue }) => {
        try {
            const res = await fetch('/api/feats/featSlotInstance/update', {
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
            return rejectWithValue({ error: 'Feat patch failed' });
        }
    }
);

export const updateFeatInstance = createAsyncThunk(
    'main/updateFeatInstance',
    async (featInstance: { id: string, featInstance: Partial<featInstanceData> ,}, { rejectWithValue }) => {
        try {
            const res = await fetch('/api/feats/featInstance/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(featInstance),
            });

            if (!res.ok) return rejectWithValue(await res.json());

            return await res.json();
        } catch (err) {
            return rejectWithValue({ error: 'updateFeatInstance failed' });
        }
    }
);

export const deleteFeatSlotInstance = createAsyncThunk(
    'main/deleteFeatSlotInstance',
    async (featSlotInstanceId: { id: string }, { rejectWithValue }) => {
        try {
            const res = await fetch('/api/feats/featSlotInstance/delete', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(featSlotInstanceId),
            });

            if (!res.ok) {
                const err = await res.json();
                return rejectWithValue(err);
            }

            return await res.json();
        } catch (err) {
            return rejectWithValue({ error: 'deleteFeatSlotInstance failed' });
        }
    }
);

export const deleteFeatInstance = createAsyncThunk(
    'main/deleteFeatInstance',
    async (featInstanceId: { id: string }, { rejectWithValue }) => {
        try {
            const res = await fetch('/api/feats/featInstance/delete', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(featInstanceId),
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