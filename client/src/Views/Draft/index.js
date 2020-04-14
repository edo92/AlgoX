import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { List, Avatar } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

import Aux from '../../hoc/_Aux';
import Card from '../../App/components/MainCard';
import socket from '../../socket';

class Draft extends Component {
    state = { draft: {} };

    componentDidMount() {
        socket.emit('get-draft');

        socket.listen('get-draft', data => {
            this.setState({
                draft: data[0]
            })
        });
    }

    render() {
        console.log('state', this.state)
        return (
            <Aux>
                <Row>
                    <Col>
                        <Card isOption title={this.state.draft.name}>
                            <Row>
                                <List className='w-100 px-3'>
                                    {(this.state.draft.fights || []).map((fight, i) => {
                                        return (
                                            <List.Item key={i}>
                                                <div className='px-3'>
                                                    <InfoCircleOutlined />
                                                    <Avatar size='large' />
                                                    <span>{fight.fighter1.name}</span>
                                                </div>

                                                <div>Vs</div>

                                                <div className='px-3'>
                                                    <span>{fight.fighter2.name}</span>
                                                    <Avatar size='large' />
                                                    <InfoCircleOutlined />
                                                </div>
                                            </List.Item>
                                        )
                                    })}
                                </List>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        )
    }
}

export default Draft;