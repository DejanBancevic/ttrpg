import React from 'react'
import { useDispatch, } from 'react-redux';
import { AppDispatch, } from '@/lib/store';
import { setActiveBagId, setActiveFeatSlotId, updateBagInstanceById, updateFeatSlotInstanceById, } from '@/lib/features/main/mainSlice';
import { updateBagInstance, } from '@/lib/features/inventory/inventorySlice';
import DeleteButton from '@/app/components/DeleteButton/DeleteButton';
import { updateFeats } from '@/lib/features/feats/featsSlice';

interface FeatSlotCompProps {
    locks: Record<string, any>;
    valueInfo: any;
    fieldInfo: any;
    styleInfo: string;
    activePostId: string;
    id: string;
    deleteFunction: Function;
}

const FeatSlotComp: React.FC<FeatSlotCompProps> = (
    { locks, valueInfo,
        fieldInfo,
        styleInfo, id, deleteFunction, activePostId
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
                        dispatch(updateFeatSlotInstanceById({
                            key: id, value: { [fieldInfo]: e.target.value }
                        }));
                    }
                }}
                onBlur={(e) => {
                    if (!locks.labelLock) {
                        dispatch(updateFeats({
                            postId: activePostId,
                            feats: {
                                featSlotInstance: [
                                    {
                                        id: id,
                                        [fieldInfo]: e.target.value
                                    },
                                ],
                            },
                        }));
                    }
                }}
                spellCheck={false}
                className={styleInfo}
            />

        </div>
    )
    return (
        <div className='flex items-center gap-1 '>

            {/* Value */}
            <button
                onClick={
                    () => dispatch(setActiveFeatSlotId(id))
                }
                onContextMenu={(e) => {
                    e.preventDefault();
                    if (!locks.deleteLock) {
                        deleteFunction(id!);
                    }
                }}
                spellCheck={false}
                className={styleInfo}
            >
                {valueInfo}
            </button>

        </div>
    )

}

export default FeatSlotComp