import React from 'react'
import { useDispatch, } from 'react-redux';
import { AppDispatch, } from '@/lib/store';
import { setInfoData, updateBoostTagById, updateItemBoostById, updateItemInstanceById, } from '@/lib/features/main/mainSlice';
import DeleteButton from '../../DeleteButton/DeleteButton';
import { updateItemInstance } from '@/lib/features/inventory/inventorySlice';
import { readItemBoostInstance, updateItemBoostInstance } from '@/lib/features/itemBoost/itemBoostSlice';
import { updateBoostTagInstance } from '@/lib/features/boostTag/boostTagSlice';

interface boostTagCompProps {
    locks: Record<string, any>;
    valueName: string;
    fieldName: string;
    styleName: string;
    deleteFunction: Function;
    id: string;
}

const BoostTagComp: React.FC<boostTagCompProps> = (
    { locks, valueName, 
        fieldName,
        styleName, deleteFunction, id, }
) => {

    //Redux
    const dispatch: AppDispatch = useDispatch();

    return (
        <div className='flex items-center gap-2'>
            <textarea
                value={valueName}
                readOnly={locks.inputLock}
                onChange={(e) =>
                    dispatch(updateBoostTagById({
                        key: id, value: { [fieldName]: e.target.value }
                    }))
                }
                onBlur={(e) => {
                    if (!locks.inputLock) {
                        dispatch(updateBoostTagInstance({
                            id: id,
                            boostTag: { [fieldName]: e.target.value }
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

        </div>
    )
}

export default BoostTagComp