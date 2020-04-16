import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { List, Avatar, Badge, Steps, Divider, InputNumber, Button, Skeleton, Radio } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

import Aux from '../../hoc/_Aux';
import Card from '../../App/components/MainCard';
import socket from '../../socket';

const { Step } = Steps;

const br = {
    borderRight: '1px solid gray',
    paddingLeft: '.5rem',
};
const bl = {
    borderLeft: '1px solid gray',
}
const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
};

class Draft extends Component {
    state = {
        progress: 1,
        draft: {}
    };

    componentDidMount() {
        this.connectSocket();
    }

    connectSocket = () => {
        // Request
        socket.emit('get-draft');
        // Listen
        socket.listen('get-draft', data => {
            this.setState({
                draft: data[0]
            })
        })
    }

    render() {
        return (
            <Aux>
                <Row>
                    <Col>
                        <Card isOption title={this.state.draft.name}>
                            <List className='w-100 px-3'>
                                {this.state.draft.fights ? this.state.draft.fights.map((fight, i) => {
                                    if (true) {
                                        return (
                                            <Row className='justify-content-center'>
                                                <Col>
                                                    <div>
                                                        <Radio.Group onChange={this.onChange} value={'value'}>
                                                            <Radio style={radioStyle} value={1}> Option A  </Radio>
                                                            <Radio style={radioStyle} value={2}> Option B </Radio>
                                                        </Radio.Group>
                                                        <Avatar size={70}></Avatar>
                                                        <span>{fight.fighter1.name}</span>
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <div>
                                                        <span>{fight.fighter2.name}</span>
                                                        <Avatar size={70}></Avatar>
                                                        <Radio.Group onChange={this.onChange} value={'value'}>
                                                            <Radio style={radioStyle} value={1}> Option A  </Radio>
                                                            <Radio style={radioStyle} value={2}> Option B </Radio>
                                                        </Radio.Group>
                                                    </div>
                                                </Col>
                                            </Row>
                                        )
                                    } else {
                                        return ['fighter1', 'fighter2'].map(fighter => {
                                            return (
                                                <List.Item key={i}>
                                                    <Col xl={12}>
                                                        <Row>
                                                            <Col md={1}>
                                                                <Badge className='mt-2' status='error' />
                                                            </Col>
                                                            <Col md={1} className='mt-1' >
                                                                <InfoCircleOutlined />
                                                            </Col>
                                                            <Col>
                                                                <Avatar size={50} />
                                                            </Col>
                                                            <span className='mx-3'>
                                                                <b><p className='mt-2'>{fight[fighter].name}</p></b>
                                                            </span>
                                                            <span className='mt-2'>
                                                                <span className='pl-5'><InputNumber placeholder='FPPF' /></span>
                                                                <span className='pl-3'><InputNumber placeholder='Price' /></span>
                                                                <span className='pl-3'><InputNumber placeholder='Price' /></span>
                                                            </span>
                                                        </Row>
                                                    </Col>
                                                </List.Item>
                                            )
                                        })
                                    }
                                }) : <Skeleton />}
                            </List>
                            <Col>
                                <Divider />
                                <Button className='text-right' type='primary'  > Save </Button>
                            </Col>
                        </Card>
                    </Col>
                </Row>
            </Aux >
        )
    }
}

export default Draft;