
let expenses = document.getElementById("items");

let details = document.querySelectorAll("input");

const token = localStorage.getItem('token');

document.getElementById("submit").addEventListener("click",async (e) => {
  
  e.preventDefault();

  let obj = {
    amount: details[0].value,
    description: details[1].value,
    category: document.getElementById("category").value
  };

  try {

    const res = await axios.post('http://localhost:4000/add-expense', obj, { headers: {Authorization: token } });

    addExpense(res.data.expense);

    details[0].value = "";
    details[1].value = "";
    document.getElementById("category").value = "";
    
  } catch(err) {
    console.log(err);
  }
});

window.addEventListener("DOMContentLoaded", async () => {

  try {

    const page = 1;
    await showPage(page);
    
  } 
  catch(err) {
    console.log(err);
  }
});

async function showPage(page){

  expenses.innerHTML = "";

  console.log("showPage");

  const res = await axios.get(`http://localhost:4000/get-expenses?page=${page}`,{headers:{"Authorization":token}});

  for (var i = 0; i < res.data.expenses.length; i++) {
      addExpense(res.data.expenses[i]);
  }

  showPagination(res.data);

}


function showPagination(details){

  console.log(details);

  console.log("showpagination");

  let newItem = document.createElement("li");

  newItem.className = "list-group-item m-1";

  const prevBtn = document.createElement("button");
  const nextBtn = document.createElement("button");

  prevBtn.appendChild(document.createTextNode("Page "+ details.previousPage));
  prevBtn.className = "btn btn-black btn-sm float-right";

  nextBtn.appendChild(document.createTextNode("Page " + details.nextPage));
  nextBtn.className = "btn btn-black btn-sm float-right";


  if(details.hasNextPage){
    console.log("next ",details.hasNextPage);
    newItem.appendChild(nextBtn);
  }
  if(details.hasPreviousPage){
    console.log("pre ",details.hasPreviousPage);

    newItem.appendChild(prevBtn);
  }

  prevBtn.onclick = ()=>{
    showPage(details.previousPage);
  }

  nextBtn.onclick = ()=>{
    showPage(details.nextPage);
  }

  expenses.appendChild(newItem);
  
}


function addExpense(obj) {
  
  let newItem = document.createElement("li");

  newItem.className = "list-group-item m-1";

  newItem.appendChild(
    document.createTextNode("" + obj.amount + " " + obj.description + " " + obj.category)
  );

  let deleteBtn = document.createElement("button");
  deleteBtn.className = "btn btn-danger btn-sm float-right";

  deleteBtn.appendChild(document.createTextNode("Delete"));

  newItem.appendChild(deleteBtn);

  deleteBtn.onclick = async (e)=>{

    let li = e.target.parentElement;

    console.log("deleting");

    try{
     await axios.delete("http://localhost:4000/delete-expense/" + obj.id);
     expenses.removeChild(li);
    }
    catch(err){
      console.log(err);
    }
    
  };

  expenses.appendChild(newItem);
}
