import React from 'react'
import { useDispatch, } from 'react-redux';
import { AppDispatch, } from '@/lib/store';
import { updatePassivesLabel} from '@/lib/features/main/mainSlice';
import { updatePassives } from '@/lib/features/passives/passivesSlice';

interface PassivesLabelCompProps {
    locks: Record<string, any>;
    activePostId: string;
    valueLabel: any;
    labelName: any;
    style: string;
}

const PassivesLabelComp: React.FC<PassivesLabelCompProps> = (
    { locks, activePostId, valueLabel, labelName, style }
) => {

    //Redux
    const dispatch: AppDispatch = useDispatch();

    return (
        <input
            value={valueLabel}
            readOnly={locks.labelLock}
            onChange={(e) => {
                if (!locks.labelLock) {
                    dispatch(updatePassivesLabel({ key: labelName, value: e.target.value }));
                }
            }}
            onBlur={(e) => {
                if (!locks.labelLock) {
                    dispatch(updatePassives({
                        postId: activePostId,
                        passives: { [labelName]: e.target.value }
                    }));
                }
            }}
            spellCheck={false}
            className={style}
        />
    )
}

export default PassivesLabelComp