// Set the configuration for the app
// Initialize Firebase
const config = {
  apiKey: "AIzaSyACEg3iRdEiOvAUItym5UYsDYzhzNdEqcs",
  authDomain: "vue-chat-room-3c40b.firebaseapp.com",
  databaseURL: "https://vue-chat-room-3c40b.firebaseio.com",
  projectId: "vue-chat-room-3c40b",
  storageBucket: "vue-chat-room-3c40b.appspot.com",
  messagingSenderId: "473992584450"
};
firebase.initializeApp(config);

// Get a reference to the database service
const database = firebase.database()
// This makes our code shorter
const messagesRef = database.ref('messages')

new Vue({
  el: "#chat",

  data: {
    messages: [],
    messageText: '',
    nickname: 'hootlex'
  },

  methods: {
    storeMessage () {
      this.writeData(this.messageText, this.nickname)
      this.messageText = ''
    },

    writeData (text, nickname) {
      messagesRef.push().set({
        text,
        nickname
      });
    },

    deleteMessage (message) {
      messagesRef.child(message.id).remove()
    }
  },

  created () {
    messagesRef.on('child_added', (snapshot) => {
      // ES7 
      this.messages.push({...snapshot.val(), id: snapshot.key})
    })
    // By setting up a listener, we make sure that everybody gets the update 
    messagesRef.on('child_removed', (snapshot) => {
      const deleteMessage = this.messages.find((message) => message.id === snapshot.key)
      const index = this.messages.indexOf(deleteMessage)
      // splice 方法用于删除原数组的一部分成员
      this.messages.splice(index, 1)
    })
  }
})