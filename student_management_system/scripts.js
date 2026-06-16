const studentForm = document.getElementById("studentForm");
const studentTableBody = document.getElementById("studentTableBody");
const searchInput = document.getElementById("searchInput");

let students = JSON.parse(localStorage.getItem("students")) || [];

function saveToLocalStorage() {
    localStorage.setItem("students", JSON.stringify(students));
}

function calculateGrade(marks) {
    marks = Number(marks);

    if (marks >= 90) return "A+";
    if (marks >= 80) return "A";
    if (marks >= 70) return "B";
    if (marks >= 60) return "C";
    if (marks >= 50) return "D";

    return "F";
}

function renderStudents(data = students) {
    studentTableBody.innerHTML = "";

    data.forEach((student, index) => {
        studentTableBody.innerHTML += `
            <tr>
                <td>${student.studentId}</td>
                <td>${student.name}</td>
                <td>${student.email}</td>
                <td>${student.phone}</td>
                <td>${student.course}</td>
                <td>${student.gender}</td>
                <td>${student.marks}</td>
                <td>${calculateGrade(student.marks)}</td>
                <td>
                    <button class="edit-btn"
                        onclick="editStudent(${index})">
                        Edit
                    </button>

                    <button class="delete-btn"
                        onclick="deleteStudent(${index})">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });
}

studentForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const student = {
        studentId: document.getElementById("studentId").value,
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        course: document.getElementById("course").value,
        gender: document.getElementById("gender").value,
        marks: document.getElementById("marks").value
    };

    const index = document.getElementById("studentIndex").value;

    if(index === ""){
        students.push(student);
    } else {
        students[index] = student;
    }

    saveToLocalStorage();
    renderStudents();

    studentForm.reset();
    document.getElementById("studentIndex").value = "";
});

function editStudent(index) {

    const student = students[index];

    document.getElementById("studentId").value = student.studentId;
    document.getElementById("name").value = student.name;
    document.getElementById("email").value = student.email;
    document.getElementById("phone").value = student.phone;
    document.getElementById("course").value = student.course;
    document.getElementById("gender").value = student.gender;
    document.getElementById("marks").value = student.marks;

    document.getElementById("studentIndex").value = index;
}

function deleteStudent(index) {

    if(confirm("Delete this student?")) {
        students.splice(index,1);

        saveToLocalStorage();
        renderStudents();
    }
}

searchInput.addEventListener("keyup", () => {

    const searchValue = searchInput.value.toLowerCase();

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchValue)
    );

    renderStudents(filteredStudents);
});

renderStudents();