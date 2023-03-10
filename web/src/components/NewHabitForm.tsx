import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'
import React, { FormEvent, FormEventHandler, useState } from 'react'
import { api } from '../lib/axios'

const availableWeekDays = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
]

export const NewHabitForm =  () => {
    const [title, setTitle] = useState('')
    const [weekDays, setWeekDays] = useState<number[]>([])

    async function createNewHabit(event: FormEvent) {
        event.preventDefault()

        if(!title || weekDays.length === 0) return
        
        await api.post('habits', {
            title,
            weekDays
        })

        setTitle('')
        setWeekDays([])

        alert('Hábito criado com sucesso!')
    }

    function handleToggleWeekDay(weekDay: number) {
        if(weekDays.includes(weekDay)) {
            const weekDaysWhitRemovedOne = weekDays.filter(day => day !== weekDay)
            
            setWeekDays(weekDaysWhitRemovedOne)
        } else {
            const weekDaysWithAddedOne = [...weekDays, weekDay]

            setWeekDays(weekDaysWithAddedOne)
        }
    }

  return (
    <form onSubmit={createNewHabit} className='flex w-full flex-col mt-6'>
        <label htmlFor="title" className='font-semibold leading-tight'>
            Qual seu comprometimento?
        </label>

        <input 
            type="text" 
            id="title" 
            placeholder='ex.: Exercícios, dormir bem, etc...'
            className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 group-focus:outiline-none group-focus:ring-2 group-focus:ring-violet-700 group-focus:ring-offset-2 group-focus:ring-offset-zinc-900"
            autoFocus
            value={title}
            onChange={event => setTitle(event.target.value)}
        />

        <label htmlFor=""  className='font-semibold leading-tight mt-4'>
            Qual a recorência?
        </label>

        <div className="mt-3 flex flex-col gap-2">
            {
                availableWeekDays.map((weekDay, index) => {
                    return (
                        <Checkbox.Root
                            key={weekDay}
                            className="flex items-center gap-3 group focus:outline-none"
                            checked={weekDays.includes(index)}
                            onCheckedChange={() => handleToggleWeekDay(index)}
                        >
                            <div 

                                className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors  group-focus:outiline-none group-focus:ring-2 group-focus:ring-violet-700 group-focus:ring-offset-2 group-focus:ring-offset-background"
                            >
                                <Checkbox.Indicator>
                                <CheckIcon fontSize={28} color='white' />
                                </Checkbox.Indicator>
                            </div>
                
                            <span className="text-white leading-tight">
                                {weekDay}
                            </span>
                            </Checkbox.Root>
                    )
                })
            }
        </div>

        <button 
        type="submit" 
        className='mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500 transition-colors focus:outiline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2 focus:ring-offset-zinc-900'
        >
            <CheckIcon fontWeight='bold' fontSize={28} />
                Confirmar
        </button>
    </form>
  )
}
