function validate_login(){
    var username;
    var password;
    username = document.getElementById("username").value;
    password = document.getElementById("password").value;
    if(username==null || username==undefined || username.trim().length==0){
        alert("Please enter your username");
        document.getElementById("username").focus();
        return false;
    }
    if(password==null || password==undefined || password.trim().length==0){
        alert("Please enter password");
        document.getElementById("password").focus();
        return false;
    }
    if((username=="admin" && password=="admin")|| (username=="manasvi" && password=="manasvi")){
        localStorage.setItem("logged_user",username);
        sessionStorage.setItem("is_logged_in",true);
        return true;
    }
    else{
        alert("Incorrect Username and password");
        return false;
    }
   return true;  
}
function logout(){
    sessionStorage.setItem("is_logged_in",false);
    location.href="index.html";
    return false;
}