import { Avatar, Checkbox, Col, List, Row, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { shuffle  } from "lodash";
import Person from "../@model/Person";
import Api from "../@api/api";

const DailyOrder = () => {
    const [users, setUsers] = useState<Person[]>([]);

    useEffect(() => {
        Api.getPersons()
        .then((data) => {
            setUsers(data.map((u:Person) => ({...u, hasTalked: false})))
        });
    }, [])

    const toggleUser = (user: Person) => {
        user.hasTalked = !user.hasTalked;
        setUsers([
            ...users.filter(u => u.id !== user.id),
            user
        ]);

    }

    const listItem = (item:Person) => 
        (<button 
            className="link-button" 
            onClick={(e) => toggleUser(item)}>
            <List.Item className="clickable" actions={[<Checkbox checked={item.hasTalked} />]}>
                <Skeleton avatar title={false} loading={false} active>
                    <List.Item.Meta avatar={<Avatar src={item.picture} />} title={item.name} />
                </Skeleton>
            </List.Item>
        </button>);
    return (
        <>
            <Row> 
                <Col flex="auto">
                    <List
                        locale={{ emptyText: "Everybody has talked" }}
                        header={<div>Has NOT talked</div>}
                        bordered
                        itemLayout="horizontal"
                        dataSource={shuffle(users).filter(u => !u.hasTalked)}
                        renderItem={listItem}
                    />
                </Col>
                <Col flex="auto">
                    <List
                        locale={{ emptyText: "No one has talked yet" }}
                        header={<div>Has talked</div>}
                        bordered
                        itemLayout="horizontal"
                        dataSource={users.filter(u => u.hasTalked)}
                        renderItem={listItem}
                    />
                </Col>
            </Row>
        </>
    )
}

export default DailyOrder;