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
    allItems: itemInstanceData[];
}): number {
    let boostSum = 0;

    console.log(`\n>> Checking boosts for item "${item.itemName}" (${item.id})`);
    console.log(`Tags on this item: ${item.tags?.map(t => t.tagValue).join(", ")}`);
    console.log(`Base value: ${baseValue}`);

    for (const boosterItem of allItems) {
        if (!boosterItem.booster?.length) continue;

        console.log(`  Booster item: "${boosterItem.itemName}" (${boosterItem.id})`);

        for (const rule of boosterItem.booster) {
            const appliesToField = rule.targetField === fieldKey;
            const hasMatchingTag =
                rule.targetTag &&
                item.tags?.some(tag => tag.tagValue === rule.targetTag);

            console.log(`    Rule: [field=${rule.targetField}] [tag=${rule.targetTag}] [amount=${rule.boostAmount}]`);
            console.log(`      Applies to field? ${appliesToField}`);
            console.log(`      Has matching tag? ${hasMatchingTag}`);

            if (appliesToField && hasMatchingTag) {
                console.log(`      ✅ Applying boost of ${rule.boostAmount}`);
                boostSum += rule.boostAmount ?? 0;
            }
        }
    }

    const finalValue = baseValue + boostSum;
    console.log(`>> Final boosted value for "${item.itemName}": ${finalValue}`);
    return finalValue;
  }