import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { List, Avatar, Badge, Steps, Divider, InputNumber, Button } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

import Aux from '../../hoc/_Aux';
import Card from '../../App/components/MainCard';
import socket from '../../socket';

const { Step } = Steps;

const br = {
    borderRight: '1px solid gray',
    paddingRight: '1.3rem'
};
const bl = {
    borderLeft: '1px solid gray',
    paddingRight: '1rem',
    paddingLeft: '1rem'
}

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
                            <Col className='p-3 justify-content-center'>
                                <Steps onChange={this.onChange}>
                                    <Step title="Step 1" description="This is a description." />
                                    <Step title="Step 2" description="This is a description." />
                                    <Step title="Step 3" description="This is a description." />
                                </Steps>
                            </Col>
                            <Divider />
                            <List className='w-100 px-3'>
                                {(this.state.draft.fights || []).map((fight, i) => {
                                    return (
                                        <List.Item key={i}>
                                            <Row>
                                                <span className='px-3'>
                                                    <Badge className='mt-2' status='error' />
                                                </span>
                                                <span className='mt-1'>
                                                    <InfoCircleOutlined />
                                                </span>
                                                <span className='px-3'>
                                                    <Avatar size={50} />
                                                </span>
                                                <span className='mx-3'>
                                                    <b><p className='mt-2'>{fight.fighter1.name}</p></b>
                                                </span>
                                                <span className='mt-2'>
                                                    <span className='pl-5'><InputNumber placeholder='FPPF' /></span>
                                                    <span className='pl-3'><InputNumber placeholder='Price' /></span>
                                                    <span className='pl-3'><InputNumber placeholder='Price' /></span>
                                                </span>
                                            </Row>
                                        </List.Item>
                                    )
                                })}
                            </List>
                            <Divider />
                            <Button className='text-right' type='primary'>Next</Button>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        )
    }
}

export default Draft;