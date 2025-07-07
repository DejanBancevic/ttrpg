import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { attributesData } from '../interfaces/interfaces';


export const createAttributeInstance = createAsyncThunk(
    'main/createAttributeInstance',
    async (id: string, { rejectWithValue }) => {
        try {
            const res = await fetch('/api/attributes/create', {
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
            return rejectWithValue({ error: 'Create failed' });
        }
    }
);

export const updateAttributes = createAsyncThunk(
    'main/updateAttribute',
    async (postData: { postId: string, attributes: Partial<attributesData> }, { rejectWithValue }) => {
        try {
            const res = await fetch('/api/attributes/update', {
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
            return rejectWithValue({ error: 'Skill patch failed' });
        }
    }
);

export const deleteAttributeInstance = createAsyncThunk(
    'main/deleteAttributeInstance',
    async (attributeInstanceId: { id: string }, { rejectWithValue }) => {
        try {
            const res = await fetch('/api/attributes/delete', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(attributeInstanceId),
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
