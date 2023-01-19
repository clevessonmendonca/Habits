import { CheckIcon } from '@radix-ui/react-icons'
import React from 'react'

export const NewHabitForm = () => {
  return (
    <form className='flex w-full flex-col mt-6'>
        <label htmlFor="title" className='font-semibold leading-tight'>
            Qual seu comprometimento?
        </label>

        <input 
            type="text" 
            id="title" 
            placeholder='ex.: Exercícios, dormir bem, etc...'
            className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
            autoFocus
        />

        <label htmlFor=""  className='font-semibold leading-tight mt-4'>
            Qual a recorência?
        </label>

        <button type="submit" className='mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500'>
            <CheckIcon fontWeight='bold' fontSize={28} />
                Confirmar
        </button>
    </form>
  )
}
