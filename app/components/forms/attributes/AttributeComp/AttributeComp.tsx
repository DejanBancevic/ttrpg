import React from 'react'
import { useDispatch, } from 'react-redux';
import { AppDispatch, } from '@/lib/store';
import { updateAttributes, updateAttributesById, } from '@/lib/features/main/mainSlice';
import DeleteButton from '../../../DeleteButton/DeleteButton';

interface AttributeCompProps {
    locks: Record<string, any>;
    activePostId: string;
    valueName: any;
    valueBonus: any;
    valueMod: any;
    valueSave: any;
    fieldName: string;
    fieldBonus: string;
    fieldMod: string;
    fieldSave: string;
    styleName: string;
    styleBonus: string;
    styleMod: string;
    styleSave: string;
    id: string;
    deleteFunction: Function;
}


const AttributeComp: React.FC<AttributeCompProps> = (
    { locks, activePostId, valueName, valueBonus, valueMod, valueSave, fieldName, fieldBonus, fieldMod,
        styleName, fieldSave, styleBonus, styleMod, styleSave, id, deleteFunction }
) => {

    //Redux
    const dispatch: AppDispatch = useDispatch();

    return (
        <div className='flex justify-center items-start gap-2 h-30'>
            <div className='flex flex-col items-center gap-2'>
                <div className='flex justify-between gap-2 items-center'>

                    <input
                        value={valueName}
                        readOnly={locks.labelLock}
                        onChange={(e) => {
                            if (!locks.labelLock) {
                                dispatch(updateAttributesById({ key: id, value: { [fieldName]: e.target.value } }))
                            }
                        }}

                        onBlur={(e) => {
                            if (!locks.labelLock) {
                                dispatch(updateAttributes({
                                    postId: activePostId,
                                    attributes: {
                                        attributeInstance: [
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

                    <DeleteButton
                        style=' size-6'
                        deleteFunction={() => deleteFunction(id!)}
                    />

                </div>
                <div className='flex justify-center items-start gap-2 h-full'> {/* <-- Key change here */}
                    {/* Left Column */}
                    <div className='flex flex-col items-center h-full'> {/* Ensure it can grow */}
                        <textarea
                            value={valueBonus}
                            readOnly={locks.inputLock}
                            onChange={(e) => dispatch(updateAttributesById({ key: id, value: { [fieldBonus]: e.target.value } }))}
                            onBlur={(e) => {
                                if (!locks.inputLock) {
                                    dispatch(updateAttributes({
                                        postId: activePostId,
                                        attributes: {
                                            attributeInstance: [
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
                        <h1 className='text-lg font-bold mt-3'>ST</h1>
                    </div>

                    {/* Right Column */}
                    <div className='flex flex-col justify-center items-center gap-2'>

                        <textarea
                            value={valueMod}
                            readOnly={locks.inputLock}
                            onChange={(e) => dispatch(updateAttributesById({ key: id, value: { [fieldMod]: e.target.value } }))}
                            onBlur={(e) => {
                                if (!locks.inputLock) {
                                    dispatch(updateAttributes({
                                        postId: activePostId,
                                        attributes: {
                                            attributeInstance: [
                                                {
                                                    id: id,
                                                    [fieldMod]: e.target.value
                                                },
                                            ],
                                        },
                                    }));
                                }
                            }}
                            spellCheck={false}
                            className={styleMod}
                        />

                        <textarea
                            value={valueSave}
                            readOnly={locks.inputLock}
                            onChange={(e) => dispatch(updateAttributesById({ key: id, value: { [fieldSave]: e.target.value } }))}
                            onBlur={(e) => {
                                if (!locks.inputLock) {
                                    dispatch(updateAttributes({
                                        postId: activePostId,
                                        attributes: {
                                            attributeInstance: [
                                                {
                                                    id: id,
                                                    [fieldSave]: e.target.value
                                                },
                                            ],
                                        },
                                    }));
                                }
                            }}
                            spellCheck={false}
                            className={styleSave}
                        />
                    </div>
                </div>

            </div>
            <div className='border-l border-gray h-[123px]'></div>
        </div>
    )
}

export default AttributeComp