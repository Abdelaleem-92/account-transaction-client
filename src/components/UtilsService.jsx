const getAllUserssUrl = 'http://localhost:8080/api/users';
const signinUrl = 'http://localhost:8080/api/auth/signin';
const addAccountUrl = 'http://localhost:8080/api/accounts/';
const username = 'capgemini_1';
const password = 'capgemini';

export function getAllUsers() {
    return new Promise((resolve) => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        };

        console.log('TOKEN::::' + localStorage.getItem("token"));
        const usersData = fetch(getAllUserssUrl, requestOptions)
            .then(
                response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('error fetching Users');
                    }
                }
            )
            .then(data => {
                return data;
            }).catch((error) => {
                return null;
            })

        setTimeout(() => {
            resolve(usersData);
            ;
        }, 1000
        );
    });

}

export function addAccount(addAccountReq) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
        body: JSON.stringify(addAccountReq)
    };

    const status = fetch(addAccountUrl, requestOptions)
        .then(
            response => {
                if (response.ok) {
                    return true;
                } else {
                    throw new Error('error adding new account');
                }
            }
        )
        .catch((error) => {
            return false;
        })
    return status;
}

export function saveTokenToLocalStorage() {
    return new Promise((resolve) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    "username": localStorage.getItem("username") ? localStorage.getItem("username") : username,
                    "password": password
                }
            )
        };

        fetch(signinUrl, requestOptions)
            .then(
                response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('error fetching Users');
                    }
                }
            )
            .then(data => {
                localStorage.setItem("token", data.token);
            }).catch((error) => {
                localStorage.removeItem("token");
            })

        setTimeout(() => {
            resolve();
            ;
        }, 1000
        );
    });
}
