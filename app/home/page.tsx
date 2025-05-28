import React from 'react';
import './page.css';


const Home = () => {
  return (
    <div className="flex-col py-6 px-6 md:ml-64 md:px-20 md:mt-[90px] ml-12 font-[family-name:var(--font-geist-sans)]">

      {/*Other Info*/}
      <div className='md:flex justify-between md:justify-center md:gap-8 '>

        {/*Left Side */}
        <div className='flex flex-col items-center'>

          {/*Skills */}
          <div className='mainContainers'>
            <div className='flex flex-col'>
              <div className='flex justify-between '>
                <h1 className='text-2xl font-bold italic mb-2'>Skills</h1>
                <h1 className='text-lg font-bold  mb-2'>Add</h1>
              </div>

              <div className='flex flex-col'>

                {/*Skill Instance */}
                <div className='flex'>
                  <textarea
                    value={"Animal Handling"}
                    spellCheck={false}
                    className="card-textarea w-40 h-10 justify-start"
                  />
                  <textarea
                    value={"15"}
                    spellCheck={false}
                    className="card-textarea w-10 h-10 text-center ml-2"
                  />

                  <div className='border-l border-gray-500 ml-2 h-10'></div>

                  <textarea
                    value={"6"}
                    spellCheck={false}
                    className="card-textarea w-10 h-10 text-center ml-2"
                  />

                  Trash
                </div>

                <div className='flex'>
                  <textarea
                    value={"Stealth"}
                    spellCheck={false}
                    className="card-textarea w-40 h-10 justify-start"
                  />
                  <textarea
                    value={"3"}
                    spellCheck={false}
                    className="card-textarea w-10 h-10 text-center ml-2"
                  />

                  <div className='border-l border-gray-500 ml-2 h-10'></div>

                  <textarea
                    value={"1"}
                    spellCheck={false}
                    className="card-textarea w-10 h-10 text-center ml-2"
                  />
                </div>
              </div>

            </div>

          </div>

        </div>

        {/*Middle Side */}
        <div className='flex flex-col items-center'>

          {/*First Info Block */}
          <div className='mainContainers'>
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