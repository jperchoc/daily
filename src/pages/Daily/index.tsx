import { Card, Col, Row } from "antd";
import { useCallback, useEffect, useState } from "react";
import Editor from "./components/Editor";
import Calendar from "react-calendar";
import Order from "./components/Order";
import Daily from "./models/Daily";
import Api from '../../services/api';
import './daily.css'
import 'react-calendar/dist/Calendar.css';

const DailyPage = () => {
  const [daily, setDaily] = useState<Daily>(new Daily(-1, new Date(), ''));

  const handleDateChange = useCallback(async (newDate: Date) => {
    const newDaily = new Daily(-1, newDate, '');
    const {id, date, content} = await Api.getActivityByDateOrDefault(newDaily.getDateString());
    setDaily(new Daily(id, new Date(date), content));
  }, []);

  useEffect(() => {
    handleDateChange(new Date());
  }, [handleDateChange]);

  return (
    <>
    <Card style={{marginBottom: '16px'}}>
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
      </Card>
      <Card>
      {/* <Row>
        <Col flex="auto"> */}
          <Order />
        {/* </Col>
      </Row> */}
    </Card>
    </>
  );
};

export default DailyPage;
