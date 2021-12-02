import { Col, Row } from "antd";
import { useEffect, useMemo, useReducer } from "react";
import Editor from "../@ccomponents/Editor";
import Calendar from "react-calendar";
import { debounce } from "lodash";
import DailyOrder from "../@ccomponents/DailyOrder";

interface Daily {
  id?: number;
  date: Date;
  content: string;
}

interface State {
  daily: Daily;
  dailies: Daily[];
}

type Action =
  | { type: "set-dailies"; dailies: Daily[] }
  | { type: "change-date"; newDate: Date }
  | { type: "change-content"; newContent: string };

const compareDate = (a: Date, b: Date) => {
  return (
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()
  );
};

function dailiesReducer(state: State, action: Action) {
  const newDailies = [...state.dailies];
  let newDaily: Daily = {
    date: new Date(),
    content: "",
  };
  switch (action.type) {
    case "set-dailies":
      return {
        ...state,
        dailies: action.dailies.map((d) => ({
          ...d,
          date: new Date(d.date),
        })),
      };
    case "change-date":
      newDaily = {
        date: action.newDate,
        content: "",
      };
      const f = newDailies.filter((d) => compareDate(action.newDate, d.date));
      if (f.length !== 0) {
        newDaily.content = f[0].content;
      }
      return {
        dailies: newDailies,
        daily: newDaily,
      };
    case "change-content":
      const filtered = newDailies.filter((d) =>
        compareDate(state.daily.date, d.date)
      );
      if (filtered.length === 0) {
        newDaily = {
          date: state.daily.date,
          content: action.newContent,
        };
        fetch("http://localhost:3004/activities", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(newDaily),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            newDaily.id = data.id;
            newDailies.push(newDaily);
          });
      } else {
        filtered[0].content = action.newContent;
        fetch("http://localhost:3004/activities/" + filtered[0].id, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "PUT",
          body: JSON.stringify(filtered[0]),
        });
      }

      return {
        dailies: newDailies,
        daily: {
          date: state.daily.date,
          content: action.newContent,
        },
      };
    default:
      throw new Error();
  }
}

const DailyPage = () => {
  const initialState = {
    daily: { date: new Date(), content: "" },
    dailies: [],
  };
  const [state, dispatch] = useReducer(dailiesReducer, initialState);

  useEffect(() => {
    fetch("http://localhost:3004/activities").then((res) => {
      res.json().then((dailies: Daily[]) => {
        dispatch({ type: "set-dailies", dailies: dailies });
      });
    });
  }, []);

  return (
    <>
      Suivi de Daily du {state.daily.date.toString()}:
      <Row>
        <Col>
          <Calendar
            onChange={(newDate: Date) =>
              dispatch({ type: "change-date", newDate })
            }
            value={state.daily.date}
          />
        </Col>
        <Col flex="auto">
          <Editor
            value={state.daily.content}
            onChange={debounce(
              (newContent: string) =>
                dispatch({ type: "change-content", newContent }),
              300
            )}
          ></Editor>
        </Col>
      </Row>
      <Row>
        <Col flex="auto">
          <DailyOrder />
        </Col>
      </Row>
    </>
  );
};

export default DailyPage;
