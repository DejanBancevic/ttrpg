import React from 'react'
import { useDispatch, } from 'react-redux';
import { AppDispatch, } from '@/lib/store';
import { updateFeats, updateFeatsById, } from '@/lib/features/main/mainSlice';
import DeleteButton from '../../DeleteButton/DeleteButton';

interface FeatCompProps {
    locks: Record<string, any>;
    activePostId: string;
    valueName: any;
    valueCharges: any;
    valueChargesCurrent: any;
    valueChargesMax: any;
    valueText: any;
    fieldName: string;
    fieldCharges: string;
    fieldChargesCurrent: string;
    fieldChargesMax: string;
    fieldText: string;
    styleName: string;
    styleCharges: string;
    styleChargesCurrent: string;
    styleChargesMax: string;
    styleText: string;
    id: string;
    deleteFunction: Function;
}

const FeatComp: React.FC<FeatCompProps> = (
    { locks, activePostId, valueText, valueName, valueCharges, valueChargesCurrent, valueChargesMax,
        fieldName, fieldCharges, fieldChargesCurrent, fieldText,
        styleText, styleName, fieldChargesMax, styleCharges, styleChargesCurrent, styleChargesMax,
        id, deleteFunction, }
) => {

    //Redux
    const dispatch: AppDispatch = useDispatch();

    return (

        < div className='flex flex-col gap-1' >
            <div className='flex justify-between items-center'>

                {/* Name */}
                <input
                    value={valueName}
                    readOnly={locks.TextLock}
                    onChange={(e) => {
                        if (!locks.TextLock) {
                            dispatch(updateFeatsById({ key: id, value: { [fieldName]: e.target.value } }));
                        }
                    }}
                    onBlur={(e) => {
                        dispatch(updateFeats({
                            postId: activePostId,
                            feats: {
                                featInstance: [
                                    {
                                        id: id,
                                        [fieldName]: e.target.value
                                    },
                                ],
                            },
                        }));
                    }}
                    spellCheck={false}
                    className={styleName}
                />

                <div className='flex items-center gap-1 '>

                    <DeleteButton
                        style='size-6'
                        deleteFunction={() => deleteFunction(id!)}
                    />

                    {/* Charges Text */}
                    <input
                        value={valueCharges}
                        readOnly={locks.TextLock}
                        onChange={(e) => {
                            if (!locks.TextLock) {
                                dispatch(updateFeatsById({ key: id, value: { [fieldCharges]: e.target.value } }));
                            }
                        }}
                        onBlur={(e) => {
                            if (!locks.TextLock) {
                                dispatch(updateFeats({
                                    postId: activePostId,
                                    feats: {
                                        featInstance: [
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
                        onChange={(e) => dispatch(updateFeatsById({ key: id, value: { [fieldChargesCurrent]: e.target.value } }))}
                        onBlur={(e) => {
                            if (!locks.inputLock) {
                                dispatch(updateFeats({
                                    postId: activePostId,
                                    feats: {
                                        featInstance: [
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
                        onChange={(e) => dispatch(updateFeatsById({ key: id, value: { [fieldChargesMax]: e.target.value } }))}
                        onBlur={(e) => {
                            if (!locks.inputLock) {
                                dispatch(updateFeats({
                                    postId: activePostId,
                                    feats: {
                                        featInstance: [
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

            {/* Text */}
            <textarea
                value={valueText}
                readOnly={locks.inputLock}
                onChange={(e) => dispatch(updateFeatsById({ key: id, value: { [fieldText]: e.target.value } }))}
                onBlur={(e) => {
                    if (!locks.inputLock) {
                        dispatch(updateFeats({
                            postId: activePostId,
                            feats: {
                                featInstance: [
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

        </div >

    )
}

export default FeatComp