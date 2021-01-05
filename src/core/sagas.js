import { all } from "redux-saga/effects";
import userSagas from "./users/userSaga";

export default function* rootSaga(getState) {
  yield all([ userSagas()]);
}