import { API_URL } from './config.js'

export let state = {
  results: [],
  pokeList: [],
  pokeByID: {},
  pokeCompare: [],
}

export async function getPokeList(offset = '0', sort) {
  try {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=100`
    )
    const { results } = await res.json()

    state.results = []
    state.pokeList = []

    results.forEach((res) => {
      state.results.push(res)
    })
    await getPokemons(sort)
  } catch (err) {
    console.log(err)
  }
}

export async function getPokemons(sort = false) {
  try {
    for (const poke of state.results) {
      const res = await fetch(`${API_URL}${poke.name}/`)
      const data = await res.json()
      state.pokeList.push(data)
    }
  } catch (err) {
    console.log(err)
  }
}

export async function getPokemon(idx) {
  try {
    const res = await fetch(`${API_URL}${idx}/`)
    const pokemon = await res.json()
    state.pokeByID = pokemon
  } catch (err) {
    throw err
  }
}
export async function getcompareID(idx) {
  try {
    const res = await fetch(`${API_URL}${idx}/`)
    const pokemon = await res.json()

    state.pokeCompare.length >= 4
      ? alert('you can compare up to 4 cards')
      : state.pokeCompare.push(pokemon)
  } catch (err) {
    console.log(err)
  }
}

export function removeCopmareID(idx) {
  state.pokeCompare.splice(
    state.pokeCompare.findIndex((x) => x.id === +idx),
    1
  )
}

export function sortCardsByName() {
  state.pokeList.sort((a, b) => {
    if (a.name < b.name) return -1
    if (a.name > b.name) return 1
    else return 0
  })
}
export function sortCardsByID() {
  state.pokeList.sort((a, b) => {
    if (a.id < b.id) return -1
    if (a.id > b.id) return 1
    else return 0
  })
}
console.log(state.pokeCompare)
