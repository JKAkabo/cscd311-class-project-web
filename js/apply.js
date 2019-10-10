let roomSelection = {
    data: {
        hallId: '',
        roomId: ''
    },
    getHallId: function () { return this.data.hallId },
    getRoomId: function () { return this.data.hallId },
    setHallId: function (hallId) { this.data.hallId = hallId; this.hallIdChangeListener() },
    setRoomId: function (roomId) { this.data.roomId = roomId },
    hallIdChangeListener: function () { },
    registerHallIdChangeListener: function (listener) { this.hallIdChangeListener = listener; this.hallIdChangeListener() }
}

let studentDetails = {
    data: {

    },
    getFullName: function () { return this.data.firstName + ' ' + this.data.lastName },
    getIdNumber: function () { return this.data.idNumber },
    getGender: function () { return this.data.gender },
    getRoom: function () { return this.data.roomId },
    getStatus: function () {
        if (typeof this.getRoom() == 'undefined')
            return 'Not Assigned'
        else
            return 'Assigned'
    }
}

window.onload = () => {
    loadStudentDetails();
    loadHalls();
    routeGuard();

    roomSelection.registerHallIdChangeListener(loadAvailableRoomsInHall)

    let applyBtn = document.querySelector('#apply-btn');
    let hallsDropdown = document.querySelector('#halls-dropdown');
    let roomsDropdown = document.querySelector('#rooms-dropdown');
    let logoutBtn = document.querySelector('#logout-btn');
    let viewReportBtn = document.querySelector('#view-report-btn');

    hallsDropdown.onchange = () => {
        if (hallsDropdown.options[hallsDropdown.selectedIndex].hasAttribute('value'))
            roomSelection.setHallId(hallsDropdown.options[hallsDropdown.selectedIndex].value);
        else
            roomSelection.setHallId('');
    }

    roomsDropdown.onchange = () => {
        if (roomsDropdown.options[roomsDropdown.selectedIndex].hasAttribute('value'))
            roomSelection.setRoomId(roomsDropdown.options[roomsDropdown.selectedIndex].value);
        else
            roomSelection.setRoomId('');
    }

    applyBtn.onclick = (e) => {
        e.preventDefault();
        
        if (roomSelection.getRoomId() != '') {
        postRoomSelection(roomSelection.getRoomId())
            .then(status => location.reload())
            .catch(err => console.log("Failed"));
        }
    };

    logoutBtn.onclick = (e) => {
        e.preventDefault();

        logout();
    };

    viewReportBtn.onclick = (e) => {
        e.preventDefault();

        location.href = 'http://' + location.host + '/report.html';
    }
}
