/*
1. harus akses kode API
2. public key: 06c11cdc9a858b6dd80c45637cd18c02 
3. private key: afd3d8de8bdd7a3a9c0f1f0ba1bc38474f369316
4. md5(ts+privateKey+publicKey) : 1afd3d8de8bdd7a3a9c0f1f0ba1bc38474f36931606c11cdc9a858b6dd80c45637cd18c02
5. Aplikasi server harus melewati dua parameter selain parameter apikey yaitu ts = 1 dan hash = fa041e84b43ab00b39324f121ec9e888 (encoding passwords dari md5(ts+privateKey+publicKey) di md5 generator)
6. API : http://gateway.marvel.com/v1/public/characters?ts=1&apikey=06c11cdc9a858b6dd80c45637cd18c02&hash=fa041e84b43ab00b39324f121ec9e888 
(bisa ganti data yg mau diambil dengan mengubah linkAPI bagian characters https://developer.marvel.com/documentation/generalinfo bisa liat di resouces)
7. url IMG : http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784/portrait_fantastic.jpg
*/

const urlAPI = "http://gateway.marvel.com/v1/public";

const fetchAPI = async () => {
    try {
        let api = await fetch(`${urlAPI}/characters?ts=1&apikey=06c11cdc9a858b6dd80c45637cd18c02&hash=fa041e84b43ab00b39324f121ec9e888`);
        api = await api.json();
        return api;
    } catch (error) {
        console.log(error);
    }
}

const searchCharacters = async (query) => {
    try {
        let api = await fetch(`${urlAPI}/characters?ts=1&apikey=06c11cdc9a858b6dd80c45637cd18c02&hash=fa041e84b43ab00b39324f121ec9e888&nameStartsWith=${query}`);
        api = await api.json();
        return api;
    } catch (error) {
        console.log(error);
    }
}

const renderDataCard = data => {
    console.log(data.data.results);
    let htmlRender = document.querySelector('.render');
    data.data.results.forEach((result) => {
        const html = `
            <div class="col-lg-3 col-sm-6 mt-5 mb-5"> 
                <div class="card">
                    <img src="${result.thumbnail.path + "/portrait_uncanny." + result.thumbnail.extension}" class="card-img-top" alt="..."/>
                    <div class="card-body">
                        <h5 class="card-title">${result.name}</h5>
                        <p class="card-text">${result.description}</p>
                        <a href="${result.urls[0].url}" target="_blank" class="btn">Detail</a>
                    </div>
                </div>
            </div>
        `;
        htmlRender.innerHTML += html; 
    });
    console.log(htmlRender);
};

document.querySelector('.search-btn').addEventListener('click', async () => {
    const value = document.getElementById('form-input').value;
    const characters = await searchCharacters(value);
    console.log(characters);
    document.querySelector('.render').innerHTML = '';
    renderDataCard(characters);
});

window.addEventListener('load', async () => {
    const data = await fetchAPI();
    renderDataCard(data); 
});
