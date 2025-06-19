import React from 'react'
import { useDispatch, } from 'react-redux';
import { AppDispatch, } from '@/lib/store';

interface LabelCompProps {
    locks: Record<string, any>;
    activePostId: string;
    updateLocalData: Function;
    updatePostData: Function;
    model: string;
    value: any;
    inputName: string;
    style: string;
}


const InputComp: React.FC<LabelCompProps> = (
    { locks, activePostId, updateLocalData, updatePostData, model, value, inputName, style }
) => {

    //Redux
    const dispatch: AppDispatch = useDispatch();

    return (
        <textarea
            value={value}
            readOnly={locks.inputLock}
            onChange={(e) => {
                if (!locks.inputLock) {
                    dispatch(updateLocalData({ key: inputName, value: e.target.value }));
                }
            }}
            onBlur={(e) => {
                if (!locks.inputLock) {
                    dispatch(updatePostData({
                        postId: activePostId,
                        [model]: { [inputName]: e.target.value }
                    }));
                }
            }}
            spellCheck={false}
            className={style}
        />
    )
}

export default InputComp