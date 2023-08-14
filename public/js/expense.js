
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
    const res = await axios.get("http://localhost:4000/get-expenses",{headers:{"Authorization":token}});
    for (var i = 0; i < res.data.expenses.length; i++) {
      addExpense(res.data.expenses[i]);
    }
  } 
  catch(err) {
    console.log(err);
  }
});

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
