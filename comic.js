const urlAPI = 'http://gateway.marvel.com/v1/public/';
const newUrlAPI = urlAPI.detail.replace(/^http:\/\//i, 'https://');

const fetchAPI2 = async () => {
    try {
        let api = await fetch(urlAPI + 'comics?ts=1&apikey=06c11cdc9a858b6dd80c45637cd18c02&hash=fa041e84b43ab00b39324f121ec9e888');
        api = await api.json();
        return api;
    } catch (error) {
        console.log(error);
    }
};

const searchComics = async (query) => {
    try {
        let api = await fetch(`${urlAPI}comics?ts=1&apikey=06c11cdc9a858b6dd80c45637cd18c02&hash=fa041e84b43ab00b39324f121ec9e888&titleStartsWith=${query}`);
        api = await api.json();
        return api;
    } catch (error) {
        console.log(error);
    }
}

const renderDataCard2 = data2 => {
    console.log(data2.data.results);
    const htmlRender2 = document.querySelector('.render2');
    data2.data.results.forEach((result2) => {
        const html2 = `
            <div class="col-lg-3 col-sm-6 mt-5 mb-5"> 
                <div class="card">
                    <img src="${result2.thumbnail.path + "/portrait_uncanny." + result2.thumbnail.extension}" class="card-img-top" alt="..."/>
                    <div class="card-body">
                        <h5 class="card-title">${result2.title}</h5>
                        <p class="card-text">${result2.description}</p>
                        <a href="${result2.urls[0].url}" target="_blank" class="btn">Detail of Comic</a>
                    </div>
                </div>
            </div>
        `;
        htmlRender2.innerHTML += html2; 
    });
    console.log(htmlRender2);
};

document.querySelector('.search-btn').addEventListener('click', async () => {
    const value = document.getElementById('form-input').value;
    const comics = await searchComics(value);
    console.log(comics);
    document.querySelector('.render2').innerHTML = '';
    renderDataCard2(comics);
});

window.addEventListener('load', async () => {
    const data2 = await fetchAPI2();
    renderDataCard2(data2);  
});