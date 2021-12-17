const userInfo = document.querySelector('.user-info');

function getUserInfo() {
    let output = ''

    fetch('http://localhost:8080/api/currentUser')
        .then(res => res.json())
        .then(user => {
            console.log(user);
            output += `
                <tr id="` + user.id + `">
                    <td>${user.id}</td>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>${user.roles.map(role => role.name)}</td>
                </tr>
            `;
            userInfo.innerHTML = output;
        });
}