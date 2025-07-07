import React from 'react'
import { useDispatch, } from 'react-redux';
import { AppDispatch, } from '@/lib/store';
import { setActiveBagId, updateBagInstanceById, } from '@/lib/features/main/mainSlice';
import { updateBagInstance, } from '@/lib/features/inventory/inventorySlice';
import DeleteButton from '@/app/components/DeleteButton/DeleteButton';

interface BagCompProps {
    locks: Record<string, any>;
    valueInfo: any;
    fieldInfo: any;
    styleInfo: string;
    id: string;
    deleteFunction: Function;
}

const BagComp: React.FC<BagCompProps> = (
    { locks, valueInfo,
        fieldInfo,
        styleInfo, id, deleteFunction
    }
) => {

    //Redux
    const dispatch: AppDispatch = useDispatch();

    if (!locks.labelLock) return (
        <div className='flex items-center gap-1 '>

            {/* Value */}
            <textarea
                value={valueInfo}
                readOnly={locks.labelLock}
                onChange={(e) => {
                    if (!locks.labelLock) {
                        dispatch(updateBagInstanceById({
                            key: id, value: { [fieldInfo]: e.target.value }
                        }));
                    }
                }}
                onBlur={(e) => {
                    if (!locks.labelLock) {
                        dispatch(updateBagInstance({
                            id: id,
                            bagInstance: { [fieldInfo]: e.target.value }
                        }));
                    }
                }}
                spellCheck={false}
                className={styleInfo}
            />

            <DeleteButton
                style='size-6 mr-1'
                deleteFunction={() => deleteFunction(id!)}
            />

        </div>
    )
    return (
        <div className='flex items-center gap-1 '>

            {/* Value */}
            <button
                onClick={
                    () => dispatch(setActiveBagId(id))
                }
                spellCheck={false}
                className={styleInfo}
            >
                {valueInfo}
            </button>

            <DeleteButton
                style='size-6 mr-1'
                deleteFunction={() => deleteFunction(id!)}
            />

        </div>
    )

}

export default BagComp