import { Col, Row } from "antd";
import { useState } from "react";
import Editor from "../@ccomponents/Editor";
import Calendar from "react-calendar";
import DailyOrder from "../@ccomponents/DailyOrder";
import Daily from "../@model/Daily";
import { setDateOnly } from '../@tools/utils';

const DailyPage = () => {
  const [daily, setDaily] = useState<Daily>({
    id: -1,
    date: setDateOnly(new Date()),
    content: ''
  });

  const handleDateChange = async (newDate: Date) => {
    fetch("http://localhost:3004/activities?date=" + setDateOnly(newDate))
    .then((res) => {
      res.json().then((dailies: Daily[]) => {
        if (dailies.length > 0 ) {
          setDaily(dailies[0]);
        } else {
          fetch("http://localhost:3004/activities", {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
              date: setDateOnly(newDate),
              content: ""
            }),
          })
          .then((res) => res.json())
          .then((data) => {
            setDaily({
              id:data.id,
              date: data.date,
              content: data.content
            });
          });
        }
      });
    });
  }

  return (
    <>
      Suivi de Daily du {daily.date.toString()}:
      <Row>
        <Col>
          <Calendar
            onChange={(newDate: Date) => handleDateChange(newDate)}
            value={new Date(daily.date)}
          />
        </Col>
        <Col flex="auto">
          <Editor
            daily={daily}
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
