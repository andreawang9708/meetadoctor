import { API_BASE_URL, POLL_LIST_SIZE, ACCESS_TOKEN, APPOINTMENT_LIST_SIZE, RESERVATION_LIST_SIZE } from '../constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response =>
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

export function getAllPolls(page, size) {
    page = page || 0;
    size = size || POLL_LIST_SIZE;

    return request({
        url: API_BASE_URL + "/polls?page=" + page + "&size=" + size,
        method: 'GET'
    });
}

export function getAllFeedbacks(page, size) {
    page = page || 0;
    size = size || POLL_LIST_SIZE;

    return request({
        url: API_BASE_URL + "/feedbacks?page=" + page + "&size=" + size,
        method: 'GET'
    });
}

export function createPoll(pollData) {
    return request({
        url: API_BASE_URL + "/polls",
        method: 'POST',
        body: JSON.stringify(pollData)
    });
}

export function createFeedback(feedbackData) {
	console.log(feedbackData);
	return request({
        url: API_BASE_URL + "/feedbacks",
        method: 'POST',
        body: JSON.stringify(feedbackData)
    });
}

export function getSingleFeedback(feedbackId) {
	console.log(feedbackId);
	return request({
        url: API_BASE_URL + "/feedbacks/"+ feedbackId,
        method: 'GET'
    });
}

export function getAllFeedback() {
	console.log();
	return request({
        url: API_BASE_URL + "/feedbacks",
        method: 'GET'
    });
}

export function addComment(feedbackId, commentData) {
	return request({
        url: API_BASE_URL + "/feedbacks/" + feedbackId + "/comments",
        method: 'POST',
        body: JSON.stringify(commentData)
    });
}

export function castVote(voteData) {
    return request({
        url: API_BASE_URL + "/polls/" + voteData.pollId + "/votes",
        method: 'POST',
        body: JSON.stringify(voteData)
    });
}

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/signin",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function checkUsernameAvailability(username) {
    return request({
        url: API_BASE_URL + "/user/checkUsernameAvailability?username=" + username,
        method: 'GET'
    });
}

export function checkEmailAvailability(email) {
    return request({
        url: API_BASE_URL + "/user/checkEmailAvailability?email=" + email,
        method: 'GET'
    });
}


export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}

export function getUserProfile(username) {
    return request({
        url: API_BASE_URL + "/users/" + username,
        method: 'GET'
    });
}

export function getUserCreatedPolls(username, page, size) {
    page = page || 0;
    size = size || POLL_LIST_SIZE;

    return request({
        url: API_BASE_URL + "/users/" + username + "/polls?page=" + page + "&size=" + size,
        method: 'GET'
    });
}

export function getUserVotedPolls(username, page, size) {
    page = page || 0;
    size = size || POLL_LIST_SIZE;

    return request({
        url: API_BASE_URL + "/users/" + username + "/votes?page=" + page + "&size=" + size,
        method: 'GET'
    });
}

export function getUserCreatedFeedbacks(username, page, size) {
    page = page || 0;
    size = size || POLL_LIST_SIZE;

    return request({
        url: API_BASE_URL + "/users/" + username + "/feedbacks?page=" + page + "&size=" + size,
        method: 'GET'
    });
}

export function getUserCreatedComments(username, page, size) {
    page = page || 0;
    size = size || POLL_LIST_SIZE;

    return request({
        url: API_BASE_URL + "/users/" + username + "/comments?page=" + page + "&size=" + size,
        method: 'GET'
    });
}
export function getAllAppointments(page, size) {
    page = page || 0;
    size = size || APPOINTMENT_LIST_SIZE;

    return request({
        url: API_BASE_URL + "/appointments?page=" + page + "&size=" + size,
        method: 'GET'
    });
}

export function getAppointmentByDateAndDepartment(date,department,page, size) {
    page = page || 0;
    size = size || POLL_LIST_SIZE;

    return request({
        url: API_BASE_URL + "/appointments/" + department+"/"+date+"?page=" +page + "&size=" + size,
        method: 'GET'
    });
}

export function castReservation(reservationData) {
	console.log(API_BASE_URL + "/appointments/" + reservationData.appointment_id + "/reservations");
    console.log(JSON.stringify(reservationData));
	return request({
        url: API_BASE_URL + "/appointments/" + reservationData.appointment_id + "/reservations",
        method: 'POST',
        body: JSON.stringify(reservationData)
    });
}

export function createAppointment(appointmentData) {
    return request({
        url: API_BASE_URL + "/appointments",
        method: 'POST',
        body: JSON.stringify(appointmentData)
    });

}

export function checkAppointmentAvailability(appointmentId) {
    return request({
        url: API_BASE_URL + "/" + appointmentId+"/checkAppointmentAvailability",
        method: 'GET'
    });
}

export function getPollById(pollId) {

    return request({
        url: API_BASE_URL + "/polls/" + pollId,
        method: 'GET'
    });
}

export function getFeedbackByInfo(hospital, department, name) {

    return request({
        url: API_BASE_URL + "/feedbacks/hospital/" + hospital + "/department/" + department + "/name/" + name,
        method: 'GET'
    });
}

export function getAppointmentDetails(appointmentId) {
    return request({
        url: API_BASE_URL + "/appointments/" + appointmentId + "/details",
        method: 'GET'
    });
}
export function getUserReservedAppointments(username,page,size) {
    page = page || 0;
    size = size || RESERVATION_LIST_SIZE;

    return request({
        url:API_BASE_URL + "/users/" + username + "/reservations?page=" + page + "&size=" + size,
        method: 'GET'
    });

}
