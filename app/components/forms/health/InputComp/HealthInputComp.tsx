import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/lib/store';
import { applyBoosts } from '@/app/components/ApplyBoost/ApplyBoost';

interface HealthInputCompProps {
    locks: Record<string, any>;
    activePostId: string;
    updateLocalData: Function;
    updatePostData: Function;
    model: string;
    value: string;       
    inputName: string;
    style: string;
}

const HealthInputComp: React.FC<HealthInputCompProps> = ({
    locks,
    activePostId,
    updateLocalData,
    updatePostData,
    model,
    value,
    inputName,
    style
}) => {
    const dispatch: AppDispatch = useDispatch();

    const [isEditing, setIsEditing] = useState(false);
    const [localValue, setLocalValue] = useState(value);

    const handleFocus = () => {
        setIsEditing(true);
        setLocalValue(value);
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (!locks.inputLock) {
            setLocalValue(e.target.value);
            dispatch(updateLocalData({ key: inputName, value: e.target.value }));
        }
    };

    const handleBlur = () => {
        if (!locks.inputLock) {
            dispatch(updatePostData({
                postId: activePostId,
                [model]: { [inputName]: localValue }
            }));
        }
        setIsEditing(false);
    };

    const boostedValue = applyBoosts({
        fieldOnly: true,
        fieldKeys: [inputName],
        baseValues: { [inputName]: Number(value) }
    })[inputName];

    return (
        <textarea
            value={isEditing ? localValue : boostedValue}
            readOnly={locks.inputLock}
            onFocus={handleFocus}
            onChange={handleChange}
            onBlur={handleBlur}
            spellCheck={false}
            className={style}
        />
    );
};

export default HealthInputComp;