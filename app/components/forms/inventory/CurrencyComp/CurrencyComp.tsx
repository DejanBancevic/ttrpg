import React from 'react'
import { useDispatch, } from 'react-redux';
import { AppDispatch, } from '@/lib/store';
import { updateCurrencyInstanceById, } from '@/lib/features/main/mainSlice';
import { updateCurrencyInstance,} from '@/lib/features/inventory/inventorySlice';
import DeleteButton from '@/app/components/DeleteButton/DeleteButton';

interface CurrencyCompProps {
    locks: Record<string, any>;
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
    { locks, valueNumber, valueLabel,
        fieldNumber, fieldLabel,
        styleNumber, styleLabel, id, deleteFunction
    }
) => {

    //Redux
    const dispatch: AppDispatch = useDispatch();

    return (
        <div className='flex items-center gap-1 '>

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
                        dispatch(updateCurrencyInstance({
                            id: id,
                            currencyInstance: { [fieldNumber]: e.target.value }
                        }));
                    }
                }}
                onContextMenu={(e) => {
                    e.preventDefault();
                    if (!locks.deleteLock) {
                        deleteFunction(id!);
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
                        dispatch(updateCurrencyInstance({
                            id: id,
                            currencyInstance: { [fieldLabel]: e.target.value }
                        }));
                    }
                }}
                spellCheck={false}
                className={styleLabel}
            />

        </div>

    )
}

export default CurrencyComp