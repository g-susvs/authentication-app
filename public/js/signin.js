const d = document;
const $form = d.querySelector("form");
const url = 'http://localhost:8080';

d.addEventListener("submit",async (e)=>{
    e.preventDefault();
    
    const data = {};
    for(let el of $form.elements){
        if(el.name.length > 0){
            data[el.name] = el.value;
        }
    }
    
    fetch(url + "/api/users",{
        method: "POST",
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify(data)
    })
    .then(res => res.json())
    .then(json => {
        console.log(json)
        alert(json.msg);
        window.location = "/"        
    })
    .catch(err => console.log(err.message));
    
    
})