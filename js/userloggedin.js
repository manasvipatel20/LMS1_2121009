/*
This javascript validate whether user is logged in or not.
If user is not logged in then it will open the login page else continue
with current page to load. 
*/
var is_logged_in = sessionStorage.getItem("is_logged_in");
if(is_logged_in==null || is_logged_in==false){
    location.href="index.html";
}