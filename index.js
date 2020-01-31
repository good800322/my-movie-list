(function () {
  const base_url = 'https://movie-list.alphacamp.io/'
  const img_url = base_url + 'posters/'
  const data_url = base_url + 'api/v1/movies'
  const data = []
  const genres = {
    "1": "Action",
    "2": "Adventure",
    "3": "Animation",
    "4": "Comedy",
    "5": "Crime",
    "6": "Documentary",
    "7": "Drama",
    "8": "Family",
    "9": "Fantasy",
    "10": "History",
    "11": "Horror",
    "12": "Music",
    "13": "Mystery",
    "14": "Romance",
    "15": "Science Fiction",
    "16": "TV Movie",
    "17": "Thriller",
    "18": "War",
    "19": "Western"
  }
  const pills_tab = document.querySelector('#v-pills-tab')
  const tabContent = document.querySelector('#v-pills-tabContent')

  axios.get(data_url).then(response => {
    data.push(...response.data.results)
    showList(genres)          //一開始先顯示tablist與第一個項目之電影
    displaytabContent(data, 1)
  }).catch(error => console.log(error))


  //在選單上設置監聽器
  pills_tab.addEventListener('click', event => {
    if (event.target.tagName === 'A') {
      let id = event.target.dataset.id
      displaytabContent(data, id)
    }
  })


  //產生直式選單之程式
  function showList(genres) {
    let tabContemplate = ''
    for (let key in genres) {   //利用bootstrap之pills，設定dataset之id表明每個按鈕
      tabContemplate += `
      <a class="nav-link navbar-light bg-light" id="v-pills-${genres[key]}-tab" data-toggle="pill" href="#v-pills-${genres[key]}" role="tab"
      aria-controls="v-pills-${genres[key]}" aria-selected="true" data-id="${key}">${genres[key]}</a>
      `
    }
    pills_tab.innerHTML = tabContemplate
  }

  //產生電影列表，id為點擊之項目
  function displaytabContent(data, id) {
    let contemplate = ''
    data.forEach(movie => {
      if (movie.genres.some(item => item === Number(id))) {
        contemplate += `
         <div class="card col-sm-4" style="width: 18rem;">
          <img class="card-img-top" src="${img_url + movie.image}" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
      `
        movie.genres.forEach(item => {        //產生分類標籤
          contemplate += `
      <span class="badge badge-light">${genres[item]}</span>
      `
        })
        contemplate += '</div ></div >'
      }
    })
    tabContent.innerHTML = contemplate
  }

})()