import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { spellInstanceData, spellsData } from '../interfaces/interfaces';

export const createSpellSlotInstance = createAsyncThunk(
    'main/createSpellSlotInstance',
    async (id: string, { rejectWithValue }) => {
        try {
            const res = await fetch('/api/spells/spellSlotInstance/create', {
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
            return rejectWithValue({ error: 'createSpellSlotInstance failed' });
        }
    }
);

export const createSpellInstance = createAsyncThunk(
    'main/createSpellInstance',
    async (id: string, { rejectWithValue }) => {
        try {
            const res = await fetch('/api/spells/spellInstance/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({id}),
            });

            if (!res.ok) {
                const err = await res.json();
                return rejectWithValue(err);
            }

            return await res.json();
        } catch (err) {
            return rejectWithValue({ error: 'createSpellInstance failed' });
        }
    }
);

export const updateSpells = createAsyncThunk(
    'main/updateSpells',
    async (postData: { postId: string, spells: Partial<spellsData> }, { rejectWithValue }) => {
        try {
            const res = await fetch('/api/spells/spellSlotInstance/update', {
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
            return rejectWithValue({ error: 'updateSpells failed' });
        }
    }
);

export const updateSpellInstance = createAsyncThunk(
    'main/updateSpellInstance',
    async (spellInstance: { id: string, spellInstance: Partial<spellInstanceData> ,}, { rejectWithValue }) => {
        try {
            const res = await fetch('/api/spells/spellInstance/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(spellInstance),
            });

            if (!res.ok) return rejectWithValue(await res.json());

            return await res.json();
        } catch (err) {
            return rejectWithValue({ error: 'patchSpellInstance failed' });
        }
    }
);

export const deleteSpellSlotInstance = createAsyncThunk(
    'main/deleteSpellSlotInstance',
    async (spellSlotInstanceId: { id: string }, { rejectWithValue }) => {
        try {
            const res = await fetch('/api/spells/spellSlotInstance/delete', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(spellSlotInstanceId),
            });

            if (!res.ok) {
                const err = await res.json();
                return rejectWithValue(err);
            }

            return await res.json();
        } catch (err) {
            return rejectWithValue({ error: 'deleteSpellSlotInstance failed' });
        }
    }
);

export const deleteSpellInstance = createAsyncThunk(
    'main/deleteSpellInstance',
    async (spellInstanceId: { id: string }, { rejectWithValue }) => {
        try {
            const res = await fetch('/api/spells/spellInstance/delete', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(spellInstanceId),
            });

            if (!res.ok) {
                const err = await res.json();
                return rejectWithValue(err);
            }

            return await res.json();
        } catch (err) {
            return rejectWithValue({ error: 'deleteSpellInstance failed' });
        }
    }
);
