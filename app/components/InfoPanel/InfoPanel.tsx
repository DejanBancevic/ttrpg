
import React from 'react'
import MDEditor, { commands } from "@uiw/react-md-editor";
import remarkGfm from "remark-gfm";
import InputComp from '../forms/global/InputComp/InputComp';
import { updateItemInstance } from '@/lib/features/inventory/inventorySlice';
import { updateItemBoostById, updateItemInstanceById } from '@/lib/features/main/mainSlice';
import { AppDispatch, RootState } from '@/lib/store';
import { useDispatch, useSelector } from 'react-redux';
import { addInstance } from '../AddInstance/AddInstance';
import { createItemBoostInstance, deleteItemBoostInstance, readItemBoostInstance, updateItemBoostInstance } from '@/lib/features/itemBoost/itemBoostSlice';
import { Plus } from '@deemlol/next-icons';
import { read } from 'fs';
import DeleteButton from '../DeleteButton/DeleteButton';
import { deleteInstance } from '../DeleteInstance/DeleteInstance';
import ItemBoostComp from '../forms/itemBoost/ItemBoostComp';



const InfoPanel = () => {

    const dispatch: AppDispatch = useDispatch();
    const locks = useSelector((state: RootState) => state.mainData.locks);
    const infoData = useSelector((state: RootState) => state.mainData.infoData);
    const itemBoosts = useSelector((state: RootState) => state.mainData.itemBoosts);

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


    switch (infoData.infoType) {
        case "notes":
            return <MDEditor
                value={infoData.infoContent}
                //onChange={(val) => setValue(val || "")}
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
            return <div className='flex flex-col gap-2 items-center overflow-y-scroll '>

                <MDEditor
                    value={infoData.infoContent}
                    //onChange={(val) => setValue(val || "")}
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

                <div className='flex w-full '>
                    <h1 className='text-lg font-bold ml-20'>targetField</h1>
                    <h1 className='text-lg font-bold ml-20'>targetTag</h1>
                    <h1 className='text-lg font-bold ml-9'>targetType</h1>
                    <h1 className='text-lg font-bold ml-4'>boostAmount</h1>
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

        default:
            return null;
    }
};

export default InfoPanel;