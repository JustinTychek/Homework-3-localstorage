/**
 * The `initListeners` function initializes event listeners for the submit and getName buttons,
 * retrieves input values, creates a user object, and calls the `addUser` and `getUser` functions.
 */
function initListeners() {
  $("#submit").on("click", (e) => {
    e.preventDefault();

    let fn = $("#firstName").val();
    let ln = $("#lastName").val();
    let ag = $("#age").val();
    let ph = $("#phone").val();
    let em = $("#email").val();
    let cs = $("#classes").val();
    // let newArrayClasses = cs.replaceAll(", ", ",").split(",");
    let newArrayClasses = cs.split(",");
    let finalClassArray = [];

    let userObj = {
      fName: fn,
      lName: ln,
      age: ag,
      phone: ph,
      email: em,
      classes: [],
    };

    $.each(newArrayClasses, (idx, newClass) => {
      let cl = {
        className: newClass.trim(),
      };
      finalClassArray.push(cl);
    });

    userObj.classes = finalClassArray;

    console.log(userObj);

    $("#firstName").val("");
    $("#lastName").val("");
    $("#age").val("");
    $("#phone").val("");
    $("#email").val("");
    addUser(userObj);
  });

  $("#getName").on("click", (e) => {
    getUser();
  });
}

/**
 * The function adds a user to the "Classes" array stored in the browser's localStorage.
 * @param user - The `user` parameter is an object that represents a user. It could have properties
 * such as `name`, `email`, `age`, etc.
 */
function addUser(user) {
  let allUsers = JSON.parse(localStorage.getItem("Classes"));
  allUsers.push(user);

  localStorage.setItem("Classes", JSON.stringify(allUsers));
}

/**
 * The function retrieves user data from local storage and displays it on the webpage.
 */
function getUser() {
  $("#app").html("");
  let allUsers = JSON.parse(localStorage.getItem("Classes"));
  $("#app").html(`<div>`);
  $.each(allUsers, (idx, user) => {
    $("#app").append(
      `<h2>${user.fName} ${user.lName}</h2> <p>Age: ${user.age}</p> <p>Phone Number: ${user.phone}</p> <p>Email: ${user.email}</p> <p>Classes:`
    );
    $.each(user.classes, (idx, cls) => {
      $("#app").append(`<p>${cls.className}</p>`);
    });
    $("#app").append("</p>");
    $("#app").append(`<div class="person"></div>`);
  });

  $("#app").append("</div>");

  console.log(localStorage.getItem("Classes"));
}

/**
 * The function checks if the browser supports local storage and initializes a "Classes" item if it
 * doesn't exist.
 */
function connectToStorage() {
  if (localStorage) {
    let classes = localStorage.getItem("Classes");

    //checks to see if anything has been added to the storage so it doesnt override it
    if (classes) {
      console.log("already there");
    } else {
      localStorage.setItem("Classes", "[]");
    }
  } else {
    console.log("No Storage Detected");
  }
}

$(document).ready(function () {
  initListeners();
  connectToStorage();
});
