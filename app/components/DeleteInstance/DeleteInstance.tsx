import { AppDispatch, RootState } from '@/lib/store';
import { readPosts, setActivePostId } from '@/lib/features/main/mainSlice';
import { useDispatch, useSelector } from 'react-redux';

export const deleteInstance = (deleteInstanceThunk?: any, data?: any, dataInstance?: string, spell?: boolean) => async (dispatch: AppDispatch, getState: () => RootState) => {

    const { mainData } = getState();
    const post = mainData.posts.find(post => post.id === mainData.activePostId);

    if (spell) {
        await dispatch(deleteInstanceThunk);
        await dispatch(readPosts());
        dispatch(setActivePostId(mainData.activePostId));
    }
    else {
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

