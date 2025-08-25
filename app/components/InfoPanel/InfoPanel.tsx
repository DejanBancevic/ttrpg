
import React from 'react'
import MDEditor, { commands } from "@uiw/react-md-editor";
import remarkGfm from "remark-gfm";
import InputComp from '../forms/global/InputComp/InputComp';
import { updateItemInstance } from '@/lib/features/inventory/inventorySlice';
import { readPosts, setInfoData, updateItemBoostById, updateItemInstanceById, updatePost } from '@/lib/features/main/mainSlice';
import { AppDispatch, RootState } from '@/lib/store';
import { useDispatch, useSelector } from 'react-redux';
import { addInstance } from '../AddInstance/AddInstance';
import { createItemBoostInstance, deleteItemBoostInstance, readItemBoostInstance, updateItemBoostInstance } from '@/lib/features/itemBoost/itemBoostSlice';
import { Plus } from '@deemlol/next-icons';
import { read } from 'fs';
import DeleteButton from '../DeleteButton/DeleteButton';
import { deleteInstance } from '../DeleteInstance/DeleteInstance';
import ItemBoostComp from '../forms/itemBoost/ItemBoostComp';
import { createBoostTagInstance, deleteBoostTagInstance, readBoostTagInstance, updateBoostTagInstance } from '@/lib/features/boostTag/boostTagSlice';
import BoostTagComp from '../forms/boostTag/BoostTagComp';
import { info } from 'console';
import { updateSpellInstance } from '@/lib/features/spells/spellsSlice';



const InfoPanel = () => {

    const dispatch: AppDispatch = useDispatch();
    const locks = useSelector((state: RootState) => state.mainData.locks);
    const infoData = useSelector((state: RootState) => state.mainData.infoData);
    const itemBoosts = useSelector((state: RootState) => state.mainData.itemBoosts);
    const boostTags = useSelector((state: RootState) => state.mainData.boostTags);
    const activePostId = useSelector((state: RootState) => state.mainData.activePostId);

    const handleAddItemBoostInstance = async () => {

        await dispatch(addInstance(createItemBoostInstance({ id: infoData.id })))
        await dispatch(readItemBoostInstance({ id: infoData.id }))
    }

    const handleDeleteItemBoostInstance = async (id: string) => {

        if (window.confirm("Are you sure you want to delete this?")) {
            if (!locks.deleteLock) {
                await dispatch(deleteItemBoostInstance({ id: id }),)
                await dispatch(readItemBoostInstance({ id: infoData.id }))
            }
        }

    }

    const handleAddBoostTagInstance = async () => {

        await dispatch(addInstance(createBoostTagInstance({ id: infoData.id })))
        await dispatch(readBoostTagInstance({ id: infoData.id }))
    }

    const handleDeleteBoostTagInstance = async (id: string) => {

        if (window.confirm("Are you sure you want to delete this?")) {
            if (!locks.deleteLock) {
                await dispatch(deleteBoostTagInstance({ id: id }),)
                await dispatch(readBoostTagInstance({ id: infoData.id }))
            }
        }

    }

    switch (infoData.infoType) {
        case "notes":
            return <MDEditor
                value={infoData.infoContent}
                onChange={(e) => {
                    if (!locks.inputLock) {
                        dispatch(setInfoData({ ...infoData, infoContent: e || "" }));
                    }
                }}
                onBlur={() => {
                    if (!locks.inputLock) {
                        dispatch(updatePost({
                            postId: activePostId,
                            notes: infoData.infoContent
                        }));
                        dispatch(readPosts());
                    }
                }}
                height={800}
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

        case "item":
            return <div className='flex flex-col gap-2 items-center overflow-y-auto py-2 '>

                <MDEditor
                    value={infoData.infoContent}
                    onChange={(e) => {
                        if (!locks.inputLock) {
                            dispatch(setInfoData({ ...infoData, infoContent: e || "" }));
                        }
                    }}
                    onBlur={() => {
                        if (!locks.inputLock) {
                            dispatch(updateItemInstance({
                                id: infoData.id,
                                itemInstance: { notes: infoData.infoContent }
                            }));
                            dispatch(readPosts());
                        }
                    }}
                    height={400}
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

                <div className='flex mt-2 mr-28'>
                    <h1 className='text-lg font-bold ml-20'>Boost Tags</h1>
                </div>

                {
                    boostTags?.filter(b => b.itemInstance?.some(item => item.id === infoData.id))?.map((boostTag, index) => (
                        <BoostTagComp
                            key={boostTag.id}
                            locks={locks}
                            valueName={boostTag.tagValue ?? ""}
                            fieldName={'tagValue'}
                            styleName={'card-textarea-item !text-start'}
                            id={boostTag.id!}
                            deleteFunction={handleDeleteBoostTagInstance}
                        />
                    ))
                }

                <Plus
                    onClick={() => handleAddBoostTagInstance()}
                    className='addButton size-6'
                />

                <div className='border-t-2 border-gray w-[600px]'></div>

                <div className='flex w-full mt-2'>
                    <h1 className='text-lg font-bold ml-[65px]'>Target Field</h1>
                    <h1 className='text-lg font-bold ml-[70px]'>Target Tag</h1>
                    <h1 className='text-lg font-bold ml-[35px]'>Target Type</h1>
                    <h1 className='text-lg font-bold ml-[25px]'>Boost Amount</h1>
                </div>
                {
                    itemBoosts?.filter(b => b.boosterId === infoData.id)?.map((itemBoost, index) => (

                        <ItemBoostComp
                            key={itemBoost.id}
                            locks={locks}
                            valueName={itemBoost.targetField ?? ""}
                            value1={itemBoost.targetTag ?? ""}
                            value2={itemBoost.targetType ?? ""}
                            value3={itemBoost.boostAmount ?? ""}
                            fieldName={'targetField'}
                            field1={'targetTag'}
                            field2={'targetType'}
                            field3={'boostAmount'}
                            styleName={'card-textarea-item !text-start'}
                            style1={'card-textarea w-32 h-10'}
                            style2={'card-textarea w-32 h-10'}
                            style3={'card-textarea w-24 h-10'}
                            id={itemBoost.id!}
                            deleteFunction={handleDeleteItemBoostInstance}
                        />

                    ))
                }

                <Plus
                    onClick={() => handleAddItemBoostInstance()}
                    className='addButton size-6'
                />

            </div>

        case "spell":
            return <MDEditor
                value={infoData.infoContent}
                onChange={(e) => {
                    if (!locks.inputLock) {
                        dispatch(setInfoData({ ...infoData, infoContent: e || "" }));
                    }
                }}
                onBlur={() => {
                    if (!locks.inputLock) {
                        dispatch(updateSpellInstance({
                            id: infoData.id,
                            spellInstance: { notes: infoData.infoContent }
                        }));
                        dispatch(readPosts());
                    }
                }}
                height={800}
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


        default:
            return null;
    }
};

export default InfoPanel;