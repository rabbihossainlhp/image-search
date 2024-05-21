const myapiKey = "35864470-7b36fcd2c48f837e469a07790";
const MainContent = document.querySelector(".Main");
const goButton = document.querySelector(".search-btn");
const searchInput = document.querySelector("#src-box");
const childSuggestion = document.querySelector(".child-suggestion");
const parentSuggestion = document.querySelector(".parent-suggestion");
const ELementPhoto = document.querySelector(".element-photo");
const ELementDescription = document.querySelector(".child-suggestion p");


const  callData = async()=>{
    try{
        const url =`https://pixabay.com/api/?key=${myapiKey}&q=beauty+nature+wild&image_type=photo&pretty=true&per_page=24`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data.hits);
        return data.hits;
    }catch(error){
        console.log("here some error for fetchin data from server(API)", error);
        
    }

}



const displayContent = (hits)=>{
    parentSuggestion.innerHTML = "";
    hits.forEach((hit) =>{
        const creareDiv = document.createElement("div");
        creareDiv.classList.add("child-suggestion");

        const creareImage = document.createElement("img");
        creareImage.src = hit.webformatURL;

        const creareDescript = document.createElement("p");
        creareDescript.textContent = hit.tags;

        creareDiv.appendChild(creareImage);        
        creareDiv.appendChild(creareDescript);
        parentSuggestion.appendChild(creareDiv);
        creareDiv.addEventListener(`click`,()=>{
            window.open(hit.pageURL, `_blank`);
        })

    });
}

goButton.addEventListener(`click`, async()=>{
    const yourQuery = searchInput.value.trim();
    if(yourQuery!==""){
        try{
            const hits = await fetchSpecific(yourQuery);
            displayContent(hits);
        }catch(error){
            console.log(`this is the fetching error where convert data in json formate`)
        }
    }
})

const fetchSpecific = async (yourQuery)=>{
    try{
        const newSpecificURL = `https://pixabay.com/api/?key=${myapiKey}&q=${yourQuery}&image_type=photo&pretty=true&per_page=24`;

        const response = await fetch(newSpecificURL);
        const data = await response.json();
        return data.hits;
    }catch(error){
        console.log(`here showing some error from fetching spacific data`);
    }
}




async function fetchDisplayAND (){
    const hits = await callData();
    displayContent(hits);
};

fetchDisplayAND();