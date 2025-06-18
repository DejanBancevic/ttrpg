// src/Redux/counterSlice.js
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

export const patchPostData = createAsyncThunk(
    'main/patchPostData',
    async (postData: { postId?: string, health?: Partial<healthData>, basics?: Partial<basicsData>, skills?: Partial<skillData>[] }, { rejectWithValue }) => {
        try {
            const res = await fetch('/api/post', {
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
            return rejectWithValue({ error: 'Patch failed' });
        }
    }
);

export const deletePost = createAsyncThunk(
    'main/deletePost',
    async (postData: { postId?: string }, { rejectWithValue }) => {
        try {
            const res = await fetch('/api/post', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(postData),
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

export const deleteSkill = createAsyncThunk(
    'main/deleteSkill',
    async (skillData: { skillId?: string }, { rejectWithValue }) => {
        try {
            const res = await fetch('/api/skill', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(skillData),
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

export const fetchPosts = createAsyncThunk(
    'main/fetchPosts',
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch('api/post');
            if (!res.ok) return rejectWithValue(await res.json());
            return await res.json();
        } catch {
            return rejectWithValue({ error: 'Fetch Failed' });
        }
    }
);



interface MainState {
    posts: post[];
    activePostId: string;
    locks: locks;
};

const initialState: MainState = {
    posts: [
        {
            id: "0",
            healthData: {
                hpCurrent: "0",
                hpMax: "0",
                hpTemp: "0",
                ac: "0",
                stressCurrent: "0",
                stressMax: "0",
                hpLabel: "HP",
                hpTempLabel: "Temp",
                acLabel: "AC",
                stressLabel: "Addons",
            },
            basicsData: {
                imageUrl: "0",
                name: "John Doe",
                desc: "No description",
                level: "0",
                xp: "0",
                levelLabel: "Level",
                xpLabel: "XP",
            },
            skillsData: [
                {
                    id: "0",
                    skillName: "Add Skill Name",
                    skillValue: "0",
                    skillProf: "0",
                    skillsLabel: "Skills",
                    profsLabel: "Profs",
                },
            ],
        }
    ],
    activePostId: "0",
    locks: {
        inputLock: false,
        labelLock: true,
        deleteLock: true,
    },
};

interface post {
    id: string;
    healthData: healthData;
    basicsData: basicsData;
    skillsData: skillData[];
};

interface skillData {
    id: string;
    skillName: string;
    skillValue: string;
    skillProf: string;
    skillsLabel: string;
    profsLabel: string;
};

interface healthData {
    hpCurrent: string;
    hpMax: string;
    hpTemp: string;
    ac: string;
    stressCurrent: string;
    stressMax: string;
    hpLabel: string;
    hpTempLabel: string;
    acLabel: string;
    stressLabel: string;
};

interface basicsData {
    imageUrl: string;
    name: string;
    desc: string;
    level: string;
    xp: string;
    levelLabel: string;
    xpLabel: string;
};

interface locks {
    inputLock: boolean;
    labelLock: boolean;
    deleteLock: boolean;
};

const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: { // za sinhrone akcije
        setActivePostId: (state, action: PayloadAction<string>) => {
            state.activePostId = action.payload;
        },
        updateLocks: (state, action: PayloadAction<{ key: keyof locks, value: boolean }>) => {
            state.locks[action.payload.key] = action.payload.value;
        },
        updateHealthData: (state, action: PayloadAction<{ key: string, value: string }>) => {
            const activePost = state.posts.find(p => p.id === state.activePostId)
            if (!activePost) return;

            activePost.healthData[action.payload.key as keyof typeof activePost.healthData] = action.payload.value
        },
        updateBasicsData: (state, action: PayloadAction<{ key: string, value: string }>) => {
            const activePost = state.posts.find(p => p.id === state.activePostId)
            if (!activePost) return;

            activePost.basicsData[action.payload.key as keyof typeof activePost.basicsData] = action.payload.value
        },
        updateSkillById: (state, action: PayloadAction<{ key: string; value: Partial<skillData> }>) => {
            const activePost = state.posts.find(p => p.id === state.activePostId)
            if (!activePost) return;

            const skill = activePost.skillsData.find((s) => s.id === action.payload.key)
            if (!skill) return;

            Object.assign(skill, action.payload.value);
        }
    },
    extraReducers: (builder) => {  // za asinhrone akcije
        builder
            .addCase(fetchPosts.fulfilled, (state, action) => {
                const posts = action.payload.data;
                state.posts = posts.map((post: any): post => ({
                    id: post.id,
                    healthData: post.health,
                    basicsData: post.basics,
                    skillsData: post.skills,
                }));
                state.activePostId = posts[0]?.id ?? null;
            })
            .addCase(patchPostData.fulfilled, (state, action) => {
                const updatedPost = action.payload.data;
                const index = state.posts.findIndex(p => p.id === updatedPost.id)
                if (index === -1) return;

                const existingPost = state.posts[index];

                if (updatedPost.health) {
                    existingPost.healthData = updatedPost.health;
                }

                if (updatedPost.basics) {
                    existingPost.basicsData = updatedPost.basics;
                }

                if (updatedPost.skills) {
                    existingPost.skillsData = updatedPost.skills;
                }

                state.activePostId = updatedPost.id;
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                const deletedId = action.payload.id;
                state.posts = state.posts.filter(post => post.id !== deletedId)

                if (state.posts.length > 0) {
                    state.activePostId = state.posts[0].id;
                } else {
                    state.activePostId = '';
                }
            })
            .addCase(deleteSkill.fulfilled, (state, action) => {
                const deletedId = action.payload.id;
                const activePost = state.posts.find(p => p.id === state.activePostId)
                if (!activePost) return;

                activePost.skillsData = activePost.skillsData.filter(skill => skill.id !== deletedId);
            })
    }
});


// Export the actions to be used in components
export const { updateHealthData,
    updateBasicsData,
    updateSkillById,
    updateLocks,
    setActivePostId } = mainSlice.actions;

// Export the reducer to be used in the store
export default mainSlice.reducer;