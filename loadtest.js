import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
    vus: 1,          // Virtual Users
    duration: '30s',  // Test duration
};

const API_URL = 'http://localhost:3000';

export default function () {
    // Simulate CRUD operations
    let payload = JSON.stringify({ title: `Todo ${__VU}` });
    let headers = { 'Content-Type': 'application/json' };

    // Create a todo
    let createResponse = http.post(`${API_URL}/todos`, payload, { headers });
    // console.log('Create Response Body:', createResponse.body);
    let todoId = createResponse.json().id;

    // Get all todos
    let getResponse = http.get(API_URL);
    // console.log('Get Response Body:', getResponse.body);

    // Update the created todo
    let updateResponse = http.put(`${API_URL}/todos/${todoId}/update`, JSON.stringify({ title: 'Updated Todo' }), { headers });
    // console.log('Update Response Body:', updateResponse.body);

    // Delete the created todo
    let deleteResponse = http.del(`${API_URL}/todos/${todoId}/delete`);
    // console.log('Delete Response Body:', deleteResponse.body);

    sleep(1);
}
