//import functions from SDK
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getDatabase, ref, child, set, update, onValue, get } from "firebase/database"

// Web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDCjt1lew7cyNiWVTPb2GKopr8w9Y6-ZWE",
    authDomain: "realestate-5394e.firebaseapp.com",
    databaseURL: "https://realestate-5394e-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "realestate-5394e",
    storageBucket: "realestate-5394e.appspot.com",
    messagingSenderId: "224541162458",
    appId: "1:224541162458:web:ecdf5954a66f34b352dee3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default db;


function isExist(collection, username)
{
    var userRef = ref(db, collection + '/' + username);
    onValue(userRef, (snapshot) => {
        console.log(snapshot.exists());
    });
}

function checkUser(){
    var userRef = ref(db, collection);
        onValue(userRef, (snapshot) => {
            snapshot.forEach(element => {
                if(element.key == username){
                    console.debug("true");
                }
            });
        });
}

function getChild(){
        var userRef = ref(db, 'agencies');
        onValue(userRef, (snapshot) => {
            var e = [];
            snapshot.forEach(child => {
                e.push(child.child("code").val());
            });
        });
}

getChild();

function matchPass(collection, username)
{
    var userRef = ref(db, collection + '/' + username + '/email');
    onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
    })
}

//Users.isUsernameExist('agents', 'jocelynt');
//export default Users;

//isExist('agents', 'jocelynt');
//checkUser('agents', 'jocelynn');
//matchPass('agents', 'jocelynt');
//test('agents', 'jocelynt');
//for(s in snapshot)