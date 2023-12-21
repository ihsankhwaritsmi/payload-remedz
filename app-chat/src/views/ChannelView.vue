<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const channels = ref([]);
let currentUserID = ref('');
let channelChat = ref([]);
let selectedChatID = ref("");
let selectedChat = ref([]);
let msg = ref('')

async function logout() {
 try {
  const req = await fetch('http://localhost:3100/api/accounts/logout', {
    method: "POST", 
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
  const data = await req.json()
  console.log(data)
  router.push('/') // Redirect to home page
 } catch (err) {
  console.log(err)
 }
}

async function getCurrentUser(){
    try {
    const req = await fetch('http://localhost:3100/api/accounts')
    const res = await fetch('http://localhost:3100/api/message')

    const data = await req.json()
    const msg = await res.json()
    // channelChat.value = msg.docs.filter(c => (c.sender == currentUserID.value) || (c.recipients == currentUserID.value))
    // console.log(channelChat.value)
    console.log(data)
    console.log(msg)
    console.log(currentUserID)
    // console.log(currentUserID.value)


    // let temp = []

    for(let i = 0; i < data.docs.length; i++){
      if(data.docs[i].id!=currentUserID){
        channels.value.push(data.docs[i])
      }
      // console.log(channels.value)
    }
    for(let i = 0; i < msg.docs.length; i++){
      if(msg.docs[i].sender.id === currentUserID|| msg.docs[i].recipients.id === currentUserID){
        channelChat.value.push(msg.docs[i])
      }

      // console.log(channelChat.value)
    }

    // this.channelChat = temp;
    for(let i = 0; i < channelChat.value.length; i++){
      console.log(channelChat.value[i].id)
    }

  } catch (err) {
    console.log(err)
  }
}

async function getUserInfo(){
    try {
    const req = await fetch('http://localhost:3100/api/accounts/me', {
      method: "GET", 
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await req.json()
    console.log(data.user.id)
    currentUserID = data.user.id
    if(data.user == null) router.push('/')
    
  } catch (err) {
    console.log(err)
  }
}
function showMessage(){
  console.log("masokk")
  selectedChat.value = []
  for(let i = 0; i < channelChat.value.length; i++){
    console.log(channelChat.value[i])
    if((channelChat.value[i].recipients.id == selectedChatID.value) || (channelChat.value[i].sender.id == selectedChatID.value)){
      console.log("amanaja")
      selectedChat.value.push(channelChat.value[i].message)
    }
    // console.log(selectedChatID.value)
  }
  // console.log(selectedChat.value)
}

async function sendMessage(){

  try {
  const req = await fetch('http://localhost:3100/api/message', {
    method: "POST", 
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sender: currentUserID,
      recipients: selectedChatID.value,
      message: msg.value
    }),
  })

    const data = await req.json()
    if(req.ok) window.location.reload(true)
  } catch (err) {
    console.log(err)
  }
  showMessage();
}



function handleClick(channelId){
  selectedChatID.value = channelId
  // console.log(selectedChatID.value)
  showMessage()
  
}




// async function generateChannel() {
//  try {
//   const req = await fetch('http://localhost:3100/api/channels')
//   const res = await fetch('http://localhost:3100/api/accounts/me', {
//       method: "GET", 
//       credentials: "include",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//   const data = await req.json()
//   const user = await res.json()
//   // let channels = []
//   console.log(data.docs[0].channel_member)
//   console.log(user.user.id)
//   for (let i = 0; i < data.docs.length; i++) {
//     for (let j = 0; j < data.docs[i].channel_member.length; j++) {
//       if(data.docs[i].channel_member[j] === user.user.id) {
//         channels.value.push(data.docs[i])
//       }
      
//     }
//   }
//    } catch (err) {
//   console.log(err)
//  }
// }




onMounted(() => {
getUserInfo()
getCurrentUser()
// showMessage()

});

</script>

<template>
 <nav class="navbar bg-body-secondary" >
 <div class="container-fluid">
   <a class="navbar-brand" href="#">
     <button class="btn btn-outline-danger ms-3" type="button" @click="logout">Logout</button>
     <button type="button" class="btn btn-primary ms-3" data-bs-toggle="modal" data-bs-target="#exampleModal">New Channel</button>
     <button class="btn btn-info ms-3" type="button">Join</button>
   </a>
 </div>
</nav>

<div class="container">
  <div class="row" >
    <div class="col">
    <div class="row m-3">
      <button v-for="channel in channels" :key="channel.id" @click="handleClick(channel.id)" class="btn btn-primary btn-block card mt-3 p-3 me-5 drop-shadow" >{{ channel.username }}</button>
      <!-- <button v-for="channel in channels" type="button" class="btn btn-primary btn-block card mt-3 p-3 me-5 drop-shadow">{{ channel.username }}</button> -->
    </div>
    </div>

    <div class="col-1 bg-body-tertiary" style=" width: 100vh; height: 90vh;">
      <div class="row m-3">
        <div v-for="chat in selectedChat">
          <button v-if="chat.recipients===currentUserID" class="btn btn-outline-success btn-block mt-3 drop-shadow text-start" >{{ chat.recipients}}</button>
          <button v-else class="btn btn-outline-primary btn-block mt-3 drop-shadow text-start" >{{ chat}}</button>

        </div>
      </div>
    <nav class="navbar bg-body-tertiary" style="position:absolute; bottom: 0;">
          <div class="container-fluid">
            <form class="d-flex" v-on:submit.prevent="sendMessage()">
              <input style="width: 80vh;"  type="text" v-model="msg" class="form-control me-2">
              <button class="btn btn-outline-success" type="submit">Send</button>
            </form>
          </div>
        </nav>
      </div>
  </div>
  
  </div>
 

<!-- Modal Channel Creation -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
 <div class="modal-dialog">
   <div class="modal-content">
     <div class="modal-header">
       <h1 class="modal-title perihfs-5" id="exampleModalLabel">Create a New Channel</h1>
       <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
     </div>
   
     <div class="modal-body mb-3">
       <label class="form-label">Channel Name</label>
       <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Enter Channel Name">
     </div>
     <div class="modal-footer">
       <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
       <button type="button" class="btn btn-primary">Save changes</button>
     </div>
   </div>
 </div>
</div>
</template>

<style>
.drop-shadow {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.bottom-align {
 position: absolute;
 bottom: 0;
 left: 0;
}
</style>