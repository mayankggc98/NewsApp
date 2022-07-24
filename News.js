const countries = [
    {Lang : 'India',code : 'in'},
    {Lang : 'Sweden',code : 'se'},
    {Lang : 'United State',code : 'us'},
    {Lang : 'New Zeland',code : 'nz'},
    {Lang : 'South Corea',code : 'kr'},
    {Lang : 'UAE',code : 'ae'},
    {Lang : 'Japan',code : 'jp'},
    {Lang : 'Russia',code : 'ru'}];

const categories = [
    {category:'Business', code:'business'},
    {category:'Entertainment', code:'entertainment'},
    {category:'General', code:'general'},
    {category:'Health', code:'health'},
    {category:'Science', code:'science'},
    {category:'Sports', code:'sports'},
    {category:'Technology', code:'technology'}];



let country = 'in';
let category = 'general';
document.getElementById('countryDropDown').innerText = 'India';
document.getElementById('categoryDropDown').innerText = 'General'; 

let homeHTML = `<div style="height: 30vh; width: 50vw; padding-top: 30px; margin-top: 20vh; margin-left:25vw" class="shadow-lg  rounded bg-dark bg-gradient text-light">
                    <h1 class="text-center">
                        Welcome to News World!!
                    </h1>
                    <p>News World provides you top headlines of Wordwide News in different categories based on your Interest.</p>
                    <button class="btn btn-primary" id='startBrowsing' onclick='startBrowsing()'>Let's Gets Started!!</button>
                </div>`;

let countryList = document.getElementsByClassName('countryList')[0];
let categoryList = document.getElementsByClassName('categoryList')[0];


countries.sort((l1,l2)=>{
    if ( l1.Lang < l2.Lang ){
        return -1;
      }
      if ( l1.Lang > l2.Lang ){
          return 1;
        }
      return 0;
}).forEach((language)=>{
    let child = document.createElement('li');
    let anchor = document.createElement('a');
    anchor.setAttribute('class', "dropdown-item text-light language-item");
    anchor.setAttribute('id',`${language.code}`);
    anchor.innerText = `${language.Lang}`;
    child.appendChild(anchor);
    countryList.appendChild(child);
});

categories.sort((c1,c2)=>{
    if ( c1.category < c2.category ){
        return -1;
    }
    if ( c1.category > c2.category ){
        return 1;
    }
      return 0;
    }).forEach((category)=>{
    let child = document.createElement('li');
    let anchor = document.createElement('a');
    anchor.setAttribute('class', "dropdown-item text-light category-item");
    anchor.setAttribute('id',`${category.code}`);
    anchor.innerText = `${category.category}`;
    child.appendChild(anchor);
    categoryList.appendChild(child);
});


function startBrowsing(){
    country = 'in';
    category = 'general';
    document.getElementById('countryDropDown').innerText = `India`; 
    document.getElementById('categoryDropDown').innerText = `General`; 
    fetchNews();
}

function homePage(){
    let home = document.getElementById('news');
    home.innerHTML = homeHTML;
    home.setAttribute('style','height:85vh; width: 100vw; position: relative;')
    document.getElementById('countryDropDown').innerText = `Country`; 
    document.getElementById('categoryDropDown').innerText = `Category`; 
    // location.href = 'http://127.0.0.1:5500/NewsApp/News.html/Home'
}

document.onload = homePage()
document.getElementById('home').addEventListener('click',()=>homePage());
document.getElementById('newsWorld').addEventListener('click',()=>homePage());


let langElements = document.getElementsByClassName('language-item');
Array.prototype.forEach.call(langElements,(ele)=>{
    ele.addEventListener('click',(event)=>{
        if(document.getElementById('categoryDropDown').innerText.match('Category')){
            document.getElementById('categoryDropDown').innerText = 'General';
        }
        country = event.target.id;
        document.getElementById('countryDropDown').innerText = `${event.target.innerText}`; 
        fetchNews();
    })
})

let categElements = document.getElementsByClassName('category-item');
Array.prototype.forEach.call(categElements,(ele)=>{
    ele.addEventListener('click',(event)=>{
        if(document.getElementById('countryDropDown').innerText.match('Country')){
            document.getElementById('countryDropDown').innerText = 'India';
        }
        category = event.target.id;
        document.getElementById('categoryDropDown').innerText = `${event.target.innerText}`; 
        fetchNews();
    })
})

setInterval(()=>{
    document.getElementById('time').innerText =`${new Date().toDateString()} ${new Date().toLocaleTimeString()}`;
},1000);


function fetchNews(){
    fetch(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=173ec9b0cad74f928ce118fdbb05d46f`
    ).then((response)=>{
        return response.json();
    }).then((res)=>{
        let card = document.getElementById('news');
        card.setAttribute('style','overflow-y:scroll; height:85vh; width: 100%; position: relative;')
        card.innerHTML = ''
        res.articles.forEach((article)=>{
            let cardHt = document.createElement('div');
            cardHt.setAttribute('class','card shadow-lg rounded');
            cardHt.setAttribute('style',"width: 30%; margin:1.5%; ");
            cardHt.innerHTML = ` 
                                <img src=${article.urlToImage} class="card-img-top" alt="..." >
                                <div class="card-body">
                                    <h5 class="card-title">${article.title}</h5>
                                    <p class="card-text">${article.content}</p>
                                    <a href=${article.url} target="_blank" class="btn btn-primary">Read More</a>
                                </div>`;
            if(null != article.title && null != article.content){
                card.appendChild(cardHt);
            }
        })
    }) 
}