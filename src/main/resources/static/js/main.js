const usersList = document.querySelector('.users-list');
const addNewUser = document.querySelector('.add-new-user');

function getUsers() {
    let output = ''
    const getUsersTable = (users) => {
        users.forEach(user => {
            console.log(user);
            output += `
                <tr id="` + user.id + `">
                    <td>${user.id}</td>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>${user.roles.map(role => role.name)}</td>
                    <td><button class="btn btn-info" type="button" data-toggle="modal" data-target="#editModal" onclick="editModal(${user.id})">Edit</button></td>
                    <td><button class="btn btn-danger" type="button" data-toggle="modal" data-target="#deleteModal" onclick="deleteModal(${user.id})">Delete</button></td>
                </tr>
            `;
        });
        usersList.innerHTML = output;
    }

    fetch('http://localhost:8080/api/admin')
        .then(response => response.json())
        .then(data => getUsersTable(data));
}

function addUser() {
    let username = document.getElementById('username-new').value;
    let email = document.getElementById('email-new').value;
    let password = document.getElementById('password-new').value;

    let newUser = {
        username: username,
        email: email,
        password: password,
        roles: getRolesForNewUser()
    }

    fetch('http://localhost:8080/api/new', {
        method: 'POST',
        headers: {"Content-Type": "application/json; charset=UTF-8"},
        body: JSON.stringify(newUser)
    })
        .then(() => {
            document.getElementById("usersTable").click();
        })
}


// получение юзера в модальном окне edit
function editModal(id) {
    fetch('http://localhost:8080/api/' + id)
        .then(res => res.json())
        .then(user => {
            $('#id').val(user.id)
            $('#username').val(user.username)
            $('#email').val(user.email)
            $('#password').val(user.password)
            $('#roles').val(user.roles.map(role => role.name))
        })
}

function editUser() {
    let id = document.getElementById('id').value;
    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    let userForUpdate = {
        id: id,
        username: username,
        email: email,
        password: password,
        roles: getRolesForUpdate()
    }

    fetch(`http://localhost:8080/api/update/`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json;charset=UTF-8'},
        body: JSON.stringify(userForUpdate)
    })
        .then(res => res.json())
        .then(updatedUser => {
            $("#editModal .close").click();
            $('#' + updatedUser.id).replaceWith(`<tr id=` + updatedUser.id + `>` +
                `<td>` + updatedUser.id + `</td>` +
                `<td>` + updatedUser.username + `</td>` +
                `<td>` + updatedUser.email + `</td>` +
                `<td>` + updatedUser.roles.map(role => role.name) + `</td>` +
                `<td><button class="btn btn-info" type="button" data-toggle="modal" data-target="#editModal" onclick="editModal(${updatedUser.id})">Edit</button></td>
                 <td><button class="btn btn-danger" type="button" data-toggle="modal" data-target="#deleteModal" onclick="deleteModal(${updatedUser.id})">Delete</button></td></tr>`
            );
        })
}


// получение юзера в модальном окне delete
function deleteModal(id) {
    fetch('http://localhost:8080/api/' + id)
        .then(res => res.json())
        .then(user => {
            $('#id1').val(user.id)
            $('#username1').val(user.username)
            $('#email1').val(user.email)
            $('#password1').val(user.password)
            $('#roles1').val(user.roles.map(role => role.name))
        })
}

function deleteUser() {
    let id = document.getElementById('id1').value;
    fetch(`http://localhost:8080/api/` + id, {
        method: 'DELETE'
    })
        .then(() => {
            $("#" + id).remove();
            $("#deleteModal .close").click();
        })
}



function getRolesForUpdate() {
    let allRoles = [];
    $.each($("select[name='existingRoles'] option:selected"), function () {
        let role = {};
        role.name = $(this).attr('value');
        if (role.name === 'ROLE_ADMIN') {
            role.id = 1;
        } else {
            role.id = 2;
        }
        allRoles.push(role);
        console.log("role: " + JSON.stringify(role));
    });
    return allRoles;
}

function getRolesForNewUser() {
    let allRolesNew = [];
    $.each($("select[name='newRoles'] option:selected"), function () {
        let role1 = {};
        role1.name = $(this).attr('value');
        if (role1.name === 'ROLE_ADMIN') {
            role1.id = 1;
        } else {
            role1.id = 2;
        }
        allRolesNew.push(role1);
        console.log("role: " + JSON.stringify(role1));
    });
    return allRolesNew;
}