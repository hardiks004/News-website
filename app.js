const api_key = "a39c03361e924db391ce942e0779fd04";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load',() =>{
    fetchNews("Stock Market")
})

async function fetchNews(query){
    const response = await fetch(`${url}${query}&apiKey=${api_key}`); //fecth is an asyncronous operation
    // when we request an API it does not give us the rsponse immediately
    // instead of response it returns us the PROMISE
    // so we have to await this promise 
    const data =  await response.json();
    bindData(data.articles);
}

function bindData(articles){
    const cardsContainer = document.getElementById("cards-container");
    const newsTemplate = document.getElementById("template-news-cards");
    cardsContainer.innerHTML =  '';

    articles.forEach(article => {
        if (!article.urlToImage) return;
        const cardsClone = newsTemplate.content.cloneNode(true);
        fillDataInCard(cardsClone,article)
        cardsContainer.appendChild(cardsClone);
    });
}

function fillDataInCard(cardsClone,article){
    const newsImg = cardsClone.querySelector('#news-img');
    const newsTitle = cardsClone.querySelector('#news-title');
    const newsSource = cardsClone.querySelector('#news-source');
    const newsDesc = cardsClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;
    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone: "Asia/Jakarta"
    });
    newsSource.innerHTML = `${article.source.name} ${date}`;

    cardsClone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"_blank");
    })
}

let curr = null;

function onNavItemClick(query){
    fetchNews(query);
    const navItem = document.getElementById(query);
    curr?.classList.remove('active');
    curr = navItem;
    curr.classList.add('active');
}

const searchButton = document.getElementById('news-button');
const searchText = document.getElementById('news-input');

searchButton.addEventListener('click',()=>{
    const query = searchText.value;
    if (!query) return ;
    curr?.classList.remove('active');
    fetchNews(query);
})

function reload(){
    window.location.reload();
}