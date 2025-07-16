import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { bagInstanceData, boostTagData, currencyInstanceData, inventoryData, itemBoostData, itemInstanceData, } from '../interfaces/interfaces';

export const createBoostTagInstance = createAsyncThunk(
    'main/createBoostTagInstance',
    async (entityId: { id: string }, { rejectWithValue }) => {
        try {
            const res = await fetch('/api/boostTag/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(entityId),
            });

            if (!res.ok) {
                const err = await res.json();
                return rejectWithValue(err);
            }

            return await res.json();
        } catch (err) {
            return rejectWithValue({ error: 'createBoostTagInstance failed' });
        }
    }
);

export const readBoostTagInstance = createAsyncThunk(
    'main/readBoostTagInstance',
    async (entityId: { id: string }, { rejectWithValue }) => {
        try {
            const res = await fetch('/api/boostTag/read', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(entityId),
            });

            if (!res.ok) return rejectWithValue(await res.json());
            return await res.json();
        } catch {
            return rejectWithValue({ error: 'readBoostTagInstance Fetch Failed' });
        }
    }
);

export const updateBoostTagInstance = createAsyncThunk(
    'main/updateBoostTagInstance',
    async (boostTagInstance: { id: string, boostTag: Partial<boostTagData> }, { rejectWithValue }) => {
        try {
            const res = await fetch('/api/boostTag/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(boostTagInstance),
            });

            if (!res.ok) return rejectWithValue(await res.json());

            return await res.json();
        } catch (err) {
            return rejectWithValue({ error: 'updateBoostTagInstance failed' });
        }
    }
);

export const deleteBoostTagInstance = createAsyncThunk(
    'main/deleteBoostTagInstance',
    async (id: { id: string }, { rejectWithValue }) => {
        try {
            const res = await fetch('/api/boostTag/delete', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(id),
            });

            if (!res.ok) {
                const err = await res.json();
                return rejectWithValue(err);
            }

            return await res.json();
        } catch (err) {
            return rejectWithValue({ error: 'deleteBoostTagInstance failed' });
        }
    }
);