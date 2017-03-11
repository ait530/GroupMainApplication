$(document).ready(function(){
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDuGU6jnBjNl92Q7fVFPdELnASYCs1DA_c",
    authDomain: "push-phase.firebaseapp.com",
    databaseURL: "https://push-phase.firebaseio.com",
    storageBucket: "push-phase.appspot.com",
    messagingSenderId: "412902006201"
  };
  firebase.initializeApp(config);
    // Create a variable to reference the database.
    var database = firebase.database();
    // Initial Values
    var name = "";
    // var role = "";
    // var date = "";
    // var rate = 0;
    // Capture Button Click
    $("#add-user").on("click", function(event) {
      event.preventDefault();
      // Grabbed values from text boxes
      name = $("#name-input").val().trim();
      // role = $("#role-input").val().trim();
      // date = $("#date-input").val().trim();
      // rate = $("#rate-input").val().trim();
      // Code for handling the push
      database.ref().push({
        name: name,
        // role: role,
        // date: date,
        // rate: rate
      });
    });
    // Firebase watcher + initial loader HINT: .on("value")
    database.ref().on("value", function(snapshot) {
      // storing the snapshot.val() in a variable for convenience
      var sv = snapshot.val();
      
      // Getting an array of each key In the snapshot object
      var svArr = Object.keys(sv);
      // Finding the last user's key
      var lastIndex = svArr.length - 1;
      var lastKey = svArr[lastIndex];
      // Using the last user's key to access the last added user object
      var lastObj = sv[lastKey]
      // Console.loging the last user's data
      // console.log(lastObj.name);
      // console.log(lastObj.role);
      // console.log(lastObj.date);
      // console.log(lastObj.rate);
      // // Change the HTML to reflect
      // $("#name-display").html(lastObj.name);
      // $("#role-display").html(lastObj.role);
      // $("#date-display").html(lastObj.date);
      // $("#rate-display").html(lastObj.rate);
      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });


    // Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
    dataRef.ref().on("child_added", function(childSnapshot) {
      // Log everything that's coming out of snapshot
      console.log(childSnapshot.val().name);
      // console.log(childSnapshot.val().name);
      // console.log(childSnapshot.val().email);
      // console.log(childSnapshot.val().age);
      // console.log(childSnapshot.val().comment);
      // console.log(childSnapshot.val().joinDate);
      // full list of items to the well
      $("#full-member-list").append("<div class='well'><span id='name'> " + childSnapshot.val().name +
        // " </span><span id='email'> " + childSnapshot.val().email +
        // " </span><span id='age'> " + childSnapshot.val().age +
        // " </span><span id='comment'> " + childSnapshot.val().comment + " </span></div>");
    // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });
    dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
      // Change the HTML to reflect
      $("#name-display").html(snapshot.val().name);
      // $("#email-display").html(snapshot.val().email);
      // $("#age-display").html(snapshot.val().age);
      // $("#comment-display").html(snapshot.val().comment);
    });
});