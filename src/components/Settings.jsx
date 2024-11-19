import React from 'react'

const Settings = () => {

  const theme = "light";

  return (
    <div className='flex flex-col'>
      <div className='flex items-center gap-2 m-1'>
        <label>User Name</label>
        <input
            className="rounded-md p-2 w-30 bg-slate-100"
            placeholder=""
        />
      </div>

      <div className='flex items-center gap-2 m-1'>
        <label>Password</label>
        <input
            className="rounded-md p-2 w-30 bg-slate-100"
            placeholder=""
        />
      </div>

      <div className='flex gap-2 m-1'>
        <h2 class="flex-col text-xl font-semibold mb-4">Dark Mode</h2>
        <label class="flex-col relative inline-block w-16 h-8 cursor-pointer">
          <input type="checkbox" class="opacity-0 w-0 h-0 peer"/>
          <span class="absolute inset-0 bg-gray-300 transition-colors rounded-full peer-checked:bg-blue-500 peer-focus:ring-2 peer-focus:ring-blue-500 peer-focus:ring-offset-2"></span>
          <span class="absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform transform peer-checked:translate-x-8"></span>
        </label>
      </div>


    </div>
  )
}

export default Settings