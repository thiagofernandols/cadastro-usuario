import Firebase from 'firebase'
 let config = {
    apiKey: "AIzaSyC4jYCoWGJBjZ79VrCsa8MRIedFXL8fCcg",
        authDomain: "cadastro-usuario-01.firebaseapp.com",
        databaseURL: "https://cadastro-usuario-01.firebaseio.com",
        projectId: "cadastro-usuario-01",
        storageBucket: "cadastro-usuario-01.appspot.com",
        messagingSenderId: "339415406473"
  };
let app = Firebase.initializeApp(config)
export const db = app.database()