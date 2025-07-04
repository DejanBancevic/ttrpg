import React from 'react'
import { useDispatch, } from 'react-redux';
import { AppDispatch, } from '@/lib/store';
import { updateInventoryLabel, } from '@/lib/features/main/mainSlice';
import { updateInventory } from '@/lib/features/inventory/inventorySlice';

interface WeightCompProps {
    locks: Record<string, any>;
    activePostId: string;
    valueUnit: any;
    valueWeight: any;
    valueWeightCurrent: any;
    valueWeightMax: any;
    fieldUnit: any;
    fieldWeight: any;
    fieldWeightCurrent: any;
    fieldWeightMax: any;
    styleUnit: string;
    styleWeight: string;
    styleWeightsCurrent: string;
    styleWeightsMax: string;
}

const WeightComp: React.FC<WeightCompProps> = (
    { locks, activePostId, valueUnit, valueWeight, valueWeightCurrent, valueWeightMax,
        fieldUnit, fieldWeight, fieldWeightCurrent, fieldWeightMax,
        styleUnit, styleWeight, styleWeightsCurrent, styleWeightsMax,
    }
) => {

    //Redux
    const dispatch: AppDispatch = useDispatch();

    return (

        <div className='flex  gap-1 '>
            {/* Weight Text */}
            <input
                value={valueWeight}
                readOnly={locks.labelLock}
                onChange={(e) => {
                    if (!locks.labelLock) {
                        dispatch(updateInventoryLabel({ key: fieldWeight, value: e.target.value }));
                    }
                }}
                onBlur={(e) => {
                    if (!locks.labelLock) {
                        dispatch(updateInventory({
                            postId: activePostId,
                            inventory: { [fieldWeight]: e.target.value },
                        }));
                    }
                }}
                spellCheck={false}
                className={styleWeight}
            />

            {/* Weight Current */}
            <textarea
                value={valueWeightCurrent}
                readOnly={locks.inputLock}
                onChange={(e) => {
                    if (!locks.inputLock) {
                        dispatch(updateInventoryLabel({ key: fieldWeightCurrent, value: e.target.value }));
                    }
                }}
                onBlur={(e) => {
                    if (!locks.inputLock) {
                        dispatch(updateInventory({
                            postId: activePostId,
                            inventory: { [fieldWeightCurrent]: e.target.value },
                        }));
                    }
                }}
                spellCheck={false}
                className={styleWeightsCurrent}
            />

            <div className='border border-gray h-10 w-px' />

            {/* Weight Max */}
            <textarea
                value={valueWeightMax}
                readOnly={locks.inputLock}
                onChange={(e) => {
                    if (!locks.inputLock) {
                        dispatch(updateInventoryLabel({ key: fieldWeightMax, value: e.target.value }));
                    }
                }}
                onBlur={(e) => {
                    if (!locks.inputLock) {
                        dispatch(updateInventory({
                            postId: activePostId,
                            inventory: { [fieldWeightMax]: e.target.value },
                        }));
                    }
                }}
                spellCheck={false}
                className={styleWeightsMax}
            />

            {/* Unit Text */}
            <input
                value={valueUnit}
                readOnly={locks.labelLock}
                onChange={(e) => {
                    if (!locks.labelLock) {
                        dispatch(updateInventoryLabel({ key: fieldUnit, value: e.target.value }));
                    }
                }}
                onBlur={(e) => {
                    if (!locks.labelLock) {
                        dispatch(updateInventory({
                            postId: activePostId,
                            inventory: { [fieldUnit]: e.target.value },
                        }));
                    }
                }}
                spellCheck={false}
                className={styleUnit}
            />
        </div>

    )
}

export default WeightComp