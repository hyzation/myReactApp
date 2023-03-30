import { proxy } from 'valtio'

export const colors = [
    'blue', 'white', 'yellow', 'green'
]

const state = proxy({
    intro: true,
    anime: null,
    originPos: [-4, 4.5, -3],
    campos: [-4, 4.5, -3],
    lookpos: [0, 0, 0],
    colors: ['#ccc', '#EFBD4E', '#80C670', '#726DE8', '#EF674E', '#353934'],
    decals: ['react', 'three2', 'pmndrs'],
    color: '#ccc',
    decal: 'three2'
})

export { state }