const d = document;
const $form = d.querySelector("form");
const url = 'http://localhost:8080/api/auth/login'

if(localStorage.getItem("x-token")){
    window.location = "home.html"        

}

d.addEventListener("submit",async (e)=>{
    e.preventDefault();
    
    const data = {};
    for(let el of $form.elements){
        if(el.name.length > 0){
            data[el.name] = el.value;
        }
    }
    
    fetch(url,{
        method: "POST",
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify(data)
    })
    .then(res => res.json())
    .then(json => {
        const {msg, token} = json;
        if(token){
            localStorage.setItem("x-token",json.token);
            window.location = "home.html"        
        }
    })
    .catch(err => console.log(err.message));
    
    
})

//     var auth2 = gapi.auth2.getAuthInstance();
//     auth2.signOut().then(function () {
//         console.log('User signed out.');
//     });
// }
