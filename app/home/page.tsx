'use client'

import React from 'react';
import './page.css';
import { Trash2, Plus } from "@deemlol/next-icons";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../lib/store';
import { updatePost, updateHealthData, updateBasicsData, updateSkillById, readPosts, updateSkills, createSkillInstance, deleteSkillInstance, updateSkillsLabel, setActivePostId } from '@/lib/features/main/mainSlice';
import LabelComp from '../components/forms/LabelComp/LabelComp';
import InputComp from '../components/forms/InputComp/InputComp';
import SkillInputComp from '../components/forms/SkillInputComp/SkillInputComp';


const Home = () => {

  //Redux
  const dispatch: AppDispatch = useDispatch();
  const activePostId = useSelector((state: RootState) => state.mainData.activePostId);
  const post = useSelector((state: RootState) =>
    state.mainData.posts.find(post => post.id === activePostId)
  )
  const locks = useSelector((state: RootState) => state.mainData.locks);

  const handleAddSkillInstance = async () => {
    dispatch(createSkillInstance(post!.skillsData.skillsId))
    await new Promise(res => setTimeout(res, 1000));
    dispatch(readPosts());
    dispatch(setActivePostId(post!.id));
  }

  const handleDeleteSkillInstance = async (skillIdToDelete: string) => {
    console.log(skillIdToDelete)
    dispatch(deleteSkillInstance({ skillInstanceId: skillIdToDelete }));
    await new Promise(res => setTimeout(res, 1000));
    dispatch(readPosts());
    dispatch(setActivePostId(post!.id));
  }
  console.log("Rendering home page");
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

                <LabelComp
                  value={post?.skillsData.skillsLabel}
                  locks={locks}
                  activePostId={activePostId}
                  updateLocalData={updateSkillsLabel}
                  updatePostData={updateSkills}
                  model="skills"
                  labelName="skillsLabel"
                  style="card-label w-[67px] text-2xl italic mb-2"
                />

                <LabelComp
                  value={post?.skillsData.profsLabel}
                  locks={locks}
                  activePostId={activePostId}
                  updateLocalData={updateSkillsLabel}
                  updatePostData={updateSkills}
                  model="skills"
                  labelName="profsLabel"
                  style="card-label w-14 text-lg  mb-2"
                />

              </div>

              <div className='flex flex-col gap-2 items-center'>

                {/*Skill Instances */}
                {
                  post?.skillsData?.skillInstance?.map((skill, index) => (
                    <SkillInputComp
                      key={index}
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
                      skillId={skill.id!}
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
            <div className='mainContainersAtrib max-w-[90vh] min-w-0 overflow-x-auto custom-scrollbar'>
              <div className='flex items-center gap-3 min-w-max'>

                {/*Atribute Instance */}
                <div className='flex justify-center items-start gap-2 h-30'> {/* Force height and align to top */}
                  <div className='flex flex-col items-center gap-2'>
                    <div className='flex justify-between gap-2 items-center'>
                      <h1 className='text-lg font-bold'>Strength</h1>
                      <Trash2 className='size-6 text-gray' />
                    </div>
                    <div className='flex justify-center items-start gap-2 h-full'> {/* <-- Key change here */}
                      {/* Left Column */}
                      <div className='flex flex-col items-center h-full'> {/* Ensure it can grow */}
                        <textarea
                          value={"19"}
                          spellCheck={false}
                          className="card-textarea w-11 h-10 text-center"
                        />
                        <h1 className='text-lg font-bold mt-3'>ST</h1>
                      </div>

                      {/* Right Column */}
                      <div className='flex flex-col justify-center items-center gap-2'>
                        <textarea
                          value={"+4"}
                          spellCheck={false}
                          className="card-textarea w-11 h-10 text-center text-sec"
                        />
                        <textarea
                          value={"+4"}
                          spellCheck={false}
                          className="card-textarea w-11 h-10 text-center"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/*Atribute Instance */}
                <div className='border-l border-gray h-full'></div>
                <div className='flex justify-center items-start gap-2 h-30'> {/* Force height and align to top */}
                  <div className='flex flex-col items-center gap-2'>
                    <div className='flex justify-between gap-2 items-center'>
                      <h1 className='text-lg font-bold'>Strength</h1>
                      <Trash2 className='size-6 text-gray' />
                    </div>
                    <div className='flex justify-center items-start gap-2 h-full'> {/* <-- Key change here */}
                      {/* Left Column */}
                      <div className='flex flex-col items-center h-full'> {/* Ensure it can grow */}
                        <textarea
                          value={"19"}
                          spellCheck={false}
                          className="card-textarea w-11 h-10 text-center"
                        />
                        <h1 className='text-lg font-bold mt-3'>SV</h1>
                      </div>

                      {/* Right Column */}
                      <div className='flex flex-col justify-center items-center gap-2'>
                        <textarea
                          value={"+4"}
                          spellCheck={false}
                          className="card-textarea w-11 h-10 text-center text-sec"
                        />
                        <textarea
                          value={"+4"}
                          spellCheck={false}
                          className="card-textarea w-11 h-10 text-center"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/*Atribute Instance */}
                <div className='border-l border-gray h-full'></div>
                <div className='flex justify-center items-start gap-2 h-30'> {/* Force height and align to top */}
                  <div className='flex flex-col items-center gap-2'>
                    <div className='flex justify-between gap-2 items-center'>
                      <h1 className='text-lg font-bold'>Strength</h1>
                      <Trash2 className='size-6 text-gray' />
                    </div>
                    <div className='flex justify-center items-start gap-2 h-full'> {/* <-- Key change here */}
                      {/* Left Column */}
                      <div className='flex flex-col items-center h-full'> {/* Ensure it can grow */}
                        <textarea
                          value={"19"}
                          spellCheck={false}
                          className="card-textarea w-11 h-10 text-center"
                        />
                        <h1 className='text-lg font-bold mt-3'>SV</h1>
                      </div>

                      {/* Right Column */}
                      <div className='flex flex-col justify-center items-center gap-2'>
                        <textarea
                          value={"+4"}
                          spellCheck={false}
                          className="card-textarea w-11 h-10 text-center text-sec"
                        />
                        <textarea
                          value={"+4"}
                          spellCheck={false}
                          className="card-textarea w-11 h-10 text-center"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/*Atribute Instance */}
                <div className='border-l border-gray h-full'></div>
                <div className='flex justify-center items-start gap-2 h-30'> {/* Force height and align to top */}
                  <div className='flex flex-col items-center gap-2'>
                    <div className='flex justify-between gap-2 items-center'>
                      <h1 className='text-lg font-bold'>Strength</h1>
                      <Trash2 className='size-6 text-gray' />
                    </div>
                    <div className='flex justify-center items-start gap-2 h-full'> {/* <-- Key change here */}
                      {/* Left Column */}
                      <div className='flex flex-col items-center h-full'> {/* Ensure it can grow */}
                        <textarea
                          value={"19"}
                          spellCheck={false}
                          className="card-textarea w-11 h-10 text-center"
                        />
                        <h1 className='text-lg font-bold mt-3'>SV</h1>
                      </div>

                      {/* Right Column */}
                      <div className='flex flex-col justify-center items-center gap-2'>
                        <textarea
                          value={"+4"}
                          spellCheck={false}
                          className="card-textarea w-11 h-10 text-center text-sec"
                        />
                        <textarea
                          value={"+4"}
                          spellCheck={false}
                          className="card-textarea w-11 h-10 text-center"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/*Atribute Instance */}
                <div className='border-l border-gray h-full'></div>
                <div className='flex justify-center items-start gap-2 h-30'> {/* Force height and align to top */}
                  <div className='flex flex-col items-center gap-2'>
                    <div className='flex justify-between gap-2 items-center'>
                      <h1 className='text-lg font-bold'>Strength</h1>
                      <Trash2 className='size-6 text-gray' />
                    </div>
                    <div className='flex justify-center items-start gap-2 h-full'> {/* <-- Key change here */}
                      {/* Left Column */}
                      <div className='flex flex-col items-center h-full'> {/* Ensure it can grow */}
                        <textarea
                          value={"19"}
                          spellCheck={false}
                          className="card-textarea w-11 h-10 text-center"
                        />
                        <h1 className='text-lg font-bold mt-3'>SV</h1>
                      </div>

                      {/* Right Column */}
                      <div className='flex flex-col justify-center items-center gap-2'>
                        <textarea
                          value={"+4"}
                          spellCheck={false}
                          className="card-textarea w-11 h-10 text-center text-sec"
                        />
                        <textarea
                          value={"+4"}
                          spellCheck={false}
                          className="card-textarea w-11 h-10 text-center"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/*Atribute Instance */}
                <div className='border-l border-gray h-full'></div>
                <div className='flex justify-center items-start gap-2 h-30'> {/* Force height and align to top */}
                  <div className='flex flex-col items-center gap-2'>
                    <div className='flex justify-between gap-2 items-center'>
                      <h1 className='text-lg font-bold'>Strength</h1>
                      <Trash2 className='size-6 text-gray' />
                    </div>
                    <div className='flex justify-center items-start gap-2 h-full'> {/* <-- Key change here */}
                      {/* Left Column */}
                      <div className='flex flex-col items-center h-full'> {/* Ensure it can grow */}
                        <textarea
                          value={"19"}
                          spellCheck={false}
                          className="card-textarea w-11 h-10 text-center"
                        />
                        <h1 className='text-lg font-bold mt-3'>SV</h1>
                      </div>

                      {/* Right Column */}
                      <div className='flex flex-col justify-center items-center gap-2'>
                        <textarea
                          value={"+4"}
                          spellCheck={false}
                          className="card-textarea w-11 h-10 text-center text-sec"
                        />
                        <textarea
                          value={"+4"}
                          spellCheck={false}
                          className="card-textarea w-11 h-10 text-center"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/*Atribute Instance */}
                <div className='border-l border-gray h-full'></div>
                <div className='flex justify-center items-start gap-2 h-30'> {/* Force height and align to top */}
                  <div className='flex flex-col items-center gap-2'>
                    <div className='flex justify-between gap-2 items-center'>
                      <h1 className='text-lg font-bold'>Strength</h1>
                      <Trash2 className='size-6 text-gray' />
                    </div>
                    <div className='flex justify-center items-start gap-2 h-full'> {/* <-- Key change here */}
                      {/* Left Column */}
                      <div className='flex flex-col items-center h-full'> {/* Ensure it can grow */}
                        <textarea
                          value={"19"}
                          spellCheck={false}
                          className="card-textarea w-11 h-10 text-center"
                        />
                        <h1 className='text-lg font-bold mt-3'>SV</h1>
                      </div>

                      {/* Right Column */}
                      <div className='flex flex-col justify-center items-center gap-2'>
                        <textarea
                          value={"+4"}
                          spellCheck={false}
                          className="card-textarea w-11 h-10 text-center text-sec"
                        />
                        <textarea
                          value={"+4"}
                          spellCheck={false}
                          className="card-textarea w-11 h-10 text-center"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/*Atribute Instance */}
                <div className='border-l border-gray h-full'></div>
                <div className='flex justify-center items-start gap-2 h-30'> {/* Force height and align to top */}
                  <div className='flex flex-col items-center gap-2'>
                    <div className='flex justify-between gap-2 items-center'>
                      <h1 className='text-lg font-bold'>Strength</h1>
                      <Trash2 className='size-6 text-gray' />
                    </div>
                    <div className='flex justify-center items-start gap-2 h-full'> {/* <-- Key change here */}
                      {/* Left Column */}
                      <div className='flex flex-col items-center h-full'> {/* Ensure it can grow */}
                        <textarea
                          value={"19"}
                          spellCheck={false}
                          className="card-textarea w-11 h-10 text-center"
                        />
                        <h1 className='text-lg font-bold mt-3'>SV</h1>
                      </div>

                      {/* Right Column */}
                      <div className='flex flex-col justify-center items-center gap-2'>
                        <textarea
                          value={"+4"}
                          spellCheck={false}
                          className="card-textarea w-11 h-10 text-center text-sec"
                        />
                        <textarea
                          value={"+4"}
                          spellCheck={false}
                          className="card-textarea w-11 h-10 text-center"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Plus className='size-6 text-sec' />

              </div>
            </div>
          </div>

          {/*Feats & Spells */}
          <div className='flex gap-4'>

            {/*Feats */}
            <div className='mainContainers !items-stretch w-full max-h-[68vh] min-h-0 overflow-y-auto custom-scrollbar '>
              <div className='flex flex-col '>

                <h1 className='text-2xl font-bold italic mb-2'>Features & Traits</h1>

                <div className='flex flex-col gap-2'>
                  {/*Feat Instance */}
                  <div className='flex flex-col gap-1'>
                    <div className='flex justify-between items-center'>
                      <div className='flex items-center gap-3'>
                        <h1 className='text-lg font-bold'>Sneak Attack</h1>
                        <Trash2 className='size-6 text-gray' />
                      </div>
                      <div className='flex items-center gap-1'>
                        <h1 className='text-md font-bold'>Charges</h1>
                        <textarea
                          value={"6"}
                          spellCheck={false}
                          className="card-textarea w-10 h-10 text-sec"
                        />
                        <div className='border border-gray h-10 w-px' />
                        <textarea
                          value={"16"}
                          spellCheck={false}
                          className="card-textarea w-10 h-10 "
                        />
                      </div>
                    </div>

                    <textarea
                      value={"You know how to strike subtly and exploit a foes distraction Once per turn, you can deal an extra 1d6 damage to one creature you hit with an attackroll if you have Advantage on the roll and the attack uses a Finesse or a Ranged weapon"}
                      spellCheck={false}
                      placeholder={"Description"}
                      className="card-textarea text-sm !font-normal !w-full h-40 !text-start !overflow-auto custom-scrollbar"
                    />

                  </div>

                  {/*Feat Instance */}
                  <div className='flex flex-col gap-1'>
                    <div className='flex justify-between items-center'>
                      <div className='flex items-center gap-3'>
                        <h1 className='text-lg font-bold'>Sneak Attack</h1>
                        <Trash2 className='size-6 text-gray' />
                      </div>
                      <div className='flex items-center gap-1'>
                        <h1 className='text-md font-bold'>Charges</h1>
                        <textarea
                          value={"6"}
                          spellCheck={false}
                          className="card-textarea w-10 h-10 text-sec"
                        />
                        <div className='border border-gray h-10 w-px' />
                        <textarea
                          value={"16"}
                          spellCheck={false}
                          className="card-textarea w-10 h-10 "
                        />
                      </div>
                    </div>

                    <textarea
                      value={"You know how to strike subtly and exploit a foes distraction Once per turn, you can deal an extra 1d6 damage to one creature you hit with an attackroll if you have Advantage on the roll and the attack uses a Finesse or a Ranged weapon"}
                      spellCheck={false}
                      placeholder={"Description"}
                      className="card-textarea text-sm !font-normal !w-full h-40 !text-start !overflow-auto custom-scrollbar"
                    />

                  </div>

                  {/*Feat Instance */}
                  <div className='flex flex-col gap-1'>
                    <div className='flex justify-between items-center'>
                      <div className='flex items-center gap-3'>
                        <h1 className='text-lg font-bold'>Sneak Attack</h1>
                        <Trash2 className='size-6 text-gray' />
                      </div>
                      <div className='flex items-center gap-1'>
                        <h1 className='text-md font-bold'>Charges</h1>
                        <textarea
                          value={"6"}
                          spellCheck={false}
                          className="card-textarea w-10 h-10 text-sec"
                        />
                        <div className='border border-gray h-10 w-px' />
                        <textarea
                          value={"16"}
                          spellCheck={false}
                          className="card-textarea w-10 h-10 "
                        />
                      </div>
                    </div>

                    <textarea
                      value={"You know how to strike subtly and exploit a foes distraction Once per turn, you can deal an extra 1d6 damage to one creature you hit with an attackroll if you have Advantage on the roll and the attack uses a Finesse or a Ranged weapon"}
                      spellCheck={false}
                      placeholder={"Description"}
                      className="card-textarea text-sm !font-normal !w-full h-40 !text-start !overflow-auto custom-scrollbar"
                    />

                  </div>

                  {/*Feat Instance */}
                  <div className='flex flex-col gap-1'>
                    <div className='flex justify-between items-center'>
                      <div className='flex items-center gap-3'>
                        <h1 className='text-lg font-bold'>Sneak Attack</h1>
                        <Trash2 className='size-6 text-gray' />
                      </div>
                      <div className='flex items-center gap-1'>
                        <h1 className='text-md font-bold'>Charges</h1>
                        <textarea
                          value={"6"}
                          spellCheck={false}
                          className="card-textarea w-10 h-10 text-sec"
                        />
                        <div className='border border-gray h-10 w-px' />
                        <textarea
                          value={"16"}
                          spellCheck={false}
                          className="card-textarea w-10 h-10 "
                        />
                      </div>
                    </div>

                    <textarea
                      value={"You know how to strike subtly and exploit a foes distraction Once per turn, you can deal an extra 1d6 damage to one creature you hit with an attackroll if you have Advantage on the roll and the attack uses a Finesse or a Ranged weapon"}
                      spellCheck={false}
                      placeholder={"Description"}
                      className="card-textarea text-sm !font-normal !w-full h-40 !text-start !overflow-auto custom-scrollbar"
                    />

                  </div>

                  <div className="flex justify-center">
                    <Plus className='size-6 text-sec' />
                  </div>
                </div>
              </div>
            </div>

            {/*Spells */}
            <div className='mainContainers shrink-0 w-fit max-h-[68vh] min-h-0 overflow-y-auto custom-scrollbar '>
              <div className='flex flex-col gap-2'>

                <h1 className='text-2xl font-bold italic'>Spells</h1>

                {/*Mods */}
                <div className='flex justify-between'>
                  <div className='flex flex-col items-center gap-2'>
                    <h1 className='text-lg font-bold'>Modifier</h1>
                    <textarea
                      value={"+10"}
                      spellCheck={false}
                      className="card-textarea w-12 h-10"
                    />
                  </div>

                  <div className='flex flex-col items-center gap-2'>
                    <h1 className='text-lg font-bold'>Spell Attack</h1>
                    <textarea
                      value={"+12"}
                      spellCheck={false}
                      className="card-textarea w-12 h-10"
                    />
                  </div>

                  <div className='flex flex-col items-center gap-2'>
                    <h1 className='text-lg font-bold'>Save DC</h1>
                    <textarea
                      value={"+15"}
                      spellCheck={false}
                      className="card-textarea w-12 h-10"
                    />
                  </div>
                </div>

                <div className='border-t-2 border-gray w-full'></div>

                {/*Spell Levels */}
                <div className='flex justify-between'>
                  <button className="card-textarea-spellbox">C</button>
                  <button className="card-textarea-spellbox">1</button>
                  <button className="card-textarea-spellbox">2</button>
                  <button className="card-textarea-spellbox">3</button>
                  <button className="card-textarea-spellbox">4</button>
                  <button className="card-textarea-spellbox">5</button>
                  <button className="card-textarea-spellbox">6</button>
                  <button className="card-textarea-spellbox">7</button>
                  <button className="card-textarea-spellbox">8</button>
                  <button className="card-textarea-spellbox">9+</button>
                </div>

                {/*Slots */}
                <div className='flex justify-start items-center gap-2 mt-2'>
                  <h1 className='text-lg font-bold'>Slots</h1>
                  <textarea
                    value={"5"}
                    spellCheck={false}
                    className="card-textarea w-10 h-10 text-center text-sec"
                  />
                  <div className='border-l border-gray h-full'></div>
                  <textarea
                    value={"8"}
                    spellCheck={false}
                    className="card-textarea w-10 h-10 text-center "
                  />
                </div>

                {/*Labels */}
                <div className='flex justify-between'>
                  <h1 className='text-lg font-bold'>Name</h1>
                  <div className='flex gap-3 pr-2'>
                    <h1 className='text-lg font-bold'>Time</h1>
                    <h1 className='text-lg font-bold'>Conc</h1>
                    <h1 className='text-lg font-bold'>Range</h1>
                    <h1 className='text-lg font-bold'>Hit</h1>
                  </div>
                </div>

                <div className='border-t-2 border-gray w-full'></div>

                <div className='flex flex-col gap-2 items-center'>
                  {/*Spell Instance */}
                  <div className='flex items-center gap-2'>
                    <textarea
                      value={"Polymorph"}
                      placeholder={"Name"}
                      spellCheck={false}
                      className="card-textarea-skill"
                    />

                    <Trash2 className='size-6 text-gray' />

                    <textarea
                      value={"4"}
                      spellCheck={false}
                      className="card-textarea w-11 h-10"
                    />
                    <textarea
                      value={"Yes"}
                      spellCheck={false}
                      className="card-textarea w-12 h-10"
                    />
                    <textarea
                      value={"120"}
                      spellCheck={false}
                      className="card-textarea w-14 h-10"
                    />
                    <textarea
                      value={"6"}
                      spellCheck={false}
                      className="card-textarea w-11 h-10"
                    />
                  </div>

                  {/*Spell Instance */}
                  <div className='flex items-center gap-2'>
                    <textarea
                      value={"Polymorph"}
                      placeholder={"Name"}
                      spellCheck={false}
                      className="card-textarea-skill"
                    />

                    <Trash2 className='size-6 text-gray' />

                    <textarea
                      value={"4"}
                      spellCheck={false}
                      className="card-textarea w-11 h-10"
                    />
                    <textarea
                      value={"Yes"}
                      spellCheck={false}
                      className="card-textarea w-12 h-10"
                    />
                    <textarea
                      value={"120"}
                      spellCheck={false}
                      className="card-textarea w-14 h-10"
                    />
                    <textarea
                      value={"6"}
                      spellCheck={false}
                      className="card-textarea w-11 h-10"
                    />
                  </div>

                  {/*Spell Instance */}
                  <div className='flex items-center gap-2'>
                    <textarea
                      value={"Polymorph"}
                      placeholder={"Name"}
                      spellCheck={false}
                      className="card-textarea-skill"
                    />

                    <Trash2 className='size-6 text-gray' />

                    <textarea
                      value={"4"}
                      spellCheck={false}
                      className="card-textarea w-11 h-10"
                    />
                    <textarea
                      value={"Yes"}
                      spellCheck={false}
                      className="card-textarea w-12 h-10"
                    />
                    <textarea
                      value={"120"}
                      spellCheck={false}
                      className="card-textarea w-14 h-10"
                    />
                    <textarea
                      value={"6"}
                      spellCheck={false}
                      className="card-textarea w-11 h-10"
                    />
                  </div>

                  {/*Spell Instance */}
                  <div className='flex items-center gap-2'>
                    <textarea
                      value={"Polymorph"}
                      placeholder={"Name"}
                      spellCheck={false}
                      className="card-textarea-skill"
                    />

                    <Trash2 className='size-6 text-gray' />

                    <textarea
                      value={"4"}
                      spellCheck={false}
                      className="card-textarea w-11 h-10"
                    />
                    <textarea
                      value={"Yes"}
                      spellCheck={false}
                      className="card-textarea w-12 h-10"
                    />
                    <textarea
                      value={"120"}
                      spellCheck={false}
                      className="card-textarea w-14 h-10"
                    />
                    <textarea
                      value={"6"}
                      spellCheck={false}
                      className="card-textarea w-11 h-10"
                    />
                  </div>

                  {/*Spell Instance */}
                  <div className='flex items-center gap-2'>
                    <textarea
                      value={"Polymorph"}
                      placeholder={"Name"}
                      spellCheck={false}
                      className="card-textarea-skill"
                    />

                    <Trash2 className='size-6 text-gray' />

                    <textarea
                      value={"4"}
                      spellCheck={false}
                      className="card-textarea w-11 h-10"
                    />
                    <textarea
                      value={"Yes"}
                      spellCheck={false}
                      className="card-textarea w-12 h-10"
                    />
                    <textarea
                      value={"120"}
                      spellCheck={false}
                      className="card-textarea w-14 h-10"
                    />
                    <textarea
                      value={"6"}
                      spellCheck={false}
                      className="card-textarea w-11 h-10"
                    />
                  </div>

                  {/*Spell Instance */}
                  <div className='flex items-center gap-2'>
                    <textarea
                      value={"Polymorph"}
                      placeholder={"Name"}
                      spellCheck={false}
                      className="card-textarea-skill"
                    />

                    <Trash2 className='size-6 text-gray' />

                    <textarea
                      value={"4"}
                      spellCheck={false}
                      className="card-textarea w-11 h-10"
                    />
                    <textarea
                      value={"Yes"}
                      spellCheck={false}
                      className="card-textarea w-12 h-10"
                    />
                    <textarea
                      value={"120"}
                      spellCheck={false}
                      className="card-textarea w-14 h-10"
                    />
                    <textarea
                      value={"6"}
                      spellCheck={false}
                      className="card-textarea w-11 h-10"
                    />
                  </div>

                  {/*Spell Instance */}
                  <div className='flex items-center gap-2'>
                    <textarea
                      value={"Polymorph"}
                      placeholder={"Name"}
                      spellCheck={false}
                      className="card-textarea-skill"
                    />

                    <Trash2 className='size-6 text-gray' />

                    <textarea
                      value={"4"}
                      spellCheck={false}
                      className="card-textarea w-11 h-10"
                    />
                    <textarea
                      value={"Yes"}
                      spellCheck={false}
                      className="card-textarea w-12 h-10"
                    />
                    <textarea
                      value={"120"}
                      spellCheck={false}
                      className="card-textarea w-14 h-10"
                    />
                    <textarea
                      value={"6"}
                      spellCheck={false}
                      className="card-textarea w-11 h-10"
                    />
                  </div>

                  {/*Spell Instance */}
                  <div className='flex items-center gap-2'>
                    <textarea
                      value={"Polymorph"}
                      placeholder={"Name"}
                      spellCheck={false}
                      className="card-textarea-skill"
                    />

                    <Trash2 className='size-6 text-gray' />

                    <textarea
                      value={"4"}
                      spellCheck={false}
                      className="card-textarea w-11 h-10"
                    />
                    <textarea
                      value={"Yes"}
                      spellCheck={false}
                      className="card-textarea w-12 h-10"
                    />
                    <textarea
                      value={"120"}
                      spellCheck={false}
                      className="card-textarea w-14 h-10"
                    />
                    <textarea
                      value={"6"}
                      spellCheck={false}
                      className="card-textarea w-11 h-10"
                    />
                  </div>

                  {/*Spell Instance */}
                  <div className='flex items-center gap-2'>
                    <textarea
                      value={"Polymorph"}
                      placeholder={"Name"}
                      spellCheck={false}
                      className="card-textarea-skill"
                    />

                    <Trash2 className='size-6 text-gray' />

                    <textarea
                      value={"4"}
                      spellCheck={false}
                      className="card-textarea w-11 h-10"
                    />
                    <textarea
                      value={"Yes"}
                      spellCheck={false}
                      className="card-textarea w-12 h-10"
                    />
                    <textarea
                      value={"120"}
                      spellCheck={false}
                      className="card-textarea w-14 h-10"
                    />
                    <textarea
                      value={"6"}
                      spellCheck={false}
                      className="card-textarea w-11 h-10"
                    />
                  </div>

                  {/*Spell Instance */}
                  <div className='flex items-center gap-2'>
                    <textarea
                      value={"Polymorph"}
                      placeholder={"Name"}
                      spellCheck={false}
                      className="card-textarea-skill"
                    />

                    <Trash2 className='size-6 text-gray' />

                    <textarea
                      value={"4"}
                      spellCheck={false}
                      className="card-textarea w-11 h-10"
                    />
                    <textarea
                      value={"Yes"}
                      spellCheck={false}
                      className="card-textarea w-12 h-10"
                    />
                    <textarea
                      value={"120"}
                      spellCheck={false}
                      className="card-textarea w-14 h-10"
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