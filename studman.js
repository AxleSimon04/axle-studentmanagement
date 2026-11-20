
// Load Saved Students.
let students = JSON.parse(localStorage.getItem('students')) || [];
let editingId = null;

// Save Students to Browser Storage.
function saveStudents() {
    localStorage.setItem('students', JSON.stringify(students));
}


// HTML Elements

const studentForm = document.querySelector('#studentForm');

const studentName = document.querySelector('#studentName');

const studentEmail = document.querySelector('#studentEmail');

const studentProgram = document.querySelector('#studentProgram');

const studentList = document.querySelector('#studentList');

const submitBtn = document.querySelector('#submitBtn');

const cancelBtn = document.querySelector('#cancelBtn');


// Display Students

function displayStudents() {

    studentList.innerHTML = '';

    students.forEach(function(student) {

        // Create table row
        const row = document.createElement('tr');

        // Create table cells
        const nameCell = document.createElement('td');
        nameCell.textContent = student.name;

        const emailCell = document.createElement('td');
        emailCell.textContent = student.email;

        const programCell = document.createElement('td');
        programCell.textContent = student.program;

        const actionCell = document.createElement('td');


        // Create Edit Button
        const editBtn = document.createElement('button');

        editBtn.textContent = 'Edit';
        editBtn.type = 'button';
        editBtn.classList.add('editBtn');


        // Edit Student
        editBtn.addEventListener('click', function() {

            editingId = student.id;

            studentName.value = student.name;

            studentEmail.value = student.email;

            studentProgram.value = student.program;

            submitBtn.textContent = 'Update Student';

            cancelBtn.hidden = false;

            studentName.focus();

        });


        // Create Delete Button
        const deleteBtn = document.createElement('button');

        deleteBtn.textContent = 'Delete';
        deleteBtn.type = 'button';
        deleteBtn.classList.add('deleteBtn');


        // Delete Student
        deleteBtn.addEventListener('click', function() {

            if (editingId === student.id) {
                resetForm();
            }

            students = students.filter(function(s) {
                return s.id !== student.id;
            });

            saveStudents();

            displayStudents();

        });


        // Add buttons to action cell
        actionCell.appendChild(editBtn);

        actionCell.appendChild(deleteBtn);


        // Add cells to row
        row.appendChild(nameCell);

        row.appendChild(emailCell);

        row.appendChild(programCell);

        row.appendChild(actionCell);


        // Add row to table
        studentList.appendChild(row);

    });

}


// Add or Update Student

studentForm.addEventListener('submit', function(event) {

    event.preventDefault();

    const name = studentName.value.trim();

    const email = studentEmail.value.trim();

    const program = studentProgram.value;


    if (!name || !email || !program) {
        return;
    }


    // Check if Editing
    if (editingId !== null) {

        const student = students.find(function(s) {
            return s.id === editingId;
        });

        if (student) {

            student.name = name;

            student.email = email;

            student.program = program;

        }

    } else {

        // Create New Student
        const newStudent = {

            id: Date.now(),

            name: name,

            email: email,

            program: program

        };

        students.push(newStudent);

    }


    // Save and Display
    saveStudents();

    displayStudents();

    resetForm();

});


// Cancel Editing

cancelBtn.addEventListener('click', function() {

    resetForm();

});


// Reset Form

function resetForm() {

    studentName.value = '';

    studentEmail.value = '';

    studentProgram.value = '';

    editingId = null;

    submitBtn.textContent = 'Add Student';

    cancelBtn.hidden = true;

}


// Display Previously Saved Students
displayStudents();
