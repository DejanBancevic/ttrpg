'use client'

import React, { useState } from 'react';
import './page.css';
import { Trash2, Plus } from "@deemlol/next-icons";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../lib/store';
import { patchHealthData, updateHealthData } from '@/lib/features/main/mainSlice';


const Home = () => {

  //Redux
  const dispatch: AppDispatch = useDispatch();
  const healthData = useSelector((state: RootState) => state.mainData.healthData);
  const locks = useSelector((state: RootState) => state.mainData.locks);


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
          <div className='flex justify-between gap-4 w-full'>
            <div className='mainContainers w-full'>
              <div className='flex justify-center gap-2'>

                {/*HP*/}
                <div className='flex flex-col gap-2'>
                  <div className='flex items-center gap-3 '>
                    <textarea
                      value={healthData.hpLabel}
                      readOnly={locks.labelLock}
                      onChange={(e) => {
                        if (!locks.labelLock) {
                          dispatch(updateHealthData({ key: 'hpLabel', value: e.target.value }));
                        }
                      }}
                      onBlur={(e) => {
                        if (!locks.labelLock) {
                          dispatch(patchHealthData({ hpLabel: e.target.value }));
                        }
                      }}
                      spellCheck={false}
                      className="card-textarea-label text-2xl italic h-8 w-10"
                    />
                    <textarea
                      value={healthData.hpCurrent}
                      onChange={(e) => dispatch(updateHealthData({ key: 'hpCurrent', value: e.target.value }))}
                      onBlur={(e) => dispatch(patchHealthData({hpCurrent: e.target.value}))}
                      spellCheck={false}
                      className="card-textarea-hp w-14 h-10 text-sec text-center "
                    />
                    <div className='border-l border-gray h-full'></div>
                    <textarea
                      value={healthData.hpMax}
                      onChange={(e) => dispatch(updateHealthData({ key: 'hpMax', value: e.target.value }))}
                      onBlur={(e) => dispatch(patchHealthData({ hpMax: e.target.value }))}
                      spellCheck={false}
                      className="card-textarea-hp w-14 h-10 text-center "
                    />

                     <textarea
                      value={healthData.hpTempLabel}
                      readOnly={locks.labelLock}
                      onChange={(e) => {
                        if (!locks.labelLock) {
                          dispatch(updateHealthData({ key: 'hpTempLabel', value: e.target.value }));
                        }
                      }}
                      onBlur={(e) => {
                        if (!locks.labelLock) {
                          dispatch(patchHealthData({ hpTempLabel: e.target.value }));
                        }
                      }}
                      spellCheck={false}
                      className="card-textarea-label text-lg italic h-8 w-14"
                    />
                    <textarea
                      value={healthData.hpTemp}
                      onChange={(e) => dispatch(updateHealthData({ key: 'hpTemp', value: e.target.value }))}
                      onBlur={(e) => dispatch(patchHealthData({ hpTemp: e.target.value }))}
                      spellCheck={false}
                      className="card-textarea-hp w-11 h-10 text-center"
                    />
                  </div>

                  {/*Bottow Row*/}
                  <div className='flex items-center gap-3'>
                    <h1 className='text-2xl font-bold italic mr-2'>AC</h1>
                    <textarea
                      value={healthData.ac}
                      onChange={(e) => dispatch(updateHealthData({ key: 'ac', value: e.target.value }))}
                      onBlur={(e) => dispatch(patchHealthData({ ac: e.target.value }))}
                      spellCheck={false}
                      className="card-textarea w-11 h-10 text-center mr-3"
                    />
                    <h1 className='text-lg font-bold '>Addons</h1>
                    <textarea
                      value={healthData.stressCurrent}
                      onChange={(e) => dispatch(updateHealthData({ key: 'stressCurrent', value: e.target.value }))}
                      onBlur={(e) => dispatch(patchHealthData({ stressCurrent: e.target.value }))}
                      spellCheck={false}
                      className="card-textarea-hp w-11 h-10 text-center "
                    />
                    <div className='border-l border-gray h-full'></div>
                    <textarea
                      value={healthData.stressMax}
                      onChange={(e) => dispatch(updateHealthData({ key: 'stressMax', value: e.target.value }))}
                      onBlur={(e) => dispatch(patchHealthData({ stressMax: e.target.value }))}
                      spellCheck={false}
                      className="card-textarea-hp w-11 h-10 text-center "
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/*Name & Level */}
          <div className='mainContainers w-full'>
            <div className='flex justify-center gap-2'>
              {/*Name*/}
              <div className='flex flex-col gap-2'>
                <textarea
                  value={"Ruvik Coldwin"}
                  placeholder={"Name"}
                  spellCheck={false}
                  className="card-textarea w-44 h-10 !text-start pl-2 text-sec placeholder-grayActive"
                />
                <textarea
                  value={"Male, Elf, Barbarian"}
                  placeholder={"Description"}
                  spellCheck={false}
                  className="card-textarea w-44 h-10 text-xs !text-start !pt-3 pl-2 placeholder-grayActive !overflow-y-auto custom-scrollbar"
                />
              </div>

              <div className='border-l border-gray h-full'></div>

              {/*XP*/}
              <div className='flex flex-col gap-2'>
                <div className='flex items-center gap-4'>
                  <h1 className='text-2xl font-bold'>Level</h1>
                  <textarea
                    value={"18"}
                    spellCheck={false}
                    className="card-textarea w-11 h-11 text-center"
                  />
                </div>
                <div className='flex justify-center items-center gap-4 '>
                  <h1 className='text-lg font-bold italic'>XP</h1>
                  <textarea
                    value={"123456"}
                    spellCheck={false}
                    className="card-textarea w-20 h-10 text-center"
                  />
                </div>
              </div>
            </div>

          </div>

          {/*Skills */}
          <div className='mainContainers max-h-[61vh] min-h-0 overflow-y-auto custom-scrollbar '>
            <div className='flex flex-col'>
              <div className='flex justify-between pr-8'>
                <h1 className='text-2xl font-bold italic mb-2'>Skills</h1>
                <h1 className='text-lg font-bold mt-1 mb-2'>Profs</h1>
              </div>

              <div className='flex flex-col gap-2 items-center'>

                {/*Skill Instance */}
                <div className='flex items-center gap-2'>
                  <textarea
                    value={"Animal Handling"}
                    placeholder={"Name"}
                    spellCheck={false}
                    className="card-textarea-skill"
                  />
                  <textarea
                    value={"15"}
                    spellCheck={false}
                    className="card-textarea w-11 h-10"
                  />

                  <div className='border-l border-gray h-full'></div>

                  <textarea
                    value={"6"}
                    spellCheck={false}
                    className="card-textarea w-11 h-10 text-sec"
                  />
                  <Trash2 className='size-6 text-gray' />

                </div>

                {/*Skill Instance */}
                <div className='flex items-center gap-2'>
                  <textarea
                    value={"Animal Handling"}
                    placeholder={"Name"}
                    spellCheck={false}
                    className="card-textarea-skill"
                  />
                  <textarea
                    value={"15"}
                    spellCheck={false}
                    className="card-textarea w-11 h-10"
                  />

                  <div className='border-l border-gray h-full'></div>

                  <textarea
                    value={"6"}
                    spellCheck={false}
                    className="card-textarea w-11 h-10 text-sec"
                  />
                  <Trash2 className='size-6 text-gray' />

                </div>

                {/*Skill Instance */}
                <div className='flex items-center gap-2'>
                  <textarea
                    value={"Animal Handling"}
                    placeholder={"Name"}
                    spellCheck={false}
                    className="card-textarea-skill"
                  />
                  <textarea
                    value={"15"}
                    spellCheck={false}
                    className="card-textarea w-11 h-10"
                  />

                  <div className='border-l border-gray h-full'></div>

                  <textarea
                    value={"6"}
                    spellCheck={false}
                    className="card-textarea w-11 h-10 text-sec"
                  />
                  <Trash2 className='size-6 text-gray' />

                </div>

                {/*Skill Instance */}
                <div className='flex items-center gap-2'>
                  <textarea
                    value={"Animal Handling"}
                    placeholder={"Name"}
                    spellCheck={false}
                    className="card-textarea-skill"
                  />
                  <textarea
                    value={"15"}
                    spellCheck={false}
                    className="card-textarea w-11 h-10"
                  />

                  <div className='border-l border-gray h-full'></div>

                  <textarea
                    value={"6"}
                    spellCheck={false}
                    className="card-textarea w-11 h-10 text-sec"
                  />
                  <Trash2 className='size-6 text-gray' />

                </div>

                {/*Skill Instance */}
                <div className='flex items-center gap-2'>
                  <textarea
                    value={"Animal Handling"}
                    placeholder={"Name"}
                    spellCheck={false}
                    className="card-textarea-skill"
                  />
                  <textarea
                    value={"15"}
                    spellCheck={false}
                    className="card-textarea w-11 h-10"
                  />

                  <div className='border-l border-gray h-full'></div>

                  <textarea
                    value={"6"}
                    spellCheck={false}
                    className="card-textarea w-11 h-10 text-sec"
                  />
                  <Trash2 className='size-6 text-gray' />

                </div>

                {/*Skill Instance */}
                <div className='flex items-center gap-2'>
                  <textarea
                    value={"Animal Handling"}
                    placeholder={"Name"}
                    spellCheck={false}
                    className="card-textarea-skill"
                  />
                  <textarea
                    value={"15"}
                    spellCheck={false}
                    className="card-textarea w-11 h-10"
                  />

                  <div className='border-l border-gray h-full'></div>

                  <textarea
                    value={"6"}
                    spellCheck={false}
                    className="card-textarea w-11 h-10 text-sec"
                  />
                  <Trash2 className='size-6 text-gray' />

                </div>

                {/*Skill Instance */}
                <div className='flex items-center gap-2'>
                  <textarea
                    value={"Animal Handling"}
                    placeholder={"Name"}
                    spellCheck={false}
                    className="card-textarea-skill"
                  />
                  <textarea
                    value={"15"}
                    spellCheck={false}
                    className="card-textarea w-11 h-10"
                  />

                  <div className='border-l border-gray h-full'></div>

                  <textarea
                    value={"6"}
                    spellCheck={false}
                    className="card-textarea w-11 h-10 text-sec"
                  />
                  <Trash2 className='size-6 text-gray' />

                </div>

                {/*Skill Instance */}
                <div className='flex items-center gap-2'>
                  <textarea
                    value={"Animal Handling"}
                    placeholder={"Name"}
                    spellCheck={false}
                    className="card-textarea-skill"
                  />
                  <textarea
                    value={"15"}
                    spellCheck={false}
                    className="card-textarea w-11 h-10"
                  />

                  <div className='border-l border-gray h-full'></div>

                  <textarea
                    value={"6"}
                    spellCheck={false}
                    className="card-textarea w-11 h-10 text-sec"
                  />
                  <Trash2 className='size-6 text-gray' />

                </div>

                {/*Skill Instance */}
                <div className='flex items-center gap-2'>
                  <textarea
                    value={"Animal Handling"}
                    placeholder={"Name"}
                    spellCheck={false}
                    className="card-textarea-skill"
                  />
                  <textarea
                    value={"15"}
                    spellCheck={false}
                    className="card-textarea w-11 h-10"
                  />

                  <div className='border-l border-gray h-full'></div>

                  <textarea
                    value={"6"}
                    spellCheck={false}
                    className="card-textarea w-11 h-10 text-sec"
                  />
                  <Trash2 className='size-6 text-gray' />

                </div>

                {/*Skill Instance */}
                <div className='flex items-center gap-2'>
                  <textarea
                    value={"Animal Handling"}
                    placeholder={"Name"}
                    spellCheck={false}
                    className="card-textarea-skill"
                  />
                  <textarea
                    value={"15"}
                    spellCheck={false}
                    className="card-textarea w-11 h-10"
                  />

                  <div className='border-l border-gray h-full'></div>

                  <textarea
                    value={"6"}
                    spellCheck={false}
                    className="card-textarea w-11 h-10 text-sec"
                  />
                  <Trash2 className='size-6 text-gray' />

                </div>

                {/*Skill Instance */}
                <div className='flex items-center gap-2'>
                  <textarea
                    value={"Animal Handling"}
                    placeholder={"Name"}
                    spellCheck={false}
                    className="card-textarea-skill"
                  />
                  <textarea
                    value={"15"}
                    spellCheck={false}
                    className="card-textarea w-11 h-10"
                  />

                  <div className='border-l border-gray h-full'></div>

                  <textarea
                    value={"6"}
                    spellCheck={false}
                    className="card-textarea w-11 h-10 text-sec"
                  />
                  <Trash2 className='size-6 text-gray' />

                </div>

                {/*Skill Instance */}
                <div className='flex items-center gap-2'>
                  <textarea
                    value={"Animal Handling"}
                    placeholder={"Name"}
                    spellCheck={false}
                    className="card-textarea-skill"
                  />
                  <textarea
                    value={"15"}
                    spellCheck={false}
                    className="card-textarea w-11 h-10"
                  />

                  <div className='border-l border-gray h-full'></div>

                  <textarea
                    value={"6"}
                    spellCheck={false}
                    className="card-textarea w-11 h-10 text-sec"
                  />
                  <Trash2 className='size-6 text-gray' />

                </div>

                {/*Skill Instance */}
                <div className='flex items-center gap-2'>
                  <textarea
                    value={"Animal Handling"}
                    placeholder={"Name"}
                    spellCheck={false}
                    className="card-textarea-skill"
                  />
                  <textarea
                    value={"15"}
                    spellCheck={false}
                    className="card-textarea w-11 h-10"
                  />

                  <div className='border-l border-gray h-full'></div>

                  <textarea
                    value={"6"}
                    spellCheck={false}
                    className="card-textarea w-11 h-10 text-sec"
                  />
                  <Trash2 className='size-6 text-gray' />

                </div>

                {/*Skill Instance */}
                <div className='flex items-center gap-2'>
                  <textarea
                    value={"Animal Handling"}
                    placeholder={"Name"}
                    spellCheck={false}
                    className="card-textarea-skill"
                  />
                  <textarea
                    value={"15"}
                    spellCheck={false}
                    className="card-textarea w-11 h-10"
                  />

                  <div className='border-l border-gray h-full'></div>

                  <textarea
                    value={"6"}
                    spellCheck={false}
                    className="card-textarea w-11 h-10 text-sec"
                  />
                  <Trash2 className='size-6 text-gray' />

                </div>

                {/*Skill Instance */}
                <div className='flex items-center gap-2'>
                  <textarea
                    value={"Animal Handling"}
                    placeholder={"Name"}
                    spellCheck={false}
                    className="card-textarea-skill"
                  />
                  <textarea
                    value={"15"}
                    spellCheck={false}
                    className="card-textarea w-11 h-10"
                  />

                  <div className='border-l border-gray h-full'></div>

                  <textarea
                    value={"6"}
                    spellCheck={false}
                    className="card-textarea w-11 h-10 text-sec"
                  />
                  <Trash2 className='size-6 text-gray' />

                </div>

                {/*Skill Instance */}
                <div className='flex items-center gap-2'>
                  <textarea
                    value={"Animal Handling"}
                    placeholder={"Name"}
                    spellCheck={false}
                    className="card-textarea-skill"
                  />
                  <textarea
                    value={"15"}
                    spellCheck={false}
                    className="card-textarea w-11 h-10"
                  />

                  <div className='border-l border-gray h-full'></div>

                  <textarea
                    value={"6"}
                    spellCheck={false}
                    className="card-textarea w-11 h-10 text-sec"
                  />
                  <Trash2 className='size-6 text-gray' />

                </div>

                <Plus className='size-6 text-sec' />
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