import { proxy } from 'valtio'

export const colors = [
    'blue', 'white', 'yellow', 'green'
]

const state = proxy({
    intro: true,
    anime: false,
    colors: ['#ccc', '#EFBD4E', '#80C670', '#726DE8', '#EF674E', '#353934'],
    decals: ['react', 'three2', 'pmndrs'],
    color: '#EFBD4E',
    decal: 'three2'
})

export { state }