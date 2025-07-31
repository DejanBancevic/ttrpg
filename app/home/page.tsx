'use client'

import React from 'react';
import './page.css';
import { Info, Plus } from "@deemlol/next-icons";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../lib/store';
import { updatePost, updateHealthData, updateBasicsData, updateSpellsLabel, updateInventoryLabel } from '@/lib/features/main/mainSlice';
import LabelComp from '../components/forms/global/LabelComp/LabelComp';
import InputComp from '../components/forms/global/InputComp/InputComp';
import SkillInputComp from '../components/forms/skills/SkillInputComp/SkillInputComp';
import AttributeComp from '../components/forms/attributes/AttributeComp/AttributeComp';
import FeatComp from '../components/forms/feats/FeatComp/FeatComp';
import FeatsLabelComp from '../components/forms/feats/FeatsLabelComp/FeatsLabelComp';
import { addInstance } from '../components/AddInstance/AddInstance';
import { deleteInstance } from '../components/DeleteInstance/DeleteInstance';
import SkillsLabelComp from '../components/forms/skills/SkillsLabelComp/SkillsLabelComp';
import SpellModsComp from '../components/forms/spells/SpellModsComp/SpellModsComp';
import SpellSlotComp from '../components/forms/spells/SpellSlotComp/SpellSlotComp';
import SpellSlotChargesComp from '../components/forms/spells/SpellSlotChargesComp/SpellSlotChargesComp';
import SpellSlotLabelComp from '../components/forms/spells/SpellSlotLabelComp/SpellSlotLabelComp';
import SpellInstanceComp from '../components/forms/spells/SpellInstanceComp/SpellInstanceComp';
import { createFeatInstance, deleteFeatInstance } from '@/lib/features/feats/featsSlice';
import { createAttributeInstance, deleteAttributeInstance } from '@/lib/features/attributes/attributesSlice';
import { createSkillInstance, deleteSkillInstance } from '@/lib/features/skills/skillsSlice';
import { createSpellInstance, createSpellSlotInstance, deleteSpellInstance, deleteSpellSlotInstance, updateSpells } from '@/lib/features/spells/spellsSlice';
import { createPassiveInstance, deletePassiveInstance } from '@/lib/features/passives/passivesSlice';
import PassiveInputComp from '../components/forms/passives/PassiveInputComp/PassiveInputComp';
import PassivesLabelComp from '../components/forms/passives/PassivesLabelComp/PassivesLabelComp';
import { createBagInstance, createCurrencyInstance, createItemInstance, deleteBagInstance, deleteCurrencyInstance, deleteItemInstance, updateInventory } from '@/lib/features/inventory/inventorySlice';
import WeightComp from '../components/forms/inventory/WeightComp/WeightComp';
import CurrencyComp from '../components/forms/inventory/CurrencyComp/CurrencyComp';
import BagComp from '../components/forms/inventory/BagComp/BagComp';
import BagLabelComp from '../components/forms/inventory/BagLabelComp/BagLabelComp';
import ItemInstanceComp from '../components/forms/inventory/ItemInstanceComp/ItemInstanceComp';
import { Tooltip } from '../components/Tooltip/Tooltip';
import { applyBoostsToItem } from '../components/ApplyBoost/ApplyBoost';
import { itemInstanceData } from '@/lib/features/interfaces/interfaces';

const Home = () => {

  //Redux
  const dispatch: AppDispatch = useDispatch();
  const activePostId = useSelector((state: RootState) => state.mainData.activePostId);
  const activeSpellSlotId = useSelector((state: RootState) => state.mainData.activeSpellSlotId);
  const activeBagId = useSelector((state: RootState) => state.mainData.activeBagId);
  const post = useSelector((state: RootState) =>
    state.mainData.posts.find(post => post.id === activePostId)
  )
  const locks = useSelector((state: RootState) => state.mainData.locks);
  const loading = useSelector((state: RootState) => state.mainData.loading);

  /////////////////////////////// BOOSTS


  //#region Handles

  {/*Skills */ }
  const handleAddSkillInstance = async () => {

    dispatch(addInstance(createSkillInstance(post!.skillsData.id)))
  }

  const handleDeleteSkillInstance = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      dispatch(deleteInstance(deleteSkillInstance({ id }), 'skillsData', 'skillInstance'))
    }
  }

  {/*Attributes */ }
  const handleAddAttributeInstance = async () => {
    dispatch(addInstance(createAttributeInstance(post!.attributesData.id)))

  }

  const handleDeleteAttributeInstance = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      dispatch(deleteInstance(deleteAttributeInstance({ id: id }), 'attributesData', 'attributeInstance'))
    }
  }

  {/*Feats */ }
  const handleAddFeatInstance = async () => {

    dispatch(addInstance(createFeatInstance(post!.featsData.id)))
  }

  const handleDeleteFeatInstance = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      dispatch(deleteInstance(deleteFeatInstance({ id: id }), 'featsData', 'featInstance'))
    }
  }

  {/*Spells */ }
  const handleAddSpellSlotInstance = async () => {

    dispatch(addInstance(createSpellSlotInstance(post!.spellsData.id)))
  }

  const handleAddSpellInstance = async () => {

    dispatch(addInstance(createSpellInstance(activeSpellSlotId)))
  }

  const handleDeleteSpellSlotInstance = async (id: string) => {

    if (window.confirm("Are you sure you want to delete this?")) {
      if (!locks.deleteLock) {
        dispatch(deleteInstance(deleteSpellSlotInstance({ id: id }), 'spellsData', 'spellSlotInstance', "spellSlotInstance"))
      }
    }
  }

  const handleDeleteSpellInstance = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      dispatch(deleteInstance(deleteSpellInstance({ id: id }), undefined, undefined, "spellInstance"))
    }
  }

  {/*Passives */ }
  const handleAddPassiveFirstInstance = async () => {

    dispatch(addInstance(createPassiveInstance({ id: post!.passivesData.id, section: "first" })))
  }

  const handleAddPassiveSecondInstance = async () => {

    dispatch(addInstance(createPassiveInstance({ id: post!.passivesData.id, section: "second" })))
  }

  const handleAddPassiveThirdInstance = async () => {

    dispatch(addInstance(createPassiveInstance({ id: post!.passivesData.id, section: "third" })))
  }

  const handleDeletePassiveFirstInstance = async (id: string, section: string,) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      dispatch(deleteInstance(deletePassiveInstance({ id: id, section: "first" }), "passivesData", "passiveFirstInstance",))
    }
  }

  const handleDeletePassiveSecondInstance = async (id: string, section: string,) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      dispatch(deleteInstance(deletePassiveInstance({ id: id, section: "second" }), "passivesData", "passiveSecondInstance",))
    }
  }

  const handleDeletePassiveThirdInstance = async (id: string, section: string,) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      dispatch(deleteInstance(deletePassiveInstance({ id: id, section: "third" }), "passivesData", "passiveThirdInstance",))
    }
  }

  {/*Inventory */ }
  const handleAddCurrencyInstance = async () => {

    dispatch(addInstance(createCurrencyInstance(post!.inventoryData.id)))
  }

  const handleDeleteCurrencyInstance = async (id: string) => {

    if (window.confirm("Are you sure you want to delete this?")) {
      if (!locks.deleteLock) {
        dispatch(deleteInstance(deleteCurrencyInstance({ id: id }), 'inventoryData', 'currencyInstance'))
      }
    }
  }

  const handleAddBagInstance = async () => {

    dispatch(addInstance(createBagInstance(post!.inventoryData.id)))
  }

  const handleDeleteBagInstance = async (id: string) => {

    if (window.confirm("Are you sure you want to delete this?")) {
      if (!locks.deleteLock) {
        dispatch(deleteInstance(deleteBagInstance({ id: id }), 'inventoryData', 'bagInstance'))
      }
    }
  }

  const handleAddItemInstance = async () => {

    dispatch(addInstance(createItemInstance(activeBagId)))
  }

  const handleDeleteItemInstance = async (id: string) => {

    if (window.confirm("Are you sure you want to delete this?")) {
      if (!locks.deleteLock) {
        dispatch(deleteInstance(deleteItemInstance({ id: id }), 'inventoryData', 'itemInstance', 'itemInstance'))
      }
    }
  }

  //#endregion

  if (loading.posts) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loading-spinner" />
      </div>
    );
  }
  //{ loading.skills && <div className="loading-spinner-small" /> }

  return (
    <div className="flex-col p-6 px-20 md:mt-[90px] ml-12">
      <div className='md:flex justify-between md:justify-center md:gap-4 '>

        {/*
            <div>
              <h1>Data Test</h1>
              {post?.inventoryData && <pre>{JSON.stringify(post?.inventoryData, null, 2)}</pre>}
            </div>
        */}

        {/*
        <div>
          <h1>hpMax</h1>
          {hpMaxBase}
        </div>

        <div>
          <h1>hpMaxBoosted</h1>
          {hpMaxBoosted}
        </div>

        <div className="space-y-4">
          {allItems.map(item => {
            const boostedVal = applyBoostsToItem({
              fieldKey: "itemValue1",
              baseValue: Number(item.itemValue1 ?? 0),
              item,
              allItems,
            });

            return (
              <div key={item.id} className="p-4 rounded-xl shadow">
                <h3 className="text-lg font-semibold">{item.itemName}</h3>
                <p>Boosted Value: {boostedVal}</p>
              </div>
            );
          })}
        </div>  
        
        */}

      

        {/*Left Side */}
        <div className='flex flex-col items-center gap-4'>

          {/*Health*/}
          <div className='flex justify-between '>
            <div className='mainContainers '>
              <div className='flex justify-center'>
                <div className='flex flex-col gap-2'>

                  {/*Top Row*/}
                  <div className='flex items-center gap-3 '>
                    <LabelComp
                      value={post?.healthData.hpLabel ?? ""}
                      locks={locks}
                      activePostId={activePostId}
                      updateLocalData={updateHealthData}
                      updatePostData={updatePost}
                      model="health"
                      labelName='hpLabel'
                      style="card-label text-2xl italic h-8 w-10"
                    />

                    <InputComp
                      value={post?.healthData.hpCurrent ?? ""}
                      displayValue={post?.healthData.hpCurrent ?? ""}
                      locks={locks}
                      activePostId={activePostId}
                      updateLocalData={updateHealthData}
                      updatePostData={updatePost}
                      model="health"
                      inputName='hpCurrent'
                      style="card-textarea-hp w-14 h-10 text-sec text-center"
                    />

                    <div className='border-l border-gray h-full'></div>

                    <InputComp
                      value={post?.healthData.hpMax ?? ""}
                      displayValue={post?.healthData.hpMax ?? ""}
                      locks={locks}
                      activePostId={activePostId}
                      updateLocalData={updateHealthData}
                      updatePostData={updatePost}
                      model="health"
                      inputName='hpMax'
                      style="card-textarea-hp w-14 h-10 text-center "
                    />

                    <LabelComp
                      value={post?.healthData.hpTempLabel ?? ""}
                      locks={locks}
                      activePostId={activePostId}
                      updateLocalData={updateHealthData}
                      updatePostData={updatePost}
                      model='health'
                      labelName='hpTempLabel'
                      style="card-label text-lg italic h-8 w-14"
                    />

                    <InputComp
                      value={post?.healthData.hpTemp ?? ""}
                      displayValue={post?.healthData.hpTemp ?? ""}
                      locks={locks}
                      activePostId={activePostId}
                      updateLocalData={updateHealthData}
                      updatePostData={updatePost}
                      model="health"
                      inputName='hpTemp'
                      style="card-textarea-hp w-11 h-10 text-center"
                    />

                  </div>

                  {/*Bottow Row*/}
                  <div className='flex items-center gap-3'>
                    <LabelComp
                      value={post?.healthData.acLabel ?? ""}
                      locks={locks}
                      activePostId={activePostId}
                      updateLocalData={updateHealthData}
                      updatePostData={updatePost}
                      model='health'
                      labelName='acLabel'
                      style="card-label text-2xl italic w-10 h-10"
                    />

                    <InputComp
                      value={post?.healthData.ac ?? ""}
                      displayValue={post?.healthData.ac ?? ""}
                      locks={locks}
                      activePostId={activePostId}
                      updateLocalData={updateHealthData}
                      updatePostData={updatePost}
                      model="health"
                      inputName='ac'
                      style="card-textarea w-14 h-10 text-center"
                    />

                    <LabelComp
                      value={post?.healthData.stressLabel ?? ""}
                      locks={locks}
                      activePostId={activePostId}
                      updateLocalData={updateHealthData}
                      updatePostData={updatePost}
                      model='health'
                      labelName='stressLabel'
                      style="card-label text-lg w-[68px] h-7"
                    />

                    <InputComp
                      value={post?.healthData.stressCurrent ?? ""}
                      displayValue={post?.healthData.stressCurrent ?? ""}
                      locks={locks}
                      activePostId={activePostId}
                      updateLocalData={updateHealthData}
                      updatePostData={updatePost}
                      model="health"
                      inputName='stressCurrent'
                      style="card-textarea-hp w-11 h-10 text-center "
                    />

                    <div className='border-l border-gray h-full'></div>

                    <InputComp
                      value={post?.healthData.stressMax ?? ""}
                      displayValue={post?.healthData.stressMax ?? ""}
                      locks={locks}
                      activePostId={activePostId}
                      updateLocalData={updateHealthData}
                      updatePostData={updatePost}
                      model="health"
                      inputName='stressMax'
                      style="card-textarea-hp w-11 h-10 text-center "
                    />

                  </div>
                </div>
              </div>
            </div>
          </div>

          {/*Name & Level */}
          <div className='mainContainers '>
            <div className='flex justify-center gap-2'>
              {/*Name*/}
              <div className='flex flex-col gap-2'>

                <InputComp
                  value={post?.basicsData.name ?? ""}
                  displayValue={post?.basicsData.name ?? ""}
                  locks={locks}
                  activePostId={activePostId}
                  updateLocalData={updateBasicsData}
                  updatePostData={updatePost}
                  model="basics"
                  inputName='name'
                  style="card-textarea w-44 h-10 !text-start pl-2 text-sec placeholder-grayActive"
                />

                <InputComp
                  value={post?.basicsData.desc ?? ""}
                  displayValue={post?.basicsData.desc ?? ""}
                  locks={locks}
                  activePostId={activePostId}
                  updateLocalData={updateBasicsData}
                  updatePostData={updatePost}
                  model="basics"
                  inputName='desc'
                  style="card-textarea w-44 h-10 text-xs !text-start !pt-3 pl-2 placeholder-grayActive !overflow-y-auto custom-scrollbar"
                />

              </div>

              <div className='border-l border-gray h-full'></div>

              {/*XP*/}
              <div className='flex flex-col gap-2'>
                <div className='flex items-center gap-2'>

                  <LabelComp
                    value={post?.basicsData.levelLabel ?? ""}
                    locks={locks}
                    activePostId={activePostId}
                    updateLocalData={updateBasicsData}
                    updatePostData={updatePost}
                    model='basics'
                    labelName='levelLabel'
                    style="card-label text-2xl w-[63px] h-7"
                  />

                  <InputComp
                    value={post?.basicsData.level ?? ""}
                    displayValue={post?.basicsData.level ?? ""}
                    locks={locks}
                    activePostId={activePostId}
                    updateLocalData={updateBasicsData}
                    updatePostData={updatePost}
                    model="basics"
                    inputName='level'
                    style="card-textarea w-11 h-11 text-center"
                  />

                </div>
                <div className='flex justify-center items-center gap-2 '>

                  <LabelComp
                    value={post?.basicsData.xpLabel ?? ""}
                    locks={locks}
                    activePostId={activePostId}
                    updateLocalData={updateBasicsData}
                    updatePostData={updatePost}
                    model='basics'
                    labelName='xpLabel'
                    style="card-label text-lg italic w-[27px] h-7"
                  />
                  <InputComp
                    value={post?.basicsData.xp ?? ""}
                    displayValue={post?.basicsData.xp ?? ""}
                    locks={locks}
                    activePostId={activePostId}
                    updateLocalData={updateBasicsData}
                    updatePostData={updatePost}
                    model="basics"
                    inputName='xp'
                    style="card-textarea w-20 h-10 text-center"
                  />

                </div>
              </div>
            </div>

          </div>

          {/*Skills */}
          <div className='mainContainers max-h-[670px] min-h-0 overflow-y-auto custom-scrollbar '>
            <div className='flex flex-col'>

              {/*Labels */}
              <div className='flex justify-between pr-8'>

                <SkillsLabelComp
                  valueLabel={post?.skillsData.skillsLabel ?? ""}
                  locks={locks}
                  activePostId={activePostId}
                  labelName="skillsLabel"
                  style="card-label w-[67px] text-2xl italic mb-2"
                />

                <SkillsLabelComp
                  valueLabel={post?.skillsData.profsLabel ?? ""}
                  locks={locks}
                  activePostId={activePostId}
                  labelName="profsLabel"
                  style="card-label w-14 text-lg  mb-2"
                />

              </div>

              <div className='flex flex-col gap-2 items-center'>

                {/*Skill Instances */}
                {
                  post?.skillsData?.skillInstance?.map((skill, index) => (
                    <SkillInputComp
                      key={skill.id}
                      valueName={skill.skillName ?? ""}
                      valueBonus={skill.skillValue ?? ""}
                      valueProfs={skill.skillProf ?? ""}
                      fieldName="skillName"
                      fieldBonus="skillValue"
                      fieldProfs="skillProf"
                      locks={locks}
                      activePostId={activePostId}
                      styleName="card-textarea-skill"
                      styleBonus="card-textarea w-11 h-10"
                      styleProfs="card-textarea w-11 h-10 text-sec"
                      id={skill.id!}
                      deleteFunction={handleDeleteSkillInstance}
                    />
                  ))
                }

                <Plus
                  onClick={() => handleAddSkillInstance()}
                  className='addButton size-6'
                />

              </div>
            </div>
          </div>
        </div>

        {/*Middle Side */}
        <div className='flex flex-col gap-4'>

          {/*Atributes */}
          <div className='flex justify-between gap-4'>
            <div className='mainContainersAtrib w-[1090px] min-w-0 overflow-x-auto custom-scrollbar'>
              <div className='flex items-center gap-3 min-w-max'>

                {/*Attribute Instance */}
                {
                  post?.attributesData?.attributeInstance?.map((attribute, index) => (
                    <AttributeComp
                      key={attribute.id}
                      valueName={attribute.attributeName ?? ""}
                      valueBonus={attribute.attributeValue ?? ""}
                      valueMod={attribute.attributeMod ?? ""}
                      valueSave={attribute.attributeSave ?? ""}
                      fieldName="attributeName"
                      fieldBonus="attributeValue"
                      fieldMod="attributeMod"
                      fieldSave='attributeSave'
                      locks={locks}
                      activePostId={activePostId}
                      styleName="card-label w-[120px] text-lg "
                      styleBonus="card-textarea w-11 h-10 text-center"
                      styleMod="card-textarea w-11 h-10 text-center text-sec"
                      styleSave='card-textarea w-11 h-10 text-center'
                      id={attribute.id!}
                      deleteFunction={handleDeleteAttributeInstance}
                    />
                  ))
                }

                <Plus
                  onClick={() => handleAddAttributeInstance()}
                  className='addButton size-6'
                />
              </div>
            </div>
          </div>

          {/*Feats & Spells */}
          <div className='flex gap-4'>

            {/*Feats */}
            <div className='mainContainers !items-stretch w-[620px] max-h-[770px] min-h-0 overflow-y-auto custom-scrollbar '>
              <div className='flex flex-col '>

                <FeatsLabelComp
                  locks={locks}
                  activePostId={activePostId}
                  valueLabel={post?.featsData.featsLabel! ?? ""}
                  fieldLabel={'featsLabel'}
                  styleLabel={'card-label !text-start text-2xl italic mb-2'}

                />

                <div className='flex flex-col gap-2'>

                  {/*Feat Instance */}
                  {
                    post?.featsData?.featInstance?.map((feat, index) => (
                      <FeatComp
                        key={feat.id}
                        valueName={feat.featName ?? ""}
                        valueCharges={feat.featChargeLabel ?? ""}
                        valueChargesCurrent={feat.featChargeCurrent ?? ""}
                        valueChargesMax={feat.featChargeMax ?? ""}
                        valueText={feat.featText ?? ""}
                        fieldName="featName"
                        fieldCharges="featChargeLabel"
                        fieldChargesCurrent="featChargeCurrent"
                        fieldChargesMax='featChargeMax'
                        fieldText='featText'
                        locks={locks}
                        activePostId={activePostId}
                        styleName="card-label !text-start text-lg w-52"
                        styleCharges="card-label !text-end text-md w-20"
                        styleChargesCurrent="card-textarea w-10 h-10 text-sec"
                        styleChargesMax='card-textarea w-10 h-10'
                        styleText='card-textarea text-sm !font-normal !w-full h-40 !text-start !overflow-auto custom-scrollbar'
                        id={feat.id!}
                        deleteFunction={handleDeleteFeatInstance}
                      />
                    ))
                  }

                  <div className="flex justify-center">
                    <Plus
                      onClick={() => handleAddFeatInstance()}
                      className='addButton size-6'
                    />
                  </div>
                </div>
              </div>
            </div>

            {/*Spells */}
            <div className="mainContainers shrink-0 w-[450px] max-h-[770px] min-h-0 overflow-y-auto custom-scrollbar ">
              <div className='flex flex-col gap-2 w-full'>

                <div className='flex justify-between'>

                  <LabelComp
                    value={post?.spellsData.spellsLabel ?? ""}
                    locks={locks}
                    activePostId={activePostId}
                    updateLocalData={updateSpellsLabel}
                    updatePostData={updateSpells}
                    model="spells"
                    labelName='spellsLabel'
                    style="card-label !text-start text-2xl italic w-full"
                  />

                  <Tooltip
                    content={
                      <>
                        Right click the spell <br />
                        level box to delete it.
                      </>
                    }
                    style='w-[165px] '
                  >
                    <Info />
                  </Tooltip>

                </div>

                {/*Mods */}
                <div className='flex justify-between'>

                  <SpellModsComp
                    valueLabel={post?.spellsData.spellsModifierLabel! ?? ""}
                    fieldLabel={"spellsModifierLabel"}
                    styleLabel="card-label max-w-32  text-lg"
                    locks={locks}
                    activePostId={activePostId}
                    valueName={post?.spellsData.spellsModifier! ?? ""}
                    fieldName={"spellsModifier"}
                    styleName="card-textarea w-14 h-10"
                  />

                  <SpellModsComp
                    valueLabel={post?.spellsData.spellsAttackLabel! ?? ""}
                    fieldLabel={"spellsAttackLabel"}
                    styleLabel="card-label max-w-32  text-lg"
                    locks={locks}
                    activePostId={activePostId}
                    valueName={post?.spellsData.spellsAttack! ?? ""}
                    fieldName={"spellsAttack"}
                    styleName="card-textarea w-14 h-10"
                  />

                  <SpellModsComp
                    valueLabel={post?.spellsData.spellsSaveLabel! ?? ""}
                    fieldLabel={"spellsSaveLabel"}
                    styleLabel="card-label max-w-32  text-lg"
                    locks={locks}
                    activePostId={activePostId}
                    valueName={post?.spellsData.spellsSave! ?? ""}
                    fieldName={"spellsSave"}
                    styleName="card-textarea w-14 h-10"
                  />

                </div>

                <div className='border-t-2 border-gray w-full'></div>

                {/*Spell Slot */}
                <div className="flex gap-2 items-center overflow-x-auto custom-scrollbar ">
                  {/*Spell Slot Instance */}
                  {
                    post?.spellsData?.spellSlotInstance?.map((spellSlotInstance, index) => (

                      <SpellSlotComp
                        id={spellSlotInstance.id!}
                        key={spellSlotInstance.id}
                        locks={locks}
                        activePostId={activePostId}
                        valueText={spellSlotInstance.spellSlotBoxLabel! ?? ""}
                        fieldText={'spellSlotBoxLabel'}
                        styleText={'card-textarea-spellbox'}
                        deleteFunction={handleDeleteSpellSlotInstance}
                      />
                    ))
                  }

                  <Plus
                    onClick={() => handleAddSpellSlotInstance()}
                    className="addButton size-6"
                  />

                </div>

                {/*Slot Charges */}
                <div className='flex justify-start items-center gap-2 mt-2 '>

                  <SpellSlotChargesComp
                    locks={locks}
                    activePostId={activePostId}
                    valueCharges={post?.spellsData.spellSlotInstance.find(s => s.id === activeSpellSlotId)?.spellSlotLabel ?? ""}
                    valueChargesCurrent={post?.spellsData.spellSlotInstance.find(s => s.id === activeSpellSlotId)?.spellSlotCurrent ?? ""}
                    valueChargesMax={post?.spellsData.spellSlotInstance.find(s => s.id === activeSpellSlotId)?.spellSlotMax ?? ""}
                    fieldCharges={'spellSlotLabel'}
                    fieldChargesCurrent={'spellSlotCurrent'}
                    fieldChargesMax={'spellSlotMax'}
                    styleCharges="card-label w-16 !text-start text-lg"
                    styleChargesCurrent="card-textarea w-10 h-10 text-center text-sec"
                    styleChargesMax="card-textarea w-10 h-10 text-center "
                    id={post?.spellsData.spellSlotInstance.find(s => s.id === activeSpellSlotId)?.id ?? ""}
                  />

                </div>

                {/*Labels */}
                <SpellSlotLabelComp
                  locks={locks}
                  activePostId={activePostId}
                  valueName={post?.spellsData.spellSlotInstance.find(s => s.id === activeSpellSlotId)?.spellNameLabel ?? ""}
                  value1={post?.spellsData.spellSlotInstance.find(s => s.id === activeSpellSlotId)?.spellLabel1 ?? ""}
                  value2={post?.spellsData.spellSlotInstance.find(s => s.id === activeSpellSlotId)?.spellLabel2 ?? ""}
                  value3={post?.spellsData.spellSlotInstance.find(s => s.id === activeSpellSlotId)?.spellLabel3 ?? ""}
                  value4={post?.spellsData.spellSlotInstance.find(s => s.id === activeSpellSlotId)?.spellLabel4 ?? ""}
                  fieldName={'spellNameLabel'}
                  field1={'spellLabel1'}
                  field2={'spellLabel2'}
                  field3={'spellLabel3'}
                  field4={'spellLabel4'}
                  styleName={'card-label w-16 !text-start text-lg'}
                  style1={'card-label w-11 !text-start text-lg'}
                  style2={'card-label w-12 !text-start text-lg'}
                  style3={'card-label w-14 !text-start text-lg'}
                  style4={'card-label w-7 !text-start text-lg'}
                  id={post?.spellsData.spellSlotInstance.find(s => s.id === activeSpellSlotId)?.id!}

                />

                <div className='border-t-2 border-gray w-full'></div>

                {/*Spell Instance */}
                <div className='flex flex-col gap-2 items-center'>
                  {
                    post?.spellsData.spellSlotInstance?.find(s => s.id === activeSpellSlotId)?.spellInstance?.map((spell, index) => (
                      <SpellInstanceComp
                        key={spell.id}
                        locks={locks}
                        valueName={spell.spellNameValue ?? ""}
                        value1={spell.spellValue1 ?? ""}
                        value2={spell.spellValue2 ?? ""}
                        value3={spell.spellValue3 ?? ""}
                        value4={spell.spellValue4 ?? ""}
                        fieldName={'spellNameValue'}
                        field1={'spellValue1'}
                        field2={'spellValue2'}
                        field3={'spellValue3'}
                        field4={'spellValue4'}
                        styleName={'card-textarea-skill'}
                        style1={'card-textarea w-11 h-10'}
                        style2={'card-textarea w-12 h-10'}
                        style3={'card-textarea w-14 h-10'}
                        style4={'card-textarea w-11 h-10'}
                        id={spell.id!}
                        deleteFunction={handleDeleteSpellInstance}
                      />
                    ))
                  }

                  <Plus
                    onClick={() => handleAddSpellInstance()}
                    className='addButton size-6'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*Right Side */}
        <div className='flex flex-col items-center gap-4'>

          {/*Passives and Profs */}
          <div className='mainContainers max-h-[300px] min-h-0 w-full overflow-y-auto custom-scrollbar'>
            <div className='flex flex-col gap-2 w-full'>

              <PassivesLabelComp
                valueLabel={post?.passivesData.passiveLabel! ?? ""}
                locks={locks}
                activePostId={activePostId}
                labelName={"passiveLabel"}
                style={'card-label !text-start !text-2xl font-bold italic mb-2'}
              />

              <div className='flex justify-between'>

                {/*Passives */}
                <div className='flex flex-col gap-2 items-center'>

                  {
                    post?.passivesData.passiveFirstInstance.map((passive, index) => (
                      <PassiveInputComp
                        locks={locks}
                        key={passive.id!}
                        activePostId={activePostId}
                        valueName={passive.passiveName}
                        valueBonus={passive.passiveValue}
                        fieldName={'passiveName'}
                        fieldBonus={'passiveValue'}
                        styleName={'card-label !text-start w-24 h-6'}
                        styleBonus={'card-textarea w-11 h-10 text-center'}
                        id={passive.id!}
                        deleteFunction={handleDeletePassiveFirstInstance}
                        sectionInstance={"passiveFirstInstance"}
                      />
                    ))
                  }

                  <Plus
                    onClick={() => handleAddPassiveFirstInstance()}
                    className="addButton size-6"
                  />


                </div>

                <div className='border-l border-gray h-60'></div>

                {/*Proffs */}
                <div className='flex flex-col gap-2 items-center'>

                  {
                    post?.passivesData.passiveSecondInstance.map((passive, index) => (
                      <PassiveInputComp
                        locks={locks}
                        key={passive.id!}
                        activePostId={activePostId}
                        valueName={passive.passiveName}
                        valueBonus={passive.passiveValue}
                        fieldName={'passiveName'}
                        fieldBonus={'passiveValue'}
                        styleName={'card-label !text-start w-24 h-6'}
                        styleBonus={'card-textarea w-11 h-10 text-center'}
                        id={passive.id!}
                        deleteFunction={handleDeletePassiveSecondInstance}
                        sectionInstance={"passiveSecondInstance"}
                      />
                    ))
                  }

                  <Plus
                    onClick={() => handleAddPassiveSecondInstance()}
                    className="addButton size-6"
                  />

                </div>

                <div className='border-l border-gray h-60'></div>

                {/*Other */}
                <div className='flex flex-col gap-2 items-center'>

                  {
                    post?.passivesData.passiveThirdInstance.map((passive, index) => (
                      <PassiveInputComp
                        locks={locks}
                        key={passive.id!}
                        activePostId={activePostId}
                        valueName={passive.passiveName}
                        valueBonus={passive.passiveValue}
                        fieldName={'passiveName'}
                        fieldBonus={'passiveValue'}
                        styleName={'card-label !text-start w-24 h-6'}
                        styleBonus={'card-textarea w-11 h-10 text-center'}
                        id={passive.id!}
                        deleteFunction={handleDeletePassiveThirdInstance}
                        sectionInstance={"passiveThirdInstance"}
                      />
                    ))
                  }

                  <Plus
                    onClick={() => handleAddPassiveThirdInstance()}
                    className="addButton size-6"
                  />


                </div>
              </div>
            </div>
          </div>

          {/*Inventory */}
          <div className='mainContainers shrink-0 w-[600px] max-h-[620px] min-h-0 overflow-y-auto custom-scrollbar '>
            <div className='flex flex-col gap-2 w-full'>

              {/*Title and Weight */}
              <div className='flex justify-between items-center w-full '>

                <LabelComp
                  value={post?.inventoryData.invLabel ?? ""}
                  locks={locks}
                  activePostId={activePostId}
                  updateLocalData={updateInventoryLabel}
                  updatePostData={updateInventory}
                  model="inventory"
                  labelName='invLabel'
                  style="card-label !text-start text-2xl italic w-full"
                />

                <WeightComp
                  locks={locks}
                  activePostId={activePostId}
                  valueWeight={post?.inventoryData.invWeightLabel ?? ""}
                  valueWeightCurrent={post?.inventoryData.invWeightCurrent ?? ""}
                  valueWeightMax={post?.inventoryData.invWeightMax ?? ""}
                  valueUnit={post?.inventoryData.invWeightUnit ?? ""}
                  fieldWeight={"invWeightLabel"}
                  fieldWeightCurrent={"invWeightCurrent"}
                  fieldWeightMax={"invWeightMax"}
                  fieldUnit={"invWeightUnit"}
                  styleWeight={'card-label w-20 h-10  text-lg !text-start'}
                  styleWeightsCurrent={'card-textarea w-10 h-10 text-sec'}
                  styleWeightsMax={'card-textarea w-10 h-10'}
                  styleUnit={'card-label w-8 text-md !text-start mr-2'}
                />

                <Tooltip
                  content={
                    <>
                      Right click the currency <br />
                      or bag box to delete it.
                    </>
                  }
                  style='w-[185px] '
                >
                  <Info />
                </Tooltip>

              </div>

              {/*Currency */}
              <div className='flex w-full items-center gap-1 overflow-x-auto custom-scrollbar'>

                <LabelComp
                  value={post?.inventoryData.invCurrenyLabel ?? ""}
                  locks={locks}
                  activePostId={activePostId}
                  updateLocalData={updateInventoryLabel}
                  updatePostData={updateInventory}
                  model="inventory"
                  labelName='invCurrenyLabel'
                  style="card-label w-20 !text-start text-md"
                />

                {
                  post?.inventoryData?.currencyInstance?.map((currency, index) => (
                    <CurrencyComp
                      key={currency.id}
                      valueNumber={currency.currenyValue ?? ""}
                      valueLabel={currency.currenyLabel ?? ""}
                      fieldNumber='currenyValue'
                      fieldLabel='currenyLabel'
                      locks={locks}
                      styleNumber='card-textarea w-20 h-10'
                      styleLabel='card-label w-2 !text-start text-sm'
                      id={currency.id!}
                      deleteFunction={handleDeleteCurrencyInstance}
                    />
                  ))
                }

                <div className='relative'>
                  <Plus
                    onClick={() => handleAddCurrencyInstance()}
                    className='addButton  size-6'
                  />
                </div>

              </div>

              {/*Bags */}
              <div className='flex justify-start gap-2 mt-2 items-center overflow-x-scroll custom-scrollbar'>
                <button className="card-bag min-w-14">All</button>

                <div className='border border-gray h-10 w-px' />

                {
                  post?.inventoryData?.bagInstance?.map((bag, index) => (
                    <BagComp
                      key={bag.id}
                      valueInfo={bag.bagLabel}
                      fieldInfo='bagLabel'
                      locks={locks}
                      styleInfo='card-bag w-20 h-10'
                      id={bag.id!}
                      deleteFunction={handleDeleteBagInstance}
                    />
                  ))
                }

                <div className='relative'>
                  <Plus
                    onClick={() => handleAddBagInstance()}
                    className='addButton size-6'
                  />
                </div>

              </div>

              {/*Item Labels */}
              <BagLabelComp
                locks={locks}
                valueName={post?.inventoryData.bagInstance.find(b => b.id === activeBagId)?.itemNameLabel ?? ""}
                value1={post?.inventoryData.bagInstance.find(b => b.id === activeBagId)?.itemLabel1 ?? ""}
                value2={post?.inventoryData.bagInstance.find(b => b.id === activeBagId)?.itemLabel2 ?? ""}
                value3={post?.inventoryData.bagInstance.find(b => b.id === activeBagId)?.itemLabel3 ?? ""}
                value4={post?.inventoryData.bagInstance.find(b => b.id === activeBagId)?.itemLabel4 ?? ""}
                value5={post?.inventoryData.bagInstance.find(b => b.id === activeBagId)?.itemLabel5 ?? ""}
                fieldName={'itemNameLabel'}
                field1={'itemLabel1'}
                field2={'itemLabel2'}
                field3={'itemLabel3'}
                field4={'itemLabel4'}
                field5={'itemLabel5'}
                styleName={'card-label w-14 !text-start text-lg'}
                style1={'card-label w-14 mr-1 !text-start text-lg'}
                style2={'card-label w-14 mr-3 !text-start text-lg'}
                style3={'card-label w-14 mr-1 !text-start text-lg'}
                style4={'card-label w-14 mr-2 !text-start text-lg'}
                style5={'card-label w-6 !text-start text-lg'}
                id={post?.inventoryData.bagInstance.find(b => b.id === activeBagId)?.id!}

              />

              <div className='border-t-2 border-gray w-full'></div>

              {/*Item Instances */}
              <div className='flex flex-col gap-2 items-center'>

                {
                  post?.inventoryData.bagInstance?.find(b => b.id === activeBagId)?.itemInstance?.map((item, index) => (
                    <ItemInstanceComp
                      key={item.id}
                      locks={locks}
                      tags={item.tags ?? []}
                      valueName={item.itemName ?? ""}
                      value1={item.itemValue1 ?? ""}
                      value2={item.itemValue2 ?? ""}
                      value3={item.itemValue3 ?? ""}
                      value4={item.itemValue4 ?? ""}
                      value5={item.itemValue5 ?? ""}
                      fieldName={'itemName'}
                      field1={'itemValue1'}
                      field2={'itemValue2'}
                      field3={'itemValue3'}
                      field4={'itemValue4'}
                      field5={'itemValue5'}
                      styleName={'card-textarea-item !text-start'}
                      style1={'card-textarea w-12 h-10'}
                      style2={'card-textarea w-24 h-10'}
                      style3={'card-textarea w-14 h-10'}
                      style4={'card-textarea w-16 h-10'}
                      style5={'card-textarea w-11 h-10'}
                      id={item.id!}
                      deleteFunction={handleDeleteItemInstance}
                    />
                  ))
                }

                <Plus
                  onClick={() => handleAddItemInstance()}
                  className='addButton size-6'
                />

              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Home