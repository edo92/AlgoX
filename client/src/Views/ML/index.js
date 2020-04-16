import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

import { Progress, Button, Card, InputNumber, Select } from 'antd';
import { ExperimentOutlined, SlidersOutlined } from '@ant-design/icons';

import Aux from '../../hoc/_Aux';
import socket from '../../socket';

// const { Option } = Select;

class SamplePage extends Component {
    constructor() {
        super();

        this.state = {
            epochs: 0
        };
    }

    componentDidMount() {
        socket.emit('ml', { int: true });
        socket.listen('ml', data => {
            console.log('testing', data)
        })
    }

    trainModel = () => {
        socket.emit('ml', { train: true, config: this.state.config });
    }

    handleConfigInput = (name, value) => {
        this.setState({
            config: { ...this.state.config, [name]: value }
        })
    }

    render() {
        return (
            <Aux>
                <Row>
                    <Col sm={7}>
                        <Row style={{ justifyContent: 'space-evenly' }}>
                            <Button type='primary'>Analize</Button>
                            <Button onClick={this.trainModel} type='danger'>Train</Button>
                            <Button type='ghost'>
                                <SlidersOutlined style={{ fontSize: '1.4em' }} />
                            </Button>
                            <Button type='ghost'>
                                <ExperimentOutlined style={{ fontSize: '1.4em' }} />
                            </Button>
                        </Row>
                    </Col>
                </Row>
                <Row className='py-3'>
                    <Col xs={6}>
                        <Card>
                            <Row>
                                <Col>
                                    <Progress type='circle' percent={75} />
                                </Col>
                                <Col>
                                    <h5>Loss: 13.4</h5>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col xs={6}>
                        <Card>
                            <Card>
                                <Row>
                                    <Col className='text-center'>
                                        <p><b>Epocs</b></p>
                                        <InputNumber onChange={(val) => this.handleConfigInput('epocs', val)} />
                                    </Col>
                                    <Col className='text-center'>
                                        <p><b>test</b></p>
                                        <InputNumber onChange={(val) => this.handleConfigInput('test', val)} />
                                    </Col>
                                    <Col className='text-center'>
                                        <p><b>test</b></p>
                                        <Select defaultValue='wl' >
                                            <Select.Option value='wl'>WL</Select.Option>
                                            <Select.Option value='ql'>QL</Select.Option>
                                        </Select>
                                    </Col>
                                </Row>
                            </Card>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }
}

export default SamplePage;