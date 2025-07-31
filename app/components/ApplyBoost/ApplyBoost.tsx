
import { itemInstanceData } from "@/lib/features/interfaces/interfaces";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../lib/store';

export function applyBoostsToItem({ fieldKey, baseValue, tags, }: {
    fieldKey: string;
    baseValue: number;
    tags: any[];
}): number {
    
    let boostSum = 0;

    const activePostId = useSelector((state: RootState) => state.mainData.activePostId);
    const post = useSelector((state: RootState) =>
        state.mainData.posts.find(post => post.id === activePostId)
    )


    /////////////////////////////// BOOSTS

    const allItems = post?.inventoryData.bagInstance
        .flatMap(b => b.itemInstance ?? [])
        .filter((item): item is itemInstanceData => !!item?.id) ?? [];

    //console.log(`\n>> Checking boosts for item "${item.itemName}" (${item.id})`);
    //console.log(`Tags on this item: ${item.tags?.map(t => t.tagValue).join(", ")}`);
    //console.log(`Base value: ${baseValue}`);

    for (const boosterItem of allItems) {
        if (!boosterItem.booster?.length) continue;

        //console.log(`  Booster item: "${boosterItem.itemName}" (${boosterItem.id})`);

        for (const rule of boosterItem.booster) {
            const appliesToField = rule.targetField === fieldKey;
            const hasMatchingTag = rule.targetTag && tags?.some(tag => tag.tagValue === rule.targetTag);

            //console.log(`    Rule: [field=${rule.targetField}] [tag=${rule.targetTag}] [amount=${rule.boostAmount}]`);
            //console.log(`      Applies to field? ${appliesToField}`);
            //console.log(`      Has matching tag? ${hasMatchingTag}`);

            if (appliesToField && hasMatchingTag) {
                //console.log(`      ✅ Applying boost of ${rule.boostAmount}`);
                boostSum += rule.boostAmount ?? 0;
            }
        }
    }

    const finalValue = baseValue + boostSum;
    //console.log(`>> Final boosted value for "${item.itemName}": ${finalValue}`);
    return finalValue;
}