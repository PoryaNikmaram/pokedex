import pokeView from './pokeView.js'

class pokeDetails extends pokeView {
  _parentElement = document.querySelector('.pokemons-main')
  _resultLength

  addEventHandler(handler) {
    this._cards.addEventListener('click', (e) => {
      if (!e.target.closest('.card') || e.target.closest('.compare-btn')) return

      const { id } = e.target.closest('.card').querySelector('.poke-id').dataset

      handler(id)
    })
  }

  addDetailBtnHandler(handler) {
    this._parentElement.addEventListener('click', (e) => {
      if (!e.target.closest('.main-controll-btn')) return

      console.log(this._data.id)

      e.target.closest('.main-prev-card') && this._data.id !== 1
        ? e.target.addEventListener('click', handler(Number(--this._data.id)))
        : e.target.closest('.main-next-card') &&
          this._data.id !== this._resultLength
        ? e.target.addEventListener('click', handler(Number(++this._data.id)))
        : null
    })
  }

  addDdetailCloseBtnHandler() {
    document.addEventListener('click', (e) => {
      if (
        e.target.classList.contains('overlay') ||
        e.target.closest('.main-close-btn')
      )
        this._removeDetails()
    })
  }

  _dataLength(data) {
    this._resultLength = data.length
  }

  generateMarkup() {
    return `
      <div class="main-img">
          <img
              src="https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${
                this._data.id
              }.svg"
              alt=""
          />
        <h1 class="main-name">${this._data.name}</h1>
      </div>
      <div class="main-info">
          <div class="main-details main-abilities">
              <h4>ABILITIES</h4>
              <div class="main-detail">
              ${this._data.abilities
                .slice(0, 3)
                .map((x) => {
                  return `<p>${x.ability.name}</p>`
                })
                .join('')}
              </div>
          </div>

          <div class="main-details main-height">
              <h4>height</h4>
              <p>${this._data.height}</p>
          </div>

          <div class="main-details main-weight">
              <h4>weight</h4>
              <p>${this._data.weight}</p>
          </div>

          <div class="main-details main-id" data>
              <h4>ID</h4>
              <p>${this._data.id}</p>
          </div>

          <div class="main-details main-moves">
              <h4>MOVES</h4>
              <div class="main-detail">
              ${this._data.moves
                .slice(0, 4)
                .map((x) => {
                  return `<p>${x.move.name}</p>`
                })
                .join('')}
              </div>
          </div>

          <div class="main-details main-items">
              <h4>ITEMS</h4>
              <div class="main-detail">
              <p>${
                this._data.held_items.length === 0
                  ? 'No Items'
                  : this._data.held_items[0].item.name
              }</p>
              </div>
          </div>
        </div>
        <button class="main-controll-btn main-close-btn"><i class="fa-solid fa-xmark"></i></button>

        <button class="main-controll-btn main-next-card"><i class="fa-solid fa-chevron-right"></i></button>

        <button class="main-controll-btn main-prev-card"><i class="fa-solid fa-chevron-left"></i></button>
    `
  }
}

export default new pokeDetails()
