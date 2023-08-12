document.getElementById("buy_premium").addEventListener("click", async () => {

  try {
    let token = localStorage.getItem("token");

    const response = await axios.get(
      "http://localhost:4000/purchase/premiummembership",
      { headers: { Authorization: token } }
    );

    const options = {
      key: response.data.key_id,
      order_id: response.data.order.id,
      handler: async function (result) {
        const res = await axios.post(
          "http://localhost:4000/purchase/updatestatus",
          {
            order_id: options.order_id,
            payment_id: result.razorpay_payment_id,
          },
          { headers: { Authorization: token } }
        );
        alert("you are premium member");

        // document.querySelector(".rzp").style.visibility = "hidden";
        // document.querySelector("#msg").textContent = "You Are Premium User";
        // document.getElementById("leaderboard").textContent = "Show Leaderboard";
        // document.getElementById("downloadexpense").textContent =
        //   "Download File";
        // showDownloadLinks();
        localStorage.setItem("token", res.data.token);
      },
    };

    const rzpl = new Razorpay(options);

    rzpl.open();
    rzpl.on("payment.failed", async function (res) {
      await axios.post(
        "http://localhost:4000/purchase/updatefailure",
        {
          order_id: response.data.order.id,
        },
        { headers: { Authorization: token } }
      );
      alert("something went wrong");
    });
  } catch (err) {
    console.log(err);
  }
});
