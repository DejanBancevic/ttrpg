import React from 'react'
import { useDispatch, } from 'react-redux';
import { AppDispatch, } from '@/lib/store';
import { setActiveSpellSlotId, updateSpellSlotInstanceById, } from '@/lib/features/main/mainSlice';
import { updateSpells } from '@/lib/features/spells/spellsSlice';

interface SpellSlotCompProps {
    locks: Record<string, any>;
    activePostId: string;
    valueText: string;
    fieldText: string;
    styleText: string;
    id: string;
    deleteFunction: Function;
}

const SpellSlotComp: React.FC<SpellSlotCompProps> = (
    { locks, activePostId, valueText,
        fieldText,
        styleText,
        id,
        deleteFunction, }
) => {

    //Redux
    const dispatch: AppDispatch = useDispatch();

    if (!locks.labelLock) return (
        <textarea
            value={valueText}
            maxLength={1}
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
        />
    )

    return (

        <button
            onClick={() => dispatch(setActiveSpellSlotId(id))}
            onContextMenu={(e) => {
                e.preventDefault();
                if (!locks.deleteLock) { 
                    deleteFunction(id!);
                }
            }}
            className={styleText}
        >
            {valueText}
        </button>
    )
}

export default SpellSlotComp