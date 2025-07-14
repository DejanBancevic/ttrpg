import React from 'react'
import MDEditor, { commands } from "@uiw/react-md-editor";
import remarkGfm from "remark-gfm";
import InputComp from '../forms/global/InputComp/InputComp';
import { updateItemInstance } from '@/lib/features/inventory/inventorySlice';
import { updateItemInstanceById } from '@/lib/features/main/mainSlice';
import { AppDispatch, RootState } from '@/lib/store';
import { useDispatch, useSelector } from 'react-redux';



const InfoPanel = () => {

    const dispatch: AppDispatch = useDispatch();
    const locks = useSelector((state: RootState) => state.mainData.locks);
    const activePostId = useSelector((state: RootState) => state.mainData.activePostId);
    const activeSpellSlotId = useSelector((state: RootState) => state.mainData.activeSpellSlotId);
    const activeBagId = useSelector((state: RootState) => state.mainData.activeBagId);
    const post = useSelector((state: RootState) =>
        state.mainData.posts.find(post => post.id === activePostId)
    )
    const infoData = useSelector((state: RootState) => state.mainData.infoData);

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
            return <div>

                <textarea
                    value={post?.inventoryData.bagInstance?.find(b => b.id === activeBagId)?.itemInstance?.find(i => i.id === infoData.id)?.itemName}
                    readOnly={locks.inputLock}
                    onChange={(e) => dispatch(updateItemInstanceById({ key: infoData.id, value: { 'itemName': e.target.value } }))}
                    onBlur={(e) => {
                        if (!locks.inputLock) {
                            dispatch(updateItemInstance({
                                id: infoData.id,
                                itemInstance: { 'itemName': e.target.value }
                            }));
                        }
                    }}
                    spellCheck={false}
                    className={"bg-grayBackground w-[500px] h-32"}
                />

                {infoData.id}
                
            </div>

        default:
            return null;
    }
};

export default InfoPanel;