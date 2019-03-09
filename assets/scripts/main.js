/**
 * Nav bar tab with login and logout condition
 */

const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");
const accountDetails = document.querySelector(".account-details");

const setupUI = user => {
  if (user) {
    // Account info
    if (
      user.providerData[0].providerId === "facebook.com" ||
      user.emailVerified
    ) {
      if (!user.displayName) {
        dataBase
          .collection("users")
          .doc(user.uid)
          .get()
          .then(doc => {
            const html = `
                        <div> Name of User: <span style='color:brown'>${
              doc.data().firstName
              } ${doc.data().lastName}</span></div>
                        <div> Logged in as: <span style='color:brown'>${
              user.email
              }</span></div>
                    `;
            accountDetails.innerHTML = html;
          });
      } else {
        const html = `
                        <div> Name of User: <span style='color:brown'>${
          user.displayName
          }</span></div>
                        <div> Logged in as: <span style='color:brown'>${
          user.email
          }</span></div>
                    `;
        accountDetails.innerHTML = html;
      }

      // Toggle UI elements
      loggedInLinks.forEach(item => {
        item.style.display = "block";
      });
      loggedOutLinks.forEach(item => {
        item.style.display = "none";
      });
    }
  } else {
    // Hide account info
    accountDetails.innerHTML = "";

    // Toggle UI elements
    loggedInLinks.forEach(item => {
      item.style.display = "none";
    });
    loggedOutLinks.forEach(item => {
      item.style.display = "block";
    });
  }
};


/**
 * Setting-up/ Initializing materialize functionalitites
 */

document.addEventListener("DOMContentLoaded", function () {
  var modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);

  var elems = document.querySelectorAll('.sidenav');
  M.Sidenav.init(elems);
});
