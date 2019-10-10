'use strict';

// DOM
const loadHalls = async () => {
    getHalls()
        .then(halls => {
            let hallsDropdown = document.querySelector('#halls-dropdown');
            let dropdownOptions = '<option>Select Hall</option>';
            halls.forEach(hall => {
                let dropdownOption = `<option value="${hall._id}">${hall.name}</option>`;
                dropdownOptions += dropdownOption;
            });
            hallsDropdown.innerHTML = dropdownOptions;
        });
};

const loadAvailableRoomsInHall = async () => {
    let hallsDropdown = document.querySelector('#halls-dropdown');

    if (roomSelection.getHallId() !== '') {
        let roomsDropdown = document.querySelector('#rooms-dropdown');
        getAvailableRoomsByHallId(roomSelection.getHallId())
            .then(rooms => {
                let dropdownOptions = '<option>Select Room</option>';
                rooms.forEach(room => {
                    let dropdownOption = `<option value="${room._id}">${room.number}</option>`;
                    dropdownOptions += dropdownOption;
                });
                roomsDropdown.innerHTML = dropdownOptions;
            });
    }
};

const loadReport = async () => {
    let reportCards = '';

    let halls = await getHalls();

    for (let i = 0; i < halls.length; i++) {
        let rooms = await getRoomsByHallIdIgnoreGender(halls[i]._id);

        halls[i].rooms = rooms;

        for (let j = 0; j < halls[i].rooms.length; j++) {
            let students = await getStudentsByRoomId(halls[i].rooms[j]._id);

            halls[i].rooms[j].students = students;
        }
        reportCards += reportCard(halls[i]);
    }

    let reportWrapper = document.querySelector('#report-wrapper');
    reportWrapper.innerHTML = reportCards;

}

const loadStudentDetails = async () => {
    getStudentDetails()
        .then(data => {
            studentDetails.data = data;
            document.querySelector('#id-number-field').innerHTML = studentDetails.getIdNumber();
            document.querySelector('#full-name-field').innerHTML = studentDetails.getFullName();
            document.querySelector('#gender-field').innerHTML = studentDetails.getGender();
            document.querySelector('#status-field').innerHTML = studentDetails.getStatus();
        });
}

const login = async () => {
    authenticate(credentials.data)
        .then(auth => {
            localStorage.setItem('accessToken', auth.accessToken);
            location.replace('http://' + location.host + '/apply.html');
        })
        .catch(err => {
            console.log(err);
        });
}

const logout =  () => {
    localStorage.removeItem('accessToken');
    location.replace('http://' + location.host + '/login.html');
}

// API
const API_SERVER = 'http://localhost:3000';
const generateRequestHeaders = () => {
    if (localStorage.getItem('accessToken') === null) {
        return {
            'Content-Type': 'application/json'
        }
    } else {
        return {
            'Content-Type': 'application/json',
            'Access-Token': localStorage.getItem('accessToken')
        }
    }
}

const authenticate = async (credentials) => {
    const url = API_SERVER + '/authenticate';
    let response = await fetch(url, { method: 'POST', body: JSON.stringify(credentials), headers: generateRequestHeaders() });
    return await response.json();
}

const getHalls = async () => {
    const url = API_SERVER + '/halls'
    let response = await fetch(url, { headers: generateRequestHeaders() });
    return await response.json();
}

const getRoomsByHallId = async (hallId) => {
    const url = `${API_SERVER}/halls/${hallId}/rooms`;
    let response = await fetch(url, { headers: generateRequestHeaders() });
    return await response.json();
}

const getRoomsByHallIdIgnoreGender = async (hallId) => {
    const url = `${API_SERVER}/halls/${hallId}/rooms?ignoreGender=true`;
    let response = await fetch(url, { headers: generateRequestHeaders() });
    return await response.json();
}

const getAvailableRoomsByHallId = async (hallId) => {
    const url = `${API_SERVER}/halls/${hallId}/rooms?emptyOnly=true`;
    let response = await fetch(url, { headers: generateRequestHeaders() });
    return await response.json();
}

const postRoomSelection = async (roomId) => {
    const url = API_SERVER + '/students';

    let response = await fetch(url, { method: 'PATCH', body: JSON.stringify({ roomId: roomId }), headers: generateRequestHeaders() });
    return await response.json();
}

const getStudentDetails = async () => {
    const url = API_SERVER + '/students?sessionStudentOnly=true';

    let response = await fetch(url, { headers: generateRequestHeaders() });

    return await response.json();
}

const getStudentsByRoomId = async (roomId) => {
    const url = `${API_SERVER}/students?roomId=${roomId}`;

    let response = await fetch(url, { headers: generateRequestHeaders() });
    return await response.json();
}

const routeGuard = () => {
    if (localStorage.getItem('accessToken') === null) {
        location.replace('http://' + location.host + '/login.html');
    }
}