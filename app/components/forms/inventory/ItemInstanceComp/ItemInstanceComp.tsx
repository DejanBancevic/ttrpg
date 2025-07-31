import React from 'react'
import { useDispatch, } from 'react-redux';
import { AppDispatch, } from '@/lib/store';
import { setInfoData, updateItemInstanceById, } from '@/lib/features/main/mainSlice';
import DeleteButton from '../../../DeleteButton/DeleteButton';
import { updateItemInstance } from '@/lib/features/inventory/inventorySlice';
import { readItemBoostInstance } from '@/lib/features/itemBoost/itemBoostSlice';
import { readBoostTagInstance } from '@/lib/features/boostTag/boostTagSlice';
import { applyBoostsToItem } from '@/app/components/ApplyBoost/ApplyBoost';

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

    const boostedVal = applyBoostsToItem({
        fieldKey: "itemValue1",
        baseValue: Number(value1 ?? 0),
        tags: tags
    });

    if (!locks.labelLock) return (
        <div className='flex items-center gap-2'>
            <textarea
                value={valueName}
                readOnly={locks.inputLock}
                onChange={(e) =>
                    dispatch(updateItemInstanceById({
                        key: id, value: { [fieldName]: e.target.value }
                    }))
                }
                onBlur={(e) => {
                    if (!locks.inputLock) {
                        dispatch(updateItemInstance({
                            id: id,
                            itemInstance: { [fieldName]: e.target.value }
                        }));
                    }
                }}
                spellCheck={false}
                className={styleName}
            />

            <DeleteButton
                style='size-6'
                deleteFunction={() => deleteFunction(id!)}
            />

            <textarea
                value={value1}
                readOnly={locks.inputLock}
                onChange={(e) => dispatch(updateItemInstanceById({ key: id, value: { [field1]: e.target.value } }))}
                onBlur={(e) => {
                    if (!locks.inputLock) {
                        dispatch(updateItemInstance({
                            id: id,
                            itemInstance: { [field1]: e.target.value }
                        }));
                    }
                }}
                spellCheck={false}
                className={style1}
            />

            <textarea
                value={value2}
                readOnly={locks.inputLock}
                onChange={(e) => dispatch(updateItemInstanceById({ key: id, value: { [field2]: e.target.value } }))}
                onBlur={(e) => {
                    if (!locks.inputLock) {
                        dispatch(updateItemInstance({
                            id: id,
                            itemInstance: { [field2]: e.target.value }
                        }));
                    }
                }}
                spellCheck={false}
                className={style2}
            />

            <textarea
                value={value3}
                readOnly={locks.inputLock}
                onChange={(e) => dispatch(updateItemInstanceById({ key: id, value: { [field3]: e.target.value } }))}
                onBlur={(e) => {
                    if (!locks.inputLock) {
                        dispatch(updateItemInstance({
                            id: id,
                            itemInstance: { [field3]: e.target.value }
                        }));
                    }
                }}
                spellCheck={false}
                className={style3}
            />

            <textarea
                value={value4}
                readOnly={locks.inputLock}
                onChange={(e) => dispatch(updateItemInstanceById({ key: id, value: { [field4]: e.target.value } }))}
                onBlur={(e) => {
                    if (!locks.inputLock) {
                        dispatch(updateItemInstance({
                            id: id,
                            itemInstance: { [field4]: e.target.value }
                        }));
                    }
                }}
                spellCheck={false}
                className={style4}
            />

            <textarea
                value={value5}
                readOnly={locks.inputLock}
                onChange={(e) => dispatch(updateItemInstanceById({ key: id, value: { [field5]: e.target.value } }))}
                onBlur={(e) => {
                    if (!locks.inputLock) {
                        dispatch(updateItemInstance({
                            id: id,
                            itemInstance: { [field5]: e.target.value }
                        }));
                    }
                }}
                spellCheck={false}
                className={style5}
            />

        </div>
    )

    return (
        <div className='flex items-center gap-2'>


            <button
                onClick={
                    () =>
                    {
                        dispatch(setInfoData({
                            showInfo: true,
                            infoType: "item",
                            id: id,
                            infoContent: "sdasdasdsadasda"
                        }))
                        dispatch(readItemBoostInstance({ id: id }))
                        dispatch(readBoostTagInstance({ id: id }))
                    }
                }
                spellCheck={false}
                className={styleName}
            >
                {valueName}
            </button>

            <DeleteButton
                style='size-6'
                deleteFunction={() => deleteFunction(id!)}
            />
            <h1>
                {boostedVal}
            </h1>

            <textarea
                value={value1}
                readOnly={locks.inputLock}
                onChange={(e) => dispatch(updateItemInstanceById({ key: id, value: { [field1]: e.target.value } }))}
                onBlur={(e) => {
                    if (!locks.inputLock) {
                        dispatch(updateItemInstance({
                            id: id,
                            itemInstance: { [field1]: e.target.value }
                        }));
                    }
                }}
                spellCheck={false}
                className={style1}
            />

            <textarea
                value={value2}
                readOnly={locks.inputLock}
                onChange={(e) => dispatch(updateItemInstanceById({ key: id, value: { [field2]: e.target.value } }))}
                onBlur={(e) => {
                    if (!locks.inputLock) {
                        dispatch(updateItemInstance({
                            id: id,
                            itemInstance: { [field2]: e.target.value }
                        }));
                    }
                }}
                spellCheck={false}
                className={style2}
            />

            <textarea
                value={value3}
                readOnly={locks.inputLock}
                onChange={(e) => dispatch(updateItemInstanceById({ key: id, value: { [field3]: e.target.value } }))}
                onBlur={(e) => {
                    if (!locks.inputLock) {
                        dispatch(updateItemInstance({
                            id: id,
                            itemInstance: { [field3]: e.target.value }
                        }));
                    }
                }}
                spellCheck={false}
                className={style3}
            />

            <textarea
                value={value4}
                readOnly={locks.inputLock}
                onChange={(e) => dispatch(updateItemInstanceById({ key: id, value: { [field4]: e.target.value } }))}
                onBlur={(e) => {
                    if (!locks.inputLock) {
                        dispatch(updateItemInstance({
                            id: id,
                            itemInstance: { [field4]: e.target.value }
                        }));
                    }
                }}
                spellCheck={false}
                className={style4}
            />

            <textarea
                value={value5}
                readOnly={locks.inputLock}
                onChange={(e) => dispatch(updateItemInstanceById({ key: id, value: { [field5]: e.target.value } }))}
                onBlur={(e) => {
                    if (!locks.inputLock) {
                        dispatch(updateItemInstance({
                            id: id,
                            itemInstance: { [field5]: e.target.value }
                        }));
                    }
                }}
                spellCheck={false}
                className={style5}
            />

        </div>
    )
}

export default ItemInstanceComp