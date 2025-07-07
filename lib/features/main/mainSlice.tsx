import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { deleteAttributeInstance, updateAttributes } from '../attributes/attributesSlice';
import { deleteFeatInstance, updateFeats } from '../feats/featsSlice';
import {
    attributeInstanceData, attributesData, bagInstanceData,
    basicsData, currencyInstanceData, featInstanceData,
    featsData, healthData, inventoryData, itemInstanceData,
    passiveInstanceData, passivesData, skillInstanceData,
    skillsData, spellInstanceData, spellsData,
    spellSlotInstanceData
} from '../interfaces/interfaces';
import { deleteBagInstance, deleteItemInstance, updateInventory } from '../inventory/inventorySlice';
import { deletePassiveInstance, updatePassives } from '../passives/passivesSlice';
import { deleteSkillInstance, readSkills, updateSkills } from '../skills/skillsSlice';
import { deleteSpellInstance, deleteSpellSlotInstance, updateSpells } from '../spells/spellsSlice';

//#region Post Thunks

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

export const deleteAllPost = createAsyncThunk(
    'main/deleteAllPost',
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch('/api/posts/deleteAll', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
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
    activeSpellSlotId: string;
    activeBagId: string;
    locks: locks;
};

const initialState: MainState = {
    posts: [
        {
            id: crypto.randomUUID(),
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
                id: crypto.randomUUID(),
                skillsLabel: "Skills",
                profsLabel: "Profs",
                skillInstance: [
                    {
                        id: crypto.randomUUID(),
                        skillName: "Add Skill Name",
                        skillValue: "0",
                        skillProf: "0",
                    },
                ],
            },
            attributesData: {
                id: crypto.randomUUID(),
                attributeInstance: [
                    {
                        id: crypto.randomUUID(),
                        attributeName: "Attribute",
                        attributeValue: "0",
                        attributeMod: "0",
                        attributeSave: "0",
                        attributeColor: "0",
                    },
                ],
            },
            featsData: {
                id: crypto.randomUUID(),
                featsLabel: "Features & Traits",
                featInstance: [
                    {
                        id: crypto.randomUUID(),
                        featName: "Feat Name",
                        featChargeLabel: "Charges",
                        featChargeCurrent: "0",
                        featChargeMax: "0",
                        featText: "Feat Description",
                    },
                ],
            },
            spellsData: {
                id: crypto.randomUUID(),
                spellsLabel: "Spells",
                spellsModifierLabel: "Modifier",
                spellsAttackLabel: "Spell Attack",
                spellsSaveLabel: "Save DC",
                spellsModifier: "0",
                spellsAttack: "0",
                spellsSave: "0",
                spellSlotInstance: [
                    {
                        id: crypto.randomUUID(),
                        spellSlotBoxLabel: "",
                        spellSlotLabel: "Slots",
                        spellSlotCurrent: "0",
                        spellSlotMax: "0",
                        spellNameLabel: "Name",
                        spellLabel1: "Time",
                        spellLabel2: "Conc",
                        spellLabel3: "Range",
                        spellLabel4: "Hit",
                        spellInstance: [
                            {
                                id: crypto.randomUUID(),
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
            passivesData: {
                id: crypto.randomUUID(),
                passiveLabel: "Passives & Proficiencies",
                passiveFirstInstance: [
                    {
                        id: crypto.randomUUID(),
                        passiveName: "Passive",
                        passiveValue: "0",
                    },
                ],
                passiveSecondInstance: [
                    {
                        id: crypto.randomUUID(),
                        passiveName: "Passive",
                        passiveValue: "0",
                    },
                ],
                passiveThirdInstance: [
                    {
                        id: crypto.randomUUID(),
                        passiveName: "Passive",
                        passiveValue: "0",
                    },
                ],
            },
            inventoryData: {
                id: crypto.randomUUID(),
                invLabel: "Inventory",
                invWeightLabel: "Weight",
                invWeightCurrent: "0",
                invWeightMax: "0",
                invWeightUnit: "kg",
                invCurrenyLabel: "Currency",
                invBagAllLabel: "All",
                currencyInstance: [
                    {
                        id: crypto.randomUUID(),
                        currenyValue: "0",
                        currenyLabel: "x",
                    },
                ],
                bagInstance: [
                    {
                        id: crypto.randomUUID(),
                        bagLabel: "Bag",
                        itemNameLabel: "Name",
                        itemLabel1: "Hit",
                        itemLabel2: "Dmg",
                        itemLabel3: "Range",
                        itemLabel4: "Value",
                        itemLabel5: "#",
                        itemInstance: [
                            {
                                id: crypto.randomUUID(),
                                itemName: "Item",
                                itemValue1: "0",
                                itemValue2: "0",
                                itemValue3: "0",
                                itemValue4: "0",
                                itemValue5: "0",
                            },
                        ],
                    },
                ],
            },
        },
    ],
    activePostId: "0",
    activeSpellSlotId: "0",
    activeBagId: "0",
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
    passivesData: passivesData;
    inventoryData: inventoryData;
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
        updateSpellSlotInstanceById: (state, action: PayloadAction<{ key: string; value: Partial<spellSlotInstanceData> }>) => {
            const activePost = state.posts.find(p => p.id === state.activePostId)
            if (!activePost) return;

            const spellSlotInstance = activePost.spellsData.spellSlotInstance.find((s) => s.id === action.payload.key)
            if (!spellSlotInstance) return;

            Object.assign(spellSlotInstance, action.payload.value);
        },
        updateSpellInstanceById: (state, action: PayloadAction<{ key: string; value: Partial<spellInstanceData> }>) => {
            const activePost = state.posts.find(p => p.id === state.activePostId)
            if (!activePost) return;

            for (const spellSlot of activePost.spellsData.spellSlotInstance) {
                const instance = spellSlot.spellInstance?.find(i => i.id === action.payload.key);
                if (instance) {
                    Object.assign(instance, action.payload.value);
                    break; 
                }
            }
        },
        updateSpellsLabel: (state, action: PayloadAction<{
            key: 'spellsLabel' | 'spellsModifierLabel' | 'spellsAttackLabel' | 'spellsSaveLabel' |
            'spellsModifier' | 'spellsAttack' | 'spellsSave'
            value: string
        }>) => {
            const activePost = state.posts.find(p => p.id === state.activePostId);
            if (!activePost) return;

            activePost.spellsData[action.payload.key] = action.payload.value;
        },
        setActiveSpellSlotId: (state, action: PayloadAction<string>) => {
            state.activeSpellSlotId = action.payload;
        },
        updatePassivesById: (state, action: PayloadAction<{ key: string; value: Partial<passiveInstanceData> }>) => {
            const activePost = state.posts.find(p => p.id === state.activePostId)
            if (!activePost) return;

            const instanceArrays = [
                activePost.passivesData.passiveFirstInstance,
                activePost.passivesData.passiveSecondInstance,
                activePost.passivesData.passiveThirdInstance,
            ];

            for (const arr of instanceArrays) {
                const instance = arr.find((i) => i.id === action.payload.key);
                if (instance) {
                    Object.assign(instance, action.payload.value)
                    break;
                }
            }
        },
        updatePassivesLabel: (state, action: PayloadAction<{ key: 'passiveLabel'; value: string }>) => {
            const activePost = state.posts.find(p => p.id === state.activePostId);
            if (!activePost) return;

            activePost.passivesData[action.payload.key] = action.payload.value;
        },
        updateCurrencyInstanceById: (state, action: PayloadAction<{ key: string; value: Partial<currencyInstanceData> }>) => {
            const activePost = state.posts.find(p => p.id === state.activePostId)
            if (!activePost) return;

            const currencyInstance = activePost.inventoryData.currencyInstance.find((s) => s.id === action.payload.key)
            if (!currencyInstance) return;

            Object.assign(currencyInstance, action.payload.value);
        },
        updateBagInstanceById: (state, action: PayloadAction<{ key: string; value: Partial<bagInstanceData> }>) => {
            const activePost = state.posts.find(p => p.id === state.activePostId)
            if (!activePost) return;

            const bagInstance = activePost.inventoryData.bagInstance.find((s) => s.id === action.payload.key)
            if (!bagInstance) return;

            Object.assign(bagInstance, action.payload.value);
        },
        updateItemInstanceById: (state, action: PayloadAction<{ key: string; value: Partial<itemInstanceData> }>) => {
            const activePost = state.posts.find(p => p.id === state.activePostId)
            if (!activePost) return;

            for (const bagInstance of activePost.inventoryData.bagInstance) {
                const instance = bagInstance.itemInstance?.find(i => i.id === action.payload.key);
                if (instance) {
                    Object.assign(instance, action.payload.value);
                    break; 
                }
            }
        },
        updateInventoryLabel: (state, action: PayloadAction<{
            key: 'invLabel' | 'invWeightLabel' | 'invWeightCurrent' | 'invWeightMax' |
            'invWeightUnit' | 'invCurrenyLabel' | 'invBagAllLabel'
            value: string
        }>) => {
            const activePost = state.posts.find(p => p.id === state.activePostId);
            if (!activePost) return;

            activePost.inventoryData[action.payload.key] = action.payload.value;
        },
        setActiveBagId: (state, action: PayloadAction<string>) => {
            state.activeBagId = action.payload;
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
                    passivesData: {
                        id: newPost.passives.id,
                        passiveLabel: newPost.passives.passiveLabel,
                        passiveFirstInstance: newPost.passives.passiveFirstInstance ?? [],
                        passiveSecondInstance: newPost.passives.passiveSecondInstance ?? [],
                        passiveThirdInstance: newPost.passives.passiveThirdInstance ?? [],
                    },
                    inventoryData: {
                        id: newPost.inventory.id,
                        invLabel: newPost.invLabel,
                        invWeightLabel: newPost.invWeightLabel,
                        invWeightCurrent: newPost.invWeightCurrent,
                        invWeightMax: newPost.invWeightMax,
                        invWeightUnit: newPost.invWeightUnit,
                        invCurrenyLabel: newPost.invCurrenyLabel,
                        invBagAllLabel: newPost.invBagAllLabel,
                        currencyInstance: newPost.inventory.currencyInstance ?? [],
                        bagInstance: (newPost.inventory.bagInstance ?? []).map((bag: any) => ({
                            ...bag,
                            itemInstance: bag.itemInstance ?? [],
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
                    passivesData: {
                        id: post.passives.id,
                        passiveLabel: post.passives.passiveLabel,
                        passiveFirstInstance: post.passives.passiveFirstInstance ?? [],
                        passiveSecondInstance: post.passives.passiveSecondInstance ?? [],
                        passiveThirdInstance: post.passives.passiveThirdInstance ?? [],
                    },
                    inventoryData: {
                        id: post.inventory.id,
                        invLabel: post.inventory.invLabel,
                        invWeightLabel: post.inventory.invWeightLabel,
                        invWeightCurrent: post.inventory.invWeightCurrent,
                        invWeightMax: post.inventory.invWeightMax,
                        invWeightUnit: post.inventory.invWeightUnit,
                        invCurrenyLabel: post.inventory.invCurrenyLabel,
                        invBagAllLabel: post.inventory.invBagAllLabel,
                        currencyInstance: post.inventory.currencyInstance ?? [],
                        bagInstance: (post.inventory.bagInstance ?? []).map((bag: any) => ({
                            ...bag,
                            itemInstance: bag.itemInstance ?? [],
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
                const activePost = state.posts.find(p => p.id === state.activePostId);
                if (!activePost) return;

                activePost.featsData.featInstance = activePost.featsData.featInstance.filter(a => a.id !== deletedId);
            })
            .addCase(updateSpells.fulfilled, (state, action) => {
                const updated = action.payload.data;
                const activePost = state.posts.find(p =>
                    p.spellsData.id === updated.id
                );
                if (!activePost) return;

                activePost.spellsData = {
                    ...activePost.spellsData,
                    spellsLabel: updated.spellsLabel,
                    spellsModifierLabel: updated.spellsModifierLabel,
                    spellsAttackLabel: updated.spellsAttackLabel,
                    spellsSaveLabel: updated.spellsSaveLabel,
                    spellsModifier: updated.spellsModifier,
                    spellsAttack: updated.spellsAttack,
                    spellsSave: updated.spellsSave,
                    spellSlotInstance: updated.spellSlotInstance ?? [],
                };
            })
            .addCase(deleteSpellSlotInstance.fulfilled, (state, action) => {
                const deletedId = action.payload.id;
                const activePost = state.posts.find(p => p.id === state.activePostId)
                if (!activePost) return;

                activePost.spellsData.spellSlotInstance = activePost.spellsData.spellSlotInstance.filter(a => a.id !== deletedId);
            })
            .addCase(deleteSpellInstance.fulfilled, (state, action) => {
                const deletedId = action.payload.id;
                const activePost = state.posts.find(p => p.id === state.activePostId);
                if (!activePost) return;

                activePost.spellsData.spellSlotInstance = activePost.spellsData.spellSlotInstance.map(slot => {
                    if (!slot.spellInstance) return slot;

                    return {
                        ...slot,
                        spellInstance: slot.spellInstance.filter(spell => spell.id !== deletedId)
                    };
                });
            })
            .addCase(updatePassives.fulfilled, (state, action) => {
                const updated = action.payload.data;
                const activePost = state.posts.find(p =>
                    p.passivesData.passiveFirstInstance === updated.id
                );
                if (!activePost) return;

                activePost.passivesData.passiveLabel = updated.passiveLabel;
                activePost.passivesData.passiveFirstInstance = updated.passiveFirstInstance ?? [];
                activePost.passivesData.passiveSecondInstance = updated.passiveSecondInstance ?? [];
                activePost.passivesData.passiveThirdInstance = updated.passiveThirdInstance ?? [];
            })
            .addCase(deletePassiveInstance.fulfilled, (state, action) => {
                const deletedId = action.payload.id;
                const activePost = state.posts.find(p => p.id === state.activePostId);
                if (!activePost) return;

                if (action.payload.section === "first") {
                    activePost.passivesData.passiveFirstInstance = activePost.passivesData.passiveFirstInstance.filter(p => p.id !== deletedId);
                } else if (action.payload.section === "second") {
                    activePost.passivesData.passiveSecondInstance = activePost.passivesData.passiveSecondInstance.filter(p => p.id !== deletedId);
                } else if (action.payload.section === "third") {
                    activePost.passivesData.passiveThirdInstance = activePost.passivesData.passiveThirdInstance.filter(p => p.id !== deletedId);
                }

            })
            .addCase(updateInventory.fulfilled, (state, action) => {
                const updated = action.payload.data;
                const activePost = state.posts.find(p =>
                    p.inventoryData.id === updated.id
                );
                if (!activePost) return;

                activePost.inventoryData = {
                    ...activePost.inventoryData,
                    invLabel: updated.invLabel,
                    invWeightLabel: updated.invWeightLabel,
                    invWeightCurrent: updated.invWeightCurrent,
                    invWeightMax: updated.invWeightMax,
                    invWeightUnit: updated.invWeightUnit,
                    invCurrenyLabel: updated.invCurrenyLabel,
                    invBagAllLabel: updated.invBagAllLabel,
                    currencyInstance: updated.currencyInstance ?? [],
                    bagInstance: updated.bagInstance ?? [],
                };
            })
            .addCase(deleteBagInstance.fulfilled, (state, action) => {
                const deletedId = action.payload.id;
                const activePost = state.posts.find(p => p.id === state.activePostId)
                if (!activePost) return;

                activePost.inventoryData.bagInstance = activePost.inventoryData.bagInstance.filter(b => b.id !== deletedId);
            })
            .addCase(deleteItemInstance.fulfilled, (state, action) => {
                const deletedId = action.payload.id;
                const activePost = state.posts.find(p => p.id === state.activePostId);
                if (!activePost) return;

                activePost.inventoryData.bagInstance = activePost.inventoryData.bagInstance.map(bag => {
                    if (!bag.itemInstance) return bag;

                    return {
                        ...bag,
                        itemInstance: bag.itemInstance.filter(item => item.id !== deletedId)
                    };
                });
            })
    }
})



// Export the actions to be used in components
export const {
    setActivePostId,
    setActiveSpellSlotId,
    setActiveBagId,
    updateLocks,
    updateHealthData,
    updateBasicsData,
    updateSkillById,
    updateSkillsLabel,
    updateAttributesById,
    updateFeatsById,
    updateFeatsLabel,
    updateSpellSlotInstanceById,
    updateSpellInstanceById,
    updateSpellsLabel,
    updatePassivesById,
    updatePassivesLabel,
    updateCurrencyInstanceById,
    updateBagInstanceById,
    updateItemInstanceById,
    updateInventoryLabel,
} = mainSlice.actions;

// Export the reducer to be used in the store
export default mainSlice.reducer;