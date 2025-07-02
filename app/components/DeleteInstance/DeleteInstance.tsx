import { AppDispatch, RootState } from '@/lib/store';
import { readPosts, setActivePostId, setActiveSpellSlotId } from '@/lib/features/main/mainSlice';
import { useDispatch, useSelector } from 'react-redux';

export const deleteInstance = (deleteInstanceThunk?: any, data?: any, dataInstance?: string, type?: string) => async (dispatch: AppDispatch, getState: () => RootState) => {

    const { mainData } = getState();
    const post = mainData.posts.find(post => post.id === mainData.activePostId);
    const firstId = post?.spellsData.spellSlotInstance[0]?.id;

    if (type === "spellInstance") {
        await dispatch(deleteInstanceThunk);
        await dispatch(readPosts());
        dispatch(setActivePostId(mainData.activePostId));
    }
    else if (type === "spellSlotInstance") {
        if ((post as any)?.[data]?.[dataInstance!].length! > 1) {
            await dispatch(deleteInstanceThunk);
            await dispatch(readPosts());
            dispatch(setActivePostId(mainData.activePostId));
            dispatch(setActiveSpellSlotId(firstId!));
        }
        else (
            alert("You can't delete the last node. \nFirst create a new one and then delete the one you want.")
        )
    }
    else{
        if ((post as any)?.[data]?.[dataInstance!].length! > 1) {
            await dispatch(deleteInstanceThunk);
            await dispatch(readPosts());
            dispatch(setActivePostId(mainData.activePostId));
        }
        else (
            alert("You can't delete the last node. \nFirst create a new one and then delete the one you want.")
        )
    }
};

