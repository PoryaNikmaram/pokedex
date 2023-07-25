import pokeView from './pokeView.js'

class navbarView extends pokeView {
  _parentElement = document.querySelector('.navbar')
  _searchInput = document.querySelector('.search-input')
  _compareItem = document.querySelector('.compare-item')
  _sortItem = document.querySelector('.sort-item')

  addSortCardHandler(sortID, sortName) {
    this._sortItem.addEventListener('click', (e) => {
      e.target.closest('.sort-item').classList.toggle('id')

      e.target.classList.contains('id') ? sortID() : sortName()
    })
  }

  searchCard(handler) {
    this._parentElement.addEventListener('click', (e) => {
      if (!e.target.closest('.search-btn')) return
      e.preventDefault()

      document.querySelector('.search-input').focus()
      this._searchInput.classList.remove('hide')

      this._hideSearch()

      const value = this._searchInput.value

      if (value === '') return

      handler(value)

      setTimeout(() => {
        this._searchInput.value = ''
        this._searchInput.classList.add('hide')
      }, 2000)
    })
  }

  _hideSearch() {
    this._searchInput.addEventListener('blur', () => {
      this._searchInput.classList.add('hide')
    })
  }

  fixNavbar() {
    document.addEventListener('scroll', () => {
      if (scrollY > 90) {
        this._parentElement.style = `
        height: 70px;
        background-color: #333;
        color :#fff;
        `
        this._parentElement.querySelectorAll('li').forEach((li) => {
          li.style = `
          background-color: #fff;
          color :#333;`
        })
        this._parentElement.querySelectorAll('li i').forEach((li) => {
          li.style = `
          color :#333;`
        })
      } else {
        this._parentElement.style = `
        height: 90px;
        background-color: rgba(255, 255, 255, 0.5);
        `
        this._parentElement.querySelectorAll('li').forEach((li) => {
          li.style = `
          background-color: #333;
          color :#fff;`
        })
        this._parentElement.querySelectorAll('li i').forEach((li) => {
          li.style = `
          color :#fff;`
        })
      }
    })
  }
}

export default new navbarView()
