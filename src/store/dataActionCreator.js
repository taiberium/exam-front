import {createAsyncAction} from "redux-promise-middleware-actions";
import request from 'superagent';

export const sendDataActionCreator = createAsyncAction("DATA", (numberString) => {
    return request.post("/data")
        .send({numbers: numberString})
        .then(response => response.body)
        .catch(error => Promise.reject(error.response.body));
});
