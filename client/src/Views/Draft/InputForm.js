import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Button, Divider, List, Badge, Avatar, Input, InputNumber } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

class InputForm extends Component {
    state = {};

    handleInput = async (fighter, val, cat) => {
        this.setState({
            ...this.state,
            [fighter]: {
                ...this.state[fighter],
                [cat]: val
            }
        })

        let thisDraft = this.props.draft;
        await thisDraft.fights.map(fight => {
            ['fighter1', 'fighter2'].map(fighter => {
                if (this.state[fight[fighter].name]) {
                    fight[fighter].dk = {
                        ...fight[fighter].dk,
                        ...this.state[fight[fighter].name],
                    }
                }
            })
        })
        this.props.update(thisDraft)
    }

    render() {
        // console.log('this.state', this.state)
        return (
            <Col>
                {(this.props.draft ? this.props.draft.fights : []).map((fight, i) => {
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
                                            <Avatar src={fight[fighter].dk && fight[fighter].dk.image} size={50} />
                                        </Col>
                                        <span className='mx-3'>
                                            <b><p className='mt-2'>{fight[fighter].name}</p></b>
                                        </span>
                                        <span className='mt-2'>
                                            <span className='pl-5'><InputNumber value={fight[fighter].dk && fight[fighter].dk.fppf} onChange={val => this.handleInput(fight[fighter].name, val, 'fppf')} placeholder='FPPF' /></span>
                                            <span className='pl-3'><InputNumber value={fight[fighter].dk && fight[fighter].dk.price} onChange={val => this.handleInput(fight[fighter].name, val, 'price')} placeholder='Price' /></span>
                                            <span className='pl-3'><Input value={fight[fighter].dk && fight[fighter].dk.record} onChange={val => this.handleInput(fight[fighter].name, val.target.value, 'record')} placeholder='Record' style={{ width: '80px' }} /></span>
                                            <span className='pl-3'><Input value={fight[fighter].dk && fight[fighter].dk.image} onChange={val => this.handleInput(fight[fighter].name, val.target.value, 'image')} placeholder='Image' style={{ width: '80px' }} /></span>
                                        </span>
                                    </Row>
                                </Col>
                            </List.Item>
                        )
                    })
                })}
                <Divider />
                <Button onClick={this.props.saveFightsData} size='large' type='primary'>Save</Button>
            </Col>
        )
    }
}

export default InputForm;