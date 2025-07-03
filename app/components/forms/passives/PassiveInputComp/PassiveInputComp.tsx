import React from 'react'
import { useDispatch, } from 'react-redux';
import { AppDispatch, } from '@/lib/store';
import { updatePassivesById, updateSkillById} from '@/lib/features/main/mainSlice';
import DeleteButton from '../../../DeleteButton/DeleteButton';
import { updateSkills } from '@/lib/features/skills/skillsSlice';
import { updatePassives } from '@/lib/features/passives/passivesSlice';

interface PassiveInputCompProps {
    locks: Record<string, any>;
    activePostId: string;
    valueName: any;
    valueBonus: any;
    fieldName: string;
    fieldBonus: string;
    styleName: string;
    styleBonus: string;
    id: string;
    deleteFunction: Function;
    sectionInstance: any;
}


const PassiveInputComp: React.FC<PassiveInputCompProps> = (
    { locks, id, activePostId,
        valueName, valueBonus, 
        fieldName, fieldBonus, 
        styleName, styleBonus, 
        deleteFunction, sectionInstance, }
) => {

    //Redux
    const dispatch: AppDispatch = useDispatch();

    return (

        <div key={id} className='flex items-center gap-2'>

            <textarea
                value={valueName}
                readOnly={locks.inputLock}
                onChange={(e) => dispatch(updatePassivesById({ key: id, value: { [fieldName]: e.target.value } }))}
                onBlur={(e) => {
                    if (!locks.inputLock) {
                        dispatch(updatePassives({
                            postId: activePostId,
                            passives: {
                                [sectionInstance]: [
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
                onChange={(e) => dispatch(updatePassivesById({ key: id, value: { [fieldBonus]: e.target.value } }))}
                onBlur={(e) => {
                    if (!locks.inputLock) {
                        dispatch(updatePassives({
                            postId: activePostId,
                            passives: {
                                [sectionInstance]: [
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

            <DeleteButton
                style=' size-6'
                deleteFunction={() => deleteFunction(id!)}
            />

        </div>
    )
}

export default PassiveInputComp