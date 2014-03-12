// Saves options to localStorage.
function save_options() {
  var onState = document.getElementById("on").value;
  var offState = document.getElementById("off").value;
  var newWindow = document.getElementById("newWindow").checked;
  localStorage["on_state"] = onState || "";
  localStorage["off_state"] = offState || "";
  localStorage["new_window"] = newWindow || false;

  // Update status to let user know options were saved.
  var status = document.getElementById("status");
  status.innerHTML = "Options Saved.";
  setTimeout(function() {
    status.innerHTML = "";
  }, 750);
}

// Restores select box state to saved value from localStorage.
function restore_options() {
  var onState = localStorage["on_state"];
  var offState = localStorage["off_state"];
  var newWindow = localStorage["new_window"];

  document.getElementById("on").value = onState;
  document.getElementById("off").value = offState;
  document.getElementById("newWindow").checked = newWindow;
}

document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);