var database = openDatabase("lmsdb","1.0","This Database stores application data",3*1024*1024);
if(database!=null){
    database.transaction(function(tx){
        tx.executeSql("CREATE TABLE BOOK (id,book_title,author,publication,quantity,description,classification,category)");
    });
}
function save_book(){
    var btitle = document.getElementById("btitle").value;
    var author=document.getElementById("bauthor").value;
    var publication = document.getElementById("bpublication").value;
    var quantity = document.getElementById("bquantity").value;
    var description = document.getElementById("textarea").value;
    var classification = document.getElementById("classification").value;
    var category= document.getElementsByName("category");

    for (let index = 0; index < category.length; index++) {
        const element = category[index];
        if(element.checked){
            category = element.value;
            console.log(category);
        }
        
    }
    if (btitle==null|| btitle==undefined || btitle.trim().length==0){
        alert("Please enter book title");
        document.getElementById("btitle").focus();
        return false;
    }
    if (author==null|| author==undefined || author.trim().length==0){
        alert("Please enter book author");
        document.getElementById("bauthor").focus();
        return false;
    }
    if (publication==null|| publication==undefined || publication.trim().length==0){
        alert("Please enter book publication");
        document.getElementById("bpublication").focus();
        return false;
    }
    if (quantity==null|| quantity==undefined || quantity.trim().length==0){
        alert("Please enter quantity");
        document.getElementById("bquantity").focus();
        return false;
    }
    if (classification==null || classification==undefined || classification.trim().length==0) {
        alert("Please select Book classfication");
        document.getElementById("classification").focus();
        return false;
    }
    if(database!=null){
        database.transaction(function(tx){
            var id = new Date();
            id = id.getTime();
            tx.executeSql("INSERT INTO BOOK (id,book_title,author,publication,quantity,description,classification,category) VALUES(?,?,?,?,?,?,?,?)",
            [id,btitle,author,publication,quantity,description,classification,category]);
            alert("Hurray!! Record saved Successfully.");
            location.href="books.html";
        });
    }
}
function get_books_records(){

    if(database!=null){
        
        database.transaction(function(tx){
            tx.executeSql("SELECT * FROM BOOK",[],function(tx,results){

                for(i=0;i<results.rows.length;i++){
                    var record = results.rows.item(i);
                    console.log(record);

                    var table_element = document.getElementById("book_table");
    
                    var tr = document.createElement("tr");

                    /* TD for roll no */
                    var td=document.createElement("td");
                    var textnode = document.createTextNode(record.id);
                    td.appendChild(textnode);
                    tr.appendChild(td);

                    /* TD for book title */
                    var td = document.createElement("td"); 

                    var textnode=document.createTextNode(record.book_title);

                    td.appendChild(textnode);
                    tr.appendChild(td);

                    /* TD for author */
                    var td = document.createElement("td");    
                    var textnode=document.createTextNode(record.author);
                    td.appendChild(textnode);
                    tr.appendChild(td);

                    /* TD for publication*/
                    var td = document.createElement("td");
                    textnode = document.createTextNode(record.publication);
                    td.appendChild(textnode);
                    tr.appendChild(td);

                    /* TD for quantity */
                    var td = document.createElement("td");  
                    td.className="text_center"  
                    var textnode=document.createTextNode(record.quantity);
                    td.appendChild(textnode);
                    tr.appendChild(td);

                    /* TD for description */
                   // var td = document.createElement("td"); 
                       
                    //var textnode=document.createTextNode(record.description);
                    //td.appendChild(textnode);
                    //tr.appendChild(td);

                    /* TD for  classification*/
                    var td = document.createElement("td");    
                    //Assigning stylesheet
                    td.className="text_center";
                    var textnode=document.createTextNode(record.classification);
                    td.appendChild(textnode);
                    tr.appendChild(td);

                    /* TD for category */
                    var td = document.createElement("td");    
                    
                    td.setAttribute("class","text_center proper_case_text");    
                    var textnode=document.createTextNode(record.category);
                    td.appendChild(textnode);
                    tr.appendChild(td);

                    var td=document.createElement("td");
                    td.innerHTML="<button id='delete' onclick='delete_book("+record.id+")'>Delete</button>";
                    tr.appendChild(td);

                    //Appending row into table element
                    table_element.appendChild(tr);
                }
            },null);
        });


    }
}


function delete_book(params){
    var c = confirm("Are you sure you want to delete record? ");
    if (c==true){
        if (database!=null){
            database.transaction(function (tx){
                tx.executeSql("DELETE FROM BOOK WHERE id="+params);
                alert("Record Deleted");
                window.location.href="books.html";
            })
            
        }
    }
}
