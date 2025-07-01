'use client'

import React from 'react';
import './page.css';
import { Trash2, Plus } from "@deemlol/next-icons";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../lib/store';
import { updatePost, updateHealthData, updateBasicsData, createSkillInstance, deleteSkillInstance, createAttributeInstance, deleteAttributeInstance, createFeatInstance, deleteFeatInstance, createSpellInstance, createSpellSlotInstance, updateSpells, updateSpellsLabel, deleteSpellInstance } from '@/lib/features/main/mainSlice';
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


const Home = () => {

  //Redux
  const dispatch: AppDispatch = useDispatch();
  const activePostId = useSelector((state: RootState) => state.mainData.activePostId);
  const activeSpellSlotId = useSelector((state: RootState) => state.mainData.activeSpellSlotId);
  const post = useSelector((state: RootState) =>
    state.mainData.posts.find(post => post.id === activePostId)
  )
  const locks = useSelector((state: RootState) => state.mainData.locks);


  //#region Handles

  {/*Skills */ }
  const handleAddSkillInstance = async () => {

    dispatch(addInstance(createSkillInstance(post!.skillsData.id)))
  }

  const handleDeleteSkillInstance = async (id: string) => {

    dispatch(deleteInstance(deleteSkillInstance({ id }), 'skillsData', 'skillInstance'))
  }

  {/*Attributes */ }
  const handleAddAttributeInstance = async () => {
    dispatch(addInstance(createAttributeInstance(post!.attributesData.id)))

  }

  const handleDeleteAttributeInstance = async (id: string) => {

    dispatch(deleteInstance(deleteAttributeInstance({ id: id }), 'attributesData', 'attributeInstance'))
  }

  {/*Feats */ }
  const handleAddFeatInstance = async () => {

    dispatch(addInstance(createFeatInstance(post!.featsData.id)))
  }

  const handleDeleteFeatInstance = async (id: string) => {

    dispatch(deleteInstance(deleteFeatInstance({ id: id }), 'featsData', 'featInstance'))
  }

  {/*Spells */ }
  const handleAddSpellSlotInstance = async () => {

    dispatch(addInstance(createSpellSlotInstance(post!.spellsData.id)))
  }

  const handleAddSpellInstance = async () => {

    dispatch(addInstance(createSpellInstance(activeSpellSlotId)))
  }

  const handleDeleteSpellInstance = async (id: string) => {

    dispatch(deleteInstance(deleteSpellInstance({ id: id }), undefined, undefined, true))
  }

  //#endregion

  return (
    <div className="flex-col p-6 px-20 md:mt-[90px] ml-12">
      <div className='md:flex justify-between md:justify-center md:gap-4 '>

        {/*TEST 
            <div>
              <h1>Data Test</h1>
              {healthData && <pre>{JSON.stringify(healthData, null, 2)}</pre>}
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
                      value={post?.healthData.hpLabel}
                      locks={locks}
                      activePostId={activePostId}
                      updateLocalData={updateHealthData}
                      updatePostData={updatePost}
                      model="health"
                      labelName='hpLabel'
                      style="card-label text-2xl italic h-8 w-10"
                    />

                    <InputComp
                      value={post?.healthData.hpCurrent}
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
                      value={post?.healthData.hpMax}
                      locks={locks}
                      activePostId={activePostId}
                      updateLocalData={updateHealthData}
                      updatePostData={updatePost}
                      model="health"
                      inputName='hpMax'
                      style="card-textarea-hp w-14 h-10 text-center "
                    />

                    <LabelComp
                      value={post?.healthData.hpTempLabel}
                      locks={locks}
                      activePostId={activePostId}
                      updateLocalData={updateHealthData}
                      updatePostData={updatePost}
                      model='health'
                      labelName='hpTempLabel'
                      style="card-label text-lg italic h-8 w-14"
                    />

                    <InputComp
                      value={post?.healthData.hpTemp}
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
                      value={post?.healthData.acLabel}
                      locks={locks}
                      activePostId={activePostId}
                      updateLocalData={updateHealthData}
                      updatePostData={updatePost}
                      model='health'
                      labelName='acLabel'
                      style="card-label text-2xl italic w-10 h-10"
                    />

                    <InputComp
                      value={post?.healthData.ac}
                      locks={locks}
                      activePostId={activePostId}
                      updateLocalData={updateHealthData}
                      updatePostData={updatePost}
                      model="health"
                      inputName='ac'
                      style="card-textarea w-14 h-10 text-center"
                    />

                    <LabelComp
                      value={post?.healthData.stressLabel}
                      locks={locks}
                      activePostId={activePostId}
                      updateLocalData={updateHealthData}
                      updatePostData={updatePost}
                      model='health'
                      labelName='stressLabel'
                      style="card-label text-lg w-[68px] h-7"
                    />

                    <InputComp
                      value={post?.healthData.stressCurrent}
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
                      value={post?.healthData.stressMax}
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
                  value={post?.basicsData.name}
                  locks={locks}
                  activePostId={activePostId}
                  updateLocalData={updateBasicsData}
                  updatePostData={updatePost}
                  model="basics"
                  inputName='name'
                  style="card-textarea w-44 h-10 !text-start pl-2 text-sec placeholder-grayActive"
                />

                <InputComp
                  value={post?.basicsData.desc}
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
                    value={post?.basicsData.levelLabel}
                    locks={locks}
                    activePostId={activePostId}
                    updateLocalData={updateBasicsData}
                    updatePostData={updatePost}
                    model='basics'
                    labelName='levelLabel'
                    style="card-label text-2xl w-[63px] h-7"
                  />

                  <InputComp
                    value={post?.basicsData.level}
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
                    value={post?.basicsData.xpLabel}
                    locks={locks}
                    activePostId={activePostId}
                    updateLocalData={updateBasicsData}
                    updatePostData={updatePost}
                    model='basics'
                    labelName='xpLabel'
                    style="card-label text-lg italic w-[27px] h-7"
                  />
                  <InputComp
                    value={post?.basicsData.xp}
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
          <div className='mainContainers max-h-[61vh] min-h-0 overflow-y-auto custom-scrollbar '>
            <div className='flex flex-col'>

              <div className='flex justify-between pr-8'>

                <SkillsLabelComp
                  valueLabel={post?.skillsData.skillsLabel}
                  locks={locks}
                  activePostId={activePostId}
                  labelName="skillsLabel"
                  style="card-label w-[67px] text-2xl italic mb-2"
                />

                <SkillsLabelComp
                  valueLabel={post?.skillsData.profsLabel}
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
                      valueName={skill.skillName}
                      valueBonus={skill.skillValue}
                      valueProfs={skill.skillProf}
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
            <div className='mainContainersAtrib w-[90vh] min-w-0 overflow-x-auto custom-scrollbar'>
              <div className='flex items-center gap-3 min-w-max'>

                {/*Attribute Instance */}
                {
                  post?.attributesData?.attributeInstance?.map((attribute, index) => (
                    <AttributeComp
                      key={attribute.id}
                      valueName={attribute.attributeName}
                      valueBonus={attribute.attributeValue}
                      valueMod={attribute.attributeMod}
                      valueSave={attribute.attributeSave}
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
            <div className='mainContainers !items-stretch w-[450px] max-h-[68vh] min-h-0 overflow-y-auto custom-scrollbar '>
              <div className='flex flex-col '>

                <FeatsLabelComp
                  locks={locks}
                  activePostId={activePostId}
                  valueLabel={post?.featsData.featsLabel!}
                  fieldLabel={'featsLabel'}
                  styleLabel={'card-label !text-start text-2xl italic mb-2'}

                />

                <div className='flex flex-col gap-2'>

                  {/*Feat Instance */}
                  {
                    post?.featsData?.featInstance?.map((feat, index) => (
                      <FeatComp
                        key={feat.id}
                        valueName={feat.featName}
                        valueCharges={feat.featChargeLabel}
                        valueChargesCurrent={feat.featChargeCurrent}
                        valueChargesMax={feat.featChargeMax}
                        valueText={feat.featText}
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
            <div className='mainContainers shrink-0 w-fit max-h-[68vh] min-h-0 overflow-y-auto custom-scrollbar '>
              <div className='flex flex-col gap-2'>

                <LabelComp
                  value={post?.spellsData.spellsLabel}
                  locks={locks}
                  activePostId={activePostId}
                  updateLocalData={updateSpellsLabel}
                  updatePostData={updateSpells}
                  model="spells"
                  labelName='spellsLabel'
                  style="card-label !text-start text-2xl italic w-full"
                />

                {/*Mods */}
                <div className='flex justify-between'>

                  <SpellModsComp
                    valueLabel={post?.spellsData.spellsModifierLabel!}
                    fieldLabel={"spellsModifierLabel"}
                    styleLabel="card-label max-w-32  text-lg"
                    locks={locks}
                    activePostId={activePostId}
                    valueName={post?.spellsData.spellsModifier!}
                    fieldName={"spellsModifier"}
                    styleName="card-textarea w-12 h-10"
                  />

                  <SpellModsComp
                    valueLabel={post?.spellsData.spellsAttackLabel!}
                    fieldLabel={"spellsAttackLabel"}
                    styleLabel="card-label max-w-32  text-lg"
                    locks={locks}
                    activePostId={activePostId}
                    valueName={post?.spellsData.spellsAttack!}
                    fieldName={"spellsAttack"}
                    styleName="card-textarea w-12 h-10"
                  />

                  <SpellModsComp
                    valueLabel={post?.spellsData.spellsSaveLabel!}
                    fieldLabel={"spellsSaveLabel"}
                    styleLabel="card-label max-w-32  text-lg"
                    locks={locks}
                    activePostId={activePostId}
                    valueName={post?.spellsData.spellsSave!}
                    fieldName={"spellsSave"}
                    styleName="card-textarea w-12 h-10"
                  />

                </div>

                <div className='border-t-2 border-gray w-full'></div>

                {/*Spell Levels */}
                <div className='flex gap-2 justify-start items-center'>

                  {/*Spell Slot Instance */}
                  {
                    post?.spellsData?.spellSlotInstance?.map((spellSlotInstance, index) => (

                      <SpellSlotComp
                        id={spellSlotInstance.id!}
                        key={spellSlotInstance.id}
                        locks={locks}
                        activePostId={activePostId}
                        valueText={spellSlotInstance.spellSlotBoxLabel!}
                        fieldText={'spellSlotBoxLabel'}
                        styleText={'card-textarea-spellbox'}
                      />
                    ))
                  }

                  <Plus
                    onClick={() => handleAddSpellSlotInstance()}
                    className='addButton size-6'
                  />

                </div>

                {/*Slots */}
                <div className='flex justify-start items-center gap-2 mt-2'>

                  <SpellSlotChargesComp
                    locks={locks}
                    activePostId={activePostId}
                    valueCharges={post?.spellsData.spellSlotInstance.find(s => s.id === activeSpellSlotId)?.spellSlotLabel || ''}
                    valueChargesCurrent={post?.spellsData.spellSlotInstance.find(s => s.id === activeSpellSlotId)?.spellSlotCurrent || ''}
                    valueChargesMax={post?.spellsData.spellSlotInstance.find(s => s.id === activeSpellSlotId)?.spellSlotMax || ''}
                    fieldCharges={'spellSlotLabel'}
                    fieldChargesCurrent={'spellSlotCurrent'}
                    fieldChargesMax={'spellSlotMax'}
                    styleCharges="card-label w-16 !text-start text-lg"
                    styleChargesCurrent="card-textarea w-10 h-10 text-center text-sec"
                    styleChargesMax="card-textarea w-10 h-10 text-center "
                    id={post?.spellsData.spellSlotInstance.find(s => s.id === activeSpellSlotId)?.id || ''}
                  />

                </div>

                {/*Labels */}
                <SpellSlotLabelComp
                  locks={locks}
                  activePostId={activePostId}
                  valueName={post?.spellsData.spellSlotInstance.find(s => s.id === activeSpellSlotId)?.spellNameLabel || ''}
                  value1={post?.spellsData.spellSlotInstance.find(s => s.id === activeSpellSlotId)?.spellLabel1 || ''}
                  value2={post?.spellsData.spellSlotInstance.find(s => s.id === activeSpellSlotId)?.spellLabel2 || ''}
                  value3={post?.spellsData.spellSlotInstance.find(s => s.id === activeSpellSlotId)?.spellLabel3 || ''}
                  value4={post?.spellsData.spellSlotInstance.find(s => s.id === activeSpellSlotId)?.spellLabel4 || ''}
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

                <div className='flex flex-col gap-2 items-center'>
                  {
                    post?.spellsData.spellSlotInstance?.find(s => s.id === activeSpellSlotId)?.spellInstance?.map((spell, index) => (
                      <SpellInstanceComp
                        key={spell.id}
                        locks={locks}
                        valueName={spell.spellNameValue || ''}
                        value1={spell.spellValue1 || ''}
                        value2={spell.spellValue2 || ''}
                        value3={spell.spellValue3 || ''}
                        value4={spell.spellValue4 || ''}
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
          <div className='mainContainers max-h-[32vh] min-h-0 w-full overflow-y-auto custom-scrollbar'>
            <div className='flex flex-col gap-2 w-full'>
              <h1 className='text-2xl font-bold italic mb-2'>Passives & Proficiencies</h1>
              <div className='flex justify-between'>

                {/*Passives */}
                <div className='flex flex-col gap-2 items-center'>

                  {/*Passives Instance*/}
                  <div className='flex items-center gap-2 '>
                    <h1 className='text-lg font-bold '>Initiative</h1>
                    <textarea
                      value={"56"}
                      spellCheck={false}
                      className="card-textarea w-11 h-10 text-center "
                    />
                    <Trash2 className='size-6 text-gray' />
                  </div>

                  {/*Proffs Instance*/}
                  <div className='flex items-center gap-2 '>
                    <h1 className='text-lg font-bold '>Initiative</h1>
                    <textarea
                      value={"56"}
                      spellCheck={false}
                      className="card-textarea w-11 h-10 text-center "
                    />
                    <Trash2 className='size-6 text-gray' />
                  </div>
                  {/*Proffs Instance*/}
                  <div className='flex items-center gap-2 '>
                    <h1 className='text-lg font-bold '>Initiative</h1>
                    <textarea
                      value={"56"}
                      spellCheck={false}
                      className="card-textarea w-11 h-10 text-center "
                    />
                    <Trash2 className='size-6 text-gray' />
                  </div>
                  {/*Proffs Instance*/}
                  <div className='flex items-center gap-2 '>
                    <h1 className='text-lg font-bold '>Initiative</h1>
                    <textarea
                      value={"56"}
                      spellCheck={false}
                      className="card-textarea w-11 h-10 text-center "
                    />
                    <Trash2 className='size-6 text-gray' />
                  </div>
                  {/*Proffs Instance*/}
                  <div className='flex items-center gap-2 '>
                    <h1 className='text-lg font-bold '>Initiative</h1>
                    <textarea
                      value={"56"}
                      spellCheck={false}
                      className="card-textarea w-11 h-10 text-center "
                    />
                    <Trash2 className='size-6 text-gray' />
                  </div>

                  <Plus className='size-6 text-sec' />

                </div>

                <div className='border-l border-gray h-full'></div>

                {/*Proffs */}
                <div className='flex flex-col gap-2 items-center'>

                  {/*Proffs Instance*/}
                  <div className='flex items-center gap-2 '>
                    <h1 className='text-lg font-bold '>Initiative</h1>
                    <textarea
                      value={"56"}
                      spellCheck={false}
                      className="card-textarea w-11 h-10 text-center "
                    />
                    <Trash2 className='size-6 text-gray' />
                  </div>

                  {/*Proffs Instance*/}
                  <div className='flex items-center gap-2 '>
                    <h1 className='text-lg font-bold '>Initiative</h1>
                    <textarea
                      value={"56"}
                      spellCheck={false}
                      className="card-textarea w-11 h-10 text-center "
                    />
                    <Trash2 className='size-6 text-gray' />
                  </div>
                  {/*Proffs Instance*/}
                  <div className='flex items-center gap-2 '>
                    <h1 className='text-lg font-bold '>Initiative</h1>
                    <textarea
                      value={"56"}
                      spellCheck={false}
                      className="card-textarea w-11 h-10 text-center "
                    />
                    <Trash2 className='size-6 text-gray' />
                  </div>

                  {/*Proffs Instance*/}
                  <div className='flex items-center gap-2 '>
                    <h1 className='text-lg font-bold '>Initiative</h1>
                    <textarea
                      value={"56"}
                      spellCheck={false}
                      className="card-textarea w-11 h-10 text-center "
                    />
                    <Trash2 className='size-6 text-gray' />
                  </div>
                  {/*Proffs Instance*/}
                  <div className='flex items-center gap-2 '>
                    <h1 className='text-lg font-bold '>Initiative</h1>
                    <textarea
                      value={"56"}
                      spellCheck={false}
                      className="card-textarea w-11 h-10 text-center "
                    />
                    <Trash2 className='size-6 text-gray' />
                  </div>

                  <Plus className='size-6 text-sec' />

                </div>

                <div className='border-l border-gray h-full'></div>

                {/*Other */}
                <div className='flex flex-col gap-2 items-center'>

                  {/*Proffs Instance*/}
                  <div className='flex items-center gap-2 '>
                    <h1 className='text-lg font-bold '>Initiative</h1>
                    <textarea
                      value={"56"}
                      spellCheck={false}
                      className="card-textarea w-11 h-10 text-center "
                    />
                    <Trash2 className='size-6 text-gray' />
                  </div>

                  {/*Proffs Instance*/}
                  <div className='flex items-center gap-2 '>
                    <h1 className='text-lg font-bold '>Initiative</h1>
                    <textarea
                      value={"56"}
                      spellCheck={false}
                      className="card-textarea w-11 h-10 text-center "
                    />
                    <Trash2 className='size-6 text-gray' />
                  </div>

                  {/*Proffs Instance*/}
                  <div className='flex items-center gap-2 '>
                    <h1 className='text-lg font-bold '>Initiative</h1>
                    <textarea
                      value={"56"}
                      spellCheck={false}
                      className="card-textarea w-11 h-10 text-center "
                    />
                    <Trash2 className='size-6 text-gray' />
                  </div>

                  {/*Proffs Instance*/}
                  <div className='flex items-center gap-2 '>
                    <h1 className='text-lg font-bold '>Initiative</h1>
                    <textarea
                      value={"56"}
                      spellCheck={false}
                      className="card-textarea w-11 h-10 text-center "
                    />
                    <Trash2 className='size-6 text-gray' />
                  </div>

                  {/*Proffs Instance*/}
                  <div className='flex items-center gap-2 '>
                    <h1 className='text-lg font-bold '>Initiative</h1>
                    <textarea
                      value={"56"}
                      spellCheck={false}
                      className="card-textarea w-11 h-10 text-center "
                    />
                    <Trash2 className='size-6 text-gray' />
                  </div>

                  {/*Proffs Instance*/}
                  <div className='flex items-center gap-2 '>
                    <h1 className='text-lg font-bold '>Initiative</h1>
                    <textarea
                      value={"56"}
                      spellCheck={false}
                      className="card-textarea w-11 h-10 text-center "
                    />
                    <Trash2 className='size-6 text-gray' />
                  </div>

                  {/*Proffs Instance*/}
                  <div className='flex items-center gap-2 '>
                    <h1 className='text-lg font-bold '>Initiative</h1>
                    <textarea
                      value={"56"}
                      spellCheck={false}
                      className="card-textarea w-11 h-10 text-center "
                    />
                    <Trash2 className='size-6 text-gray' />
                  </div>
                  {/*Proffs Instance*/}
                  <div className='flex items-center gap-2 '>
                    <h1 className='text-lg font-bold '>Initiative</h1>
                    <textarea
                      value={"56"}
                      spellCheck={false}
                      className="card-textarea w-11 h-10 text-center "
                    />
                    <Trash2 className='size-6 text-gray' />
                  </div>

                  <Plus className='size-6 text-sec' />

                </div>
              </div>
            </div>
          </div>

          {/*Inventory */}
          <div className='mainContainers shrink-0 w-fit max-h-[50vh] min-h-0 overflow-y-auto custom-scrollbar '>
            <div className='flex flex-col gap-2'>

              <h1 className='text-2xl font-bold italic'>Inventory</h1>

              {/*Upper bar */}
              <div className='flex justify-between items-center'>
                <div className='flex items-center gap-2'>
                  <h1 className='text-md font-bold'>Weight</h1>
                  <textarea
                    value={"6"}
                    spellCheck={false}
                    className="card-textarea w-10 h-10 text-sec"
                  />
                  <div className='border border-gray h-10 ' />
                  <textarea
                    value={"16"}
                    spellCheck={false}
                    className="card-textarea w-10 h-10 "
                  />
                </div>
                <div className='flex items-center gap-1'>
                  <h1 className='text-md font-bold'>Currency</h1>
                  <textarea
                    value={"62422"}
                    spellCheck={false}
                    className="card-textarea w-20 h-10"
                  />
                  <h1 className='text-sm font-bold'>g</h1>
                  <div className='border border-gray h-10 w-px'></div>
                  <textarea
                    value={"16622"}
                    spellCheck={false}
                    className="card-textarea w-20 h-10"
                  />
                  <h1 className='text-sm font-bold'>s</h1>
                  <div className='border border-gray h-10 w-px'></div>
                  <textarea
                    value={"53546"}
                    spellCheck={false}
                    className="card-textarea w-20 h-10"
                  />
                  <h1 className='text-sm font-bold'>c</h1>

                </div>
              </div>

              {/*Bags */}
              <div className='flex justify-start gap-2 mt-2 items-center'>
                <button className="card-bag">All</button>
                <button className="card-bag">Equipment</button>
                <button className="card-bag">Backpack</button>
                <button className="card-bag">Bag of Holding</button>

                <Plus className='size-6 text-sec' />
              </div>

              {/*Labels */}
              <div className='flex justify-between'>
                <h1 className='text-lg font-bold'>Name</h1>
                <div className='flex pr-2'>
                  <h1 className='text-lg font-bold mr-11'>Hit</h1>
                  <h1 className='text-lg font-bold mr-10'>Dmg</h1>
                  <h1 className='text-lg font-bold mr-3'>Range</h1>
                  <h1 className='text-lg font-bold mr-7'>Value</h1>
                  <h1 className='text-lg font-bold mr-3'>#</h1>
                </div>
              </div>

              <div className='border-t-2 border-gray w-full'></div>

              <div className='flex flex-col gap-2 items-center'>

                {/*Item Instance */}
                <div className='flex items-center gap-2'>
                  <textarea
                    value={"Longsword"}
                    placeholder={"Name"}
                    spellCheck={false}
                    className="card-textarea-item"
                  />

                  <Trash2 className='size-6 text-gray' />

                  <textarea
                    value={"+12"}
                    spellCheck={false}
                    className="card-textarea w-12 h-10"
                  />
                  <textarea
                    value={"1d10+26"}
                    spellCheck={false}
                    className="card-textarea w-24 h-10"
                  />
                  <textarea
                    value={"120"}
                    spellCheck={false}
                    className="card-textarea w-14 h-10"
                  />
                  <textarea
                    value={"6000"}
                    spellCheck={false}
                    className="card-textarea w-16 h-10"
                  />
                  <textarea
                    value={"6"}
                    spellCheck={false}
                    className="card-textarea w-11 h-10"
                  />
                </div>

                {/*Item Instance */}
                <div className='flex items-center gap-2'>
                  <textarea
                    value={"Longsword"}
                    placeholder={"Name"}
                    spellCheck={false}
                    className="card-textarea-item"
                  />

                  <Trash2 className='size-6 text-gray' />

                  <textarea
                    value={"+12"}
                    spellCheck={false}
                    className="card-textarea w-12 h-10"
                  />
                  <textarea
                    value={"1d10+26"}
                    spellCheck={false}
                    className="card-textarea w-24 h-10"
                  />
                  <textarea
                    value={"120"}
                    spellCheck={false}
                    className="card-textarea w-14 h-10"
                  />
                  <textarea
                    value={"6000"}
                    spellCheck={false}
                    className="card-textarea w-16 h-10"
                  />
                  <textarea
                    value={"6"}
                    spellCheck={false}
                    className="card-textarea w-11 h-10"
                  />
                </div>

                {/*Item Instance */}
                <div className='flex items-center gap-2'>
                  <textarea
                    value={"Longsword"}
                    placeholder={"Name"}
                    spellCheck={false}
                    className="card-textarea-item"
                  />

                  <Trash2 className='size-6 text-gray' />

                  <textarea
                    value={"+12"}
                    spellCheck={false}
                    className="card-textarea w-12 h-10"
                  />
                  <textarea
                    value={"1d10+26"}
                    spellCheck={false}
                    className="card-textarea w-24 h-10"
                  />
                  <textarea
                    value={"120"}
                    spellCheck={false}
                    className="card-textarea w-14 h-10"
                  />
                  <textarea
                    value={"6000"}
                    spellCheck={false}
                    className="card-textarea w-16 h-10"
                  />
                  <textarea
                    value={"6"}
                    spellCheck={false}
                    className="card-textarea w-11 h-10"
                  />
                </div>

                {/*Item Instance */}
                <div className='flex items-center gap-2'>
                  <textarea
                    value={"Longsword"}
                    placeholder={"Name"}
                    spellCheck={false}
                    className="card-textarea-item"
                  />

                  <Trash2 className='size-6 text-gray' />

                  <textarea
                    value={"+12"}
                    spellCheck={false}
                    className="card-textarea w-12 h-10"
                  />
                  <textarea
                    value={"1d10+26"}
                    spellCheck={false}
                    className="card-textarea w-24 h-10"
                  />
                  <textarea
                    value={"120"}
                    spellCheck={false}
                    className="card-textarea w-14 h-10"
                  />
                  <textarea
                    value={"6000"}
                    spellCheck={false}
                    className="card-textarea w-16 h-10"
                  />
                  <textarea
                    value={"6"}
                    spellCheck={false}
                    className="card-textarea w-11 h-10"
                  />
                </div>

                {/*Item Instance */}
                <div className='flex items-center gap-2'>
                  <textarea
                    value={"Longsword"}
                    placeholder={"Name"}
                    spellCheck={false}
                    className="card-textarea-item"
                  />

                  <Trash2 className='size-6 text-gray' />

                  <textarea
                    value={"+12"}
                    spellCheck={false}
                    className="card-textarea w-12 h-10"
                  />
                  <textarea
                    value={"1d10+26"}
                    spellCheck={false}
                    className="card-textarea w-24 h-10"
                  />
                  <textarea
                    value={"120"}
                    spellCheck={false}
                    className="card-textarea w-14 h-10"
                  />
                  <textarea
                    value={"6000"}
                    spellCheck={false}
                    className="card-textarea w-16 h-10"
                  />
                  <textarea
                    value={"6"}
                    spellCheck={false}
                    className="card-textarea w-11 h-10"
                  />
                </div>

                {/*Item Instance */}
                <div className='flex items-center gap-2'>
                  <textarea
                    value={"Longsword"}
                    placeholder={"Name"}
                    spellCheck={false}
                    className="card-textarea-item"
                  />

                  <Trash2 className='size-6 text-gray' />

                  <textarea
                    value={"+12"}
                    spellCheck={false}
                    className="card-textarea w-12 h-10"
                  />
                  <textarea
                    value={"1d10+26"}
                    spellCheck={false}
                    className="card-textarea w-24 h-10"
                  />
                  <textarea
                    value={"120"}
                    spellCheck={false}
                    className="card-textarea w-14 h-10"
                  />
                  <textarea
                    value={"6000"}
                    spellCheck={false}
                    className="card-textarea w-16 h-10"
                  />
                  <textarea
                    value={"6"}
                    spellCheck={false}
                    className="card-textarea w-11 h-10"
                  />
                </div>

                {/*Item Instance */}
                <div className='flex items-center gap-2'>
                  <textarea
                    value={"Longsword"}
                    placeholder={"Name"}
                    spellCheck={false}
                    className="card-textarea-item"
                  />

                  <Trash2 className='size-6 text-gray' />

                  <textarea
                    value={"+12"}
                    spellCheck={false}
                    className="card-textarea w-12 h-10"
                  />
                  <textarea
                    value={"1d10+26"}
                    spellCheck={false}
                    className="card-textarea w-24 h-10"
                  />
                  <textarea
                    value={"120"}
                    spellCheck={false}
                    className="card-textarea w-14 h-10"
                  />
                  <textarea
                    value={"6000"}
                    spellCheck={false}
                    className="card-textarea w-16 h-10"
                  />
                  <textarea
                    value={"6"}
                    spellCheck={false}
                    className="card-textarea w-11 h-10"
                  />
                </div>

                {/*Item Instance */}
                <div className='flex items-center gap-2'>
                  <textarea
                    value={"Longsword"}
                    placeholder={"Name"}
                    spellCheck={false}
                    className="card-textarea-item"
                  />

                  <Trash2 className='size-6 text-gray' />

                  <textarea
                    value={"+12"}
                    spellCheck={false}
                    className="card-textarea w-12 h-10"
                  />
                  <textarea
                    value={"1d10+26"}
                    spellCheck={false}
                    className="card-textarea w-24 h-10"
                  />
                  <textarea
                    value={"120"}
                    spellCheck={false}
                    className="card-textarea w-14 h-10"
                  />
                  <textarea
                    value={"6000"}
                    spellCheck={false}
                    className="card-textarea w-16 h-10"
                  />
                  <textarea
                    value={"6"}
                    spellCheck={false}
                    className="card-textarea w-11 h-10"
                  />
                </div>

                {/*Item Instance */}
                <div className='flex items-center gap-2'>
                  <textarea
                    value={"Longsword"}
                    placeholder={"Name"}
                    spellCheck={false}
                    className="card-textarea-item"
                  />

                  <Trash2 className='size-6 text-gray' />

                  <textarea
                    value={"+12"}
                    spellCheck={false}
                    className="card-textarea w-12 h-10"
                  />
                  <textarea
                    value={"1d10+26"}
                    spellCheck={false}
                    className="card-textarea w-24 h-10"
                  />
                  <textarea
                    value={"120"}
                    spellCheck={false}
                    className="card-textarea w-14 h-10"
                  />
                  <textarea
                    value={"6000"}
                    spellCheck={false}
                    className="card-textarea w-16 h-10"
                  />
                  <textarea
                    value={"6"}
                    spellCheck={false}
                    className="card-textarea w-11 h-10"
                  />
                </div>

                {/*Item Instance */}
                <div className='flex items-center gap-2'>
                  <textarea
                    value={"Longsword"}
                    placeholder={"Name"}
                    spellCheck={false}
                    className="card-textarea-item"
                  />

                  <Trash2 className='size-6 text-gray' />

                  <textarea
                    value={"+12"}
                    spellCheck={false}
                    className="card-textarea w-12 h-10"
                  />
                  <textarea
                    value={"1d10+26"}
                    spellCheck={false}
                    className="card-textarea w-24 h-10"
                  />
                  <textarea
                    value={"120"}
                    spellCheck={false}
                    className="card-textarea w-14 h-10"
                  />
                  <textarea
                    value={"6000"}
                    spellCheck={false}
                    className="card-textarea w-16 h-10"
                  />
                  <textarea
                    value={"6"}
                    spellCheck={false}
                    className="card-textarea w-11 h-10"
                  />
                </div>

                {/*Item Instance */}
                <div className='flex items-center gap-2'>
                  <textarea
                    value={"Longsword"}
                    placeholder={"Name"}
                    spellCheck={false}
                    className="card-textarea-item"
                  />

                  <Trash2 className='size-6 text-gray' />

                  <textarea
                    value={"+12"}
                    spellCheck={false}
                    className="card-textarea w-12 h-10"
                  />
                  <textarea
                    value={"1d10+26"}
                    spellCheck={false}
                    className="card-textarea w-24 h-10"
                  />
                  <textarea
                    value={"120"}
                    spellCheck={false}
                    className="card-textarea w-14 h-10"
                  />
                  <textarea
                    value={"6000"}
                    spellCheck={false}
                    className="card-textarea w-16 h-10"
                  />
                  <textarea
                    value={"6"}
                    spellCheck={false}
                    className="card-textarea w-11 h-10"
                  />
                </div>

                <Plus className='size-6 text-sec' />
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Home