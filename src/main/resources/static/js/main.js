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
                    <td>${user.roles.map(a => a.role)}</td>
                    <td><button class="btn btn-info" type="button" data-toggle="modal" data-target="#editModal" onclick="editModal(${user.id})">Edit</button></td>
                    <td><button id="show-modal-delete" type="button" class="btn btn-danger" data-toggle="modal" data-target="#deleteModal" onclick="deleteModal(${user.id})">Delete</button></td>
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



function addUser() {
    let username = document.getElementById('username-new').value;
    let email= document.getElementById('email-new').value;
    let password = document.getElementById('password-new').value;
    //let    roles= Array.from(document.getElementById('roles-new').selectedOptions).map(role => role.value);
    //let roles=getUserRoles();

    let newUser = {
        username: username,
        email: email,
        password: password,

        roles: getUserRolesNew()
    }


    //addNewUser.addEventListener('submit', () => {
    fetch('http://localhost:8080/api/new', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(newUser
            // username: document.getElementById('username').value,
            // password: document.getElementById('password').value,
            // name: document.getElementById('name-new').value,
            // lastName: document.getElementById('lastname').value,
            // email: document.getElementById('email').value,
            // roles: Array.from(document.getElementById('roles').selectedOptions).map(options => options.value)
        )
    })
        //  .then(res => res.json())
        // .then(getUsers);
        .then(() => {
            //$('a[href="#tab1"]').tab('show');
            document.getElementById("userstable").click();
            getUsers();
            // let newrow = document.getElementById('userslist').insertRow();
            // let newcell1=newrow.insertCell(0); //вставляем ячейку с индексом 0
            // newcell1.innerText=newUser.id; //заполняем ячейку значением
            // let newcell2=newrow.insertCell(1);
            // newcell2.innerHTML=newUser.username;
            // let newcell3=newrow.insertCell(2);
            // newcell3.innerHTML=newUser.name;
            // let newcell4=newrow.insertCell(3); //вставляем ячейку с индексом 0
            // newcell4.innerText=newUser.lastName; //заполняем ячейку значением
            // let newcell5=newrow.insertCell(4);
            // newcell5.innerHTML=newUser.email;
            // let newcell6=newrow.insertCell(5);
            // newcell6.innerHTML=newUser.role.map(a => a.role);
            // let newcell7=newrow.insertCell(6);
            // newcell7.innerHTML= `<button class="btn btn-info" type="button" data-toggle="modal" data-target="#editmodal"
            //             onClick="editModal(${newUser.id})">Edit</button>`
            // let newcell8=newrow.insertCell(7);
            // newcell8.innerHTML= `<button id="show-modal-delete" type="button" class="btn btn-danger" data-toggle="modal"
            //             data-target="#deleteuser" onClick="deleteModal(${newUser.id})">Delete</button>`



            //setTimeout(getUsers, 5000);
            //document.getElementById("addnewuser").reset();

            // document.getElementById("userstable").click();
            // setTimeout(getUsers, 5000);
            // document.getElementById("addnewuser").reset();
        })

}



// получение юзера в модальном окне delete
function deleteModal(id){
    fetch('http://localhost:8080/api/' + id)
        .then(res => res.json())
        .then(user => {
            $('#id1').val(user.id)
            $('#username1').val(user.username)
            $('#email1').val(user.email)
            $('#roles1').val(user.roles.map(role => role.role))

        })
}

function deleteUser (){
    let user_id = document.getElementById('id1').value;
    fetch(`http://localhost:8080/api/` + user_id, {
        method: 'DELETE'

    })
    $("#" + user_id).remove();
    $("#deleteModal .close").click();
}



// получение юзера в модальном окне edit
function editModal(id){
    fetch('http://localhost:8080/api/' + id)
        .then(res => res.json())
        .then(user => {
            $('#id').val(user.id)
            $('#username').val(user.username)
            $('#email').val(user.email)
            $('#password').val(user.password)
            $('#roles').val(user.roles.map(role => role.role))
        })
}

function editUser (){
    let id = document.getElementById('id').value;
    let username = document.getElementById('username').value;
    let email= document.getElementById('email').value;
    let password = document.getElementById('password').value;
    // let    roles= document.getElementById('roles2').value;

    let updatedUser = {
        id:id,
        username: username,
        email: email,
        password: password,
        roles: getUserRoles()
    }

    fetch(`http://localhost:8080/api/`, {
        method: 'PUT',

        headers: {   'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(updatedUser)
    })

        .then(() => {
            $("#editModal .close").click();
            $('#' + updatedUser.id).replaceWith(`<tr id=` + updatedUser.id + `>` +
                `<td>` + updatedUser.id + `</td>` +
                `<td>` + updatedUser.username + `</td>` +
                `<td>` + updatedUser.email + `</td>` +
                `<td>` + updatedUser.roles.map(a => a.role) + `</td>` +
                `<td> <button class="btn btn-info" type="button" data-toggle="modal" data-target="#editModal" onclick="editModal(${updatedUser.id})">Edit</button></td>
                <td><button id="show-modal-delete" type="button" class="btn btn-danger" data-toggle="modal" data-target="#deleteModal" onclick="deleteModal(${updatedUser.id})">Delete</button></td></tr>`
            );
        })
}




function getUserRoles() {
    let allRoles = [];
    $.each($("select[name='strRoles2'] option:selected"), function () {
        let role = {};
        //role.id = $(this).attr('id');
        role.role = $(this).attr('value');
        if (role.role === 'ROLE_ADMIN') {
            role.id = 1;
        } else {
            role.id = 2;
        }
        //role.authority = $(this).attr('authority');
        allRoles.push(role);
        console.log("role: " + JSON.stringify(role));
    });
    return allRoles;
}

function getUserRolesNew() {
    let allRolesNew = [];
    $.each($("select[name='newRoles'] option:selected"), function () {
        let role1 = {};
        //role1.id = $(this).attr('id1');
        role1.role = $(this).attr('value');
        if (role1.role === 'ROLE_ADMIN') {
            role1.id = 1;
        } else {
            role1.id = 2;
        }
        //role.authority = $(this).attr('authority');
        allRolesNew.push(role1);
        console.log("role: " + JSON.stringify(role1));
    });

    return allRolesNew;
}