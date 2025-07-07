import React from 'react'
import { useDispatch, } from 'react-redux';
import { AppDispatch, } from '@/lib/store';
import { updateBagInstanceById, updateSpellSlotInstanceById, } from '@/lib/features/main/mainSlice';
import { updateSpells } from '@/lib/features/spells/spellsSlice';
import { updateBagInstance } from '@/lib/features/inventory/inventorySlice';

interface BagLabelCompProps {
    locks: Record<string, any>;
    valueName: string;
    value1: string;
    value2: string;
    value3: string;
    value4: string;
    value5: string;
    fieldName: string;
    field1: string;
    field2: string;
    field3: string;
    field4: string;
    field5: string;
    styleName: string;
    style1: string;
    style2: string;
    style3: string;
    style4: string;
    style5: string;
    id: string;
}

const BagLabelComp: React.FC<BagLabelCompProps> = (
    { locks,  valueName, value1, value2, value3, value4, value5,
        fieldName, field1, field2, field3, field4, field5,
        styleName, style1, style2, style3, style4, style5,
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
                        dispatch(updateBagInstanceById({ key: id, value: { [fieldName]: e.target.value } }));
                    }
                }}
                onBlur={(e) => {
                    if (!locks.labelLock) {
                        dispatch(updateBagInstance({
                            id: id,
                            bagInstance: {
                                id: id,
                                [fieldName]: e.target.value
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
                            dispatch(updateBagInstanceById({ key: id, value: { [field1]: e.target.value } }));
                        }
                    }}
                    onBlur={(e) => {
                        if (!locks.labelLock) {
                            dispatch(updateBagInstance({
                                id: id,
                                bagInstance: {
                                    id: id,
                                    [field1]: e.target.value
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
                            dispatch(updateBagInstanceById({ key: id, value: { [field2]: e.target.value } }));
                        }
                    }}
                    onBlur={(e) => {
                        if (!locks.labelLock) {
                            dispatch(updateBagInstance({
                                id: id,
                                bagInstance: {
                                    id: id,
                                    [field2]: e.target.value
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
                            dispatch(updateBagInstanceById({ key: id, value: { [field3]: e.target.value } }));
                        }
                    }}
                    onBlur={(e) => {
                        if (!locks.labelLock) {
                            dispatch(updateBagInstance({
                                id: id,
                                bagInstance: {
                                    id: id,
                                    [field3]: e.target.value
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
                            dispatch(updateBagInstanceById({ key: id, value: { [field4]: e.target.value } }));
                        }
                    }}
                    onBlur={(e) => {
                        if (!locks.labelLock) {
                            dispatch(updateBagInstance({
                                id: id,
                                bagInstance: {
                                    id: id,
                                    [field4]: e.target.value
                                },
                            }));
                        }
                    }}
                    spellCheck={false}
                    className={style4}
                />

                <input
                    value={value5}
                    readOnly={locks.labelLock}
                    onChange={(e) => {
                        if (!locks.labelLock) {
                            dispatch(updateBagInstanceById({ key: id, value: { [field5]: e.target.value } }));
                        }
                    }}
                    onBlur={(e) => {
                        if (!locks.labelLock) {
                            dispatch(updateBagInstance({
                                id: id,
                                bagInstance: {
                                    id: id,
                                    [field5]: e.target.value
                                },
                            }));
                        }
                    }}
                    spellCheck={false}
                    className={style5}
                />


            </div>

        </div >

    )
}

export default BagLabelComp