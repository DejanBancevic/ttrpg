'use client';

import { fetchPosts } from '@/lib/features/main/mainSlice';
import { AppDispatch } from '@/lib/store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function InitDataLoader() {
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    return null; 
}