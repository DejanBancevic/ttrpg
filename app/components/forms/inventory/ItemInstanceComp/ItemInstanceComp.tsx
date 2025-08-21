import React, { useState } from 'react'
import { useDispatch, } from 'react-redux';
import { AppDispatch, } from '@/lib/store';
import { setInfoData, updateItemInstanceById, } from '@/lib/features/main/mainSlice';
import DeleteButton from '../../../DeleteButton/DeleteButton';
import { updateItemInstance } from '@/lib/features/inventory/inventorySlice';
import { readItemBoostInstance } from '@/lib/features/itemBoost/itemBoostSlice';
import { readBoostTagInstance } from '@/lib/features/boostTag/boostTagSlice';
import { applyBoosts } from '@/app/components/ApplyBoost/ApplyBoost';

interface ItemInstanceCompProps {
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
    deleteFunction: Function;
    id: string;
    tags: any[];
}

const ItemInstanceComp: React.FC<ItemInstanceCompProps> = (
    { locks, valueName, value1, value2, value3, value4, value5,
        fieldName, field1, field2, field3, field4, field5,
        styleName, style1, style2, style3, style4, style5, deleteFunction, id, tags }
) => {

    //Redux
    const dispatch: AppDispatch = useDispatch();

    const [isEditing, setIsEditing] = useState(false);
    const [localValue1, setLocalValue1] = useState(value1);
    const [localValue2, setLocalValue2] = useState(value2);
    const [localValue3, setLocalValue3] = useState(value3);
    const [localValue4, setLocalValue4] = useState(value4);
    const [localValue5, setLocalValue5] = useState(value5);

    const handleFocus = (specValue: any, setLocalValueFunc: Function) => {
        setIsEditing(true);
        setLocalValueFunc(specValue);
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>, specField: string, setLocalValueFunc: Function) => {
        if (!locks.inputLock) {
            setLocalValueFunc(e.target.value);
            dispatch(updateItemInstanceById({ key: id, value: { [specField]: e.target.value } }));
        }
    };

    const handleBlur = (specField: string, localValue: string) => {
        if (!locks.inputLock) {
            dispatch(updateItemInstance({
                id: id,
                itemInstance: { [specField]: localValue }
            }));
        }
        setIsEditing(false);
    };

    const boostedVals = applyBoosts({
        fieldKeys: [field1, field2, field3, field4, field5],
        baseValues: {
            [field1]: Number(value1 ?? 0),
            [field2]: Number(value2 ?? 0),
            [field3]: Number(value3 ?? 0),
            [field4]: Number(value4 ?? 0),
            [field5]: Number(value5 ?? 0),
        },
        tags: tags
    });

    return (
        <div className='flex items-center gap-2'>
            {locks.labelLock ? (
                <button
                    onClick={() => {
                        dispatch(setInfoData({
                            showInfo: true,
                            infoType: "item",
                            id,
                            infoContent: "sdasdasdsadasda",
                        }));
                        dispatch(readItemBoostInstance({ id }));
                        dispatch(readBoostTagInstance({ id }));
                    }}
                    spellCheck={false}
                    className={styleName}
                >
                    {valueName}
                </button>
            ) : (
                <textarea
                    value={valueName}
                    readOnly={locks.inputLock}
                    onChange={(e) =>
                        dispatch(updateItemInstanceById({
                            key: id,
                            value: { [fieldName]: e.target.value },
                        }))
                    }
                    onBlur={(e) => {
                        if (!locks.inputLock) {
                            dispatch(updateItemInstance({
                                id,
                                itemInstance: { [fieldName]: e.target.value },
                            }));
                        }
                    }}
                    spellCheck={false}
                    className={styleName}
                />
            )}

            <DeleteButton
                style='size-6'
                deleteFunction={() => deleteFunction(id!)}
            />

            <textarea
                value={isEditing ? localValue1 : boostedVals[field1]}
                readOnly={locks.inputLock}
                onFocus={() => handleFocus(value1, setLocalValue1)}
                onChange={(e) => handleChange(e, field1, setLocalValue1)}
                onBlur={() => handleBlur(field1, localValue1)}
                spellCheck={false}
                className={style1}
            />

            {/* This is DMG and has to be 1d6+2 format */}
            <textarea
                value={isEditing ? localValue2 : localValue2}
                readOnly={locks.inputLock}
                onFocus={() => handleFocus(value2, setLocalValue2)}
                onChange={(e) => handleChange(e, field2, setLocalValue2)}
                onBlur={() => handleBlur(field2, localValue2)}
                spellCheck={false}
                className={style2}
            />

            <textarea
                value={isEditing ? localValue3 : boostedVals[field3]}
                readOnly={locks.inputLock}
                onFocus={() => handleFocus(value3, setLocalValue3)}
                onChange={(e) => handleChange(e, field3, setLocalValue3)}
                onBlur={() => handleBlur(field3, localValue3)}
                spellCheck={false}
                className={style3}
            />

            <textarea
                value={isEditing ? localValue4 : boostedVals[field4]}
                readOnly={locks.inputLock}
                onFocus={() => handleFocus(value4, setLocalValue4)}
                onChange={(e) => handleChange(e, field4, setLocalValue4)}
                onBlur={() => handleBlur(field4, localValue4)}
                spellCheck={false}
                className={style4}
            />

            <textarea
                value={isEditing ? localValue5 : boostedVals[field5]}
                readOnly={locks.inputLock}
                onFocus={() => handleFocus(value5, setLocalValue5)}
                onChange={(e) => handleChange(e, field5, setLocalValue5)}
                onBlur={() => handleBlur(field5, localValue5)}
                spellCheck={false}
                className={style5}
            />

        </div>
    )
  
}

export default ItemInstanceComp