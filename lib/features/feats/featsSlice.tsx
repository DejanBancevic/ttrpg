import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { featsData, featInstanceData } from '../main/mainSlice';

export const createFeatInstance = createAsyncThunk(
    'main/createFeatInstance',
    async (id: string, { rejectWithValue }) => {
        try {
            const res = await fetch('/api/feats/create', {
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
            return rejectWithValue({ error: 'Feat create failed' });
        }
    }
);

export const updateFeats = createAsyncThunk(
    'main/updateFeats',
    async (postData: { postId: string, feats: Partial<featsData> }, { rejectWithValue }) => {
        try {
            const res = await fetch('/api/feats/update', {
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

export const deleteFeatInstance = createAsyncThunk(
    'main/deleteFeatInstance',
    async (featInstanceId: { id: string }, { rejectWithValue }) => {
        try {
            const res = await fetch('/api/feats/delete', {
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