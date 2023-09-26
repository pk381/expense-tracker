document.getElementById("submit").addEventListener("click", async (e)=>{

    e.preventDefault();
    
    let obj = {
        email: document.getElementById("email").value
    }

    try{

       const res = await axios.post("http://51.20.52.104:4000/forgot-password", obj);

       console.log(res);

    }
    catch(err){
        console.log(err);
    }
})