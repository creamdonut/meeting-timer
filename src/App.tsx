import * as React from "react";
import { useReducer } from "react";
import { useTimer } from "use-timer";

import "./App.css";
import { ActionType, initialState, mainReducer } from "./reducer";

const formattedNumber = (number: number): string => ("0" + number).slice(-2);

const convertSecondsToFormatedTimeString = (time: number): string => {
  const hours = Math.floor(time / 60 / 60);
  const minutes = Math.floor(time / 60) - hours * 60;
  const seconds = time % 60;

  return `${formattedNumber(hours)}:${formattedNumber(
    minutes
  )}:${formattedNumber(seconds)}`;
};

export default function App() {
  const { time, reset, start, pause, advanceTime } = useTimer();

  const [state, dispatch] = useReducer(mainReducer, initialState);

  const onAddNote = () => {
    dispatch({ type: ActionType.ADD, payload: { freezedTime, note } });
    setNote("");
  };

  const [additionalTime, setAdditionalTime] = React.useState(0);
  const [note, setNote] = React.useState("");

  const [editableNoteIdx, setEditableNoteIdx] = React.useState("");

  const [editableNote, setEditableNote] = React.useState("");

  const [freezedTime, setFreezedTime] = React.useState(0);

  const startHandler = () => {
    start();
  };

  const resetHandler = () => {
    reset();
  };

  const pauseHandler = () => {
    pause();
  };

  const changeAddTimeHandler = (e: any) => {
    const addToTime = parseInt(e.target.value);
    setAdditionalTime(addToTime);
  };

  const noteHandler = (e: any) => {
    setNote(e.target.value);
  };

  const focusHandler = () => {
    setFreezedTime(time);
  };

  const onRemoveNote = (id: number) => {
    dispatch({ type: ActionType.REMOVE, payload: { id } });
  };

  const onEditNote = (idx: number) => {
    dispatch({
      type: ActionType.EDIT,
      payload: { id: idx, note: editableNote },
    });

    setNote("");
    setEditableNoteIdx("");
  };

  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginTop: 20,
        }}
        className="mb-3"
      >
        <div className="input-group mb-3">
          <input
            type="number"
            value={additionalTime}
            onChange={changeAddTimeHandler}
            className="form-control"
            placeholder="Seconds to add"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
          <div className="input-group-append">
            <button
              onClick={() => advanceTime(additionalTime)}
              className="btn btn-outline-secondary"
              type="button"
            >
              Add {additionalTime} seconds
            </button>
          </div>
        </div>

        <div className="button-block">
          <button
            type="button"
            className="btn btn-primary button"
            onClick={startHandler}
          >
            Start timer
          </button>
          <button className="btn btn-primary button" onClick={resetHandler}>
            Reset timer
          </button>
          <button className="btn btn-primary button" onClick={pauseHandler}>
            Pause timer
          </button>
        </div>
      </div>
      <hr />
      <div>{convertSecondsToFormatedTimeString(time)}</div>
      <hr />
      <div className="mb-3" style={{ fontSize: "1rem" }}>
        <ul className="list-group">
          {state &&
            state.map((el: { note: string; time: number }, idx) => {
              return editableNoteIdx === idx.toString() ? (
                <div key={idx} className="input-group mb-3">
                  <input
                    autoFocus
                    type="text"
                    className="form-control"
                    defaultValue={el.note}
                    value={editableNote}
                    onChange={(e) => setEditableNote(e.target.value)}
                  />
                  <div className="input-group-append">
                    <button
                      onClick={() => onEditNote(idx)}
                      className="btn btn-outline-secondary"
                      type="button"
                    >
                      Save note
                    </button>
                    <button
                      onClick={() => setEditableNoteIdx("")}
                      className="btn btn-outline-secondary"
                      type="button"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => onRemoveNote(idx)}
                      className="btn btn-danger"
                      type="button"
                    >
                      Remove note
                    </button>
                  </div>
                </div>
              ) : (
                <li
                  key={idx}
                  onClick={() => {
                    setEditableNoteIdx(idx.toString());
                    setEditableNote(el.note);
                  }}
                  className="list-group-item"
                >
                  {convertSecondsToFormatedTimeString(el.time)} : {el.note}
                </li>
              );
            })}
        </ul>
      </div>

      <div className="input-group mb-3">
        <input
          value={note}
          onChange={noteHandler}
          onFocus={focusHandler}
          type="text"
          className="form-control"
          placeholder="Note text"
          aria-describedby="basic-addon2"
          onKeyDown={(e) => (e.key === "Enter" ? onAddNote() : null)}
        />
        <div className="input-group-append">
          <button
            onClick={onAddNote}
            className="btn btn-outline-secondary"
            type="button"
          >
            Add note
          </button>
        </div>
      </div>
    </div>
  );
}
