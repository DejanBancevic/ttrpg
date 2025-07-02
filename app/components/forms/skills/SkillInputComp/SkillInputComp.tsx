import React from 'react'
import { useDispatch, } from 'react-redux';
import { AppDispatch, } from '@/lib/store';
import { updateSkillById} from '@/lib/features/main/mainSlice';
import DeleteButton from '../../../DeleteButton/DeleteButton';
import { updateSkills } from '@/lib/features/skills/skillsSlice';

interface SkillInputCompProps {
    locks: Record<string, any>;
    activePostId: string;
    valueName: any;
    valueBonus: any;
    valueProfs: any;
    fieldName: string;
    fieldBonus: string;
    fieldProfs: string;
    styleName: string;
    styleBonus: string;
    styleProfs: string;
    id: string;
    deleteFunction: Function;
}


const SkillInputComp: React.FC<SkillInputCompProps> = (
    { locks, id, activePostId,
        valueName, valueBonus, valueProfs,
        fieldName, fieldBonus, fieldProfs,
        styleName, styleBonus, styleProfs,
        deleteFunction }
) => {

    //Redux
    const dispatch: AppDispatch = useDispatch();

    return (

        <div key={id} className='flex items-center gap-2'>

            <textarea
                value={valueName}
                readOnly={locks.inputLock}
                onChange={(e) => dispatch(updateSkillById({ key: id, value: { [fieldName]: e.target.value } }))}
                onBlur={(e) => {
                    if (!locks.inputLock) {
                        dispatch(updateSkills({
                            postId: activePostId,
                            skills: {
                                skillInstance: [
                                    {
                                        id: id,
                                        [fieldName]: e.target.value
                                    },
                                ],
                            },
                        }));
                    }
                }}
                spellCheck={false}
                className={styleName}
            />

            <textarea
                value={valueBonus}
                readOnly={locks.inputLock}
                onChange={(e) => dispatch(updateSkillById({ key: id, value: { [fieldBonus]: e.target.value } }))}
                onBlur={(e) => {
                    if (!locks.inputLock) {
                        dispatch(updateSkills({
                            postId: activePostId,
                            skills: {
                                skillInstance: [
                                    {
                                        id: id,
                                        [fieldBonus]: e.target.value
                                    },
                                ],
                            },
                        }));
                    }
                }}
                spellCheck={false}
                className={styleBonus}
            />

            <div className='border-l border-gray h-[38px]'></div>

            <textarea
                value={valueProfs}
                readOnly={locks.inputLock}
                onChange={(e) => dispatch(updateSkillById({ key: id, value: { [fieldProfs]: e.target.value } }))}
                onBlur={(e) => {
                    if (!locks.inputLock) {
                        dispatch(updateSkills({
                            postId: activePostId,
                            skills: {
                                skillInstance: [
                                    {
                                        id: id,
                                        [fieldProfs]: e.target.value
                                    },
                                ],
                            },
                        }));
                    }
                }}
                spellCheck={false}
                className={styleProfs}
            />

            <DeleteButton
                style=' size-6'
                deleteFunction={() => deleteFunction(id!)}
            />

        </div>
    )
}

export default SkillInputComp