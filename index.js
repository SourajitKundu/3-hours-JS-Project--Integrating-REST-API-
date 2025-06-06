function handleFormSubmit(event) {
  event.preventDefault();
  const noteDetails = {
    noteTitle: event.target.notetitle.value,
    noteDesc: event.target.notedesc.value,
  };
  axios
    .post(
      "https://crudcrud.com/api/c65068f9f0af4103a9c445fdc7d5e26a/NoteDetails",
      noteDetails
    )
    .then((response) => displayNoteOnScreen(response.data))
    .catch((error) => alert("Did not work correctly" + error));

  document.getElementById("notetitle").value = "";
  document.getElementById("notedesc").value = "";
}

function displayNoteOnScreen(note) {
  const noteItem = document.createElement("li");

  const title = document.createElement("h2");
  title.textContent = note.noteTitle;

  const desc = document.createElement("p");
  desc.textContent = note.noteDesc;

  noteItem.appendChild(title);
  noteItem.appendChild(desc);

  const deleteBtn = document.createElement("button");
  deleteBtn.appendChild(document.createTextNode("Delete"));
  noteItem.appendChild(deleteBtn);
  deleteBtn.addEventListener("click", function (e) {
    noteList.removeChild(e.target.parentElement);

    axios
      .delete(
        `https://crudcrud.com/api/c65068f9f0af4103a9c445fdc7d5e26a/NoteDetails/${note._id}`
      )
      .then((res) => alert("Successfully Deleted"))
      .catch((err) => alert(err));
  });

  const noteList = document.querySelector("ul");
  noteList.appendChild(noteItem);
}

window.addEventListener("DOMContentLoaded", function () {
  axios
    .get(
      "https://crudcrud.com/api/c65068f9f0af4103a9c445fdc7d5e26a/NoteDetails"
    )
    .then((response) => {
      response.data.forEach((note) => displayNoteOnScreen(note));

      const count = response.data.length;
      const countNo = document.getElementById("counting");
      countNo.textContent = `Total Notes : ${count}`;
    })
    .catch((err) => console.log("err"));
});

document.getElementById("searchbar").addEventListener("input", function (e) {
  const query = e.target.value.toLowerCase();
  const notes = document.querySelectorAll(".notelist li");

  notes.forEach((note) => {
    const text = note.querySelector("h2").textContent.toLowerCase();
    note.style.display = text.includes(query) ? "block" : "none";
  });
});

module.exports = handleFormSubmit;
