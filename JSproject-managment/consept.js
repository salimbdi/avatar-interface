let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let compt = document.getElementById('compt');
let category= document.getElementById('category');
let submit = document.getElementById('submit');

let mode = 'create';
let tmp;

//get total 
function getTotal() {
    if (price.value != '') {
        let result = ((+price.value * +compt.value) + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = 'green';
    } else {
        total.style.background = 'red';
    }
    
}

//creat product 
let dataprod;
if (localStorage.product != null) {
     dataprod = JSON.parse(localStorage.product)
}else {
    dataprod = [];

}

submit.onclick = function() {
    let newprod = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value,
    } 

    if(mode === 'create'){
    if ( newprod.count > 1) {
        for (let i = 0 ; i< newprod.count ; i++){
            dataprod.push(newprod);
        }
    }else{
        dataprod.push(newprod);
    }
    } else {
        dataprod[tmp] = newprod;
        mode = 'create'
        count.style.display = 'block'
    }
    //save localalstorag

    localStorage.setItem('product', JSON.stringify(dataprod));
    cleardata();
    showdata();


}
function cleardata() {
    title.value = '';
    price.value     = '';
    taxes.value= '';
  ads.value  = '';
  discount.value  = '';
    count.value= '';
  total.innerHTML.value  = '';
    submit.value = '';
    category.value = '';
}


function showdata() {
    
    getTotal();

    let table = '';
    for (let i = 0; i < dataprod.length; i++){
        table += `
             <tr>
    <td>${i+1}</td>
    <td>${dataprod[i].title}</td>
    <td>${dataprod[i].price}</td>
    <td>${dataprod[i].taxes}</td>
    <td>${dataprod[i].ads}</td>
    <td>${dataprod[i].discount}</td>
     <td>${dataprod[i].total}</td>
    <td>${dataprod[i].category}</td>
    <td ><button onclick="updatedata(${i})" id="update">update</button></td>
    <td ><button onclick="deletdata(${i})" id= "delete">delete</button></td>
    
</tr>
       
        `   
}   
    document.getElementById('tbody').innerHTML = table;
    let btndelete = document.getElementById('deleteall');
    if(dataprod.length > 0) {
        btndelete.innerHTML = `
        <button onclick="deleteAll()" >delete all(${dataprod.length})</button>
       `
    }else{
       btndelet.innerHTML = '';
    }
    }
showdata();
    
//deletdata

function deletdata(i) {
    dataprod.splice(i,1);
    localStorage.product = JSON.stringify(dataprod);
    showdata();

}


//deletall
function deleteAll() {
    localStorage.clear();
    dataprod.splice(0);
    showdata();
}

//ubdatdata
let update = document.getElementById('update');
function updatedata(i) {
    mode = 'update'
    title.value = dataprod[i].title;
    price.value = dataprod[i].price;
    taxes.value = dataprod[i].taxes; 
    ads.value = dataprod[i].ads;
    discount.value = dataprod[i].discount; 
    count.value = dataprod[i].count;
    getTotal();
    count.style.display = 'none';
    category.value = dataprod[i].category;
    submit.innerHTML = 'update'
    tmp = i;
      scroll({
          top:0,
          behavior: 'smooth',
      })
    
}

//search

let searchmood = 'title'

function searchbyid(id) {
    let search = document.getElementById('search')
    if (id == 'search by title') {
        searchmood = 'title';
search.placeholder = 'search by title'
    }else {
        searchmood = 'category';
        search.placeholder = 'search by category';
    }
    search.focus();
    search.value = '';
    showdata();
}

function serchdata(value)
{
    let table = '';
    
    if (searchmood == 'title') {
        for (let i = 0; i < dataprod.length; i++){
            if (dataprod[i].title.includes(value.toLowerCase())) {
                table += `
                <tr>
                <td>${i}</td>
                <td>${dataprod[i].title}</td>
                <td>${dataprod[i].price}</td>
                <td>${dataprod[i].taxes}</td>
                <td>${dataprod[i].ads}</td>
                <td>${dataprod[i].discount}</td>
                 <td>${dataprod[i].total}</td>
                <td>${dataprod[i].category}</td>
                <td ><button onclick="updatedata(${i})" id="update">update</button></td>
                <td ><button onclick="deletdata(${i})" id= "delete">delete</button></td>
                
            </tr>
            `
                    ;
}
        }
    } else{
        for (let i = 0; i < dataprod.length; i++){
            if (dataprod[i].category.includes(value)) {
                table += `
                <tr>
                <td>${i}</td>
                <td>${dataprod[i].title}</td>
                <td>${dataprod[i].price}</td>
                <td>${dataprod[i].taxes}</td>
                <td>${dataprod[i].ads}</td>
                <td>${dataprod[i].discount}</td>
                 <td>${dataprod[i].total}</td>
                <td>${dataprod[i].category}</td>
                <td ><button onclick="updatedata(${i})" id="update">update</button></td>
                <td ><button onclick="deletdata(${i})" id= "delete">delete</button></td>
                
            </tr>
            `
                    ;
}
        }
    } 
        document.getElementById('tbody').innerHTML = table;

    
    }
   