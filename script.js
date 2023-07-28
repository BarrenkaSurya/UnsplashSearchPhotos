let maxImages = 12;
let currentPage = 1;
let lastPage = 0; 
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
            <div class="card">
                <a  href="${unSpalshLink}" target="_blank">
                    <div class="result-item" style="background-image : url(${url})"></div>           
                </a>
                <p class="photographer-name">
                    <a href="${photographerPage}" target="_blank" />Photo by ${photographer}</a>
                </p> 
            </div>     
        `
    });

    lastPage = responce.total_pages ;

    const imageContainer = document.getElementById("imagecontainer") ;
    imageContainer.innerHTML = htmlContent ;


    const infopara = document.getElementById("infopara");
    infopara.innerText =  `About ${responce.total} results found` ;

    const countinfoPara = document.getElementById("countinfoPara");

    let startPoint = ((currentPage - 1) *maxImages) + 1 ;
    let endPoint = maxImages * currentPage ; 
    countinfoPara.innerText = `${startPoint} - ${endPoint} of page ${currentPage}`
    updateBtnState() ;
}

const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

nextBtn.onclick = nextPage ;
prevBtn.onclick = prevPage ;

function updateBtnState(){
    nextBtn.classList.remove("hidden")
    if(currentPage >= lastPage){
        nextBtn.classList.add("hidden")
    }
    prevBtn.classList.remove("hidden")
    if(currentPage == 1){
        prevBtn.classList.add("hidden")
    }
}

function nextPage(){
    if(lastPage < currentPage){
        return ;
    }
    currentPage++;
    makeSearch(); 
}

function prevPage(){
    if(currentPage == 1){
        return ;
    }
    currentPage--;
    makeSearch(); 
}
