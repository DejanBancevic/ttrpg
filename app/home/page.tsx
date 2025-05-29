import React from 'react';
import './page.css';
import { Trash2, Plus } from "@deemlol/next-icons";
import portrait from "../../public/portrait.png"

const Home = () => {

  return (
    <div className="flex-col p-6 md:mt-[90px]">

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

                <div className='border-l border-gray h-20'></div>

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
                    spellCheck={false}
                    className="card-textarea w-40 h-10 justify-start"
                  />
                  <textarea
                    value={"15"}
                    spellCheck={false}
                    className="card-textarea w-11 h-10 text-center "
                  />

                  <div className='border-l border-gray h-10'></div>

                  <textarea
                    value={"6"}
                    spellCheck={false}
                    className="card-textarea w-11 h-10 text-center text-sec"
                  />
                  <Trash2 className='size-6 text-gray' />

                </div>

                <Plus className='size-6 text-sec' />
              </div>

            </div>
          </div>
        </div>

        {/*Middle Side */}
        <div className='flex flex-col items-center gap-4'>

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

          {/*Actions & Spells */}
          <div className='flex justify-between'>

            {/*Actions */}
            <div className='mainContainers max-h-[70vh] min-h-0 overflow-y-auto custom-scrollbar '>
              <div className='flex flex-col'>
                <div className='flex justify-between pr-8'>
                  <h1 className='text-2xl font-bold italic mb-2'>Actions</h1>
                </div>

                <div className='flex flex-col gap-2 items-center'>

                  {/*Skill Instance */}
                  <div className='flex items-center gap-2'>
                    <textarea
                      value={"Animal Handling"}
                      spellCheck={false}
                      className="card-textarea w-40 h-10 justify-start"
                    />
                    <textarea
                      value={"15"}
                      spellCheck={false}
                      className="card-textarea w-11 h-10 text-center "
                    />

                    <div className='border-l border-gray h-10'></div>

                    <textarea
                      value={"6"}
                      spellCheck={false}
                      className="card-textarea w-11 h-10 text-center text-sec"
                    />
                    <Trash2 className='size-6 text-gray' />

                  </div>

                  <Plus className='size-6 text-sec' />
                </div>

              </div>
            </div>
          </div>

        </div>

        {/*Right Side */}
        <div className='flex flex-col items-center'>

          {/*First Info Block */}
          <div className='mainContainers'>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Home