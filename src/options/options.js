// Saves options to localStorage.
function save_options() {
  var on = document.getElementById("on").value;
  //var off = document.getElementById("off").value;
  localStorage["on_state"] = on;
  //localStorage["off_state"] = off;

  // Update status to let user know options were saved.
  var status = document.getElementById("status");
  status.innerHTML = "Options Saved.";
  setTimeout(function() {
    status.innerHTML = "";
  }, 750);
}

// Restores select box state to saved value from localStorage.
function restore_options() {
  var on = localStorage["on_state"];
  //var off = localStorage["off_state"];

  document.getElementById("on").value = on;
  //document.getElementById("off").value = off;
}

document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);