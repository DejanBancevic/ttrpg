'use client';

import { readPosts, setActiveSpellSlotId } from '@/lib/features/main/mainSlice';
import { AppDispatch, RootState } from '@/lib/store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function InitDataLoader() {
    const dispatch: AppDispatch = useDispatch();

    const activePostId = useSelector((state: RootState) => state.mainData.activePostId);
    const post = useSelector((state: RootState) =>
        state.mainData.posts.find(post => post.id === activePostId)
    )
    const firstId = post?.spellsData.spellSlotInstance[0]?.id;

    useEffect(() => {
        dispatch(readPosts());
        dispatch(setActiveSpellSlotId(firstId!));
    }, [dispatch, firstId]);

    return null;
}