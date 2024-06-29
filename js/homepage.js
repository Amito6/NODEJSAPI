window.onload =() =>{
    ajaxRequest();
}
function ajaxRequest(){
    let form = document.querySelector("#signup-form")
    form.onsubmit = function(e){
        e.preventDefault();
        const formData = JSON.stringify({
            name : document.querySelector("#name").value,
            email : document.querySelector("#signup-email").value,
            mobile : document.querySelector("#number").value,
            password : document.querySelector("#signup-password").value,
        });

        const ajax = new XMLHttpRequest();
        ajax.open("POST","/api/signup",true);
        ajax.send(formData);
        ajax.onload = function(){
            console.log(this.response);
        }
    }
}