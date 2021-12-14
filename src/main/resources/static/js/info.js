const userList = document.querySelector('.user-info');
let output = ''
const url='http://localhost:8080/api/currentUser';



function getUserInfo() {
    fetch('http://localhost:8080/api/currentUser')
        .then(res => res.json())
        .then(user => {
            output += `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.username}</td>
                    <td>${user.name}</td>
                    <td>${user.lastName}</td> 
                    <td>${user.email}</td>
                    <td>${user.roles.map(a => a.role)}</td>
                    
                </tr>
            `;
            userList.innerHTML = output;
        });
}