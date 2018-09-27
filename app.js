const apikey ='2734bc6bf3c348849c081b7147801ad1';
const mainElement = document.querySelector('[data-js=main-content]');
const sourceSelector = document.querySelector('[data-js=source-selector]')
let defaultSource = 'techcrunch';
const mainUrl = `https://newsapi.org/v1/articles?source=${defaultSource}&apiKey=`;


window.addEventListener('load',async e => {
    getNews();
  await  updateSources();
  sourceSelector.value = defaultSource;

  sourceSelector.addEventListener('change', e => {
    getNews(e.target.value)
  });

  if ('serviceWorker' in navigator) {
    try{
      navigator.serviceWorker.register('sw.js');
      console.log('Service worker Register ');
    }catch(error){
      console.error(error);
    }
  }
});
async function updateSources() {
  const resp = await fetch(`https://newsapi.org/v1/sources?apiKey=${apikey}`);
  const json = await  resp.json();

  sourceSelector.innerHTML = json.sources
    .map( src => `<option value='${src.id}'>${src.name}</option>` ).join('\n');

}
async function getNews(source=defaultSource){
  const newsDataJson = await fetch(`https://newsapi.org/v1/articles?source=${source}&apiKey=${apikey}`);
  const newsData = await newsDataJson.json();
  mainElement.innerHTML = newsData.articles.map(dispplayNews).join('\n');
}


function dispplayNews({author,description,title,url,urlToImage}){
  return `
  <div class='article'>
    <a href='${url}'>
      <h2 class='title'>${title}</h2>
    </a>
    <img src='${urlToImage}' width='400px' height='400px'>
    <small>${author}</small>
    <p>${description}</p>
  </div>
  `;
}
