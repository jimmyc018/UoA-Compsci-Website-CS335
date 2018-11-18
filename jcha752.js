/* Name: Jimmy Chun Yew Chan*/
/* ID: 8302265*/
/* UPI: JCHA752*/

/*Function that refresh the displayed pages*/
function refreshDisplayScreen() {
    document.getElementById("compsciHomePage").style.display = "none";
    document.getElementById("courses").style.display = "none";
    document.getElementById("compsciStaff").style.display = "none";
    document.getElementById("news").style.display = "none";
	document.getElementById("notices").style.display = "none";
	document.getElementById("register").style.display = "none";
	document.getElementById("itemlist").style.display = "none";
	document.getElementById("compsciGuestbook").style.display = "none";
}

/* Function Page for UOA COMPSCI Home Page*/
function compsciHomeDisplay() {
	refreshDisplayScreen();
	document.getElementById("computersciHeading").innerHTML = "Computer Science @ UOA"; /*this display the heading of the page*/
	document.getElementById("compsciHomePage").style.display = "block";
}

/* Function Page for UOA COMPSCI Courses Page*/
function compsciCoursesDisplay() {
    refreshDisplayScreen();
    document.getElementById("computersciHeading").innerHTML = "Computer Science Departmet Courses"; /*this display the heading of the page*/
    document.getElementById("courses").style.display = "block";
    getCompsciCoursesList();
}

/* Function Page for UOA Staff Home Page*/
function compsciStaffDisplay() {
	refreshDisplayScreen();
	document.getElementById("computersciHeading").innerHTML = "Computer Science Department Staff"; /*this display the heading of the page*/
	document.getElementById("compsciStaff").style.display = "block";
    getCompsciStaffMembers();
}

/* Function Page for UOA COMPSCI News Page*/
function compsciNewsDisplay() {
	refreshDisplayScreen();
	document.getElementById("computersciHeading").innerHTML = "Computer Science Department News"; /*this display the heading of the page*/
	document.getElementById("news").style.display = "block";
	getCompsciNewsFeed("news");
}

/* Function Page for UOA COMPSCI Notice Page*/
function compsciNoticesDisplay() {
	refreshDisplayScreen();
	document.getElementById("computersciHeading").innerHTML = "Computer Science Department Notices"; /*this display the heading of the page*/
	document.getElementById("notices").style.display = "block";
	getCompsciNoticesFeed("notices");
}

/* Function Page for UOA COMPSCI Register Page*/
function compsciRegisterDisplay() {
	refreshDisplayScreen();
	document.getElementById("computersciHeading").innerHTML = "Computer Science Department Register"; /*this display the heading of the page*/
	document.getElementById("register").style.display = "block";
}

/* Function Page for UOA COMPSCI Goodies Page*/
function compsciGoodiesDisplay() {
	refreshDisplayScreen();
	document.getElementById("computersciHeading").innerHTML = "Computer Science Department Goodies"; /*this display the heading of the page*/
	document.getElementById("itemlist").style.display = "block";
	getCompsciGoodies("itemlist");
}

/* Function Page for UOA COMPSCI GuestBook Page*/
function compsciGuestbookDisplay() {
	refreshDisplayScreen();
	document.getElementById("computersciHeading").innerHTML = "Guest Book"; /*this display the heading of the page*/
	document.getElementById("compsciStudentName").value = "";
	document.getElementById("compsciStudentComment").value = "";
	document.getElementById("compsciGuestbook").style.display = "block";
	getCompsciGuestBook();
}

/* GET Function for getting the news feed data from the URI*/
function getCompsciNewsFeed(compsciNews) {
	const newsFeedUri = "http://localhost:8188/UniProxService.svc/" + compsciNews;
	const newsFeedXhr = new XMLHttpRequest();
	newsFeedXhr.open("GET", newsFeedUri, true);
	newsFeedXhr.onload = function() {
		const newFeedParser = new DOMParser();
		let newsResponseType = "text/xml";
		let newsResponse = newsFeedXhr.responseText;
		let newsTable = compsciNews + "Table";
		showCompsciNewsFeed(newFeedParser.parseFromString(newsResponse, newsResponseType), newsTable);
	};
	newsFeedXhr.send();
}

/* SHOW Function for showing the news feed data from the URI*/
function showCompsciNewsFeed(news, newsTableID) {
    const newsCompsciLinkField = news.getElementsByTagName("linkField");
	const newsCompsciDateTimeField = news.getElementsByTagName("pubDateField");
	const newsCompsciTitlefield = news.getElementsByTagName("titleField");
	const newsCompsciDescriptionField = news.getElementsByTagName("descriptionField");
	let newsTableContent = "";
	for (let newFeed = 0; newFeed < newsCompsciTitlefield.length; newFeed++) {
		let newsCompsciLinkField2 = newsCompsciLinkField[newFeed].textContent;
		let newCompsciDateTimeField2 = newsCompsciDateTimeField[newFeed].textContent;
		let newsCompsciTitlefield2 = newsCompsciTitlefield[newFeed].textContent;
		let newsCompsciDescriptionField2 = newsCompsciDescriptionField[newFeed].textContent;
		newsTableContent += "<tr><td class='compsciNewsFeedTitle'><a href='" + newsCompsciLinkField2 + "'>" + newsCompsciTitlefield2 + "</a></td><td class='newsDateTime'>" + newCompsciDateTimeField2 + "</td></tr><tr><td class='newsDescription' colspan='2'>" +
		newsCompsciDescriptionField2 + "</td></tr>\n";
	}
	document.getElementById(newsTableID).innerHTML = newsTableContent;
}

/* GET Function for getting the goodies data from the URI*/
function getCompsciGoodies(itemlist) {
	const compsciGoodiesXhr = new XMLHttpRequest();
	const compsciGoodiesUri = "http://localhost:8188/UniProxService.svc/" + itemlist;
	compsciGoodiesXhr.open("GET", compsciGoodiesUri, true);
	compsciGoodiesXhr.onload = function () {
		const parser = new DOMParser();
		let responseType = "text/xml";
		let goodieResponse = compsciGoodiesXhr.responseText;
		let itemlistTable = itemlist + "Table";
		showCompsciGoodies(parser.parseFromString(goodieResponse, responseType), itemlistTable)
	}
	compsciGoodiesXhr.send();
}

/* SHOW Function for showing your goodies from the URI*/
function showCompsciGoodies(goodies, itemlistTable) {
	let goodiesTableContent = "<tr><th>Software Cover</th><th>Software Name</th><th>Download Link</th></tr>\n"
	const goodiesCompsciItemId = goodies.getElementsByTagName("ItemId");
	const goodiesCompsciTitle = goodies.getElementsByTagName("Title");
	const goodiesCompsciVersion = goodies.getElementsByTagName("Version");
	for (let goodies = 0; goodies < goodiesCompsciVersion.length; goodies++) {
		let newGoodiesCompsciItemId = goodiesCompsciItemId[goodies].textContent;
		let newGoodiesCompsciTitle = goodiesCompsciTitle[goodies].textContent;
		let newGoodiesCompsciVersion = goodiesCompsciVersion[goodies].textContent;
		goodiesTableContent += "<tr><td class ='compsciGoodiesImage'>" + "<img src='http://localhost:8188/UniProxService.svc/img?id=" + newGoodiesCompsciItemId + "'/></td><td class='compsciGoodiesTitle'>" + newGoodiesCompsciTitle
		 + " (" + newGoodiesCompsciVersion + ")" + "</td><td class='compsciGoodiesDownload'><button id=" + newGoodiesCompsciItemId + " onclick='buyCompsciGoodies(this.id)'>Download</button></td></tr>\n";
	}
	document.getElementById(itemlistTable).innerHTML = goodiesTableContent;
}

/* Register Function to Register your own CS@UoA Account*/
function compsciRegister() {
	const compsciRegisterUri = "http://localhost:8188/UniProxService.svc/register";
	const compsciRegisterXhr = new XMLHttpRequest();
	compsciRegisterXhr.open("POST", compsciRegisterUri, true);
	compsciRegisterXhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
	let compsciAddressRegister = document.getElementById("compsciAddressField").value;
	let compsciUsernameRegister = document.getElementById("compsciUsernameField").value;
	let compsciPasswordRegister = document.getElementById("compsciPasswordField").value;
	const compsciUser = {Address: compsciAddressRegister, Name: compsciUsernameRegister, Password: compsciPasswordRegister};
	compsciRegisterXhr.onload = function () {
		alert(compsciRegisterXhr.responseText);
	}
	compsciRegisterXhr.send(JSON.stringify(compsciUser));
}

/* Buy Function for Goodies Purchases*/
function buyCompsciGoodies(goodiesID) {
	var url = "http://localhost:8189/Service.svc/dl?id=" + goodiesID;
    document.location.href = url;
}

/* Search Function For Finding Your Favourite Goodies*/
function compsciGoodiesSearchFunction() {
	let goodiesSearchBarUserInput = document.getElementById("compsciGoodiesSearchBar");
	let goodiesSearchBarFilter = goodiesSearchBarUserInput.value.toUpperCase();
	let goodiesSearchBarTable = document.getElementById("itemlistTable");
	let getGoodiesSearchTable = goodiesSearchBarTable.getElementsByTagName("tr");
	for (goodiesSearch = 0; goodiesSearch < getGoodiesSearchTable.length; goodiesSearch++) {
		let getGoodiesElementSearch = getGoodiesSearchTable[goodiesSearch].getElementsByTagName("td")[1];
		if (getGoodiesElementSearch) {
			if (getGoodiesElementSearch.innerHTML.toUpperCase().indexOf(goodiesSearchBarFilter) > - 1) {
				getGoodiesSearchTable[goodiesSearch].style.display = "";
			}
			else {
				getGoodiesSearchTable[goodiesSearch].style.display = "none";
			}
		}
	}
}

/* GET Function for COMPSCI GuestBook Page*/
function getCompsciGuestBook() {
	const compsciGuestBookXhr = new XMLHttpRequest();
	const compsciGuestBookUri = "http://localhost:8188/UniProxService.svc/htmlcomments";
	compsciGuestBookXhr.open("GET", compsciGuestBookUri, true);
	compsciGuestBookXhr.onload = function() {
		const compsciGuestBookParser = new DOMParser();
		let response = compsciGuestBookXhr.responseText;
		let typeOfResponse = "text/html";
		let getGuestBookParser = compsciGuestBookParser.parseFromString(response, typeOfResponse);
		showCompsciGuestBook(getGuestBookParser);
	};
	compsciGuestBookXhr.send();
}

/* SHOW Function for COMPSCI GuestBook Page*/
function showCompsciGuestBook(compsciGuestBook) {
	const compsciGuestBookShow = compsciGuestBook.getElementsByTagName("p");
	let showCompciGuestBookUoa = "";
	for (let compsciGuest = 0; compsciGuest < compsciGuestBookShow.length; compsciGuest++) 
		showCompciGuestBookUoa += compsciGuestBookShow[compsciGuest].outerHTML;
		document.getElementById("compsciStudentGuestBook").innerHTML = showCompciGuestBookUoa;
}

/* POST Function for COMPSCI GuestBook Page*/
function postCompsciGuestBook() {
	if (document.getElementById("compsciStudentComment").value.trim() === "" || document.getElementById("compsciStudentName").value.trim() === "")
		alert("Please complete the form to submit feedback !!");
	else {
		const postUoaCompsciFeedbackUri = "http://localhost:8188/UniProxService.svc/comment?name=" + document.getElementById("compsciStudentName").value.trim();
		const postCompsciGuestBookXhr= new XMLHttpRequest();
		postCompsciGuestBookXhr.open("POST", postUoaCompsciFeedbackUri, true);
		postCompsciGuestBookXhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
		postCompsciGuestBookXhr.onload = function() {
			alert("Your comments have been submitted sucessfully!!!");
			compsciGuestbookDisplay();
		};
		let postGuestBookItem = document.getElementById("compsciStudentComment").value.trim();
		postCompsciGuestBookXhr.send(JSON.stringify(postGuestBookItem));
	}
}

/* GET Function for getting the Staff Members data from the URI*/
function getCompsciStaffMembers() {
    const compsciStaffXhr = new XMLHttpRequest();
    const compsciStaffUri = "http://localhost:8188/UniProxService.svc/people";
    compsciStaffXhr.open("GET", compsciStaffUri, true);
    document.getElementById("compsciStaffTable").innerHTML = "<tr><th>Staff Photo</th><th>Staff Name</th><th> Staff Contact</th></tr>\n";
	compsciStaffXhr.onload = function() {
		const staffMemberResponse = JSON.parse(compsciStaffXhr.responseText);
		const compsciStaffInfo = (staffMemberResponse).list;
		for (let staffCompsci = 0; staffCompsci < compsciStaffInfo.length; staffCompsci++)
			if (compsciStaffInfo[staffCompsci].jobcodes[0].substring(0, 2) == "A0")
            getCompsciStaff(compsciStaffInfo[staffCompsci].profileUrl[0], compsciStaffInfo[staffCompsci].jobtitles);
	};
	compsciStaffXhr.send();
}

/* GET Function for getting the Staff Members data from the URI*/
function getCompsciStaff(compsciStaffID, jobtitles) {
    const getStaffXhr2 = new XMLHttpRequest();
	const StaffUri = "http://localhost:8188/UniProxService.svc/person?u=" + compsciStaffID;
	getStaffXhr2.open("GET", StaffUri, true);
	getStaffXhr2.onload = function() {
		const staffResponse = JSON.parse(getStaffXhr2.responseText)
		showCompsciStaff(compsciStaffID, staffResponse, jobtitles);
	};
	getStaffXhr2.send();
}

/* SHOW Function for showing the Staff Member data from the URI*/
function showCompsciStaff(compsciStaffID, staff, jobtitles) {
	let uoaStaffTableContent = "<tr><td class='compsciStaffPhoto'><img class='staffImage' src='https://unidirectory.auckland.ac.nz/" + staff.image + "'></img></td><td class='uoaStaffName'><p>" + staff.fullName + "</p><p>" + jobtitles[0];
	if (jobtitles.length > 1) for (let showStaff = 1; showStaff < jobtitles.length; showStaff++) uoaStaffTableContent += ", " + jobtitles[showStaff];
	uoaStaffTableContent += "</p></td><td class='uoaStaffContact'>";
	if (staff.phoneNumbers[0].phone !== undefined) {
		let staffPhoneNumber = uoaStaffTableContent += "<a href='tel:" + staff.phoneNumbers[0].phone + "'>&#9990;</a>";
		staffPhoneNumber;
	} 
	if (staff.emailAddresses[0] !== undefined) {
		let staffEmail = uoaStaffTableContent += "<a href='mailto:" + staff.emailAddresses[0] + "'>&#128387;</a>";
		staffEmail;
	};
	uoaStaffTableContent += "<a href='http://localhost:8188/UniProxService.svc/vcard?u=" + compsciStaffID + "'>&#128366;</a></td></tr>\n";
	document.getElementById("compsciStaffTable").innerHTML += uoaStaffTableContent;
}

/* GET Function for getting the Course Lists data from the URI*/
function getCompsciCoursesList() {
	const compsciCoursesXhr = new XMLHttpRequest();
	const compsciCoursesUri = "http://localhost:8188/UniProxService.svc/courses";
	compsciCoursesXhr.open("GET", compsciCoursesUri, true);
	compsciCoursesXhr.onload = function() {
		const coursesResponse = JSON.parse(compsciCoursesXhr.responseText);
		const compsciCoursesInfo = (coursesResponse).data;
		for (let compsciCourses = 0; compsciCourses < compsciCoursesInfo.length; compsciCourses++)
			if(compsciCoursesInfo[compsciCourses].acadCareer.substring(0, 2) == "UC")
			getCompsciCourses(compsciCoursesInfo[compsciCourses].catalogNbr, compsciCoursesInfo[compsciCourses].titleLong, compsciCoursesInfo[compsciCourses].description,
				compsciCoursesInfo[compsciCourses].subject, compsciCoursesInfo[compsciCourses].rqrmntDescr, compsciCoursesInfo[compsciCourses].unitsAcadProg);
	}
	compsciCoursesXhr.send();
}

/* GET Function for getting the Course Lists data from the URI*/
function getCompsciCourses(compsciCourseID, courseTitle, compsciCourseDescription, compsciSubject, compsciCourseRestriction, coursePoint) {
	const getCoursesXhr = new XMLHttpRequest();
	const coursesUri = "http://localhost:8188/UniProxService.svc/course?c=" + compsciCourseID;
	getCoursesXhr.open("GET", coursesUri, true);
	getCoursesXhr.onload = function() {
		const courseReponseTwo = JSON.parse(getCoursesXhr.responseText);
		showCompsciCourse(compsciCourseID, courseReponseTwo, courseTitle, compsciCourseDescription, compsciSubject, compsciCourseRestriction, coursePoint);
	}
	getCoursesXhr.send();
}

/* SHOW Function for showing the Course List data from the URI*/
function showCompsciCourse(courseID, course, courseTitle, compsciCourseDescription, compsciSubject, compsciCourseRestriction, coursePoint) {
	let courseContentTable = "<tr><td class='compsciCoursesTitle'>" + compsciSubject + " " + courseID  + "</td><td class='compsciCoursePoint'>" 
	+ coursePoint + " points" +  "</td></tr><tr><td class='compsciCoursesTitle'>" + courseTitle +  "</td></tr><tr><td class='compsciCourseDescription' colspan='2'>";
	if (compsciCourseDescription !== undefined) {
		courseContentTable += "<p class='compsciCourseDescriptionParagraphStyle'>" + compsciCourseDescription + "</p>";
	} else if (compsciCourseDescription === undefined) {
		courseContentTable += "<p class='compsciCourseDescriptionParagraphStyleElse'>" + "Course description N/A" + "</p>"
	}
	if (compsciCourseRestriction !== undefined) {
		courseContentTable += "<p class='compsciCourseRestrictionParagraphStyle'>" + compsciCourseRestriction + "</p>";
	}
	courseContentTable +=  "</td></tr>\n";

	document.getElementById("coursesTable").innerHTML += courseContentTable;
}

/*TimeTable Function Starts Here*/
/* GET Function for getting the Course TimeTable data from the URI*/
function getCourseTimeTable() {
	const courseIDXhr = new XMLHttpRequest();
	const courseIDUri = "http://localhost:8188/UniProxService.svc/courses";
	courseIDXhr.open("GET", courseIDUri, true);
	document.getElementById("coursesTable").innerHTML = "<tr><th>Course Name</th><th>Lecture</th><th>Labs</th></tr>\n";
	courseIDXhr.onload = function() {
		const coursesIDResponse = JSON.parse(courseIDXhr.responseText);
		const compsciCourseIDInfo = (coursesIDResponse).data;
		for (let courseID = 0; courseID < compsciCourseIDInfo.length; courseID++) {
			getTimeTable(compsciCourseIDInfo[courseID].catalogNbr);
		}
	}
	courseIDXhr.send();	
}

/* GET Function for getting the Course TimeTable data from the URI*/
function getTimeTable(courseTimeTableID) {
	const getTimeTableXhr = new XMLHttpRequest();
	const timeTableUri = "http://localhost:8188/UniProxService.svc/course?c=" + courseTimeTableID;
	getTimeTableXhr.open("GET", timeTableUri, true);
	getTimeTableXhr.setRequestHeader("Content-Type", "application/json")
	getTimeTableXhr.setRequestHeader("Accept", "application/json");
	getTimeTableXhr.onload = function() {
		const timeTableResponse = JSON.parse(getTimeTableXhr.responseText);
		const courseTimeTableInfo = (timeTableResponse).data;
		for (let timeTable = 0; timeTable < courseTimeTableInfo.length; timeTable++)
			if(courseTimeTableInfo[timeTable].catalogNbr.trim() == courseTimeTableID)
				showCourseTimeTable(courseTimeTableInfo[timeTable].endDate, courseTimeTableInfo[timeTable].catalogNbr, courseTimeTableInfo[timeTable].component, courseTimeTableInfo[timeTable].term, courseTimeTableInfo[timeTable].meetingPatterns);
	}
	getTimeTableXhr.send();
}

/* SHOW Function for showing the Course TimeTable data from the URI*/
function showCourseTimeTable(timeTableID, courseIDTime,components,term, meetingPatterns) {
		let contentTable = "";
		if(term == "1183") {
			if(timeTableID <= "2018-08-12") {
				if(components == "LEC") {
					contentTable += "<tr><td>" +"SEMESTER 1" + meetingPatterns + "</td></tr>";
				}
			}
		}
		document.getElementById("coursesTable").innerHTML += contentTable;
}
//TimeTable Function End Here

/* GET Function for getting the Notices Feed data from the URI*/
function getCompsciNoticesFeed(compsciNotices) {
	const noticesFeeduri = "http://localhost:8188/UniProxService.svc/" + compsciNotices;
	const noticesFeedxhr = new XMLHttpRequest();
	noticesFeedxhr.open("GET", noticesFeeduri, true);
	noticesFeedxhr.onload = function() {
		const noticesFeedParser = new DOMParser();
		let noticeResponseType = "text/html";
		let noticeResponseText = noticesFeedxhr.responseText;
		let noticeTable = compsciNotices + "Table";
		showCompsciNoticesFeed(noticesFeedParser.parseFromString(noticeResponseText, noticeResponseType), noticeTable);
	};
	noticesFeedxhr.send();
}

/* SHOW Function for showing the Notices Feed data from the URI*/
function showCompsciNoticesFeed(notices, noticeTable) {
	let noticesTableContent = "";
	const noticesTitlefield = notices.getElementsByTagName("titleField");
	const noticesLinkField = notices.getElementsByTagName("linkField");
	const noticesDateTimeField = notices.getElementsByTagName("pubDateField");
	const noticesDescriptionField = notices.getElementsByTagName("descriptionField");
	for (let notices = 0; notices < noticesTitlefield.length; notices++) {
		let compsciLinkField = noticesLinkField[notices].textContent;
		let compsciTitleField = noticesTitlefield[notices].textContent;
		let compsciDateField = noticesDateTimeField[notices].textContent;
		let compsciDescriptionField = noticesDescriptionField[notices].textContent
		noticesTableContent += "<tr><td class='compsciNoticesFeedTitle'><a href='" + compsciLinkField + "'>" + compsciTitleField + "</a></td><td class='noticesDateTime'>" + compsciDateField + "</td></tr><tr><td class='noticesDescription' colspan='2'>" + compsciDescriptionField + "</td></tr>\n";
	}
	document.getElementById(noticeTable).innerHTML = noticesTableContent;
}



