let popUp = document.getElementById("showDetails");
let sectionSelect = document.getElementById("sections");
let sectionValue = sectionSelect.value;
let form = document.getElementById("form");
let sectionSchedule = document.getElementById("sectionSchedule");
let now = new Date();
const currentDay = now.getDay();
const currentHour = now.getHours();
const currentMinute = now.getMinutes();
const currentTime = currentHour * 60 + currentMinute;
const miscellanousScheds = {
    "adminsOffice": adminsOffice,
    "faculty1stfloor": firstFloorFaculty,
    "kitchen": kitchen,
    "frontDesk": frontDesk,
    "bar": bar,
    "clinic": clinic,
    "deansOffice": deansOffice,
    "faculty2ndfloor": secondFloorFaculty,
    "guidance": guidanceRoom,
    "bookstore": bookstore,
    "library": library,
    "tourism": tourismRoom,
    "recordStation": recordStation
}
const currentDaySchedules = {
    "comlab1": scheduleComlab1,
    "comlab2": schedulecomlab2,
    "comlab3": scheduleComlab3,
    "room201": schedule201,
    "room202": schedule202,
    "room203": schedule203,
    "room204": schedule204,
    "room205": schedule205,
    "room205Part2": schedule205,
    "room205Part3": schedule205,
    "room301": schedule301, 
    "room302": schedule302, 
    "room303": schedule303, 
    "room304": schedule304,
    "room305": schedule305,
    "room306": schedule306, 
    "room307": schedule307, 
    "room308": schedule308, 
    "room309": schedule309, 
    "room310": schedule310, 
    "comlab3Part2": scheduleComlab3,
    "room307Part2": schedule307,
};
function formatTime(hour, minute) {
    return `${hour}:${minute.toString().padStart(2, '0')}`;
}  //yung padStart ay naglalagay ng 0 if 1 digit lang ang minute like example: 1 am 5 minutes pag nilagyan mo ng
//   padStart magiging 01 am 05 minutes
// ang padStart (2, '0') yung 2 minamake sure nya na 2 digits/characters long ang data 
// and yung 0 pwede palitan yan ng kahit ano para yun idagdag nya para maging 2

function closeDialog() {
    popUp.classList.add('closing'); //zoom-out effect
    setTimeout(() => {
        popUp.close();
        popUp.classList.remove('open', 'closing');
    }, 300); //transition duration
}

popUp.addEventListener('close', () => {
    popUp.classList.remove('open', 'closing');
});



function showRoomDetails(roomId) {
    const schedule = currentDaySchedules[roomId]; // Get schedule array on roomId
    //yung roomId magapalit ng value based sa pinindot sa HTML
    let scheduleHtml = "";

    // Nagfifilter ng schedule
    const todaySchedule = schedule.filter(arrayVal => parseInt(arrayVal.day) === currentDay);

    if (todaySchedule.length > 0)//maglalabas ng sched from Monday - 1 to saturday - 6,0 yung sunday 
    {
        todaySchedule.forEach((arrayVal, arrayNumber) => {
            const [startHour, startMinute] = arrayVal.startTime.split(":").map(Number);//.split(":") hinahati yung dalawang from the ":"
            const [endHour, endMinute] = arrayVal.endTime.split(":").map(Number);//.map(Number) ginagawang number yung originally String
            
            const startTime = startHour * 60 + startMinute; 
            const endTime = endHour * 60 + endMinute;      

            
            const isCurrent = currentTime >= startTime && currentTime < endTime;

            // Magiging pula yung current sched
            //yung question mark is basically if else
            // example sa baba, ganto: if (isCurrent = true) {popupopup.style.font-weight = 'bold';
            // popupopup.style.color = 'red'; }
            // else {""} ganon
            scheduleHtml += `
            <div class="inthepopup">
        <table class="table" style="width 50%; border-collapse:collapse;">
            <thead>
                <tr>
                    <th style="text-align:center; width:10%">Section</th>
                    <th style="text-align:center; width:10%;">Subject</th>
                    <th style="text-align:center; width:10%;">Time</th>
                </tr>   
            </thead>
            <tbody>
                <tr>
                    <td style="text-align:center; ${isCurrent ? 'font-weight: bold; color: red;' : ''}; padding:5px;">${arrayVal.section}</td>
                    <td style="text-align:center; ${isCurrent ? 'font-weight: bold; color: red;' : ''}; padding:5px;">${arrayVal.subject}</td>
                    <td style="text-align:center; ${isCurrent ? 'font-weight: bold; color: red;' : ''}; padding:5px;">${arrayVal.startTime} - ${arrayVal.endTime}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <hr>`;
            //Vacant checker
        if (arrayNumber < todaySchedule.length - 1) {
            const [nextStartHour, nextStartMinute] = todaySchedule[arrayNumber + 1].startTime.split(":").map(Number);
            const nextStartTime = nextStartHour * 60 + nextStartMinute; // para nasa isang value lang in minutes

            const gap = nextStartTime - endTime;
            if (gap > 0) { // kung may gap edi Vacant sya
                scheduleHtml += `
                <p class="inthepopup">
                    <strong>Vacant Time:</strong> ${formatTime(endHour, endMinute)} - ${formatTime(nextStartHour, nextStartMinute)}
                </p>
                <hr>`;
            } 
        }
    });
    }
    else {
        scheduleHtml = "<p>No schedule available for today.</p>";
    }

    popUp.innerHTML = scheduleHtml; 
    // popUp.style.left = `${event.clientX}px`;
    // popUp.style.top = `${event.clientY}px`;
    popUp.classList.remove('closing');
    popUp.showModal();
    setTimeout(() => {
        popUp.classList.add('open');
    }, 10);
}
function miscOnclick(miscIds) {
    let num=1;
    const schedule = miscellanousScheds[miscIds];
    let scheduleHtml = "";
    const todaySchedule = schedule.filter(arrayVal => parseInt(arrayVal.numm) === num);

    if (todaySchedule.length > 0)//maglalabas ng sched from Monday - 1 to saturday - 6,0 yung sunday 
    {
        todaySchedule.forEach((arrayVal) => {
        scheduleHtml +=`<div class="inthepopup">
        <table class="table" style="width:100%; border-collapse:collapse;">
            <tbody>
                <tr>
                    <td style="text-align:center; padding:5px;">${arrayVal.desc}</td>
                </tr>
            </tbody>
        </table>`;        
    });
    }
    else {
        scheduleHtml = "<p>No schedule available for today.</p>";
    }

    popUp.innerHTML = scheduleHtml; 
    popUp.classList.remove('closing');
    popUp.showModal();
    setTimeout(() => {
        popUp.classList.add('open');
    }, 10);
}

function updateRoomColors() {
    for (const roomNo in currentDaySchedules) {
        const schedule = currentDaySchedules[roomNo];
        const roomElement = document.querySelector(`.${roomNo}`);

        const isRoomInUse = schedule.some(item => {
            if (parseInt(item.day) === currentDay) {
                //same sa taas
                const [startHour, startMinute] = item.startTime.split(":").map(Number);
                const [endHour, endMinute] = item.endTime.split(":").map(Number);
                const start = new Date(now);
                start.setHours(startHour, startMinute, 0);

                const end = new Date(now);
                end.setHours(endHour, endMinute, 0);

                return now >= start && now < end;
            }
            return false;
        });

        if (roomElement) {
            roomElement.style.backgroundColor = isRoomInUse ? "red" : "green";
        }
    }
}
updateRoomColors();
setInterval(updateRoomColors, 60000);





//schedule changer
function updateSchedule(sectionId) {
    const allSchedules = [
        ...scheduleComlab1,
        ...schedulecomlab2,
        ...scheduleComlab3,
        ...schedule201,
        ...schedule202,
        ...schedule203,
        ...schedule204,
        ...schedule205,
        ...schedule301, 
        ...schedule302, 
        ...schedule303, 
        ...schedule304,
        ...schedule305,
        ...schedule306, 
        ...schedule307, 
        ...schedule308, 
        ...schedule309, 
        ...schedule310, 
    ];

    // Filter schedules for the specified section ID and current day
    const filteredSchedules = allSchedules.filter(item => 
        item.section === sectionId && parseInt(item.day) === currentDay
    );

    // Sort the filtered schedules by start time
    filteredSchedules.sort((a, b) => {
        const [startHourA, startMinuteA] = a.startTime.split(":").map(Number);
        const [startHourB, startMinuteB] = b.startTime.split(":").map(Number);
        return (startHourA - startHourB) || (startMinuteA - startMinuteB);
    });
    
    let sectionHtml = "";
    if (filteredSchedules.length > 0) {
        for (let i = 0; i < filteredSchedules.length; i++) {
            const item = filteredSchedules[i];
            const [startHour, startMinute] = item.startTime.split(":").map(Number);
            const [endHour, endMinute] = item.endTime.split(":").map(Number);

            // Add the current schedule to the HTML
            sectionHtml += `
                <p><strong>Subject:</strong> ${item.subject}</p>
                <p><strong>Time:</strong> ${formatTime(startHour, startMinute)} - ${formatTime(endHour, endMinute)}</p>
                <p><strong>Room:</strong>${item.room}</p>
                <hr>`;

            // Check for vacant time if there is a next schedule
            if (i < filteredSchedules.length - 1) {
                const nextItem = filteredSchedules[i + 1];
                const [nextStartHour, nextStartMinute] = nextItem.startTime.split(":").map(Number);
                const nextStartTime = nextStartHour * 60 + nextStartMinute; 
                const currentEndTime = endHour * 60 + endMinute;          

                // same lang dun sa isa
                const gap = nextStartTime - currentEndTime;
                if (gap > 0) {
                    sectionHtml += `
                        <p><strong>Vacant Time:</strong> ${formatTime(endHour, endMinute)} - ${formatTime(nextStartHour, nextStartMinute)}</p>
                        <hr>`;
                }
            }
        }
    }  else {
        sectionHtml = `<p>No schedule found for section ${sectionId}.</p>`;
    }

    // Display the sorted schedule in the target element
    sectionSchedule.innerHTML = sectionHtml;
}












    //default naka sara section para di agad magbubukas yung dropdowninadropdown
    let isMainDropdownOpen = false;
    
    //pinakamaindropdown
    function toggleDropdown(event) {
        event.preventDefault();
        const dropdown = document.querySelector("#sections ul.dropdown");
        isMainDropdownOpen = !isMainDropdownOpen;
        dropdown.style.display = isMainDropdownOpen ? "block" : "none";
        
        if (isMainDropdownOpen) {
            document.querySelectorAll(".dropdowninadropdown").forEach(subMenu => {
                subMenu.style.display = "none";
            });
        }
    }
    //dropdowninadropdown
    function toggleSubDropdown(event) {
        event.preventDefault();
        const subDropdown = event.target.nextElementSibling;
        
        if (subDropdown && subDropdown.classList.contains("dropdowninadropdown")) {
            
            document.querySelectorAll(".dropdowninadropdown").forEach(subMenu => {
                if (subMenu !== subDropdown) {
                    subMenu.style.display = "none";
            }
        });
        
        subDropdown.style.display = subDropdown.style.display === "block" ? "none" : "block";
    }
}
//pag nag click sa labas mag sasara lahat ng dropdown
document.addEventListener("click", (e) => {
    const mainDropdown = document.querySelector("#sections ul.dropdown");
    const isClickInsideMain = mainDropdown.contains(e.target) || e.target.closest("#sections > ul > li > a");

    if (!isClickInsideMain) {
        mainDropdown.style.display = "none";
        document.querySelectorAll(".dropdowninadropdown").forEach(subMenu => {
            subMenu.style.display = "none";
        });
        isMainDropdownOpen = false;
    }
});
// connect yung subdropdown ng pag click
document.querySelectorAll("#sections ul.dropdown > li > a").forEach(link => {
    link.addEventListener("click", toggleSubDropdown);
});


let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slidesDisp");
    let dots = document.getElementsByClassName("dot");

    if (n > slides.length) {
        slideIndex = 1; // Wrap back to the first slide
    }
    if (n < 1) {
        slideIndex = slides.length; // Wrap to the last slide
    }

    // Hide all slides initially
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // Remove "active" class from all dots
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    // Show the current slide and add "active" class to the current dot
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}


/*! Image Map Resizer (imageMapResizer.min.js ) - v1.0.10 - 2019-04-10
 *  Desc: Resize HTML imageMap to scaled image.
 *  Copyright: (c) 2019 David J. Bradshaw - dave@bradshaw.net
 *  License: MIT
 */

!function(){"use strict";function r(){function e(){var r={width:u.width/u.naturalWidth,height:u.height/u.naturalHeight},a={width:parseInt(window.getComputedStyle(u,null).getPropertyValue("padding-left"),10),height:parseInt(window.getComputedStyle(u,null).getPropertyValue("padding-top"),10)};i.forEach(function(e,t){var n=0;o[t].coords=e.split(",").map(function(e){var t=1==(n=1-n)?"width":"height";return a[t]+Math.floor(Number(e)*r[t])}).join(",")})}function t(e){return e.coords.replace(/ *, */g,",").replace(/ +/g,",")}function n(){clearTimeout(d),d=setTimeout(e,250)}function r(e){return document.querySelector('img[usemap="'+e+'"]')}var a=this,o=null,i=null,u=null,d=null;"function"!=typeof a._resize?(o=a.getElementsByTagName("area"),i=Array.prototype.map.call(o,t),u=r("#"+a.name)||r(a.name),a._resize=e,u.addEventListener("load",e,!1),window.addEventListener("focus",e,!1),window.addEventListener("resize",n,!1),window.addEventListener("readystatechange",e,!1),document.addEventListener("fullscreenchange",e,!1),u.width===u.naturalWidth&&u.height===u.naturalHeight||e()):a._resize()}function e(){function t(e){e&&(!function(e){if(!e.tagName)throw new TypeError("Object is not a valid DOM element");if("MAP"!==e.tagName.toUpperCase())throw new TypeError("Expected <MAP> tag, found <"+e.tagName+">.")}(e),r.call(e),n.push(e))}var n;return function(e){switch(n=[],typeof e){case"undefined":case"string":Array.prototype.forEach.call(document.querySelectorAll(e||"map"),t);break;case"object":t(e);break;default:throw new TypeError("Unexpected data type ("+typeof e+").")}return n}}"function"==typeof define&&define.amd?define([],e):"object"==typeof module&&"object"==typeof module.exports?module.exports=e():window.imageMapResize=e(),"jQuery"in window&&(window.jQuery.fn.imageMapResize=function(){return this.filter("map").each(r).end()})}();
//# sourceMappingURL=imageMapResizer.map