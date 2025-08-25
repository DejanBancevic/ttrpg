'use client';

import { readPosts, setActiveBagId, setActiveFeatSlotId, setActiveSpellSlotId } from '@/lib/features/main/mainSlice';
import { AppDispatch, RootState } from '@/lib/store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function InitDataLoader() {
    const dispatch: AppDispatch = useDispatch();

    const activePostId = useSelector((state: RootState) => state.mainData.activePostId);
    const post = useSelector((state: RootState) =>
        state.mainData.posts.find(post => post.id === activePostId)
    )
    const firstFeatSlotId = post?.featsData.featSlotInstance[0]?.id;
    const firstSpellSlotId = post?.spellsData.spellSlotInstance[0]?.id;
    const firstBagId = post?.inventoryData.bagInstance[0]?.id;

    useEffect(() => {
        dispatch(readPosts());
        dispatch(setActiveFeatSlotId(firstFeatSlotId!));
        dispatch(setActiveSpellSlotId(firstSpellSlotId!));
        dispatch(setActiveBagId(firstBagId!));
    }, [dispatch, firstSpellSlotId]);

    return null;
}