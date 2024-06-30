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
            const data = JSON.parse(this.response);
            if(data.message.toLowerCase() == "match found"){
                showMessage("User Already Exists","fa fa-exclamation-circle mx-2","red")
            }else{
                showMessage("SignUp Success","fa fa-check-circle mx-2","green");
                form.reset();
            }
        }
    }
}

const showMessage = (msg,icon,color) =>{
    $(".toast").toast("show");
    $(".toast-header i").addClass(icon);
    $(".toast-header").css({
        color : color
    });
    $(".toast").addClass("animate__animated animate__slideInRIght");
    $(".toast-body p").html(msg)
}