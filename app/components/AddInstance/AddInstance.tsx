import { AppDispatch, RootState } from '@/lib/store';
import { readPosts, setActivePostId } from '@/lib/features/main/mainSlice';

export const addInstance = (createInstanceThunk: any) => async (dispatch: AppDispatch, getState: () => RootState) => {

    await dispatch(createInstanceThunk);
    await dispatch(readPosts());

    const { mainData } = getState();
    dispatch(setActivePostId(mainData.activePostId));
};

