import React from 'react'
import { useDispatch, } from 'react-redux';
import { AppDispatch, } from '@/lib/store';
import { updateSpells, updateSpellSlotInstanceById, } from '@/lib/features/main/mainSlice';

interface SpellSlotLabelCompProps {
    locks: Record<string, any>;
    activePostId: string;
    valueName: string;
    value1: string;
    value2: string;
    value3: string;
    value4: string;
    fieldName: string;
    field1: string;
    field2: string;
    field3: string;
    field4: string;
    styleName: string;
    style1: string;
    style2: string;
    style3: string;
    style4: string;
    id: string;
}

const SpellSlotLabelComp: React.FC<SpellSlotLabelCompProps> = (
    { locks, activePostId, valueName, value1, value2, value3, value4,
        fieldName, field1, field2, field3, field4,
        styleName, style1, style2, style3, style4,
        id, }
) => {

    //Redux
    const dispatch: AppDispatch = useDispatch();

    return (

        < div className='flex justify-between' >

            {/* Text */}
            <input
                value={valueName}
                readOnly={locks.labelLock}
                onChange={(e) => {
                    if (!locks.labelLock) {
                        dispatch(updateSpellSlotInstanceById({ key: id, value: { [fieldName]: e.target.value } }));
                    }
                }}
                onBlur={(e) => {
                    if (!locks.labelLock) {
                        dispatch(updateSpells({
                            postId: activePostId,
                            spells: {
                                spellSlotInstance: [
                                    {
                                        id: id,
                                        [fieldName]: e.target.value
                                    },
                                ],
                            },
                        }));
                    }
                }}
                spellCheck={false}
                className={styleName}
            />

            <div className='flex gap-3 pr-2'>

                <input
                    value={value1}
                    readOnly={locks.labelLock}
                    onChange={(e) => {
                        if (!locks.labelLock) {
                            dispatch(updateSpellSlotInstanceById({ key: id, value: { [field1]: e.target.value } }));
                        }
                    }}
                    onBlur={(e) => {
                        if (!locks.labelLock) {
                            dispatch(updateSpells({
                                postId: activePostId,
                                spells: {
                                    spellSlotInstance: [
                                        {
                                            id: id,
                                            [field1]: e.target.value
                                        },
                                    ],
                                },
                            }));
                        }
                    }}
                    spellCheck={false}
                    className={style1}
                />

                <input
                    value={value2}
                    readOnly={locks.labelLock}
                    onChange={(e) => {
                        if (!locks.labelLock) {
                            dispatch(updateSpellSlotInstanceById({ key: id, value: { [field2]: e.target.value } }));
                        }
                    }}
                    onBlur={(e) => {
                        if (!locks.labelLock) {
                            dispatch(updateSpells({
                                postId: activePostId,
                                spells: {
                                    spellSlotInstance: [
                                        {
                                            id: id,
                                            [field2]: e.target.value
                                        },
                                    ],
                                },
                            }));
                        }
                    }}
                    spellCheck={false}
                    className={style2}
                />

                <input
                    value={value3}
                    readOnly={locks.labelLock}
                    onChange={(e) => {
                        if (!locks.labelLock) {
                            dispatch(updateSpellSlotInstanceById({ key: id, value: { [field3]: e.target.value } }));
                        }
                    }}
                    onBlur={(e) => {
                        if (!locks.labelLock) {
                            dispatch(updateSpells({
                                postId: activePostId,
                                spells: {
                                    spellSlotInstance: [
                                        {
                                            id: id,
                                            [field3]: e.target.value
                                        },
                                    ],
                                },
                            }));
                        }
                    }}
                    spellCheck={false}
                    className={style3}
                />

                <input
                    value={value4}
                    readOnly={locks.labelLock}
                    onChange={(e) => {
                        if (!locks.labelLock) {
                            dispatch(updateSpellSlotInstanceById({ key: id, value: { [field4]: e.target.value } }));
                        }
                    }}
                    onBlur={(e) => {
                        if (!locks.labelLock) {
                            dispatch(updateSpells({
                                postId: activePostId,
                                spells: {
                                    spellSlotInstance: [
                                        {
                                            id: id,
                                            [field4]: e.target.value
                                        },
                                    ],
                                },
                            }));
                        }
                    }}
                    spellCheck={false}
                    className={style4}
                />


            </div>

        </div >

    )
}

export default SpellSlotLabelComp