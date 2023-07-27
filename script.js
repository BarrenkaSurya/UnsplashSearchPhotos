let maxImages = 12;
let currentPage = 1;
let apiKey = "9HQ9pYvsQGQ_b2Ou8xY31m7ZVd-GjOMo23-5da_mngQ" ;





const searchbtn = document.getElementById("searchBtn");

searchbtn.onclick = makeSearch ;


async function searchUnsplash(searchQuery){
    const endPoint = `https://api.unSplash.com/search/photos?query=${searchQuery}&per_page=${maxImages}&page=${currentPage}&client_id=${apiKey}`;
    const resp = await fetch(endPoint);
    console.log(resp);

    if(!resp.ok){
        console.log("an error occured",resp);
        return ;
    }

    const json = await resp.json();
    return json ;
}

async function makeSearch(){
    const searchQuery = document.getElementById('searchInput').value;

    const responce = await searchUnsplash(searchQuery)

    let htmlContent = "";
    responce.results.forEach((eResp) =>{
        const url = eResp.urls.small ;
        const unSpalshLink = eResp.links.html ;
        const photographer = eResp.user.name ;
        const photographerPage = eResp.user.links.html ;

        htmlContent +=`
            <div>
                <a  href="${unSpalshLink}" target="_blank">
                    <div class="result-item" style="background-image : url(${url})"></div>           
                </a>
                <p class="photographer-name">
                    <a href="${photographerPage}" target="_blank" />Photo by ${photographer}</a>
                </p> 
            </div>     
        `
    });

    const imageContainer = document.getElementById("imagecontainer") ;
    imageContainer.innerHTML = htmlContent ;
}
