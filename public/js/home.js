import addDataImage from "./helpers/add_data_img.js";

const d = document;

const $container    = d.querySelector(".container");
const $main         = d.querySelector("main");
const $loader       = d.querySelector(".loader");

// datos del usuario
const $headerImg    = d.querySelector("#header-img");
const $img          = d.querySelector("#img");
const $name         = d.querySelector("#name");
const $bio          = d.querySelector("#bio");
const $email        = d.querySelector("#email");
const $password     = d.querySelector("#password");

const $editName     = d.querySelector("#edit-name");
const $editBio      = d.querySelector("#edit-bio");
const $editPassword = d.querySelector(".edit-password");

// elementos
const $editImg      = d.querySelector("#edit-img");
const $editInfo     = d.querySelector(".edit-info");
const $options      = d.querySelector(".options");
const $form         = d.querySelector("form");
const $save         = d.querySelector("#save");

const url = 'http://localhost:8080';

let infoUser;
const $loaderContainer = d.createElement("div");

d.addEventListener("DOMContentLoaded", async ()=>{
    
        
        await getUserInfo();
        $loader.classList.add("none");
        
    
});

d.addEventListener("click",(e)=>{
    if(e.target.matches(".edit")){
        $editInfo.classList.remove("none");

        $editName.value = infoUser.name;
        $editBio.value = infoUser.bio;
    }
    if(e.target.matches(".btn-back")){
        $editInfo.classList.add("none");
    }
    if(e.target.matches("#log-out *") || e.target.matches("#log-out")){
        localStorage.clear();
        console.log("hola mundo")
        window.location = "/";
    }
    if(e.target.matches("#menu-icon") || e.target.matches("#menu-icon *")){
        const $arrowSvg = d.querySelector("#menu-icon svg");
        $arrowSvg.classList.toggle("svg-rotate");
        $options.classList.toggle("none");
    }
    if(e.target.matches("#img-hover") || e.target.matches("#img-hover *") || e.target.matches("#change-photo")){
        console.log("cambiar imageg");
    }
    
})

d.addEventListener("submit", async(e)=>{
    e.preventDefault();
    
    $loader.classList.remove("loader","none");
    $loader.classList.add("edit-loader");
    
    
    $save.disabled = true;
    
    const data = {};
    for(let el of $form.elements){
        if(el.name.length > 0 && el.value.length >= 6){
            data[el.name] = el.value;
        } 
    }

    await updateUserInfo(data);
    
    $save.disabled = false;
    $loader.classList.add("none");
    $editInfo.classList.add("none");
    
    
})

async function getUserInfo(){
    try {
        const resp = await fetch(url + "/api/auth/",{
            headers:{
                "x-token":localStorage.getItem("x-token")
            }});
            const json = await resp.json();
        infoUser = json.user;
        const {name, email, img, bio} = json.user;
    
        $name.textContent  = name;
        $email.textContent = email;
        $bio.textContent   = bio;

        if(!img){
            addDataImage({element: $headerImg ,img: "assets/user.jpg", name});
            addDataImage({element: $img ,img: "assets/user.jpg", name});
            addDataImage({element: $editImg ,img: "assets/user.jpg", name});
        }else{
            addDataImage({element: $headerImg ,img, name});
            addDataImage({element: $img ,img, name});
            addDataImage({element: $editImg ,img, name});
        }
        if(!bio){
            $bio.textContent = "Estoy usando Authapp";
        }

        localStorage.setItem("x-token",json.token);
        
    } catch (error) {
        console.log(err)
    }

}

async function updateUserInfo (body){
    try {
        const resp = await fetch(url + `/api/users/${infoUser._id}`,{
            method: "PUT",
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify(body)
        });
        const json = await resp.json();
        console.log(json);
        getUserInfo();

    } catch (error) {
        console.log(error);
    }
}




