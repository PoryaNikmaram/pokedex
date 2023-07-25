export default class pokeView {
  _data = []
  _overlay = document.querySelector('.overlay')
  _cards = document.querySelector('.poke-cards')

  render(data) {
    this._data = data
    const html = this.generateMarkup()
    this._parentElement.insertAdjacentHTML('beforeend', html)
  }

  renderSpinner() {
    const spinnerHTML = `
    <div class="lds-roller spinner">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    `
    this._parentElement.insertAdjacentHTML('beforeend', spinnerHTML)
  }
  showDetails() {
    this._parentElement.classList.remove('hidden')
    this._overlay.classList.remove('hidden')
  }
  _removeDetails() {
    this._parentElement.classList.add('hidden')
    this._overlay.classList.add('hidden')
  }
  _showMessage(message = '') {
    this.clear()

    const messageHTML = `
    <p>${message || this._message}</p>
    `
    this._parentElement.insertAdjacentHTML('beforeend', messageHTML)
  }
  clear() {
    this._parentElement.innerHTML = ''
  }
  generateMarkup() {
    return this._data.map((data) => this.generateAllMarkups(data)).join('')
  }
}
