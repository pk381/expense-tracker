const isPremium = localStorage.getItem("isPremium");

console.log("isPremium ", isPremium);

if (isPremium === "true") {
  console.log("premium user");
  document.getElementById("buy_premium").style.visibility = "hidden";
  document.querySelector("#msg").textContent = "You Are Premium User";
} else {
  document.getElementById("leaderBoardBtn").style.visibility = "hidden";
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
