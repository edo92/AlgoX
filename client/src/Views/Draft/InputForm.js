import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Button, Divider, List, Badge, Avatar, Input, InputNumber } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

class InputForm extends Component {
    handleInput = (data) => {
        // data.dk
    }

    render() {
        return (
            <Col>
                {this.props.fights.map((fight, i) => {
                    return ['fighter1', 'fighter2'].map((fighter, j) => {
                        return (
                            <List.Item key={`${i}${j}`}>
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
                                            <span className='pl-5'><InputNumber onChange={val => this.handleInput(fight[fighter], val, 'fppf')} placeholder='FPPF' /></span>
                                            <span className='pl-3'><InputNumber onChange={val => this.handleInput(fight[fighter].name, val, 'price')} placeholder='Price' /></span>
                                            <span className='pl-3'><InputNumber onChange={val => this.handleInput(fight[fighter].name, val, 'record')} placeholder='Record' /></span>
                                            <span className='pl-3'><Input placeholder='Image' style={{ width: '80px' }} /></span>
                                        </span>
                                    </Row>
                                </Col>
                            </List.Item>
                        )
                    })
                })}
                <Divider />
                <Button size='large' type='primary'>Save</Button>
            </Col>
        )
    }
}

export default InputForm;