import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { bagInstanceData, currencyInstanceData, inventoryData, ItemBoostData, itemInstanceData, } from '../interfaces/interfaces';

export const createItemBoostInstance = createAsyncThunk(
    'main/createItemBoostInstance',
    async (itemId: { id: string }, { rejectWithValue }) => {
        try {
            const res = await fetch('/api/itemBoost/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(itemId),
            });

            if (!res.ok) {
                const err = await res.json();
                return rejectWithValue(err);
            }

            return await res.json();
        } catch (err) {
            return rejectWithValue({ error: 'createItemBoostInstance failed' });
        }
    }
);

export const readItemBoostInstance = createAsyncThunk(
    'main/readItemBoostInstance',
    async (itemId: {id: string}, { rejectWithValue }) => {
        try {
            const res = await fetch('/api/itemBoost/read', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(itemId),
            });

            if (!res.ok) return rejectWithValue(await res.json());
            return await res.json();
        } catch {
            return rejectWithValue({ error: 'readItemBoostInstance Fetch Failed' });
        }
    }
);

export const updateItemBoostInstance = createAsyncThunk(
    'main/updateItemBoostInstance',
    async (itemBoostInstance: { id: string, boosts: Partial<ItemBoostData> }, { rejectWithValue }) => {
        try {
            const res = await fetch('/api/itemBoost/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(itemBoostInstance),
            });

            if (!res.ok) return rejectWithValue(await res.json());

            return await res.json();
        } catch (err) {
            return rejectWithValue({ error: 'updateItemBoostInstance failed' });
        }
    }
);

export const deleteItemBoostInstance = createAsyncThunk(
    'main/deleteItemBoostInstance',
    async (itemBoostId: { id: string }, { rejectWithValue }) => {
        try {
            const res = await fetch('/api/itemBoost/delete', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(itemBoostId),
            });

            if (!res.ok) {
                const err = await res.json();
                return rejectWithValue(err);
            }

            return await res.json();
        } catch (err) {
            return rejectWithValue({ error: 'deleteItemBoostInstance failed' });
        }
    }
);