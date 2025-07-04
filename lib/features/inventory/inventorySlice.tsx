import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { bagInstanceData, currencyInstanceData, inventoryData, itemInstanceData,   } from '../main/mainSlice';

export const createCurrencyInstance = createAsyncThunk(
    'main/createCurrencyInstance',
    async (id: string, { rejectWithValue }) => {
        try {
            const res = await fetch('/api/inventory/currencyInstance/create', {
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
            return rejectWithValue({ error: 'createCurrencyInstance failed' });
        }
    }
);

export const createBagInstance = createAsyncThunk(
    'main/createBagInstance',
    async (id: string, { rejectWithValue }) => {
        try {
            const res = await fetch('/api/inventory/bagInstance/create', {
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
            return rejectWithValue({ error: 'createBagInstance failed' });
        }
    }
);

export const createItemInstance = createAsyncThunk(
    'main/createItemInstance',
    async (id: string, { rejectWithValue }) => {
        try {
            const res = await fetch('/api/inventory/itemInstance/create', {
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
            return rejectWithValue({ error: 'createItemInstance failed' });
        }
    }
);

export const updateInventory = createAsyncThunk(  //ovde update i za currency
    'main/updateInventory',
    async (postData: { postId: string, inventory: Partial<inventoryData> }, { rejectWithValue }) => {
        try {
            const res = await fetch('/api/inventory/currencyInstance/update', {
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
            return rejectWithValue({ error: 'updateInventory failed' });
        }
    }
);

export const updateBagInstance = createAsyncThunk(
    'main/updateBagInstance',
    async (bagInstance: { id: string, bagInstance: Partial<bagInstanceData> }, { rejectWithValue }) => {
        try {
            const res = await fetch('/api/inventory/bagInstance/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bagInstance),
            });

            if (!res.ok) return rejectWithValue(await res.json());

            return await res.json();
        } catch (err) {
            return rejectWithValue({ error: 'updateBagInstance failed' });
        }
    }
);

export const updateItemInstance = createAsyncThunk(
    'main/updateItemInstance',
    async (itemInstance: { id: string, itemInstance: Partial<itemInstanceData> }, { rejectWithValue }) => {
        try {
            const res = await fetch('/api/inventory/itemInstance/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(itemInstance),
            });

            if (!res.ok) return rejectWithValue(await res.json());

            return await res.json();
        } catch (err) {
            return rejectWithValue({ error: 'updateItemInstance failed' });
        }
    }
);

export const deleteCurrencyInstance = createAsyncThunk(
    'main/deleteCurrencyInstance',
    async (currencyInstanceId: { id: string }, { rejectWithValue }) => {
        try {
            const res = await fetch('/api/inventory/currencyInstance/delete', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(currencyInstanceId),
            });

            if (!res.ok) {
                const err = await res.json();
                return rejectWithValue(err);
            }

            return await res.json();
        } catch (err) {
            return rejectWithValue({ error: 'deleteCurrencyInstance failed' });
        }
    }
);

export const deleteBagInstance = createAsyncThunk(
    'main/deleteBagInstance',
    async (bagInstanceId: { id: string }, { rejectWithValue }) => {
        try {
            const res = await fetch('/api/inventory/bagInstance/delete', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bagInstanceId),
            });

            if (!res.ok) {
                const err = await res.json();
                return rejectWithValue(err);
            }

            return await res.json();
        } catch (err) {
            return rejectWithValue({ error: 'deleteBagInstance failed' });
        }
    }
);

export const deleteItemInstance = createAsyncThunk(
    'main/deleteItemInstance',
    async (itemInstanceId: { id: string }, { rejectWithValue }) => {
        try {
            const res = await fetch('/api/inventory/itemInstance/delete', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(itemInstanceId),
            });

            if (!res.ok) {
                const err = await res.json();
                return rejectWithValue(err);
            }

            return await res.json();
        } catch (err) {
            return rejectWithValue({ error: 'deleteItemInstance failed' });
        }
    }
);