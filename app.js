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
      this.writeUserData(this.messageText, this.nickname)
      this.messageText = ''
    },

    writeUserData (text, nickname) {
      messagesRef.push().set({
        text,
        nickname
      });
    }
  },

  created () {
    messagesRef.on('child_added', (snapshot) => {
      this.messages.push(snapshot.val())
    })
  }
})