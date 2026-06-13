const form = document.getElementById("studentForm");
const tableBody = document.querySelector("#studentTable tbody");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const roll = document.getElementById("roll").value;
    const email = document.getElementById("email").value;
    const studentClass = document.getElementById("studentClass").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${name}</td>
        <td>${roll}</td>
        <td>${email}</td>
        <td>${studentClass}</td>
        <td>${phone}</td>
        <td>${address}</td>
        <td>
            <button class="delete-btn">Delete</button>
        </td>
    `;

    tableBody.appendChild(row);

    const deleteBtn = row.querySelector(".delete-btn");

    deleteBtn.addEventListener("click", function() {
        row.remove();
    });

    form.reset();
});