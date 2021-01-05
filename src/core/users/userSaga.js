import { all, takeEvery, put, fork, call } from "redux-saga/effects";
import userActions from "./userActions";
import { getAllUsers } from "./userService";

export function* getUserssSaga() {
    yield takeEvery(userActions.GET_ALL_USERS, function* (payload) {
        try {
    
            const response = yield call(getAllUsers, payload.payload);
    
            const data = yield call(response.json.bind(response));
            if (data) {
                yield put({
                    type: userActions.GET_ALL_USERS_SUCCESS,
                    data: data
                })
            }
            else {
                yield put({
                    type: userActions.GET_ALL_USERS_ERROR,
                    status: false,
                    message: data.message
                })
            }
        }
        catch (error) {
            yield put({
                type: userActions.FETCH_ERROR,
                status: false,
                message: "Something went wrong..!"
            });
        }
    });
}

export default function* rootSaga() {
    yield all([
        fork(getUserssSaga),
    ]);
}