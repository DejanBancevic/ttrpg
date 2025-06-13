'use client';

import { updateBasicsData, updateHealthData } from '@/lib/features/main/mainSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function InitDataLoader() {
    const dispatch = useDispatch();

    useEffect(() => {
        // Auto-create or load health record
        const fetchPosts = async () => {
            try {
                const res = await fetch('/api/post', { method: 'GET' });
                const json = await res.json();
                const post = json.data;

                Object.entries(post).forEach(([key, value]) => {
                    if (typeof value === 'string') {
                        dispatch(updateHealthData({ key, value }));
                    }
                });

                if (post.health) {
                    Object.entries(post.health).forEach(([key, value]) => {
                        if (typeof value === "string") {
                           dispatch(updateHealthData({key, value}))
                       }
                   })
                }
                
                if (post.basics) {
                    Object.entries(post.basics).forEach(([key, value]) => {
                        if (typeof value === "string") {
                            dispatch(updateBasicsData({ key, value }))
                        }
                    })
                }

            } catch (err) {
                console.error("Error fetching health data:", err);
            }
        };

        fetchPosts();
    }, [dispatch]);

    return null; // This is a logic-only component
}