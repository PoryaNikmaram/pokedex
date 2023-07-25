import * as model from './model.js'
import pokeListView from './views/pokeListView.js'
import pokeDetails from './views/pokeDetails.js'
import pokeCompareView from './views/pokeCompareView.js'
import paginationView from './views/paginationView.js'
import navbarView from './views/navbarView..js'

async function controllList() {
  pokeListView.renderSpinner()

  await model.getPokeList()

  pokeListView.clear()

  pokeListView.render(model.state.pokeList)
}

async function controllDetails(id) {
  try {
    await model.getPokemon(id)

    pokeDetails._dataLength(model.state.results)

    pokeDetails.clear()

    pokeDetails.render(model.state.pokeByID)

    pokeDetails.showDetails()
  } catch (err) {
    pokeDetails._showMessage(err.message.split(',')[1])
    pokeDetails.showDetails()
  }
}

async function controlAddCardCompare(idx) {
  await model.getcompareID(idx)

  pokeCompareView.clear()

  pokeCompareView.render(model.state.pokeCompare)

  pokeCompareView.itemRedDotChange()
}
function controllRemoveCompare(idx) {
  model.removeCopmareID(idx)

  pokeCompareView.clear()

  pokeCompareView.render(model.state.pokeCompare)

  pokeCompareView.itemRedDotChange()
}

async function controllPagination(pag) {
  pokeListView.clear()

  pokeListView.renderSpinner()

  await model.getPokeList(pag)

  pokeListView.clear()

  pokeListView.render(model.state.pokeList)
}

async function controllSortByName() {
  model.sortCardsByName()
  pokeListView.clear()
  pokeListView.render(model.state.pokeList)
}
async function controllSort() {
  model.sortCardsByID()
  pokeListView.clear()
  pokeListView.render(model.state.pokeList)
}

function init() {
  controllList()

  navbarView.fixNavbar()
  navbarView.searchCard(controllDetails)
  navbarView.addSortCardHandler(controllSortByName, controllSort)

  pokeListView.addEventHover()

  pokeDetails.addEventHandler(controllDetails)
  pokeDetails.addDetailBtnHandler(controllDetails)
  pokeDetails.addDdetailCloseBtnHandler()

  pokeCompareView.toggleCardCompareHandler(
    controlAddCardCompare,
    controllRemoveCompare
  )
  pokeCompareView.compareViewHandler()
  pokeCompareView.compareCardCloseBtnHandler(controllRemoveCompare)
  pokeCompareView.compareCloseBtnHandler()

  paginationView.createPagination()
  paginationView.onLoadActivePageHandler()
  paginationView.pagNextBtnHandler(controllPagination)
  paginationView.pagPrevBtnHandler(controllPagination)
  paginationView.addActivePagHandler(controllPagination)
}
init()
