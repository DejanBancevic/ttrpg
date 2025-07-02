import React from 'react'
import { useDispatch, } from 'react-redux';
import { AppDispatch, } from '@/lib/store';
import { updateFeatsLabel } from '@/lib/features/main/mainSlice';
import { updateFeats } from '@/lib/features/feats/featsSlice';

interface FeatsLabelCompProps {
    locks: Record<string, any>;
    activePostId: any;
    valueLabel: string;
    fieldLabel: any;
    styleLabel: string;
}

const FeatsLabelComp: React.FC<FeatsLabelCompProps> = (
    { locks, activePostId, valueLabel, fieldLabel, styleLabel }
) => {

    //Redux
    const dispatch: AppDispatch = useDispatch();

    return (
        <input
            value={valueLabel}
            readOnly={locks.labelLock}
            onChange={(e) => {
                if (!locks.labelLock) {
                    dispatch(updateFeatsLabel({ key: fieldLabel, value: e.target.value }));
                }
            }}
            onBlur={(e) => {
                if (!locks.labelLock) {
                    dispatch(updateFeats({
                        postId: activePostId,
                        feats: { [fieldLabel]: e.target.value }
                    }));
                }
            }}
            spellCheck={false}
            className={styleLabel}
        />
    )
}

export default FeatsLabelComp