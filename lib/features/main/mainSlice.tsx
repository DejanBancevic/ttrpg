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
    async (postId: { postId?: string }, { rejectWithValue }) => {
        try {
            const res = await fetch('/api/posts/delete', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(postId),
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

// Attributes

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

// Feats

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

// Spells

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
                body: JSON.stringify({ id }),
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
                imageUrl: "https://ik-minis.com/cdn/shop/products/bk-square.jpg",
                name: "John Doe",
                desc: "No description",
                level: "0",
                xp: "0",
                levelLabel: "Level",
                xpLabel: "XP",
            },
            skillsData: {
                id: "0",
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
            attributesData: {
                id: "0",
                attributeInstance: [
                    {
                        id: "0",
                        attributeName: "Attribute",
                        attributeValue: "0",
                        attributeMod: "0",
                        attributeSave: "0",
                        attributeColor: "0",
                    },
                ],
            },
            featsData: {
                id: "0",
                featsLabel: "Features & Traits",
                featInstance: [
                    {
                        id: "0",
                        featName: "Feat Name",
                        featChargeLabel: "Charges",
                        featChargeCurrent: "0",
                        featChargeMax: "0",
                        featText: "Feat Description",
                    },
                ],
            },
            spellsData: {
                id: "0",
                spellsLabel: "Spells",
                spellsModifierLabel: "Modifier",
                spellsAttackLabel: "Spell Attack",
                spellsSaveLabel: "Save DC",
                spellsModifier: "0",
                spellsAttack: "0",
                spellsSave: "0",
                spellSlotInstance: [
                    {
                        id: "0",
                        spellSlotBoxLabel: " ",
                        spellSlotLabel: "Slots",
                        spellSlotCurrent: "0",
                        spellSlotMax: "0",
                        spellNameLabel: "Name",
                        spellLabel1: "Level",
                        spellLabel2: "Conc",
                        spellLabel3: "Range",
                        spellLabel4: "Hit",
                        spellInstance: [
                            {
                                id: "0",
                                spellNameValue: "Spell Name",
                                spellValue1: "0",
                                spellValue2: "0",
                                spellValue3: "0",
                                spellValue4: "0",
                            },
                        ],
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
    attributesData: attributesData;
    featsData: featsData;
    spellsData: spellsData;
};

interface spellsData {
    id: string;
    spellsLabel: string;
    spellsModifierLabel: string;
    spellsAttackLabel: string;
    spellsSaveLabel: string;
    spellsModifier: string;
    spellsAttack: string;
    spellsSave: string;
    spellSlotInstance: Partial<spellSlotInstanceData>[]
}

interface spellSlotInstanceData {
    id: string;
    spellSlotBoxLabel: string;
    spellSlotLabel: string;
    spellSlotCurrent: string;
    spellSlotMax: string;
    spellNameLabel: string;
    spellLabel1: string;
    spellLabel2: string;
    spellLabel3: string;
    spellLabel4: string;
    spellInstance: Partial<spellInstanceData>[]
};

interface spellInstanceData {
    id: string;
    spellNameValue: string;
    spellValue1: string;
    spellValue2: string;
    spellValue3: string;
    spellValue4: string;
};

interface featsData {
    id: string;
    featsLabel: string;
    featInstance: Partial<featInstanceData>[]
}

interface featInstanceData {
    id: string;
    featName: string;
    featChargeLabel: string;
    featChargeCurrent: string;
    featChargeMax: string;
    featText: string;
};

interface attributesData {
    id: string;
    attributeInstance: Partial<attributeInstanceData>[]
}

interface attributeInstanceData {
    id: string;
    attributeName: string;
    attributeValue: String;
    attributeMod: String;
    attributeSave: String;
    attributeColor: String;
};

interface skillsData {
    id: string;
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
        updateAttributesById: (state, action: PayloadAction<{ key: string; value: Partial<attributeInstanceData> }>) => {
            const activePost = state.posts.find(p => p.id === state.activePostId)
            if (!activePost) return;

            const attribute = activePost.attributesData.attributeInstance.find((a) => a.id === action.payload.key)
            if (!attribute) return;

            Object.assign(attribute, action.payload.value);
        },
        updateFeatsById: (state, action: PayloadAction<{ key: string; value: Partial<featInstanceData> }>) => {
            const activePost = state.posts.find(p => p.id === state.activePostId)
            if (!activePost) return;

            const feat = activePost.featsData.featInstance.find((a) => a.id === action.payload.key)
            if (!feat) return;

            Object.assign(feat, action.payload.value);
        },
        updateFeatsLabel: (state, action: PayloadAction<{ key: 'featsLabel'; value: string }>) => {
            const activePost = state.posts.find(p => p.id === state.activePostId);
            if (!activePost) return;

            activePost.featsData[action.payload.key] = action.payload.value;
        },
    },
    extraReducers: (builder) => {  // za asinhrone akcije
        builder
            .addCase(createPost.fulfilled, (state, action) => {
                const newPost = action.payload.data;
                state.posts.unshift({
                    id: newPost.id,
                    healthData: newPost.health,
                    basicsData: newPost.basics,
                    skillsData: {
                        id: newPost.skills.id,
                        skillsLabel: newPost.skills.skillsLabel,
                        profsLabel: newPost.skills.profsLabel,
                        skillInstance: newPost.skills.skillInstance ?? [],
                    },
                    attributesData: {
                        id: newPost.attributes.id,
                        attributeInstance: newPost.attributes.attributeInstance ?? [],
                    },
                    featsData: {
                        id: newPost.feats.id,
                        featsLabel: newPost.featsLabel,
                        featInstance: newPost.feats.featInstance ?? [],
                    },
                    spellsData: {
                        id: newPost.spells.id,
                        spellsLabel: newPost.spellsLabel,
                        spellsModifierLabel: newPost.spellsModifierLabel,
                        spellsAttackLabel: newPost.spellsAttackLabel,
                        spellsSaveLabel: newPost.spellsSaveLabel,
                        spellsModifier: newPost.spellsModifier,
                        spellsAttack: newPost.spellsAttack,
                        spellsSave: newPost.spellsSave,
                        spellSlotInstance: (newPost.spells.spellSlotInstance ?? []).map((slot: any) => ({
                            ...slot,
                            spellInstance: slot.spellInstance ?? [],
                        })),
                    },
                });
                state.activePostId = newPost.id;

            })
            .addCase(readPosts.fulfilled, (state, action) => {
                const posts = action.payload.data;
                state.posts = posts.map((post: any): post => ({
                    id: post.id,
                    healthData: post.health,
                    basicsData: post.basics,
                    skillsData: {
                        id: post.skills.id,
                        skillsLabel: post.skills.skillsLabel,
                        profsLabel: post.skills.profsLabel,
                        skillInstance: post.skills.skillInstance ?? [],
                    },
                    attributesData: {
                        id: post.attributes.id,
                        attributeInstance: post.attributes.attributeInstance ?? [],
                    },
                    featsData: {
                        id: post.feats.id,
                        featsLabel: post.feats.featsLabel,
                        featInstance: post.feats.featInstance ?? [],
                    },
                    spellsData: {
                        id: post.spells.id,
                        spellsLabel: post.spells.spellsLabel,
                        spellsModifierLabel: post.spells.spellsModifierLabel,
                        spellsAttackLabel: post.spells.spellsAttackLabel,
                        spellsSaveLabel: post.spells.spellsSaveLabel,
                        spellsModifier: post.spells.spellsModifier,
                        spellsAttack: post.spells.spellsAttack,
                        spellsSave: post.spells.spellsSave,
                        spellSlotInstance: (post.spells.spellSlotInstance ?? []).map((slot: any) => ({
                            ...slot,
                            spellInstance: slot.spellInstance ?? [],
                        })),
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
                    p.skillsData.id === updated.id
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
            .addCase(updateAttributes.fulfilled, (state, action) => {
                const updated = action.payload.data;
                const activePost = state.posts.find(p =>
                    p.attributesData.attributeInstance === updated.id
                );
                if (!activePost) return;

                activePost.attributesData.attributeInstance = updated.attributeInstance ?? [];
            })
            .addCase(deleteAttributeInstance.fulfilled, (state, action) => {
                const deletedId = action.payload.id;
                const activePost = state.posts.find(p => p.id === state.activePostId)
                if (!activePost) return;

                activePost.attributesData.attributeInstance = activePost.attributesData.attributeInstance.filter(a => a.id !== deletedId);
            })
            .addCase(updateFeats.fulfilled, (state, action) => {
                const updated = action.payload.data;
                const activePost = state.posts.find(p =>
                    p.featsData.featInstance === updated.id
                );
                if (!activePost) return;

                activePost.featsData.featsLabel = updated.featsLabel;
                activePost.featsData.featInstance = updated.featInstance ?? [];
            })
            .addCase(deleteFeatInstance.fulfilled, (state, action) => {
                const deletedId = action.payload.id;
                const activePost = state.posts.find(p => p.id === state.activePostId)
                if (!activePost) return;

                activePost.featsData.featInstance = activePost.featsData.featInstance.filter(a => a.id !== deletedId);
            })
    }
});


// Export the actions to be used in components
export const {
    setActivePostId,
    updateLocks,
    updateHealthData,
    updateBasicsData,
    updateSkillById,
    updateSkillsLabel,
    updateAttributesById,
    updateFeatsById,
    updateFeatsLabel,
} = mainSlice.actions;

// Export the reducer to be used in the store
export default mainSlice.reducer;