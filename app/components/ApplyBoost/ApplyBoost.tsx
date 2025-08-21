import { itemInstanceData } from "@/lib/features/interfaces/interfaces";
import { useSelector } from 'react-redux';
import { RootState } from '../../../lib/store';

type ApplyBoostsProps = {
    fieldKeys: string[];
    baseValues: Record<string, number>;
    tags?: any[];
    fieldOnly?: boolean;
}

export function applyBoosts({ fieldKeys, baseValues, tags, fieldOnly }: ApplyBoostsProps) {
    const activePostId = useSelector((state: RootState) => state.mainData.activePostId);
    const post = useSelector((state: RootState) =>
        state.mainData.posts.find(post => post.id === activePostId)
    );

    const allItems = post?.inventoryData.bagInstance
        .flatMap(b => b.itemInstance ?? [])
        .filter((item): item is itemInstanceData => !!item?.id) ?? [];

    const boostMap: Record<string, number> = {};
    fieldKeys.forEach(key => (boostMap[key] = 0));

    if (fieldOnly !== undefined) {
        allItems.forEach(boosterItem => {
            if (boosterItem.booster) {
                boosterItem.booster.forEach(boost => {
                    const appliesToField = fieldKeys.includes(boost.targetField!);
                    if (appliesToField) {
                        boostMap[boost.targetField!] += boost.boostAmount ?? 0;
                    }
                });
            }
        });
    } else {
        allItems.forEach(boosterItem => {
            boosterItem.booster.forEach(boost => {
                const appliesToField = fieldKeys.includes(boost.targetField!);
                const hasMatchingTag = boost.targetTag && tags?.some(tag => tag.tagValue === boost.targetTag);

                if (appliesToField && hasMatchingTag) {
                    boostMap[boost.targetField!] += boost.boostAmount ?? 0;
                }
            });
        });
    }

    const result: Record<string, number> = {};
    for (const field of fieldKeys) {
        const base = baseValues[field] ?? 0;
        const boost = boostMap[field] ?? 0;
        result[field] = base + boost;
    }

    return result;
}
