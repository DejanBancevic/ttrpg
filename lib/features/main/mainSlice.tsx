import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

//#region Thunks

// Posts 

export const createPost = createAsyncThunk(
    'main/createPost',
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch('/api/posts/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
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

export const readPosts = createAsyncThunk(
    'main/readPosts',
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch('api/posts/read');

            if (!res.ok) return rejectWithValue(await res.json());
            return await res.json();
        } catch {
            return rejectWithValue({ error: 'Fetch Failed' });
        }
    }
);

export const updatePost = createAsyncThunk(
    'main/updatePost',
    async (postData: { postId?: string, health?: Partial<healthData>, basics?: Partial<basicsData>, }, { rejectWithValue }) => {
        try {
            const res = await fetch('/api/posts/update', {
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
            const res = await fetch('/api/posts/delete', {
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

// Skills

export const createSkillInstance = createAsyncThunk(
    'main/createSkillInstance',
    async (skillsId: string, { rejectWithValue }) => {
        try {
            const res = await fetch('/api/skills/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ skillsId }),
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
    async (skillInstanceData: { skillInstanceId: string }, { rejectWithValue }) => {
        try {
            const res = await fetch('/api/skills/delete', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(skillInstanceData),
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

//#endregion 

//#region Interfaces

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
            skillsData: {
                skillsId: "0",
                skillsLabel: "Skills",
                profsLabel: "Profs",
                skillInstance: [
                    {
                        id: "0",
                        skillName: "Add Skill Name",
                        skillValue: "0",
                        skillProf: "0",
                    },
                ],
            },
        },
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
    skillsData: skillsData;
};

interface skillsData {
    skillsId: string;
    skillsLabel: string;
    profsLabel: string;
    skillInstance: Partial<skillInstanceData>[]
}

interface skillInstanceData {
    id: string;
    skillName: string;
    skillValue: string;
    skillProf: string;
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

//#endregion

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
        updateSkillById: (state, action: PayloadAction<{ key: string; value: Partial<skillInstanceData> }>) => {
            const activePost = state.posts.find(p => p.id === state.activePostId)
            if (!activePost) return;

            const skill = activePost.skillsData.skillInstance.find((s) => s.id === action.payload.key)
            if (!skill) return;

            Object.assign(skill, action.payload.value);
        },
        updateSkillsLabel: (state, action: PayloadAction<{ key: 'skillsLabel' | 'profsLabel'; value: string }>) => {
            const activePost = state.posts.find(p => p.id === state.activePostId);
            if (!activePost) return;

            activePost.skillsData[action.payload.key] = action.payload.value;
        },
    },
    extraReducers: (builder) => {  // za asinhrone akcije
        builder
            .addCase(createPost.fulfilled, (state, action) => {
                const newPost = action.payload.data;
                state.activePostId = newPost.id;

            })
            .addCase(readPosts.fulfilled, (state, action) => {
                const posts = action.payload.data;
                state.posts = posts.map((post: any): post => ({
                    id: post.id,
                    healthData: post.health,
                    basicsData: post.basics,
                    skillsData: {
                        skillsId: post.skills.id,
                        skillsLabel: post.skills.skillsLabel,
                        profsLabel: post.skills.profsLabel,
                        skillInstance: post.skills.skillInstance ?? [],
                    },
                }));

                const activePostStillExists = posts.some((post: any) =>
                    post.id === state.activePostId);

                if (!state.activePostId || !activePostStillExists) {
                    state.activePostId = posts[0]?.id ?? null;
                }
            })
            .addCase(updatePost.fulfilled, (state, action) => {
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
            .addCase(readSkills.fulfilled, (state, action) => {
                const activePost = state.posts.find(p => p.id === state.activePostId);
                if (!activePost) return;

                const skillsPayload = action.payload;

                activePost.skillsData.skillInstance = Array.isArray(skillsPayload.skillInstance)
                    ? skillsPayload.skillInstance
                    : [];
            })
            .addCase(updateSkills.fulfilled, (state, action) => {
                const updated = action.payload.data; 
                const activePost = state.posts.find(p =>
                    p.skillsData.skillsId === updated.id 
                );
                if (!activePost) return;

                activePost.skillsData.skillsLabel = updated.skillsLabel;
                activePost.skillsData.profsLabel = updated.profsLabel;
                activePost.skillsData.skillInstance = updated.skillInstance ?? [];
            })
            .addCase(deleteSkillInstance.fulfilled, (state, action) => {
                const deletedId = action.payload.id;
                const activePost = state.posts.find(p => p.id === state.activePostId)
                if (!activePost) return;

                activePost.skillsData.skillInstance = activePost.skillsData.skillInstance.filter(skill => skill.id !== deletedId);
            })
    }
});


// Export the actions to be used in components
export const { updateHealthData,
    updateBasicsData,
    updateSkillById,
    updateLocks,
    updateSkillsLabel,
    setActivePostId } = mainSlice.actions;

// Export the reducer to be used in the store
export default mainSlice.reducer;