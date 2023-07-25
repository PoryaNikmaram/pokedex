import pokeView from './pokeView.js'

class PokeListView extends pokeView {
  _parentElement = document.querySelector('.poke-cards')

  _colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5',
  }

  addEventHover() {
    this._cards.addEventListener('mouseover', function (e) {
      if (!e.target.closest('.card')) return

      e.target.closest('.card').classList.add('hover')

      e.target.addEventListener('mouseout', function () {
        e.target.closest('.card').classList.remove('hover')
      })
    })
  }

  generateAllMarkups(data) {
    return `<div class="card" style="background-color: ${[
      this._colors[data.types[0]?.type.name],
    ]}">
        <div class="poke-img">
        <img
            src="https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${
              data.id
            }.svg"
            alt=""
        />
        <button class="compare-btn" data-id="${data.id}">
        <i class="fa-solid fa-code-compare"></i></button>
        </div>
        <div class="poke-info">
        <div class="poke-id" data-id="${data.id}">#${data.id}</div>
        <h3 class="poke-name">${data.name}</h3>
        <h6 class="poke-type">type : ${data.types[0]?.type.name}</h6>
        </div>
    </div>
        `
  }
}

export default new PokeListView()
