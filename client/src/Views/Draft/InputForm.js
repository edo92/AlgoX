import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

class InputForm extends Component {
    render() {
        return (
            <Col>
                {/* {this.props.list.map(fight => {
                    return ['fighter1', 'fighter2'].map((fighter, j) => {
                        let fighterDk = this.state.draft.dkValues[fight[fighter].name];
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
                                            <span className='pl-5'><InputNumber value={fighterDk.fppf} onChange={val => this.handleInputDk(fight[fighter].name, val, 'fppf')} placeholder='FPPF' /></span>
                                            <span className='pl-3'><InputNumber value={fighterDk.price} onChange={val => this.handleInputDk(fight[fighter].name, val, 'price')} placeholder='Price' /></span>
                                            <span className='pl-3'><InputNumber onChange={val => this.handleInputDk(fight[fighter].name, val, 'record')} placeholder='Record' /></span>
                                        </span>
                                    </Row>
                                </Col>
                            </List.Item>
                        )
                    })
                })} */}
            </Col>
        )
    }
}

export default InputForm;