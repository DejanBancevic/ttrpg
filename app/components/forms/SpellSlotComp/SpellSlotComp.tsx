import React from 'react'
import { useDispatch, } from 'react-redux';
import { AppDispatch, } from '@/lib/store';
import { setActiveSpellSlotId, updateFeats, updateFeatsById, updateSpells, updateSpellSlotInstanceById, } from '@/lib/features/main/mainSlice';
import DeleteButton from '../../DeleteButton/DeleteButton';

interface SpellSlotCompProps {
    locks: Record<string, any>;
    activePostId: string;
    valueText: string;
    fieldText: string;
    styleText: string;
    id: string;
}

const SpellSlotComp: React.FC<SpellSlotCompProps> = (
    { locks, activePostId, valueText,
        fieldText,
        styleText,
        id, }
) => {

    //Redux
    const dispatch: AppDispatch = useDispatch();

    return (

        <button
            onClick={() => dispatch(setActiveSpellSlotId(id))}
        >{
            <textarea
                value={valueText}
                readOnly={locks.labelLock}
                onChange={(e) => {
                    if (!locks.labelLock) {
                        dispatch(updateSpellSlotInstanceById({ key: id, value: { [fieldText]: e.target.value } }))
                    }
                }
                }
                onBlur={(e) => {
                    if (!locks.labelLock) {
                        dispatch(updateSpells({
                            postId: activePostId,
                            spells: {
                                spellSlotInstance: [
                                    {
                                        id: id,
                                        [fieldText]: e.target.value
                                    },
                                ],
                            },
                        }));
                    }
                }}
                spellCheck={false}
                className={styleText}
            />}</button>
    )
}

export default SpellSlotComp