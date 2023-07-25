import pokeView from './pokeView.js'

class PaginationView extends pokeView {
  _parentElement = document.querySelector('.pagination')
  _paginationUl = document.querySelector('.pag-ul')
  _nextBtn = document.querySelector('.pag-next')
  _prevBtn = document.querySelector('.pag-prev')

  _curPage = 1

  onLoadActivePageHandler() {
    const firstPage = this._parentElement.querySelector('li')
    firstPage.classList.add('active')
  }

  addActivePagHandler(handler) {
    this._parentElement.addEventListener('click', (e) => {
      if (!e.target.closest('.pag') || +e.target.textContent === +this._curPage)
        return

      this._parentElement
        .querySelectorAll('.pag')
        .forEach((p) => p.classList.remove('active'))

      e.target.classList.add('active')

      const pageNumber = e.target.textContent - 1

      this._curPage = pageNumber + 1

      pageNumber <= 9 ? this._cardListNumber(pageNumber) : null

      handler(pageNumber * 100)
    })
  }

  pagNextBtnHandler(handler) {
    this._nextBtn.addEventListener('click', () => {
      if (this._curPage >= 10) return

      ++this._curPage

      const nextSlide = this._curPage - 1

      this._cardListNumber(nextSlide)
      this._updateActiveSlide()
      handler(nextSlide * 100)
    })
  }
  pagPrevBtnHandler(handler) {
    this._prevBtn.addEventListener('click', () => {
      if (this._curPage <= 1) return

      --this._curPage

      const prevSlide = this._curPage - 1

      this._cardListNumber(prevSlide)
      this._updateActiveSlide()
      handler(prevSlide * 100)
    })
  }

  createPagination() {
    //We asuume that the maximum length of data is 1000
    for (let i = 1; i <= 10; i++) {
      const html = `
      <li class="pag">${i}</li>
      `
      this._paginationUl.insertAdjacentHTML('beforeend', html)
    }

    this._createUl()
  }

  _createUl() {
    const liPag = document.querySelectorAll('.pag')
    liPag.forEach((li, idx) => {
      li.style.transform = `translateX(${idx * 120}%)`
    })
  }

  _cardListNumber(e) {
    ;[...document.querySelectorAll('.pag')].forEach((li, idx) => {
      li.style.transform = `translateX(${idx * 120 - +e * 120}%)`
    })
  }

  _updateActiveSlide() {
    this._parentElement
      .querySelectorAll('.pag')
      .forEach((p) => p.classList.remove('active'))

    document
      .querySelector(`.pag-ul li:nth-child(${this._curPage})`)
      .classList.add('active')
  }
}

export default new PaginationView()
