import React from 'react'
import { useDispatch, } from 'react-redux';
import { AppDispatch, } from '@/lib/store';

interface SkillsLabelCompProps {
    locks: Record<string, any>;
    activePostId: string;
    updateLocalData: Function;
    updatePostData: Function;
    model: string;
    value: any;
    labelName: string;
    style: string;
}

const SkillsLabelComp: React.FC<SkillsLabelCompProps> = (
    { locks, activePostId, updateLocalData, updatePostData, model, value, labelName, style }
) => {

    //Redux
    const dispatch: AppDispatch = useDispatch();

    return (
        <input
            value={value}
            readOnly={locks.labelLock}
            onChange={(e) => {
                if (!locks.labelLock) {
                    dispatch(updateLocalData({ key: labelName, value: e.target.value }));
                }
            }}
            onBlur={(e) => {
                if (!locks.labelLock) {
                    dispatch(updatePostData({
                        postId: activePostId,
                        [model]: { [labelName]: e.target.value }
                    }));
                }
            }}
            spellCheck={false}
            className={style}
        />
    )
}

export default SkillsLabelComp