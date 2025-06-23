import React from 'react'
import { useDispatch, } from 'react-redux';
import { AppDispatch, } from '@/lib/store';
import { updateSkillById, updateSkills } from '@/lib/features/main/mainSlice';
import { Trash2 } from '@deemlol/next-icons';

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
    skillId: string;
    deleteFunction: Function;
}


const SkillInputComp: React.FC<SkillInputCompProps> = (
    { locks, activePostId, valueName, valueBonus, valueProfs, fieldName, fieldBonus, fieldProfs, styleName, styleBonus, styleProfs, skillId, deleteFunction }
) => {

    //Redux
    const dispatch: AppDispatch = useDispatch();

    return (

        <div key={skillId} className='flex items-center gap-2'>
            <textarea
                value={valueName}
                readOnly={locks.inputLock}
                onChange={(e) => dispatch(updateSkillById({ key: skillId, value: { [fieldName]: e.target.value } }))}
                onBlur={(e) => {
                    if (!locks.inputLock) {
                        dispatch(updateSkills({
                            postId: activePostId,
                            skills: {
                                skillInstance: [
                                    {
                                        id: skillId,
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
                onChange={(e) => dispatch(updateSkillById({ key: skillId, value: { [fieldBonus]: e.target.value } }))}
                onBlur={(e) => {
                    if (!locks.inputLock) {
                        dispatch(updateSkills({
                            postId: activePostId,
                            skills: {
                                skillInstance: [
                                    {
                                        id: skillId,
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

            <div className='border-l border-gray h-full'></div>

            <textarea
                value={valueProfs}
                readOnly={locks.inputLock}
                onChange={(e) => dispatch(updateSkillById({ key: skillId, value: { [fieldProfs]: e.target.value } }))}
                onBlur={(e) => {
                    if (!locks.inputLock) {
                        dispatch(updateSkills({
                            postId: activePostId,
                            skills: {
                                skillInstance: [
                                    {
                                        id: skillId,
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

            <Trash2
                className='removeButton size-6'
                onClick={() => deleteFunction(skillId!)}
            />

        </div>
    )
}

export default SkillInputComp