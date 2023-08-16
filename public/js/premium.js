const isPremium = localStorage.getItem("isPremium");

console.log("isPremium ", isPremium);

if (isPremium === "true") {
  console.log("premium user");
  document.getElementById("buy_premium").style.visibility = "hidden";
  document.querySelector("#msg").textContent = "You Are Premium User";
} else {
  document.getElementById("premium").style.visibility = "hidden";
  document.getElementById("show_user_files").style.visibility = "hidden";

  console.log("not a premium user");
}

async function premiumFeature(e) {
  e.preventDefault();
  try {
    let token = localStorage.getItem("token");
    const response = await axios.get(
      "http://localhost:4000/premium/leaderboard",
      {
        headers: { Authorization: token },
      }
    );
    document.getElementById("leaderBoard").innerHTML = "<h2>Leader Board</h2>";
    console.log(response);
    response.data.forEach((details) => {
      let newItem = document.createElement("li");
      newItem.appendChild(
        document.createTextNode(
          `name - ${details.name} Total_Amount - ${details.total_cost}`
        )
      );
      boardList.appendChild(newItem);
    });
  } catch (err) {
    console.log(err);
  }
}

document.getElementById("leaderBoardBtn").addEventListener("click", async ()=> {

  try {
    let token = localStorage.getItem("token");

    const res = await axios.get(
      "http://localhost:4000/premium/leaderboard",
      {
        headers: { Authorization: token },
      }
    );

    let boardList = document.getElementById("leaderBoard");

    let text = document.createTextNode("Leader Board");

    boardList.appendChild(text);

    
    console.log(res);
    res.data.forEach((details) => {

      let newItem = document.createElement("li");

      newItem.appendChild(
        document.createTextNode(
          `name - ${details.name} Total_Amount - ${details.totalExpense}`
        )
      );

      boardList.appendChild(newItem);
    });
  } catch (err) {
    console.log(err);
  }

});


document.getElementById("downloadBtn").addEventListener("click", async ()=>{
  
  try{
    const res = await axios.get("http://localhost:4000/premium/download", 
    {
      headers: { Authorization: token }
    });

    if(res.status === 201){
      
      var a = document.createElement("a");
      a.href = res.data.url;
      a.download = "my-expense.csv";
      a.click();
    }
    else{
      console.log("some error");
    }
    
  }
  catch(err){
    console.log(err);
  }
});


document.getElementById("show_user_files").addEventListener("click", async()=>{
  
  try{

    const res = await axios.get("http://localhost:4000/premium/all-files",{
      headers: { Authorization: token },
    });

    console.log(res.data.fileUrls);

    res.data.fileUrls.forEach(row =>{
      console.log(row.fileUrl)
      download(row.fileUrl);
    });
    
  } 
  catch (err) {
    console.log(err);
  }
});

function download(url){

  try{

    let fileList = document.getElementById("files");
    let li = document.createElement("li");
    let downloadBtn = document.createElement('button');
    downloadBtn.appendChild(document.createTextNode("Download again"));

    downloadBtn.onclick = ()=>{

      var a = document.createElement("a");
      a.href = url;
      a.download = "my-expense.csv";
      a.click();

    }
  
    li.appendChild(downloadBtn);
    fileList.appendChild(li);
  }
  catch(err){
    console.log(err);
  }


}

