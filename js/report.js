    let roomRow = (room) => {
        return `<tr><td>${room.number}</td><td>${room.students[0] ? room.students[0].idNumber : 'N/A'}</td><td>${room.students[1] ? room.students[1].idNumber : 'N/A'}</td><td>${room.students[2] ? room.students[2].idNumber : 'N/A'}</td><td>${room.students[3] ? room.students[3].idNumber : 'N/A'}</td></tr>`
    }
    let reportCard = (hall) => {
         let html = `<div class="card full-width" style="margin: 0 5%;"><h1>${hall.name}</h1><table border="1">`;

         console.log(hall);
         hall.rooms.forEach(room => {
             
             html += roomRow(room);
         });
         html += '</table></div>';

         return html;
    }

    window.onload = () => {
        routeGuard();
        loadReport();
    }