import { all } from 'redux-saga/effects';
import {sagas} from "./sagas.tsx";

export default function* rootSaga() {
    yield all(sagas);
}