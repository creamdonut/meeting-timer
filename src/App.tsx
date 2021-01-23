import * as React from "react";
import { useTimer } from "use-timer";

import "./App.css";

const formattedNumber = (number: number): string => ("0" + number).slice(-2);

const convertSecondsToFormatedTimeString = (time: number): string => {
  const hours = Math.floor(time / 60 / 60);
  const minutes = Math.floor(time / 60) - hours * 60;
  const seconds = time % 60;

  return `${formattedNumber(hours)}:${formattedNumber(
    minutes
  )}:${formattedNumber(seconds)}`;
};

interface Note {
  time: number;
  note: string;
}

export default function App() {
  const { time, reset, start, pause, advanceTime } = useTimer();

  const [additionalTime, setAdditionalTime] = React.useState(0);
  const [note, setNote] = React.useState("");
  const [notes, setNotes] = React.useState<Note[]>([]);

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

  const addNote = () => {
    const newNote = {
      time: freezedTime,
      note: note,
    };

    const newNotes = [...notes, newNote];
    setNotes(newNotes);

    setNote("");
  };

  const focusHandler = () => {
    setFreezedTime(time);
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
          {notes.map((el: { note: React.ReactNode; time: number }, idx) => {
            return (
              <li key={idx} className="list-group-item">
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
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <div className="input-group-append">
          <button
            onClick={addNote}
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
