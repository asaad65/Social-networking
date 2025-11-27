
    function MoodUser(){
    const mood_user = document.querySelector('#mood_user')
     const ShowAddPostId = document.querySelector('#ShowAddPostId')
     
    if(localStorage.getItem('user')){
        mood_user.innerHTML =`<button class="border border-white  rounded-2 bg-danger   text-white p-1 ms-2 px-3 btn-hover-logout" type="button" onclick="logout()">logout</button>`
           ShowAddPostId.innerHTML = `
             <div id="AddPost" class="bg-primary" style="width: 60px; cursor: pointer;  height: 60px; border: 1px solid #008cff; border-radius: 50%; display: flex; justify-content: center ; align-items: center; position: fixed; right: 20px; bottom: 20px; ">
                <span style="font-size: 50px; margin-bottom: 9px; color: white; ">+</span>  
             </div>
            `
            user()
    }else{
    mood_user.innerHTML = 
    `
        <button class="border border-white rounded-2 bg-primary bg-gradient text-white p-1 px-3 btn-hover" type="button" data-bs-toggle="modal" data-bs-target="#myModal">Login</button>
    <button class="border border-primary   rounded-2   text-primary p-1 ms-2 px-3 btn-hover-Register" type="button" data-bs-toggle="modal" data-bs-target="#myModalRegister">Register</button>
    `
      ShowAddPostId.innerHTML = `<div></div>`
    }
    }
    MoodUser()

    async function Login() {
    const loginButton = document.querySelector('#loginButton')    
    loginButton.disabled = true;
    const passwordLogin = document.querySelector('#passwordLogin').value;
    const usernameLogin = document.querySelector('#usernameLogin').value;
    const errorLogin = document.querySelector('#errorLogin') 
    errorLogin.innerHTML =  ''
    const params = {
    username: usernameLogin,
    password: passwordLogin
    };

    try {
    const response = await axios.post('https://tarmeezacademy.com/api/v1/login', params);
    console.log(response.data);
    localStorage.setItem("user",JSON.stringify(response.data))
   
      location.reload()
    } catch (error) {
         loginButton.disabled = false;
    errorLogin.innerHTML =  error.message
    }
    
    }
         
    async function Register(){
         const RegisterButton = document.querySelector('#RegisterButton') 
         RegisterButton.disabled = true;
    const error_Register = document.querySelector('#error_Register')
    const Register_name = document.querySelector('#Register_name').value;
    const Register_username = document.querySelector('#Register_username').value;
    const Register_password = document.querySelector('#Register_password').value;
    const Register_email= document.querySelector('#Register_email').value;
    const Register_file = document.querySelector('#Register_file').files[0];

    console.log(Register_name)
    let formdata = await new FormData()
    formdata.append("username", Register_username )
    formdata.append("name", Register_name )
    formdata.append("email",Register_email)
    if (Register_file) {
        formdata.append("image", Register_file);
    }
    formdata.append("password",Register_password )
    try{
    error_Register.innerHTML = ''
    const response = await axios.post('https://tarmeezacademy.com/api/v1/register',formdata)
    console.log(response)
    localStorage.setItem('user',JSON.stringify(response.data))
      location.reload()
    } catch(error){
    RegisterButton.disabled = true;
    error_Register.innerHTML = error
    }
    }

    function logout(){
    localStorage.removeItem('user')
    location.reload()
    }
    
     function Loader(Show){
      const spinnerWrapper = document.querySelector("#spinnerWrapper")
       if (!spinnerWrapper) return;
      if(Show){
       spinnerWrapper.innerHTML = 
       `
        <div class="d-flex justify-content-center my-2">
              <div class="spinner-border text-primary" style="width: 2rem; height: 2rem; font-width:bold;" role="status">
               
              </div>
        </div>
       `
       }else{
        spinnerWrapper.innerHTML = `<div></div>`
       }
    }

    async function AddPost() {
            const Add = document.querySelector('#Add')
              Add.disabled = true;
            const errorAddPost = document.querySelector('#errorAddPost');
            const title = document.querySelector('#title').value;
            const body = document.querySelector('#body').value;
            const img = document.querySelector('#img').files[0];
            const user = JSON.parse(localStorage.getItem('user'));
            const token = user?.token;

            const formdata = await new FormData();
            formdata.append('body', body);
            if (title) {
                formdata.append('title', title);
            }
            if (img) {
                formdata.append('image', img);
            }

            try {
                const response = await axios.post('https://tarmeezacademy.com/api/v1/posts', formdata, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
                });
                location.reload();
                
            } catch (error) {
                 Add.disabled = false;
                errorAddPost.innerHTML = `<div class="alert alert-danger">${error}</div>`;
            }
    }

    async function send(id){
        const send = document.querySelector('#send')
        send.disabled = true;
        send.innerHTML = 'Sending'
        const message = document.querySelector('#message').value
        const token = JSON.parse(localStorage.getItem('user')).token
    let messageData = {
        "body": message
    }
    try{
    const response = await axios.post(`https://tarmeezacademy.com/api/v1/posts/${id}/comments`,messageData,{
        headers : {
            "authorization":`Bearer ${token}`
        }
    })
    location.reload()
    } catch(error){
        send.disabled = false;
        send.innerHTML = 'send'
        const errorSend = document.querySelector('#errorSend')
        errorSend.innerHTML = 'Please write a message before clicking the send button.'
        errorSend.style = ' right: 100px; transition: all 0.5s; bottom: 0px;'
    
        setTimeout(()=>{
        errorSend.style = ' right: 100px; transition: all 0.5s; bottom: -200px;'
        },2000)
    } 

    }

    async function DeletPost(id) {
        let token = JSON.parse(localStorage.getItem('user')).token  
        try{
            const bool = confirm('Are you sure you want to delete the post?')
            if(bool){
                 const response = await  axios.delete(`https://tarmeezacademy.com/api/v1/posts/${id}`,{
        headers:{
            "authorization":`Bearer ${token}`
        }})
        location.reload()
            }
        
        } catch(error){
           console.log(error)
        }
       
    }
    let idPost = null
    function IdButton(id,title,body){ 
            
      idPost = id
         document.querySelector('#Editetitle').value = title;
         document.querySelector('#Editebody').value = body;
    }

    async function EditePost() {
        const Edit = document.querySelector('#Edit')
        Edit.disabled = true; 
      
        let title = document.querySelector('#Editetitle').value 
        let body = document.querySelector('#Editebody').value
        let token = JSON.parse(localStorage.getItem('user')).token
        let formdata9 = new FormData()
        formdata9.append('title',title)
        formdata9.append('body',body)
        formdata9.append('_method',"put")
     try{
       const respons = await axios.post(`https://tarmeezacademy.com/api/v1/posts/${idPost}`,formdata9,{
            headers:{
                "authorization":`Bearer ${token}`,
                "Content-Type" : "multipart/form-data"
            }
            })
          
            location.reload()
    
        }catch(error){
            Edit.disabled = false; 
            console.log(error)
        }

    }
function user(){
 const Showuser = document.querySelector('#Showuser')
  if(localStorage.getItem('user')){
    
    const userData = JSON.parse(localStorage.getItem('user'))
    const img = typeof userData.user.profile_image == 'object'? 'imegs/user.png':userData.user.profile_image
    Showuser.innerHTML = `
         
            <a href="/Social-networking/user.html?userId=${userData.user.id}">
             <img src=${img} style=" border-radius: 50%; width: 45px; height: 45px; margin-right: 5px;" alt="">
             <span style="font-size: large; font-weight: bolder; color: white;">${userData.user.username}</span>
            </a>
           `
  }else{
     Showuser.innerHTML = `<div></div>`
  }
}
user()