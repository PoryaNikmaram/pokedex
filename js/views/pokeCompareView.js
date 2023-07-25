import pokeView from './pokeView.js'

class PokeComareView extends pokeView {
  _parentElement = document.querySelector('.compare-container')
  _compareBtn = document.querySelector('.compare-item')
  _redDot = document.querySelector('.red-dot')
  _message = 'NO CARDS SELECTED TO COMPARE SELECT AT LEAST ONE CARD 😉'

  toggleCardCompareHandler(addHandler, removeHandler) {
    this._cards.addEventListener('click', (e) => {
      if (!e.target.closest('.compare-btn')) return

      const id = this._getTargetID(e)

      if (e.target.closest('.compare-btn').classList.contains('active')) {
        removeHandler(id)
        this._removeActiveCompare(id)
      } else {
        addHandler(id)
        this._data.length < 4
          ? this._addActiveCompare(id)
          : this._removeActiveCompare(id)
      }
    })
  }
  compareViewHandler() {
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.compare-item')) return

      if (this._data.length <= 0) this._showMessage()

      this.showDetails()
    })
  }
  compareCloseBtnHandler() {
    this._parentElement.addEventListener('click', (e) => {
      if (
        e.target.classList.contains('compare-container') ||
        e.target.closest('.compare-close-btn')
      )
        this._removeDetails()
    })
  }
  compareCardCloseBtnHandler(handler) {
    this._parentElement.addEventListener('click', (e) => {
      if (!e.target.closest('.inner-compare-close-btn')) return

      const { id } = e.target
        .closest('.compare-card')
        .querySelector('.main-id').dataset

      if (this._data.length <= 1) this._removeDetails()

      this._removeActiveCompare(id)

      handler(id)
    })
  }
  _removeActiveCompare(id) {
    ;[...this._cards.querySelectorAll('.compare-btn')]
      .find((card) => +card.dataset.id === +id)
      .classList.remove('active')
  }
  _addActiveCompare(id) {
    ;[...this._cards.querySelectorAll('.compare-btn')]
      .find((card) => +card.dataset.id === +id)
      .classList.add('active')
  }

  itemRedDotChange() {
    this._data.length >= 1
      ? this._redDot.classList.remove('hidden')
      : this._data.length < 1
      ? this._redDot.classList.add('hidden')
      : null
  }

  _getTargetID(e) {
    return e.target.closest('.card').querySelector('.poke-id').dataset.id
  }

  generateAllMarkups(data) {
    return `
        <div class="compare-card">
          <div class="main-img">
          <img
          src="https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${
            data.id
          }.svg"
          alt=""
      />
            <h1 class="main-name">${data.name}</h1>
          </div>
          <div class="main-info">
            <div class="main-details main-abilities">
              <h4>ABILITIES</h4>
              <div class="main-detail">
              ${data.abilities
                .slice(0, 3)
                .map((x) => {
                  return `<p>${x.ability.name}</p>`
                })
                .join('')}
              </div>
            </div>

            <div class="main-details main-height">
              <h4>height</h4>
              <p>${data.height}</p>
            </div>

            <div class="main-details main-weight">
              <h4>weight</h4>
              <p>${data.weight}</p>
            </div>

            <div class="main-details main-id" data-id="${data.id}">
              <h4>ID</h4>
              <p>${data.id}</p>
            </div>

            <div class="main-details main-moves">
              <h4>MOVES</h4>
              <div class="main-detail">
              ${data.moves
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
                  data.held_items.length === 0
                    ? 'No Items'
                    : data.held_items[0].item.name
                }</p>
              </div>
            </div>
          </div>
          <button class="inner-compare-close-btn">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      `
  }
}

export default new PokeComareView()
