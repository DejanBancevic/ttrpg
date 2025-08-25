import React, { useState } from 'react'
import { useDispatch, } from 'react-redux';
import { AppDispatch, } from '@/lib/store';
import { updateFeatInstanceById, } from '@/lib/features/main/mainSlice';
import DeleteButton from '../../../DeleteButton/DeleteButton';
import { updateFeatInstance, updateFeats } from '@/lib/features/feats/featsSlice';
import MDEditor, { commands } from "@uiw/react-md-editor";
import remarkGfm from "remark-gfm";
import { ChevronDown, ChevronUp } from "@deemlol/next-icons"

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

    const [expanded, setExpanded] = useState(false);

    return (

        < div className='flex flex-col gap-1' >
            {/* Top bar */}
            <div className='flex justify-between items-center'>

                {/* Name and Expand */}
                <div className='flex items-center gap-1 '>
                    <input
                        value={valueName}
                        readOnly={locks.labelLock}
                        onChange={(e) => {
                            if (!locks.labelLock) {
                                dispatch(updateFeatInstanceById({ key: id, value: { [fieldName]: e.target.value } }));
                            }
                        }}
                        onBlur={(e) => {
                            dispatch(updateFeatInstance({
                                id: id,
                                featInstance: { [fieldName]: e.target.value },
                            }));
                        }}
                        spellCheck={false}
                        style={{
                            width: `${Math.min(valueName.length * 10 + 10, 300)}px`,
                            transition: "width 0.2s",
                        }}
                        className={styleName}
                    />

                    <button className='!border-none'>
                        {expanded ? <ChevronUp className='icon-md' onClick={() => setExpanded(false)} />
                            : <ChevronDown className='icon-md' onClick={() => setExpanded(true)} />}
                    </button>
                </div>

                {/* Charges */}
                <div className='flex items-center gap-1 '>

                    <DeleteButton
                        style='size-6'
                        deleteFunction={() => deleteFunction(id!)}
                    />

                    {/* Charges Text */}
                    <input
                        value={valueCharges}
                        readOnly={locks.labelLock}
                        onChange={(e) => {
                            if (!locks.labelLock) {
                                dispatch(updateFeatInstanceById({ key: id, value: { [fieldCharges]: e.target.value } }));
                            }
                        }}
                        onBlur={(e) => {
                            if (!locks.labelLock) {
                                dispatch(updateFeatInstance({
                                    id: id,
                                    featInstance: { [fieldCharges]: e.target.value },
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
                        onChange={(e) => dispatch(updateFeatInstanceById({ key: id, value: { [fieldChargesCurrent]: e.target.value } }))}
                        onBlur={(e) => {
                            if (!locks.inputLock) {
                                dispatch(updateFeatInstance({
                                    id: id,
                                    featInstance: { [fieldChargesCurrent]: e.target.value },
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
                        onChange={(e) => dispatch(updateFeatInstanceById({ key: id, value: { [fieldChargesMax]: e.target.value } }))}
                        onBlur={(e) => {
                            if (!locks.inputLock) {
                                dispatch(updateFeatInstance({
                                    id: id,
                                    featInstance: { [fieldChargesMax]: e.target.value },
                                }));
                            }
                        }}
                        spellCheck={false}
                        className={styleChargesMax}
                    />
                </div>
            </div>

            {/* Text */}
            {expanded &&
                <MDEditor
                    value={valueText.replace("{Charges}", valueChargesMax)}
                    onChange={(e) => {
                        if (!locks.inputLock) {
                            dispatch(updateFeatInstanceById({ key: id, value: { [fieldText]: e || "" } }));
                        }
                    }}
                    onBlur={() => {
                        if (!locks.inputLock) {
                            dispatch(updateFeatInstance({
                                id: id,
                                featInstance: { [fieldText]: valueText },
                            }));
                        }
                    }}
                    height={200}
                    preview="preview"
                    visibleDragbar={false}
                    extraCommands={[
                        commands.codeEdit,
                        commands.codeLive,
                        commands.codePreview
                    ]}
                    previewOptions={{
                        remarkPlugins: [remarkGfm],
                    }}
                />
            }

        </div >
    )
}

export default FeatComp