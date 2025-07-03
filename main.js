


 let mod = document.querySelector('#mod2')
  let error = document.querySelector('#error')
  let model = document.querySelector('.model')
  let alert3 = document.querySelector('.alert')
  let alert5 = document.querySelector('.alert div')
  let error2 = document.querySelector('#error2')
  let model3 = document.querySelector('#mod3 .model')
  let add = document.querySelector('.addInPost span')
let addInPost = document.querySelector('.addInPost')
let Profile = document.querySelector('#Profile')
let img3 = document.querySelector('#img9')

function getLogin(){
 mod.style = 'position: absolute; display: block; height: 100vh; width: 100%; display: flex; justify-content: center;  background: rgba(240, 240, 240, 0.65); align-items: center;'
}
let cancel = document.querySelector('#cancel')
cancel.onclick = function(){
mod.style = 'display: none;'
  model.style = 'height: 160px;'
  error.innerHTML = ''
   Profile.innerHTML = ''
  img3.style = 'display: none; width: 40px; border: 1px solid #000000; border-radius: 50px;'

} 
let login2 = document.querySelector('#login2')

login2.onclick = function(){

  let name1 = document.querySelector('#name1').value
  let password = document.querySelector('#password').value
let prams = {
    "username" : name1,
    "password" : password
}

axios.post('https://tarmeezacademy.com/api/v1/login',prams)
.then(response => {
  localStorage.setItem('token',response.data.token)
  localStorage.setItem('user',JSON.stringify(response.data.user))
  if(typeof response.data.user.profile_image == 'object'){
  img3.setAttribute('src','imges/user.png') 
  }else{
  img3.setAttribute('src',response.data.user.profile_image) 
  }
  Profile.innerHTML = response.data.user.username
  mod.style = 'display: none;'
  model.style = 'height: 160px;'
  error.innerHTML = ''
  alert3.style = 'display: flex;'
  setTimeout(() => {
  alert3.style = ' display: none;'
  
  }, 1000);

  getUser()
  getBost4()
    if(post8()){
  post8()
  }
})
.catch(respons => {
  error.innerHTML = respons.response.data.message
  model.style = 'height: 250px;'
})
}
let log = document.querySelector('#log')
let rej = document.querySelector('#rej')
let logout = document.querySelector('#logout')

function getUser(){

  if(localStorage.getItem('token') != null){
 log.style = 'display: none;'
 rej.style = 'display: none;'
 logout.style = 'display: inline;'
 if(addInPost){
 addInPost.style = 'display: block;'
 }

 Profile.innerHTML = JSON.parse(localStorage.getItem('user')).username
 img3.style = 'display: flex; width: 40px; border: 1px solid #000000; border-radius: 50px;'
 if(typeof JSON.parse(localStorage.getItem('user')).profile_image != 'object'){
  img3.setAttribute('src', JSON.parse(localStorage.getItem('user')).profile_image)
 }else{
   img3.setAttribute('src','imges/user.png')
 }
  }else{
 log.style = 'display: inline;'
 rej.style = 'display: inline;'
 logout.style = 'display: none;'
  if(addInPost){
 addInPost.style = 'display: none;'
 }
Profile.innerHTML = ''
  img3.style = 'display: none; width: 40px; border: 1px solid #000000; border-radius: 50px;'
  }
}
getUser()




logout.onclick = function(){
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  getUser()
  getBost4()
  if(post8()){
    post8()
  }
} 
let rej4 = document.querySelector('#rej')
let mod3 = document.querySelector('#mod3')
let cancel2 = document.querySelector('#cancel2')
cancel2.onclick = function(){
 mod3.style = 'display: none;'
 error2.style = 'display:none;'
 model3.style = 'background: white; width: 300px; height: 350px; padding: 20px;  border: #000000 1px solid; border-radius: 10px;'

} 
rej4.onclick = function(){
 mod3.style = 'position: absolute; display: block; height: 100vh; width: 100%; display: flex; justify-content: center;  background: rgba(240, 240, 240, 0.65); align-items: center;'
}




let Register = document.querySelector('#Register2')
Register.onclick = function(){
let name2 = document.querySelector('#name2')
let password2 = document.querySelector('#password2')
let username = document.querySelector('#username')
let email = document.querySelector('#email')
let image = document.querySelector('#image').files[0]
let token = localStorage.getItem("token")
 let formdata = new FormData()
   formdata.append("username",username.value)
   formdata.append("name",name2.value)
   formdata.append("email",email.value)
   formdata.append("image",image)
   formdata.append("password",password2.value)
axios.post('https://tarmeezacademy.com/api/v1/register',formdata,{
  headers: {
    "authorization":`Bearer ${token}`,
    "Content-Type" : "multipart/form-data"
  }
})
.then(respons => {
    localStorage.setItem('token',respons.data.token)
  localStorage.setItem('user',JSON.stringify(respons.data.user))
  if(typeof respons.data.user.profile_image == 'object'){
  img3.setAttribute('src','imges/user.png') 

  }else{
  img3.setAttribute('src',respons.data.user.profile_image) 
  }
  getUser()

   mod3.style = 'display: none;'
     alert3.style = 'display: flex;'
  setTimeout(() => {
  alert3.style = ' display: none;'
  
  }, 1000);
     if(post8()){
  post8()
  }
  getBost4()
})
.catch(error => {
 model3.style = 'background: white; width: 300px; height: 450px; padding: 20px;  border: #000000 1px solid; border-radius: 10px;'
  error2.innerHTML = error.response.data.message
  error2.style = 'color:red;'
})
}



function post_coment(id){
 window.location = `post.html?postId=${id}`
}


function alet2(color = '#ff3636',masseg = 'تم تسجيل الدخول بنجاح'){
  let con = `
          <div style="background:${color}; width: 300px; height: 70px; position: fixed; bottom: 10px; left: 10px;">
          <p style="display: flex; justify-content: center;align-items: center; font-size: 20px;">${masseg}</p>
          </div>
  `
  let alet2 = document.querySelector('#alet7')
  alet2.innerHTML = con
  alet2.style = 'display:flex;'
   setTimeout(() =>{
  alet2.style = 'display:none;'
  },2000)

}



function delet(id,protfl){
  let token = localStorage.getItem('token')
  let bool = confirm('هل انت متأكد من حذف المنشور')
  if(bool){
 axios.delete(`https://tarmeezacademy.com/api/v1/posts/${id}`,{
  headers:{
      "authorization":`Bearer ${token}`
  }
 })
 .then(respons => {
  console.log(respons)  
if(protfl){
   bostUseri()

}else{
   getBost4()

}
  



 })
  }
}

function protfileine(){
  if(localStorage.getItem('user') == null){
    alet2('#ff3636',"قم بتسجيل الدخول اولا")
  }else{
   let idUser = JSON.parse(localStorage.getItem('user')).id
  location = `profile.html?userId=${idUser}`
  }
}


let id5 = ''
  let mod5 = document.querySelector('#mod5')
function btn_edit(post){
  let post2 = JSON.parse(decodeURIComponent(post))
  console.log(post2)
let title = document.querySelector('#title9').value = post2.title
let body = document.querySelector('#body9').value = post2.body
id5 = post2.id
  mod5.style="display:flex; height: 100vh; width: 100%;  justify-content: center; position: absolute; align-items: center;top: 0; background: #e8e8e861;"

}

function update(profil = false){
 let title = document.querySelector('#title9').value
let body = document.querySelector('#body9').value
let token = localStorage.getItem('token')
let formdata9 = new FormData()
 formdata9.append('title',title)
 formdata9.append('body',body)
 formdata9.append('_method',"put")

 axios.post(`https://tarmeezacademy.com/api/v1/posts/${id5}`,formdata9,{
    headers:{
         "authorization":`Bearer ${token}`,
          "Content-Type" : "multipart/form-data"

    }
 })
 .then(response => {
    console.log(response)
     mod5.style= "display:none;"
     if(profil){
    bostUseri()

     }else{
    getBost4()

     }
 })
 .catch(error => {
    console.log(error)
    alet2('#ff3636',error.response.data.message)
 })

} 

cancel11.onclick = function(){
  mod5.style = 'display:none;'
} 
function getloder(loder){
  let lolo = document.getElementById('lolo')
  if(loder){
    lolo.style.display = 'flex'
  }else{
    lolo.style.display = 'none'

  }
}