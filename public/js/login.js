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

        console.log(res.data.message, res.data.token);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('isPremium', res.data.isPremium);

        window.location.href="/";
    }
    catch(err){
        console.log(err);
    }


});