const e="https://pokeapi.co/api/v2/pokemon/";let t={results:[],pokeList:[],pokeByID:{},pokeCompare:[]};async function a(e="0",a){try{let s=await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${e}&limit=100`),{results:r}=await s.json();t.results=[],t.pokeList=[],r.forEach(e=>{t.results.push(e)}),await i(a)}catch(e){console.log(e)}}async function i(a=!1){try{for(let a of t.results){let i=await fetch(`${e}${a.name}/`),s=await i.json();t.pokeList.push(s)}}catch(e){console.log(e)}}async function s(a){try{let i=await fetch(`${e}${a}/`),s=await i.json();t.pokeByID=s}catch(e){throw e}}async function r(a){try{let i=await fetch(`${e}${a}/`),s=await i.json();t.pokeCompare.length>=4?alert("you can compare up to 4 cards"):t.pokeCompare.push(s)}catch(e){console.log(e)}}console.log(t.pokeCompare);class n{_data=[];_overlay=document.querySelector(".overlay");_cards=document.querySelector(".poke-cards");render(e){this._data=e;let t=this.generateMarkup();this._parentElement.insertAdjacentHTML("beforeend",t)}renderSpinner(){let e=`
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
    `;this._parentElement.insertAdjacentHTML("beforeend",e)}showDetails(){this._parentElement.classList.remove("hidden"),this._overlay.classList.remove("hidden")}_removeDetails(){this._parentElement.classList.add("hidden"),this._overlay.classList.add("hidden")}_showMessage(e=""){this.clear();let t=`
    <p>${e||this._message}</p>
    `;this._parentElement.insertAdjacentHTML("beforeend",t)}clear(){this._parentElement.innerHTML=""}generateMarkup(){return this._data.map(e=>this.generateAllMarkups(e)).join("")}}class d extends n{_parentElement=document.querySelector(".poke-cards");_colors={fire:"#FDDFDF",grass:"#DEFDE0",electric:"#FCF7DE",water:"#DEF3FD",ground:"#f4e7da",rock:"#d5d5d4",fairy:"#fceaff",poison:"#98d7a5",bug:"#f8d5a3",dragon:"#97b3e6",psychic:"#eaeda1",flying:"#F5F5F5",fighting:"#E6E0D4",normal:"#F5F5F5"};addEventHover(){this._cards.addEventListener("mouseover",function(e){e.target.closest(".card")&&(e.target.closest(".card").classList.add("hover"),e.target.addEventListener("mouseout",function(){e.target.closest(".card").classList.remove("hover")}))})}generateAllMarkups(e){return`<div class="card" style="background-color: ${[this._colors[e.types[0]?.type.name]]}">
        <div class="poke-img">
        <img
            src="https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${e.id}.svg"
            alt=""
        />
        <button class="compare-btn" data-id="${e.id}">
        <i class="fa-solid fa-code-compare"></i></button>
        </div>
        <div class="poke-info">
        <div class="poke-id" data-id="${e.id}">#${e.id}</div>
        <h3 class="poke-name">${e.name}</h3>
        <h6 class="poke-type">type : ${e.types[0]?.type.name}</h6>
        </div>
    </div>
        `}}var l=new d;class c extends n{_parentElement=document.querySelector(".pokemons-main");_id;_resultLength;addEventHandler(e){this._cards.addEventListener("click",t=>{if(!t.target.closest(".card")||t.target.closest(".compare-btn"))return;let{id:a}=t.target.closest(".card").querySelector(".poke-id").dataset;this._id=a,e(a)})}addDetailBtnHandler(e){this._parentElement.addEventListener("click",t=>{t.target.closest(".main-controll-btn")&&(t.target.closest(".main-prev-card")&&1!==this._id?t.target.addEventListener("click",e(Number(--this._id))):t.target.closest(".main-next-card")&&this._id!==this._resultLength&&t.target.addEventListener("click",e(Number(++this._id))))})}addDdetailCloseBtnHandler(){document.addEventListener("click",e=>{(e.target.classList.contains("overlay")||e.target.closest(".main-close-btn"))&&this._removeDetails()})}_dataLength(e){this._resultLength=e.length}generateMarkup(){return`
      <div class="main-img">
          <img
              src="https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${this._data.id}.svg"
              alt=""
          />
        <h1 class="main-name">${this._data.name}</h1>
      </div>
      <div class="main-info">
          <div class="main-details main-abilities">
              <h4>ABILITIES</h4>
              <div class="main-detail">
              ${this._data.abilities.slice(0,3).map(e=>`<p>${e.ability.name}</p>`).join("")}
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
              ${this._data.moves.slice(0,4).map(e=>`<p>${e.move.name}</p>`).join("")}
              </div>
          </div>

          <div class="main-details main-items">
              <h4>ITEMS</h4>
              <div class="main-detail">
              <p>${0===this._data.held_items.length?"No Items":this._data.held_items[0].item.name}</p>
              </div>
          </div>
        </div>
        <button class="main-controll-btn main-close-btn"><i class="fa-solid fa-xmark"></i></button>

        <button class="main-controll-btn main-next-card"><i class="fa-solid fa-chevron-right"></i></button>

        <button class="main-controll-btn main-prev-card"><i class="fa-solid fa-chevron-left"></i></button>
    `}}var o=new c;class m extends n{_parentElement=document.querySelector(".compare-container");_compareBtn=document.querySelector(".compare-item");_redDot=document.querySelector(".red-dot");_message="NO CARDS SELECTED TO COMPARE SELECT AT LEAST ONE CARD \uD83D\uDE09";toggleCardCompareHandler(e,t){this._cards.addEventListener("click",a=>{if(!a.target.closest(".compare-btn"))return;let i=this._getTargetID(a);a.target.closest(".compare-btn").classList.contains("active")?(t(i),this._removeActiveCompare(i)):(e(i),this._data.length<4?this._addActiveCompare(i):this._removeActiveCompare(i))})}compareViewHandler(){document.addEventListener("click",e=>{e.target.closest(".compare-item")&&(this._data.length<=0&&this._showMessage(),this.showDetails())})}compareCloseBtnHandler(){this._parentElement.addEventListener("click",e=>{(e.target.classList.contains("compare-container")||e.target.closest(".compare-close-btn"))&&this._removeDetails()})}compareCardCloseBtnHandler(e){this._parentElement.addEventListener("click",t=>{if(!t.target.closest(".inner-compare-close-btn"))return;let{id:a}=t.target.closest(".compare-card").querySelector(".main-id").dataset;this._data.length<=1&&this._removeDetails(),this._removeActiveCompare(a),e(a)})}_removeActiveCompare(e){[...this._cards.querySelectorAll(".compare-btn")].find(t=>+t.dataset.id==+e).classList.remove("active")}_addActiveCompare(e){[...this._cards.querySelectorAll(".compare-btn")].find(t=>+t.dataset.id==+e).classList.add("active")}itemRedDotChange(){this._data.length>=1?this._redDot.classList.remove("hidden"):this._data.length<1&&this._redDot.classList.add("hidden")}_getTargetID(e){return e.target.closest(".card").querySelector(".poke-id").dataset.id}generateAllMarkups(e){return`
        <div class="compare-card">
          <div class="main-img">
          <img
          src="https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${e.id}.svg"
          alt=""
      />
            <h1 class="main-name">${e.name}</h1>
          </div>
          <div class="main-info">
            <div class="main-details main-abilities">
              <h4>ABILITIES</h4>
              <div class="main-detail">
              ${e.abilities.slice(0,3).map(e=>`<p>${e.ability.name}</p>`).join("")}
              </div>
            </div>

            <div class="main-details main-height">
              <h4>height</h4>
              <p>${e.height}</p>
            </div>

            <div class="main-details main-weight">
              <h4>weight</h4>
              <p>${e.weight}</p>
            </div>

            <div class="main-details main-id" data-id="${e.id}">
              <h4>ID</h4>
              <p>${e.id}</p>
            </div>

            <div class="main-details main-moves">
              <h4>MOVES</h4>
              <div class="main-detail">
              ${e.moves.slice(0,4).map(e=>`<p>${e.move.name}</p>`).join("")}
              </div>
            </div>

            <div class="main-details main-items">
              <h4>ITEMS</h4>
              <div class="main-detail">
                <p>${0===e.held_items.length?"No Items":e.held_items[0].item.name}</p>
              </div>
            </div>
          </div>
          <button class="inner-compare-close-btn">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      `}}var h=new m;class p extends n{_parentElement=document.querySelector(".pagination");_paginationUl=document.querySelector(".pag-ul");_nextBtn=document.querySelector(".pag-next");_prevBtn=document.querySelector(".pag-prev");_curPage=1;onLoadActivePageHandler(){let e=this._parentElement.querySelector("li");e.classList.add("active")}addActivePagHandler(e){this._parentElement.addEventListener("click",t=>{if(!t.target.closest(".pag")||+t.target.textContent==+this._curPage)return;this._parentElement.querySelectorAll(".pag").forEach(e=>e.classList.remove("active")),t.target.classList.add("active");let a=t.target.textContent-1;this._curPage=a+1,a<=9&&this._cardListNumber(a),e(100*a)})}pagNextBtnHandler(e){this._nextBtn.addEventListener("click",()=>{if(this._curPage>=10)return;++this._curPage;let t=this._curPage-1;this._cardListNumber(t),this._updateActiveSlide(),e(100*t)})}pagPrevBtnHandler(e){this._prevBtn.addEventListener("click",()=>{if(this._curPage<=1)return;--this._curPage;let t=this._curPage-1;this._cardListNumber(t),this._updateActiveSlide(),e(100*t)})}createPagination(){for(let e=1;e<=10;e++){let t=`
      <li class="pag">${e}</li>
      `;this._paginationUl.insertAdjacentHTML("beforeend",t)}this._createUl()}_createUl(){let e=document.querySelectorAll(".pag");e.forEach((e,t)=>{e.style.transform=`translateX(${120*t}%)`})}_cardListNumber(e){[...document.querySelectorAll(".pag")].forEach((t,a)=>{t.style.transform=`translateX(${120*a-120*+e}%)`})}_updateActiveSlide(){this._parentElement.querySelectorAll(".pag").forEach(e=>e.classList.remove("active")),document.querySelector(`.pag-ul li:nth-child(${this._curPage})`).classList.add("active")}}var v=new p;class u extends n{_parentElement=document.querySelector(".navbar");_searchInput=document.querySelector(".search-input");_compareItem=document.querySelector(".compare-item");_sortItem=document.querySelector(".sort-item");addSortCardHandler(e,t){this._sortItem.addEventListener("click",a=>{a.target.closest(".sort-item").classList.toggle("id"),a.target.classList.contains("id")?e():t()})}searchCard(e){this._parentElement.addEventListener("click",t=>{if(!t.target.closest(".search-btn"))return;t.preventDefault(),document.querySelector(".search-input").focus(),this._searchInput.classList.remove("hide"),this._hideSearch();let a=this._searchInput.value;""!==a&&(e(a),setTimeout(()=>{this._searchInput.value="",this._searchInput.classList.add("hide")},2e3))})}_hideSearch(){this._searchInput.addEventListener("blur",()=>{this._searchInput.classList.add("hide")})}fixNavbar(){document.addEventListener("scroll",()=>{scrollY>90?(this._parentElement.style=`
        height: 70px;
        background-color: #333;
        color :#fff;
        `,this._parentElement.querySelectorAll("li").forEach(e=>{e.style=`
          background-color: #fff;
          color :#333;`}),this._parentElement.querySelectorAll("li i").forEach(e=>{e.style=`
          color :#333;`})):(this._parentElement.style=`
        height: 90px;
        background-color: rgba(255, 255, 255, 0.5);
        `,this._parentElement.querySelectorAll("li").forEach(e=>{e.style=`
          background-color: #333;
          color :#fff;`}),this._parentElement.querySelectorAll("li i").forEach(e=>{e.style=`
          color :#fff;`}))})}}var g=new u;async function _(e){try{await s(e),o._dataLength(t.results),o.clear(),o.render(t.pokeByID),o.showDetails()}catch(e){o._showMessage(e.message.split(",")[1]),o.showDetails()}}async function f(e){await r(e),h.clear(),h.render(t.pokeCompare),h.itemRedDotChange()}function E(e){t.pokeCompare.splice(t.pokeCompare.findIndex(t=>t.id===+e),1),h.clear(),h.render(t.pokeCompare),h.itemRedDotChange()}async function y(e){l.clear(),l.renderSpinner(),await a(e),l.clear(),l.render(t.pokeList)}async function k(){t.pokeList.sort((e,t)=>e.name<t.name?-1:e.name>t.name?1:0),l.clear(),l.render(t.pokeList)}async function L(){t.pokeList.sort((e,t)=>e.id<t.id?-1:e.id>t.id?1:0),l.clear(),l.render(t.pokeList)}(async function(){l.renderSpinner(),await a(),l.clear(),l.render(t.pokeList)})(),g.fixNavbar(),g.searchCard(_),g.addSortCardHandler(k,L),l.addEventHover(),o.addEventHandler(_),o.addDetailBtnHandler(_),o.addDdetailCloseBtnHandler(),h.toggleCardCompareHandler(f,E),h.compareViewHandler(),h.compareCardCloseBtnHandler(E),h.compareCloseBtnHandler(),v.createPagination(),v.onLoadActivePageHandler(),v.pagNextBtnHandler(y),v.pagPrevBtnHandler(y),v.addActivePagHandler(y);
//# sourceMappingURL=index.d3459140.js.map
