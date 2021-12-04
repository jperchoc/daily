import { Col, Row } from "antd";
import { useCallback, useEffect, useState } from "react";
import Editor from "../@ccomponents/Editor";
import Calendar from "react-calendar";
import DailyOrder from "../@ccomponents/DailyOrder";
import Daily from "../@model/Daily";
import Api from '../@api/api';

const DailyPage = () => {
  const [daily, setDaily] = useState<Daily>(new Daily(-1, new Date(), ''));

  const handleDateChange = useCallback((newDate: Date) => {
    const newDaily = new Daily(-1, newDate, '');
    Api.getActivityByDate(newDaily.getDateString())
    .then((dailies: Daily[]) => {
        if (dailies.length > 0 ) {
          setDaily(new Daily(
            dailies[0].id!,
            new Date(dailies[0].date),
            dailies[0].content
            ));
        } else {
          Api.postActivity(newDaily.getDateString(), "")
          .then((data) => {
            setDaily(new Daily(data.id, new Date(data.date), data.content));
          });
        }
      }
    );
  }, []);

  useEffect(() => {
    handleDateChange(new Date());
  }, [handleDateChange]);

  return (
    <>
      Suivi de Daily du {daily.date.toString()}:
      <Row style={{marginBottom: "5px"}}>
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
