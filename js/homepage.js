/* Start global Variable */

const loginEmailEl = document.querySelector("#login-email");
const loginPasswordEl = document.querySelector("#login-password");
const checkBox = document.querySelector("#remember-me");

window.onload =() =>{
    signupRequest();
    rememberMe();
    showUser();
}
const showUser = () =>{
    if(localStorage.getItem("userInfo")!=null){
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        loginEmailEl.value = userInfo.username;
        loginPasswordEl.value = userInfo.password;
        checkBox.checked = true;
    }
}
function signupRequest(){
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
        ajax.onreadystatechange = function(){
            if(ajax.readyState == 2){
                $(".loader").removeClass("d-none")
            }
        }
        ajax.onload = function(){
            $(".loader").addClass("d-none")
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

const rememberMe = () =>{
    const form = document.querySelector("#login-form");
    form.onsubmit = function(e){
        e.preventDefault();
        const userInfo = JSON.stringify({
            username : loginEmailEl.value,
            password : loginPasswordEl.value
        });
        if(checkBox.checked){
            localStorage.setItem("userInfo",userInfo);
            loginRequest(userInfo)
        }else{
            loginRequest(userInfo);
        }
    }
};

const loginRequest = (formData) =>{
    const ajax = new XMLHttpRequest();
    ajax.open("POST","/api/login",true);
    ajax.send(formData);
    /* Show loader */
    ajax.onreadystatechange = function(){
        if(ajax.readyState == 2){
            $(".loader").removeClass("d-none")
        }
    }
    /* response from ajax request */
    ajax.onload = () =>{
        $(".loader").addClass("d-none");
        console.log(ajax.response)
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