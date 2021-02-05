var database = openDatabase("lmsdb","1.0","This Database stores application data",3*1024*1024);
if(database!=null){
    /*
    Creating require Database table
    */
    database.transaction(function(tx){
        tx.executeSql("CREATE TABLE STUDENT (id unique,name,father_name,email,gender,dob,tel_no,course)");
    });
}
function save_student(){
    var rollno = document.getElementById("rollno").value;
    var name=document.getElementById("sname").value;
    var fname = document.getElementById("fname").value;
    var email = document.getElementById("email").value;
    var dob = document.getElementById("dob").value;
    var tel = document.getElementById("telephone").value;
    var course =document.getElementById("course").value;

    var gender = document.getElementsByName("gender");
    var selected_gender = '';
    /*
    Looping through all gender element to verify Checked gender value
    */
    for (let index = 0; index < gender.length; index++) {
        const element = gender[index];
        if(element.checked){
            selected_gender = element.value;
        }
        
    }
    if (rollno==null || rollno==undefined || rollno.trim().length==0) {
        alert("Please enter enrollment number");
        document.getElementById("rollno").focus();
        return false;
    }
    if (name==null || name==undefined || name.trim().length==0) {
        alert("Please enter Student name");
        document.getElementById("sname").focus();
        return false;
    }
    if (fname==null || fname==undefined || fname.trim().length==0) {
        alert("Please enter Father name");
        document.getElementById("fname").focus();
        return false;
    }
    if (email==null || email==undefined || email.trim().length==0) {
        alert("Please enter Student email");
        document.getElementById("email").focus();
        return false;
    }
    if (dob==null || dob==undefined || dob.trim().length==0) {
        alert("Please enter Student Date of Birth");
        document.getElementById("dob").focus();
        return false;
    }
    if (tel==null || tel==undefined || tel.trim().length==0) {
        alert("Please enter Student telephone number");
        document.getElementById("tel").focus();
        return false;
    }
    if (course==null || course==undefined || course.trim().length==0) {
        alert("Please select Student enrolled course");
        document.getElementById("course").focus();
        return false;
    }
    if (selected_gender==null || selected_gender==undefined || selected_gender.trim().length==0){
        alert("Please select Gender");
        return false;
    }
    if(database!=null){
        database.transaction(function(tx){
            tx.executeSql("INSERT INTO STUDENT (id,name,father_name,gender,email,dob,tel_no,course) VALUES(?,?,?,?,?,?,?,?)",
            [rollno,name,fname,selected_gender,email,dob,tel,course]);
            alert("Hurray!! Record saved Successfully.");
            location.href="students.html";
        });
    }
}
function get_student_records(){

    if(database!=null){
        
        database.transaction(function(tx){
            tx.executeSql("SELECT * FROM STUDENT",[],function(tx,results){

                for(i=0;i<results.rows.length;i++){
                    var record = results.rows.item(i);
                    console.log(record);

                    var table_element = document.getElementById("student_table");
    
                    var tr = document.createElement("tr");

                    /* TD for Roll No */
                    var td=document.createElement("td");
                    var textnode = document.createTextNode(record.id);
                    td.appendChild(textnode);
                    tr.appendChild(td);

                    /* TD for name */
                    var td = document.createElement("td");    
                    var textnode=document.createTextNode(record.name);
                    td.appendChild(textnode);
                    tr.appendChild(td);

                    /* TD for Father name */
                    var td = document.createElement("td");    
                    var textnode=document.createTextNode(record.father_name);
                    td.appendChild(textnode);
                    tr.appendChild(td);

                    /* TD for Telephone No*/
                    var td = document.createElement("td");
                    textnode = document.createTextNode(record.tel_no);
                    td.appendChild(textnode);
                    tr.appendChild(td);

                    /* TD for email */
                    var td = document.createElement("td");    
                    var textnode=document.createTextNode(record.email);
                    td.appendChild(textnode);
                    tr.appendChild(td);

                    /* TD for gender */
                    var td = document.createElement("td");   
                    td.className="text_center proper_case_text";
                    var textnode=document.createTextNode(record.gender);
                    td.appendChild(textnode);
                    tr.appendChild(td);

                    /* TD for course */
                    var td = document.createElement("td");
                    td.setAttribute("class","text_center proper_case_text");
                    var textnode=document.createTextNode(record.course);
                    td.appendChild(textnode);
                    tr.appendChild(td);

                    /* TD for dob */
                    var td = document.createElement("td");    
                    var textnode=document.createTextNode(record.dob);
                    td.appendChild(textnode);
                    tr.appendChild(td);

                    var td = document.createElement("td");
                    td.innerHTML="<button id='delete' onclick='delete_student("+record.id+")'>Delete</button>";
                    tr.appendChild(td);
                    

                    //Appending row into table element
                    table_element.appendChild(tr);
                }
            },null);
        });


    }
    


}

function delete_student(param) {
    var c = confirm("Are you sure you want to delete record"+param);
    if (c==true){
        if (database!=null){
            database.transaction(function (tx){
                tx.executeSql("DELETE FROM STUDENT WHERE id='"+param+"'");
                alert("Record Deleted");
                window.location.href="students.html";
            })
        }
    }
}