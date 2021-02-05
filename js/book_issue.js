var database = openDatabase("lmsdb","1.0","This Database stores application data",3*1024*1024);
if(database!=null){
    /*
    Creating require Database table
    */
    database.transaction(function(tx){
        tx.executeSql("CREATE TABLE ISSUE (id,name,book,issue_date,textarea)");
    });
}
function save_issue(){
    var name = document.getElementById("name").value;
    var book=document.getElementById("book").value;
    var textarea = document.getElementById("textarea").value;
    var issue_date = document.getElementById("issue_date").value;
    if (name==null || name==undefined || name.trim().length==0) {
        alert("Please select Student name");
        document.getElementById("name").focus();
        return false;
    }
    if (book==null || book==undefined || book.trim().length==0) {
        alert("Please select book name ");
        document.getElementById("book").focus();
        return false;
    }
    if(database!=null){
        database.transaction(function(tx){
            var id = new Date();
            id = id.getTime();
            tx.executeSql("INSERT INTO ISSUE (id,name,book,issue_date,textarea) VALUES(?,?,?,?,?)",
            [id,name,book,issue_date,textarea]);
            alert("Hurray!! Record saved Successfully.");
            location.href="book_issue1.html";
        });
    }
}
function fetch_student_books(){


    if(database != null){
        elmstudent = document.getElementById("name");
        elmbook = document.getElementById("book");
        database.transaction(
            function(tx){

                tx.executeSql("SELECT * FROM STUDENT",[], function(tx,results){
                    for(i=0;i<results.rows.length;i++){
                        var record = results.rows.item(i);
                        
                        var elm = document.createElement("OPTION");
                        elm.value = record.id;
                        elm.innerText= record.name;
                        elmstudent.appendChild(elm);
                    }
                });

                tx.executeSql("SELECT * FROM BOOK",[], function(tx,results){
                    for(i=0;i<results.rows.length;i++){
                        var record = results.rows.item(i);
                        
                        var elm = document.createElement("OPTION");
                        elm.value = record.id;
                        elm.innerText= record.book_title;
                        elmbook.appendChild(elm);

                    }
                });
            }
        );
    }

}
function get_issue_records(){

    if(database!=null){
        
        database.transaction(function(tx){
            tx.executeSql("SELECT * FROM ISSUE i, STUDENT S, BOOK B WHERE S.id = i.name and B.id+'' = i.book+''",[],function(tx,results){

                for(i=0;i<results.rows.length;i++){
                    var record = results.rows.item(i);


                    var table_element = document.getElementById("book_issue");
    
                    var tr = document.createElement("tr");
                    /* TD for Remark */
                    var td = document.createElement("td");    
                    var textnode=document.createTextNode(record.issue_date);
                    td.appendChild(textnode);
                    tr.appendChild(td);
                    
                    /* TD for Name */
                    var td=document.createElement("td");
                    var textnode = document.createTextNode(record.name);
                    td.appendChild(textnode);
                    tr.appendChild(td);

                    /* TD for Book */
                    var td = document.createElement("td");    
                    var textnode=document.createTextNode(record.book_title);
                    td.appendChild(textnode);
                    tr.appendChild(td);

                    /* TD for Remark */
                    var td = document.createElement("td");    
                    var textnode=document.createTextNode(record.textarea);
                    td.appendChild(textnode);
                    tr.appendChild(td);
                                     
                    var td = document.createElement("td");
                    td.innerHTML="<button  id='delete' onclick='delete_student("+record.id+")'>Delete</button>";
                    tr.appendChild(td);
                    

                    //Appending row into table element
                    table_element.appendChild(tr);
                }
            },null);
        });


    }
    


}

function delete_student(param) {
    var c = confirm("Are you sure you want to delete record");
    if (c==true){
        if (database!=null){
            database.transaction(function (tx){
                tx.executeSql("DELETE FROM STUDENT WHERE id='"+param+"'");
                alert("Record Deleted");
                window.location.href="book_issue1.html";
            })
        }
    }
}