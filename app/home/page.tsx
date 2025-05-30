import React from 'react';
import './page.css';
import { Trash2, Plus } from "@deemlol/next-icons";
import portrait from "../../public/portrait.png"

const Home = () => {

  return (
    <div className="flex-col p-6 md:px-20 md:mt-[90px] ml-12">

      {/*Other Info*/}
      <div className='md:flex justify-between md:justify-center md:gap-4 '>

        {/*Left Side */}
        <div className='flex flex-col items-center gap-4'>

          {/*HP & Portrait */}
          <div className='flex justify-between gap-4'>

            {/*Portrait */}
            <div className='mainContainers'>
              <img src={portrait.src} alt="" className="card-portrait" />
            </div>

            {/*HP/AC */}
            <div className='mainContainers'>
              <div className='flex justify-center gap-2'>
                {/*HP*/}
                <div className='flex flex-col gap-2'>
                  <div className='flex items-center gap-5 pl-3'>
                    <h1 className='text-2xl font-bold italic'>HP</h1>
                    <textarea
                      value={"56"}
                      spellCheck={false}
                      className="card-textarea-hp w-14 h-9 text-center "
                    />
                  </div>
                  <div className='flex justify-center items-center gap-4 '>
                    <h1 className='text-lg font-bold italic'>Temp</h1>
                    <textarea
                      value={"7"}
                      spellCheck={false}
                      className="card-textarea-hp w-14 h-9 text-center text-sec"
                    />
                  </div>
                </div>

                <div className='border-l border-gray h-full'></div>

                {/*AC*/}
                <div className='flex flex-col items-center  gap-2'>
                  <h1 className='text-2xl font-bold italic'>AC</h1>
                  <textarea
                    value={"18"}
                    spellCheck={false}
                    className="card-textarea w-11 h-10 text-center"
                  />
                </div>
              </div>

            </div>
          </div>

          {/*Name & Level */}
          <div className='mainContainers'>
            <div className='flex justify-center gap-2'>
              {/*Name*/}
              <div className='flex flex-col gap-2'>
                <textarea
                  value={"Ruvik Coldwin"}
                  placeholder={"Name"}
                  spellCheck={false}
                  className="card-textarea w-40 h-10 !text-start pl-2 text-sec placeholder-grayActive"
                />
                <textarea
                  value={"Male, Elf, Barbarian"}
                  placeholder={"Description"}
                  spellCheck={false}
                  className="card-textarea w-40 h-10 text-xs !text-start !pt-3 pl-2 placeholder-grayActive !overflow-y-auto custom-scrollbar"
                />
              </div>

              <div className='border-l border-gray h-full'></div>

              {/*XP*/}
              <div className='flex flex-col gap-2'>
                <div className='flex items-center gap-4'>
                  <h1 className='text-2xl font-bold'>Level</h1>
                  <textarea
                    value={"8"}
                    spellCheck={false}
                    className="card-textarea w-11 h-10 text-center"
                  />
                </div>
                <div className='flex justify-center items-center gap-4 '>
                  <h1 className='text-lg font-bold italic'>XP</h1>
                  <textarea
                    value={"123456"}
                    spellCheck={false}
                    className="card-textarea-hp w-20 h-10 text-center"
                  />
                </div>
              </div>
            </div>

          </div>

          {/*Skills */}
          <div className='mainContainers max-h-[70vh] min-h-0 overflow-y-auto custom-scrollbar '>
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

                <Plus className='size-6 text-sec' />
              </div>

            </div>
          </div>
        </div>

        {/*Middle Side */}
        <div className='flex flex-col gap-4'>

          {/*Initiative & Atributes */}
          <div className='flex justify-between gap-4'>

            {/*Initiative */}
            <div className='mainContainers'>
              <div className='flex flex-col items-center gap-2'>
                <h1 className='text-2xl font-bold italic'>Initiative</h1>
                <textarea
                  value={"15"}
                  spellCheck={false}
                  className="card-textarea-hp w-11 h-10 text-center"
                />
              </div>
            </div>

            {/*Atributes */}
            <div className='mainContainersAtrib max-w-[80vh] min-w-0 overflow-x-auto custom-scrollbar'>
              <div className='flex items-center gap-3 min-w-max'>

                {/*Atribute Instance */}
                <div className='flex flex-col items-center gap-3'>
                  <div className='flex justify-between gap-2 items-center'>
                    <h1 className='text-lg font-bold'>Strength</h1>
                    <Trash2 className='size-6 text-gray' />
                  </div>
                  <div className='flex gap-2'>
                    <textarea
                      value={"19"}
                      spellCheck={false}
                      className="card-textarea-hp w-11 h-10 text-center"
                    />
                    <textarea
                      value={"+4"}
                      spellCheck={false}
                      className="card-textarea-hp w-11 h-10 text-center text-sec"
                    />
                  </div>
                </div>

                {/*Atribute Instance */}
                <div className='border-l border-gray h-full'></div>
                <div className='flex flex-col items-center gap-3'>
                  <div className='flex justify-between gap-2 items-center'>
                    <h1 className='text-lg font-bold'>Dexterity</h1>
                    <Trash2 className='size-6 text-gray' />
                  </div>
                  <div className='flex gap-2'>
                    <textarea
                      value={"24"}
                      spellCheck={false}
                      className="card-textarea-hp w-11 h-10 text-center"
                    />
                    <textarea
                      value={"+6"}
                      spellCheck={false}
                      className="card-textarea-hp w-11 h-10 text-center text-sec"
                    />
                  </div>
                </div>

                {/*Atribute Instance */}
                <div className='border-l border-gray h-20'></div>
                <div className='flex flex-col items-center gap-3'>
                  <div className='flex justify-between gap-2 items-center'>
                    <h1 className='text-lg font-bold'>Dexterity</h1>
                    <Trash2 className='size-6 text-gray' />
                  </div>
                  <div className='flex gap-2'>
                    <textarea
                      value={"24"}
                      spellCheck={false}
                      className="card-textarea-hp w-11 h-10 text-center"
                    />
                    <textarea
                      value={"+6"}
                      spellCheck={false}
                      className="card-textarea-hp w-11 h-10 text-center text-sec"
                    />
                  </div>
                </div>

                {/*Atribute Instance */}
                <div className='border-l border-gray h-20'></div>
                <div className='flex flex-col items-center gap-3'>
                  <div className='flex justify-between gap-2 items-center'>
                    <h1 className='text-lg font-bold'>Dexterity</h1>
                    <Trash2 className='size-6 text-gray' />
                  </div>
                  <div className='flex gap-2'>
                    <textarea
                      value={"24"}
                      spellCheck={false}
                      className="card-textarea-hp w-11 h-10 text-center"
                    />
                    <textarea
                      value={"+6"}
                      spellCheck={false}
                      className="card-textarea-hp w-11 h-10 text-center text-sec"
                    />
                  </div>
                </div>

                {/*Atribute Instance */}
                <div className='border-l border-gray h-20'></div>
                <div className='flex flex-col items-center gap-3'>
                  <div className='flex justify-between gap-2 items-center'>
                    <h1 className='text-lg font-bold'>Dexterity</h1>
                    <Trash2 className='size-6 text-gray' />
                  </div>
                  <div className='flex gap-2'>
                    <textarea
                      value={"24"}
                      spellCheck={false}
                      className="card-textarea-hp w-11 h-10 text-center"
                    />
                    <textarea
                      value={"+6"}
                      spellCheck={false}
                      className="card-textarea-hp w-11 h-10 text-center text-sec"
                    />
                  </div>
                </div>

                {/*Atribute Instance */}
                <div className='border-l border-gray h-20'></div>
                <div className='flex flex-col items-center gap-3'>
                  <div className='flex justify-between gap-2 items-center'>
                    <h1 className='text-lg font-bold'>Dexterity</h1>
                    <Trash2 className='size-6 text-gray' />
                  </div>
                  <div className='flex gap-2'>
                    <textarea
                      value={"24"}
                      spellCheck={false}
                      className="card-textarea-hp w-11 h-10 text-center"
                    />
                    <textarea
                      value={"+6"}
                      spellCheck={false}
                      className="card-textarea-hp w-11 h-10 text-center text-sec"
                    />
                  </div>
                </div>

                <Plus className='size-6 text-sec' />

              </div>
            </div>
          </div>

          {/*Movement & Saving Throws */}
          <div className='flex justify-between gap-4'>

            {/*Movement */}
            <div className='mainContainers'>
              <div className='flex flex-col items-center gap-2'>
                <h1 className='movementText font-bold italic mb-1'>Movement</h1>
                <textarea
                  value={"15"}
                  spellCheck={false}
                  className="card-textarea-hp w-11 h-10 text-center"
                />
              </div>
              <textarea
                value={"ft."}
                spellCheck={false}
                className="bg-primary text-center w-8 h-8 pt-3 resize-none font-bold overflow-hidden"
              />
            </div>

            {/*Saving Throws */}
            <div className='mainContainersAtrib max-w-[80vh] min-w-0 overflow-x-auto custom-scrollbar'>
              <div className='flex items-center gap-3 min-w-max'>

                {/*Atribute Instance */}
                <div className='flex flex-col items-center gap-3'>
                  <div className='flex justify-between gap-2 items-center'>
                    <h1 className='text-lg font-bold'>Strength</h1>
                    <Trash2 className='size-6 text-gray' />
                  </div>
                  <div className='flex gap-2'>
                    <textarea
                      value={"19"}
                      spellCheck={false}
                      className="card-textarea-hp w-11 h-10 text-center"
                    />
                    <textarea
                      value={"+4"}
                      spellCheck={false}
                      className="card-textarea-hp w-11 h-10 text-center text-sec"
                    />
                  </div>
                  <h1 className='text-md font-bold'>Saving Throw</h1>
                </div>

                {/*Atribute Instance */}
                <div className='border-l border-gray h-full'></div>
                <div className='flex flex-col items-center gap-3'>
                  <div className='flex justify-between gap-2 items-center'>
                    <h1 className='text-lg font-bold'>Dexterity</h1>
                    <Trash2 className='size-6 text-gray' />
                  </div>
                  <div className='flex gap-2'>
                    <textarea
                      value={"24"}
                      spellCheck={false}
                      className="card-textarea-hp w-11 h-10 text-center"
                    />
                    <textarea
                      value={"+6"}
                      spellCheck={false}
                      className="card-textarea-hp w-11 h-10 text-center text-sec"
                    />
                  </div>
                  <h1 className='text-md font-bold'>Saving Throw</h1>
                </div>

                {/*Atribute Instance */}
                <div className='border-l border-gray h-28'></div>
                <div className='flex flex-col items-center gap-3'>
                  <div className='flex justify-between gap-2 items-center'>
                    <h1 className='text-lg font-bold'>Dexterity</h1>
                    <Trash2 className='size-6 text-gray' />
                  </div>
                  <div className='flex gap-2'>
                    <textarea
                      value={"24"}
                      spellCheck={false}
                      className="card-textarea-hp w-11 h-10 text-center"
                    />
                    <textarea
                      value={"+6"}
                      spellCheck={false}
                      className="card-textarea-hp w-11 h-10 text-center text-sec"
                    />
                  </div>
                  <h1 className='text-md font-bold'>Saving Throw</h1>
                </div>

                {/*Atribute Instance */}
                <div className='border-l border-gray h-28'></div>
                <div className='flex flex-col items-center gap-3'>
                  <div className='flex justify-between gap-2 items-center'>
                    <h1 className='text-lg font-bold'>Dexterity</h1>
                    <Trash2 className='size-6 text-gray' />
                  </div>
                  <div className='flex gap-2'>
                    <textarea
                      value={"24"}
                      spellCheck={false}
                      className="card-textarea-hp w-11 h-10 text-center"
                    />
                    <textarea
                      value={"+6"}
                      spellCheck={false}
                      className="card-textarea-hp w-11 h-10 text-center text-sec"
                    />
                  </div>
                  <h1 className='text-md font-bold'>Saving Throw</h1>
                </div>

                {/*Atribute Instance */}
                <div className='border-l border-gray h-28'></div>
                <div className='flex flex-col items-center gap-3'>
                  <div className='flex justify-between gap-2 items-center'>
                    <h1 className='text-lg font-bold'>Dexterity</h1>
                    <Trash2 className='size-6 text-gray' />
                  </div>
                  <div className='flex gap-2'>
                    <textarea
                      value={"24"}
                      spellCheck={false}
                      className="card-textarea-hp w-11 h-10 text-center"
                    />
                    <textarea
                      value={"+6"}
                      spellCheck={false}
                      className="card-textarea-hp w-11 h-10 text-center text-sec"
                    />
                  </div>
                  <h1 className='text-md font-bold'>Saving Throw</h1>
                </div>

                {/*Atribute Instance */}
                <div className='border-l border-gray h-28'></div>
                <div className='flex flex-col items-center gap-3'>
                  <div className='flex justify-between gap-2 items-center'>
                    <h1 className='text-lg font-bold'>Dexterity</h1>
                    <Trash2 className='size-6 text-gray' />
                  </div>
                  <div className='flex gap-2'>
                    <textarea
                      value={"24"}
                      spellCheck={false}
                      className="card-textarea-hp w-11 h-10 text-center"
                    />
                    <textarea
                      value={"+6"}
                      spellCheck={false}
                      className="card-textarea-hp w-11 h-10 text-center text-sec"
                    />
                  </div>
                  <h1 className='text-md font-bold'>Saving Throw</h1>
                </div>

                <Plus className='size-6 text-sec' />

              </div>
            </div>
          </div>

          {/*Feats & Spells */}
          <div className='flex gap-4'>

            {/*Feats */}
            <div className='mainContainers !items-stretch w-full max-h-[70vh] min-h-0 overflow-y-auto custom-scrollbar '>
              <div className='flex flex-col '>

                <h1 className='text-2xl font-bold italic mb-2'>Features & Traits</h1>

                <div className='flex flex-col gap-2'>
                  {/*Feat Instance */}
                  <div className='flex flex-col gap-1 '>
                    <div className='flex justify-between items-center'>
                      <div className='flex items-center gap-3'>
                        <h1 className='text-lg font-bold'>Sneak Attack</h1>
                        <Trash2 className='size-6 text-gray' />
                      </div>
                      <div className='flex items-center gap-3'>
                        <h1 className='text-lg font-bold'>Charges</h1>
                        <textarea
                          value={"3"}
                          spellCheck={false}
                          className="card-textarea w-11 h-10 text-sec"
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
            <div className='mainContainers shrink-0 w-fit max-h-[70vh] min-h-0 overflow-y-auto custom-scrollbar '>
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

                  <Plus className='size-6 text-sec' />
                </div>

              </div>
            </div>
          </div>

        </div>

        {/*Right Side */}
        <div className='flex flex-col items-center'>

          {/*Skills */}
          <div className='mainContainers max-h-[70vh] min-h-0 overflow-y-auto custom-scrollbar '>
            <div className='flex flex-col'>

              <h1 className='text-2xl font-bold italic mb-2'>Passives & Proficiencies</h1>



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