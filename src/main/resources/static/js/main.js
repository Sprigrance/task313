const usersList = document.querySelector('.users-list');
const addNewUser = document.querySelector('.add-new-user');

let output = ''
const url='http://localhost:8080/api/admin';

const getUsersTable = (users) => {
    users.forEach(user => {
        console.log(user);
        output += `
                <tr id="` + user.id + `">
                    <td>${user.id}</td>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>${user.roles.map(role => role.role)}</td>
                    <td><button class="btn btn-info" type="button" data-toggle="modal" data-target="#editmodal" onclick="editModal(${user.id})">Edit</button></td>
                    <td><button id="show-modal-delete" type="button" class="btn btn-danger" data-toggle="modal" data-target="#deleteuser" onclick="deleteModal(${user.id})">Delete</button></td>
                </tr>
            `;
    });
    usersList.innerHTML = output;
}

function getUsers() {
    fetch(url)
        .then(res => res.json())
        .then(data => getUsersTable(data));
}