import { itemInstanceData } from "@/lib/features/interfaces/interfaces";

export function applyBoostsToField({
    fieldKey,
    fieldType,
    baseValue,
    items,
}: {
    fieldKey: string;         // e.g. "hpMax"
    fieldType: string;        // e.g. "health"
    baseValue: number;
    items: itemInstanceData[]; // from Redux
}): number {
    let boostSum = 0;

    for (const item of items) {
        if (!item.booster) continue;

        for (const rule of item.booster) {
            if (rule.targetField === fieldKey && rule.targetType === fieldType) {
                boostSum += rule.boostAmount!;
            }
        }
    }

    return baseValue + boostSum;
}
  