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
    nickname: 'hootlex',
    editingMessage: null // set it to null by default
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
    },

    editMessage (message) {
      this.editingMessage = message
      this.messageText = message.text
    },

    cancelMessage () {
      this.editingMessage = null
      this.messageText = ''
    },

    updateMessage () {
      messagesRef.child(this.editingMessage.id).update({ text: this.messageText })

      this.cancelMessage()
    }
  },

  created () {
    messagesRef.on('child_added', (snapshot) => {
      // ES7 
      this.messages.push({ ...snapshot.val(), id: snapshot.key })

      if (snapshot.val().nickname !== this.nickname) {
        nativeToast({
          message: `New message by ${snapshot.val().nickname}`,
          position: 'south',
          // Self destroy in 5 seconds
          timeout: 5000,
          type: 'success'
        })
      }
    })
    // By setting up a listener, we make sure that everybody gets the update 
    messagesRef.on('child_removed', (snapshot) => {
      const deleteMessage = this.messages.find((message) => message.id === snapshot.key)
      const index = this.messages.indexOf(deleteMessage)
      // splice 方法用于删除原数组的一部分成员
      this.messages.splice(index, 1)

      if (snapshot.val().nickname !== this.nickname) {
        nativeToast({
          message: `Message deleted by ${snapshot.val().nickname}`,
          position: 'south',
          // Self destroy in 5 seconds
          timeout: 5000,
          type: 'warning'
        })
      }
    })
    // listen for message changes in Firebase and update locally
    messagesRef.on('child_changed', (snapshot) => {
      const updateMessage = this.messages.find((message) => message.id === snapshot.key)
      updateMessage.text = snapshot.val().text
      
      if (snapshot.val().nickname !== this.nickname) {
        nativeToast({
          message: `Message edited by ${snapshot.val().nickname}`,
          position: 'south',
          // Self destroy in 5 seconds
          timeout: 5000,
          type: 'info'
        })
      }
    })
  }
})