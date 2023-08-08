let email = document.getElementById("email");

let password = document.getElementById("password");


document.getElementById("submit").addEventListener('click', async (e)=>{

    e.preventDefault();

    let obj ={
        email: email.value,
        password: password.value
    }

    try{

        let res = await axios.post("http://localhost:4000/user/login", obj);

        console.log(res.data.message);
    }
    catch(err){
        console.log(err);
    }


});