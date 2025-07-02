import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { skillsData } from '../main/mainSlice';

export const createSkillInstance = createAsyncThunk(
    'main/createSkillInstance',
    async (id: string, { rejectWithValue }) => {
        try {
            const res = await fetch('/api/skills/create', {
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

export const readSkills = createAsyncThunk(
    'main/readSkills',
    async (postId: string, { rejectWithValue }) => {
        try {
            const res = await fetch('/api/skills/read', {
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
            return rejectWithValue({ error: 'Skills read failed' });
        }
    }
);

export const updateSkills = createAsyncThunk(
    'main/updateSkills',
    async (postData: { postId: string, skills: Partial<skillsData> }, { rejectWithValue }) => {
        try {
            const res = await fetch('/api/skills/update', {
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

export const deleteSkillInstance = createAsyncThunk(
    'main/deleteSkill',
    async (skillInstanceId: { id: string }, { rejectWithValue }) => {
        try {
            const res = await fetch('/api/skills/delete', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(skillInstanceId),
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
