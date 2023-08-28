import { create } from 'zustand'

export default create((set) =>
{
    return {
        start: () =>
        {
            set(() =>
            {
                return { phase: 'playing' }
            })
        },

        restart: () =>
        {
            set(() =>
            {
                return { phase: 'ready' }
            })
        },

        end: () =>
        {
            set(() =>
            {
                return { phase: 'ended' }
            })
        }
    }
})