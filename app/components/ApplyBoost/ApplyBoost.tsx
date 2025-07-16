import { itemInstanceData } from "@/lib/features/interfaces/interfaces";

export function applyBoostsToItem({
    fieldKey,
    baseValue,
    item,
    allItems,
}: {
    fieldKey: string;
    baseValue: number;
    item: itemInstanceData;
    allItems: itemInstanceData[]; // for collecting all boosts
}): number {
    let boostSum = 0;

    for (const otherItem of allItems) {
        if (!otherItem.booster) continue;

        for (const rule of otherItem.booster) {
            // 1. Direct field match (e.g. targetField === "itemValue1")
            const directMatch = rule.targetField === fieldKey &&
                rule.boostedById === item.id;

            // 2. Match via tag + type
            const tagTypeMatch =
                rule.targetType === "item" &&
                rule.targetTag &&
                item.tags?.some(tag => tag.tagValue === rule.targetTag);

            if (directMatch || tagTypeMatch) {
                boostSum += rule.boostAmount ?? 0;
            }
        }
    }

    return baseValue + boostSum;
  }