let notes = []; // Array to store notes

// Function to display notes
function displayNotes() {
    const entriesNav = document.querySelector('.entries-nav');
    entriesNav.innerHTML = ''; // Clear existing notes

    // Sort notes by date
    notes.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort in descending order

    notes.forEach((note, index) => {
        const noteDiv = document.createElement('div');
        noteDiv.classList.add('note');
        noteDiv.innerHTML = `
            <h3>${note.title} - <span>${note.mood}</span></h3>
            <button class="delete-button" onclick="deleteNote(${index})">Delete</button>
            <div class="note-content" data-index="${index}" style="display: none;">
                <p>Date: ${note.date}</p>
                <p>${note.text}</p>
            </div>
        `;
        noteDiv.onclick = () => toggleNoteContent(index); // Toggle content on click
        entriesNav.appendChild(noteDiv);
    });
}

// Function to toggle note content visibility
function toggleNoteContent(index) {
    const entriesNav = document.querySelector('.entries-nav');
    const noteContent = entriesNav.querySelector(`.note-content[data-index="${index}"]`);

    if (noteContent) {
        // Toggle the visibility of the note content
        noteContent.style.display = noteContent.style.display === 'none' ? 'block' : 'none';
    }
}

// Function to delete a note
function deleteNote(index) {
    notes.splice(index, 1); // Remove the note from the array
    displayNotes(); // Refresh the displayed notes
}

// Add event listener to handle form submission
document.getElementById('entryForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    const title = document.querySelector('.entry-title').value;
    const date = document.querySelector('.entry-date').value;
    const text = document.querySelector('.entry-textbox').value;
    const mood = document.querySelector('.mood-selector').value; // Get selected mood

    // Create a new note entry
    const noteEntry = { title, date, text, mood };
    notes.push(noteEntry); // Save the note to the array

    // Display the notes
    displayNotes();

    // Clear the form
    document.getElementById('entryForm').reset();
});