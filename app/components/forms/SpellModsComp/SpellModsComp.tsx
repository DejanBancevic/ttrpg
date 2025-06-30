import React from 'react'
import { useDispatch, } from 'react-redux';
import { AppDispatch, } from '@/lib/store';
import { updateFeats, updateFeatsById, updateSpells, updateSpellsLabel, } from '@/lib/features/main/mainSlice';
import DeleteButton from '../../DeleteButton/DeleteButton';

interface SpellModsCompProps {
    locks: Record<string, any>;
    activePostId: string;
    valueName: string;
    fieldName: any;
    styleName: string;
    valueLabel: string;
    fieldLabel: any;
    styleLabel: string;
}

const SpellModsComp: React.FC<SpellModsCompProps> = (
    { locks, activePostId,  valueName, fieldName,  styleName,   valueLabel, fieldLabel, styleLabel }
) => {

    //Redux
    const dispatch: AppDispatch = useDispatch();

    return (

        <div className='flex flex-col items-center gap-2'>

            {/* Label */}
            <input
                value={valueLabel}
                readOnly={locks.labelLock}
                onChange={(e) => {
                    if (!locks.labelLock) {
                        dispatch(updateSpellsLabel({ key: fieldLabel, value: e.target.value }));
                    }
                }}
                onBlur={(e) => {
                    if (!locks.labelLock) {
                        dispatch(updateSpells({
                            postId: activePostId,
                            spells: { [fieldLabel]: e.target.value }
                        }));
                    }
                }}
                spellCheck={false}
                className={styleLabel}
            />

            
            {/* Input */}
            <textarea
                value={valueName}
                readOnly={locks.inputLock}
                onChange={(e) => dispatch(updateSpellsLabel({ key: fieldName, value: e.target.value }))}
                onBlur={(e) => {
                    if (!locks.inputLock) {
                        dispatch(updateSpells({
                            postId: activePostId,
                            spells: { [fieldName]: e.target.value }
                        }));
                    }
                }}
                spellCheck={false}
                className={styleName}
            />
        </div>
    )
}

export default SpellModsComp