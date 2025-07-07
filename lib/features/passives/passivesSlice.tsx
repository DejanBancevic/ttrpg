import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { passivesData } from '../interfaces/interfaces';

export const createPassiveInstance = createAsyncThunk(
    'main/createPassiveInstance',
    async (data: { id: string, section:string }, { rejectWithValue }) => {
        try {
            const res = await fetch('/api/passives/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const err = await res.json();
                return rejectWithValue(err);
            }

            return await res.json();
        } catch (err) {
            return rejectWithValue({ error: 'Create failed' });
        }
    }
);

export const readPassives = createAsyncThunk(
    'main/readPassives',
    async (postId: string, { rejectWithValue }) => {
        try {
            const res = await fetch('/api/passives/read', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(postId)
            });

            if (!res.ok) {
                const err = await res.json();
                return rejectWithValue(err);
            }

            const json = await res.json();
            return json.skills;
        } catch (err) {
            return rejectWithValue({ error: 'passives read failed' });
        }
    }
);

export const updatePassives= createAsyncThunk(
    'main/updatePassives',
    async (postData: { postId: string, passives: Partial<passivesData> }, { rejectWithValue }) => {
        try {
            const res = await fetch('/api/passives/update', {
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
            return rejectWithValue({ error: 'passives update failed' });
        }
    }
);

export const deletePassiveInstance = createAsyncThunk(
    'main/deletePassiveInstance',
    async (passiveInstance: { id: string, section: string }, { rejectWithValue }) => {
        try {
            const res = await fetch('/api/passives/delete', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(passiveInstance),
            });

            if (!res.ok) {
                const err = await res.json();
                return rejectWithValue(err);
            }

            return await res.json();
        } catch (err) {
            return rejectWithValue({ error: 'delete failed' });
        }
    }
);
