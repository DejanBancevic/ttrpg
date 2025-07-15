import React from 'react'
import { useDispatch, } from 'react-redux';
import { AppDispatch, } from '@/lib/store';
import { setInfoData, updateItemBoostById, updateItemInstanceById, } from '@/lib/features/main/mainSlice';
import DeleteButton from '../../DeleteButton/DeleteButton';
import { updateItemInstance } from '@/lib/features/inventory/inventorySlice';
import { readItemBoostInstance, updateItemBoostInstance } from '@/lib/features/itemBoost/itemBoostSlice';

interface itemBoostCompProps {
    locks: Record<string, any>;
    valueName: string;
    value1: string;
    value2: string;
    value3: any;
    fieldName: string;
    field1: string;
    field2: string;
    field3: string;
    styleName: string;
    style1: string;
    style2: string;
    style3: string;
    deleteFunction: Function;
    id: string;
}

const ItemBoostComp: React.FC<itemBoostCompProps> = (
    { locks, valueName, value1, value2, value3, 
        fieldName, field1, field2, field3, 
        styleName, style1, style2, style3,  deleteFunction, id, }
) => {

    //Redux
    const dispatch: AppDispatch = useDispatch();

    return (
        <div className='flex items-center gap-2'>
            <textarea
                value={valueName}
                readOnly={locks.inputLock}
                onChange={(e) =>
                    dispatch(updateItemBoostById({
                        key: id, value: { [fieldName]: e.target.value }
                    }))
                }
                onBlur={(e) => {
                    if (!locks.inputLock) {
                        dispatch(updateItemBoostInstance({
                            id: id,
                            boosts: { [fieldName]: e.target.value }
                        }));
                    }
                }}
                spellCheck={false}
                className={styleName}
            />

            <textarea
                value={value1}
                readOnly={locks.inputLock}
                onChange={(e) => dispatch(updateItemBoostById({ key: id, value: { [field1]: e.target.value } }))}
                onBlur={(e) => {
                    if (!locks.inputLock) {
                        dispatch(updateItemBoostInstance({
                            id: id,
                            boosts: { [field1]: e.target.value }
                        }));
                    }
                }}
                spellCheck={false}
                className={style1}
            />

            <textarea
                value={value2}
                readOnly={locks.inputLock}
                onChange={(e) => dispatch(updateItemBoostById({ key: id, value: { [field2]: e.target.value } }))}
                onBlur={(e) => {
                    if (!locks.inputLock) {
                        dispatch(updateItemBoostInstance({
                            id: id,
                            boosts: { [field2]: e.target.value }
                        }));
                    }
                }}
                spellCheck={false}
                className={style2}
            />

            <textarea
                value={value3}
                readOnly={locks.inputLock}
                onChange={(e) => dispatch(updateItemBoostById({ key: id, value: { [field3]: e.target.value } }))}
                onBlur={(e) => {
                    if (!locks.inputLock) {
                        dispatch(updateItemBoostInstance({
                            id: id,
                            boosts: { [field3]: e.target.value }
                        }));
                    }
                }}
                spellCheck={false}
                className={style3}
            />

            <DeleteButton
                style='size-6'
                deleteFunction={() => deleteFunction(id!)}
            />

        </div>
    )
}

export default ItemBoostComp