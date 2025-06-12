'use client';

import { updateHealthData } from '@/lib/features/main/mainSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function InitDataLoader() {
    const dispatch = useDispatch();

    useEffect(() => {
        // Auto-create or load health record
        const fetchHealth = async () => {
            try {
                const res = await fetch('/api/health', { method: 'GET' });
                const json = await res.json();
                const health = json.data;

                // update Redux state
                Object.entries(health).forEach(([key, value]) => {
                    if (typeof value === 'string') {
                        dispatch(updateHealthData({ key, value }));
                    }
                });
            } catch (err) {
                console.error("Error fetching health data:", err);
            }
        };

        fetchHealth();
    }, [dispatch]);

    return null; // This is a logic-only component
}