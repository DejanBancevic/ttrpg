


export interface ItemBoostData {
    id: string;
    targetField: string; 
    boostAmount: number; 
    targetTag?: string; 
    targetType?: string; 
    
};

export interface itemTagData {
    id: string;
    tagValue: string;
    itemInstance: Partial<itemInstanceData>[]
};

export interface inventoryData {
    id: string;
    invLabel: string;
    invWeightLabel: string;
    invWeightCurrent: string;
    invWeightMax: string;
    invWeightUnit: string;
    invCurrenyLabel: string;
    invBagAllLabel: string;
    currencyInstance: Partial<currencyInstanceData>[]
    bagInstance: Partial<bagInstanceData>[]
}

export interface currencyInstanceData {
    id: string;
    currenyValue: string;
    currenyLabel: string;
};

export interface bagInstanceData {
    id: string;
    bagLabel: string;
    itemNameLabel: string;
    itemLabel1: string;
    itemLabel2: string;
    itemLabel3: string;
    itemLabel4: string;
    itemLabel5: string;
    itemInstance: Partial<itemInstanceData>[]
};

export interface itemInstanceData {
    id: string;
    itemName: string;
    itemValue1: string;
    itemValue2: string;
    itemValue3: string;
    itemValue4: string;
    itemValue5: string;
    tags: Partial<itemTagData>[];
    booster: Partial<ItemBoostData>[];
    boostedBy: Partial<ItemBoostData>[];
};

export interface passivesData {
    id: string;
    passiveLabel: string;
    passiveFirstInstance: Partial<passiveInstanceData>[]
    passiveSecondInstance: Partial<passiveInstanceData>[]
    passiveThirdInstance: Partial<passiveInstanceData>[]
}

export interface passiveInstanceData {
    id: string;
    passiveName: string;
    passiveValue: string;
}

export interface spellsData {
    id: string;
    spellsLabel: string;
    spellsModifierLabel: string;
    spellsAttackLabel: string;
    spellsSaveLabel: string;
    spellsModifier: string;
    spellsAttack: string;
    spellsSave: string;
    spellSlotInstance: Partial<spellSlotInstanceData>[]
}

export interface spellSlotInstanceData {
    id: string;
    spellSlotBoxLabel: string;
    spellSlotLabel: string;
    spellSlotCurrent: string;
    spellSlotMax: string;
    spellNameLabel: string;
    spellLabel1: string;
    spellLabel2: string;
    spellLabel3: string;
    spellLabel4: string;
    spellInstance: Partial<spellInstanceData>[]
};

export interface spellInstanceData {
    id: string;
    spellNameValue: string;
    spellValue1: string;
    spellValue2: string;
    spellValue3: string;
    spellValue4: string;
};

export interface featsData {
    id: string;
    featsLabel: string;
    featInstance: Partial<featInstanceData>[]
}

export interface featInstanceData {
    id: string;
    featName: string;
    featChargeLabel: string;
    featChargeCurrent: string;
    featChargeMax: string;
    featText: string;
};

export interface attributesData {
    id: string;
    attributeInstance: Partial<attributeInstanceData>[]
}

export interface attributeInstanceData {
    id: string;
    attributeName: string;
    attributeValue: String;
    attributeMod: String;
    attributeSave: String;
    attributeColor: String;
};

export interface skillsData {
    id: string;
    skillsLabel: string;
    profsLabel: string;
    skillInstance: Partial<skillInstanceData>[]
}

export interface skillInstanceData {
    id: string;
    skillName: string;
    skillValue: string;
    skillProf: string;
};

export interface healthData {
    hpCurrent: string;
    hpMax: string;
    hpTemp: string;
    ac: string;
    stressCurrent: string;
    stressMax: string;
    hpLabel: string;
    hpTempLabel: string;
    acLabel: string;
    stressLabel: string;
};

export interface basicsData {
    imageUrl: string;
    name: string;
    desc: string;
    level: string;
    xp: string;
    levelLabel: string;
    xpLabel: string;
};

