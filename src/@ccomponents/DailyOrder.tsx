import { Avatar, Checkbox, Col, List, Row, Skeleton } from "antd";
import { useState } from "react";

interface User {
    id: number;
    name: string;
    hasTalked: boolean;
}
function shuffle<T>(array: Array<T>): Array<T> {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

const DailyOrder = () => {
    const [users, setUsers] = useState([
        { id: 1, name: "Raphael", hasTalked: false },
        { id: 2, name: "Yannick", hasTalked: false },
        { id: 3, name: "Dimitri", hasTalked: false },
        { id: 4, name: "Julien", hasTalked: false },
        { id: 5, name: "Bastien", hasTalked: false },
        { id: 6, name: "Pierre-Henri", hasTalked: false },
        { id: 7, name: "Varun", hasTalked: false },
        { id: 8, name: "Anoop", hasTalked: false },
    ]);

    const toggleUser = (user: User) => {
        user.hasTalked = !user.hasTalked;
        setUsers([
            ...users.filter(u => u.id !== user.id),
            user
        ]);

    }
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
                        renderItem={item =>
                            <List.Item
                                actions={[<Checkbox onChange={() => toggleUser(item)} checked={item.hasTalked} />]}
                            >
                                <Skeleton avatar title={false} loading={false} active>
                                    <List.Item.Meta
                                        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                                        title={<a href="https://ant.design">{item.name}</a>}
                                    />
                                </Skeleton>
                            </List.Item>
                        }
                    />
                </Col>
                <Col flex="auto">
                    <List
                        locale={{ emptyText: "No one has talked yet" }}
                        header={<div>Has talked</div>}
                        bordered
                        itemLayout="horizontal"
                        dataSource={users.filter(u => u.hasTalked)}
                        renderItem={item =>
                            <List.Item
                                actions={[<Checkbox onChange={() => toggleUser(item)} checked={item.hasTalked} />]}
                            >
                                <Skeleton avatar title={false} loading={false} active>
                                    <List.Item.Meta
                                        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                                        title={<a href="https://ant.design">{item.name}</a>}
                                    />
                                </Skeleton>
                            </List.Item>
                        }
                    />
                </Col>
            </Row>
        </>
    )
}

export default DailyOrder;