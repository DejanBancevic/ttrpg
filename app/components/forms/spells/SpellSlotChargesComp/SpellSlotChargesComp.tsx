import React from 'react'
import { useDispatch, } from 'react-redux';
import { AppDispatch, } from '@/lib/store';
import { updateSpellSlotInstanceById} from '@/lib/features/main/mainSlice';
import { updateSpells } from '@/lib/features/spells/spellsSlice';

interface SpellSlotChargesCompProps {
    locks: Record<string, any>;
    activePostId: string;
    valueCharges: string;
    valueChargesCurrent: string;
    valueChargesMax: string;
    fieldCharges: string;
    fieldChargesCurrent: string;
    fieldChargesMax: string;
    styleCharges: string;
    styleChargesCurrent: string;
    styleChargesMax: string;
    id: string;
}

const SpellSlotChargesComp: React.FC<SpellSlotChargesCompProps> = (
    { locks, activePostId, valueCharges, valueChargesCurrent, valueChargesMax,
        fieldCharges, fieldChargesCurrent,
        fieldChargesMax, styleCharges, styleChargesCurrent, styleChargesMax,
        id, }
) => {

    //Redux
    const dispatch: AppDispatch = useDispatch();

    return (

        < div className='flex flex-col gap-1' >
            <div className='flex justify-between items-center'>

                <div className='flex items-center gap-1 '>

                    {/* Charges Text */}
                    <input
                        value={valueCharges}
                        readOnly={locks.TextLock}
                        onChange={(e) => {
                            if (!locks.TextLock) {
                                dispatch(updateSpellSlotInstanceById({ key: id, value: { [fieldCharges]: e.target.value } }));
                            }
                        }}
                        onBlur={(e) => {
                            if (!locks.TextLock) {
                                dispatch(updateSpells({
                                    postId: activePostId,
                                    spells: {
                                        spellSlotInstance: [
                                            {
                                                id: id,
                                                [fieldCharges]: e.target.value
                                            },
                                        ],
                                    },
                                }));
                            }
                        }}
                        spellCheck={false}
                        className={styleCharges}
                    />

                    {/* Charge Current */}
                    <textarea
                        value={valueChargesCurrent}
                        readOnly={locks.inputLock}
                        onChange={(e) => dispatch(updateSpellSlotInstanceById({ key: id, value: { [fieldChargesCurrent]: e.target.value } }))}
                        onBlur={(e) => {
                            if (!locks.inputLock) {
                                dispatch(updateSpells({
                                    postId: activePostId,
                                    spells: {
                                        spellSlotInstance: [
                                            {
                                                id: id,
                                                [fieldChargesCurrent]: e.target.value
                                            },
                                        ],
                                    },
                                }));
                            }
                        }}
                        spellCheck={false}
                        className={styleChargesCurrent}
                    />

                    <div className='border border-gray h-10 w-px' />

                    {/* Charge Max */}
                    <textarea
                        value={valueChargesMax}
                        readOnly={locks.inputLock}
                        onChange={(e) => dispatch(updateSpellSlotInstanceById({ key: id, value: { [fieldChargesMax]: e.target.value } }))}
                        onBlur={(e) => {
                            if (!locks.inputLock) {
                                dispatch(updateSpells({
                                    postId: activePostId,
                                    spells: {
                                        spellSlotInstance: [
                                            {
                                                id: id,
                                                [fieldChargesMax]: e.target.value
                                            },
                                        ],
                                    },
                                }));
                            }
                        }}
                        spellCheck={false}
                        className={styleChargesMax}
                    />
                </div>
            </div>

        </div >

    )
}

export default SpellSlotChargesComp