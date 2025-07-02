import React from 'react'
import { useDispatch, } from 'react-redux';
import { AppDispatch, } from '@/lib/store';
import { updateSkillsLabel } from '@/lib/features/main/mainSlice';
import { updateSkills } from '@/lib/features/skills/skillsSlice';

interface SkillsLabelCompProps {
    locks: Record<string, any>;
    activePostId: string;
    valueLabel: any;
    labelName: any;
    style: string;
}

const SkillsLabelComp: React.FC<SkillsLabelCompProps> = (
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
                    dispatch(updateSkillsLabel({ key: labelName, value: e.target.value }));
                }
            }}
            onBlur={(e) => {
                if (!locks.labelLock) {
                    dispatch(updateSkills({
                        postId: activePostId,
                        skills: { [labelName]: e.target.value }
                    }));
                }
            }}
            spellCheck={false}
            className={style}
        />
    )
}

export default SkillsLabelComp