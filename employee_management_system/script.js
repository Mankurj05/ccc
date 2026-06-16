const employeeForm = document.getElementById("employeeForm");
const employeeTableBody = document.getElementById("employeeTableBody");
const searchInput = document.getElementById("searchInput");

let employees = JSON.parse(localStorage.getItem("employees")) || [];

function saveToLocalStorage() {
    localStorage.setItem("employees", JSON.stringify(employees));
}

function renderEmployees(data = employees) {
    employeeTableBody.innerHTML = "";

    data.forEach((employee, index) => {
        employeeTableBody.innerHTML += `
            <tr>
                <td>${employee.name}</td>
                <td>${employee.email}</td>
                <td>${employee.department}</td>
                <td>₹${employee.salary}</td>
                <td>
                    <button class="edit-btn" onclick="editEmployee(${index})">
                        Edit
                    </button>
                    <button class="delete-btn" onclick="deleteEmployee(${index})">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });
}

employeeForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const department = document.getElementById("department").value;
    const salary = document.getElementById("salary").value;
    const employeeIndex = document.getElementById("employeeIndex").value;

    const employee = {
        name,
        email,
        department,
        salary
    };

    if (employeeIndex === "") {
        employees.push(employee);
    } else {
        employees[employeeIndex] = employee;
    }

    saveToLocalStorage();
    renderEmployees();

    employeeForm.reset();
    document.getElementById("employeeIndex").value = "";
});

function editEmployee(index) {
    const employee = employees[index];

    document.getElementById("name").value = employee.name;
    document.getElementById("email").value = employee.email;
    document.getElementById("department").value = employee.department;
    document.getElementById("salary").value = employee.salary;
    document.getElementById("employeeIndex").value = index;
}

function deleteEmployee(index) {
    if (confirm("Are you sure you want to delete this employee?")) {
        employees.splice(index, 1);
        saveToLocalStorage();
        renderEmployees();
    }
}

searchInput.addEventListener("keyup", () => {
    const searchValue = searchInput.value.toLowerCase();

    const filteredEmployees = employees.filter(emp =>
        emp.name.toLowerCase().includes(searchValue)
    );

    renderEmployees(filteredEmployees);
});

renderEmployees();