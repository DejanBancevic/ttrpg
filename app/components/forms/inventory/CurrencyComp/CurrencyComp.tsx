import React from 'react'
import { useDispatch, } from 'react-redux';
import { AppDispatch, } from '@/lib/store';
import { updateCurrencyInstanceById, updateInventoryLabel, } from '@/lib/features/main/mainSlice';
import { updateInventory, updateItemInstance } from '@/lib/features/inventory/inventorySlice';
import DeleteButton from '@/app/components/DeleteButton/DeleteButton';

interface CurrencyCompProps {
    locks: Record<string, any>;
    activePostId: string;
    valueNumber: any;
    valueLabel: any;
    fieldNumber: any;
    fieldLabel: any;
    styleNumber: string;
    styleLabel: string;
    id: string;
    deleteFunction: Function;
}

const CurrencyComp: React.FC<CurrencyCompProps> = (
    { locks, activePostId, valueNumber, valueLabel,
        fieldNumber, fieldLabel,
        styleNumber, styleLabel, id, deleteFunction
    }
) => {

    //Redux
    const dispatch: AppDispatch = useDispatch();

    return (
        <div className='flex  gap-1 '>

            {/* Value */}
            <textarea
                value={valueNumber}
                readOnly={locks.inputLock}
                onChange={(e) => {
                    if (!locks.inputLock) {
                        dispatch(updateCurrencyInstanceById({
                            key: id, value: { [fieldNumber]: e.target.value }
                        }));
                    }
                }}
                onBlur={(e) => {
                    if (!locks.inputLock) {
                        dispatch(updateInventory({
                            postId: activePostId,
                            inventory: { [fieldNumber]: e.target.value }
                        }));
                    }
                }}
                spellCheck={false}
                className={styleNumber}
            />

            {/* Text */}
            <input
                value={valueLabel}
                readOnly={locks.labelLock}
                onChange={(e) => {
                    if (!locks.labelLock) {
                        dispatch(updateCurrencyInstanceById({
                            key: id, value: { [fieldLabel]: e.target.value }
                        }));
                    }
                }}
                onBlur={(e) => {
                    if (!locks.labelLock) {
                        dispatch(updateInventory({
                            postId: activePostId,
                            inventory: { [fieldLabel]: e.target.value }
                        }));
                    }
                }}
                spellCheck={false}
                className={styleLabel}
            />

            <DeleteButton
                style='size-6'
                deleteFunction={() => deleteFunction(id!)}
            />

        </div>

    )
}

export default CurrencyComp