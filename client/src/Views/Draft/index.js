import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { List, Avatar, Badge, Steps, Divider, InputNumber, Button, Skeleton, Radio, Select } from 'antd';
import { InfoCircleOutlined, SearchOutlined, NodeIndexOutlined, AppstoreAddOutlined, BulbOutlined } from '@ant-design/icons';

import Aux from '../../hoc/_Aux';
import Card from '../../App/components/MainCard';
import socket from '../../socket';

const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
};

class Draft extends Component {
    state = {
        predict: {
            model: ''
        },
        progress: 1,
        draft: { dkValues: {} },
        dk: {},
        select: {},
        showMode: false
    };

    componentDidMount() {
        this.connectSocket();
    }

    connectSocket = () => {
        // Request
        socket.emit('draft', { action: 'get' });
        // Listen
        socket.listen('draft', data => {
            this.setState({
                draft: { ...this.state.draft, ...data }
            })
        })

        socket.listen('ml', data => {
            console.log('data', data)
            this.setState({
                draft: { ...this.state.draft, ...data }
            })
        })

        socket.listen('generate', data => {
            this.setState({
                generate: { ...this.state.generate, ...data }
            })
        })
    }

    handleInputDk = (name, val, plc) => {
        this.setState({
            ...this.state,
            draft: {
                ...this.state.draft,
                dkValues: {
                    ...this.state.draft.dkValues,
                    [name]: {
                        ...this.state.draft.dkValues[name],
                        [plc]: val
                    }
                }
            }
        })
    }

    saveDraft = () => {
        socket.emit('draft', {
            ...this.state.draft.dkValues,
            ...{ action: 'save' }
        });

        this.setState({
            ...this.state.draft.submited = true,
        });
    }

    generate = () => {
        socket.emit('generate', { action: 'generate', ...{ list: this.state.draft.fights } });
        this.setState({ showMode: true });
    }

    predict = () => {
        if (this.state.predict.model.length) {
            socket.emit('ml', { action: 'predict', ...this.state.predict });
            this.setState({
                ...this.state,
                draft: {
                    ...this.state.draft,
                    predictLoad: true
                }
            })
        }
    }

    handelSelect = (input, opt) => {
        let { name, checked } = input.target;
        this.setState({
            select: {
                ...this.state.select,
                [name]: { [opt]: checked }
            }
        })
    }

    handleInputSelect = (cont, name, val) => {
        this.setState({
            ...this.state,
            [cont]: {
                ...this.state[cont],
                [name]: val
            }
        })
    }

    render() {
        console.log('this.state', this.state)
        return (
            <Aux>
                <Row>
                    <Col>
                        <Card isOption title={
                            <Row>
                                <Button disabled={!this.state.draft.generate} onClick={this.generate} className='mr-3' type='ghost'>Generate<AppstoreAddOutlined /></Button>
                                <Button onClick={this.predict} disabled={this.state.draft.predictLoad || !this.state.predict.model.length} loading={this.state.draft.predictLoad} className='mr-3' type='ghost'>Predict<BulbOutlined /></Button>
                                <Select onChange={val => this.handleInputSelect('predict', 'model', val)} defaultValue={'Model'} >
                                    {(this.state.draft.models || []).map((model, i) => {
                                        return (
                                            <Select.Option key={i} value={model.modelName}>{model.modelName}</Select.Option>
                                        )
                                    })}
                                </Select>
                            </Row>
                        }>
                            <List className='w-100 px-3'>
                                {this.state.draft.fights ? this.state.draft.fights.map((fight, i) => {
                                    if (this.state.draft.dkData) {
                                        if (!this.state.showMode) {
                                            return (
                                                <Row key={i} style={{ justifyContent: 'space-between' }}>
                                                    <Col xs={6}>
                                                        <Row>
                                                            <Radio.Group className='p-3' name={fight.fighter1.name} onChange={this.onChange}>
                                                                <Radio onChange={val => this.handelSelect(val, 'fav')} style={radioStyle} value={1}><small><Badge status='success' />Favorit</small></Radio>
                                                                <Radio onChange={val => this.handelSelect(val, 'include')} style={radioStyle} value={2}><small><Badge status='warning' />Include</small></Radio>
                                                                <Radio onChange={val => this.handelSelect(val, 'exclude')} style={radioStyle} value={3}><small><Badge status='error' />Exclude</small></Radio>
                                                                <Radio onChange={val => this.handelSelect(val, 'neutral')} style={radioStyle} value={4}><small><Badge status='default' />Neutral</small></Radio>
                                                            </Radio.Group>
                                                            <Col className='p-4'>
                                                                <Avatar size={75}></Avatar>
                                                                <span className='px-2 h6'>{fight.fighter1.name}</span>
                                                                <div className='p-1'>
                                                                    <Button className='mx-1' shape='circle' icon={<NodeIndexOutlined />} />
                                                                    <Button className='mx-1' shape='circle' icon={<SearchOutlined />} />
                                                                </div>
                                                                <div>
                                                                    {fight.fighter1.result && <Badge status={fight.fighter1.result.win ? 'success' : 'error'} />}
                                                                    <span>{fight.fighter1.result && (fight.fighter1.result.win || fight.fighter1.result.loss)}</span>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col xs={6}>
                                                        <Row>
                                                            <Col className='p-4 text-right'>
                                                                <span className='px-2 h6'>{fight.fighter2.name}</span>
                                                                <Avatar size={75}></Avatar>
                                                                <div className='p-2'>
                                                                    <Button className='mx-1' shape='circle' icon={<NodeIndexOutlined />} />
                                                                    <Button className='mx-1' shape='circle' icon={<SearchOutlined />} />
                                                                </div>
                                                                <div>
                                                                    {fight.fighter2.result && <Badge status={fight.fighter2.result.win ? 'success' : 'error'} />}
                                                                    <span>{fight.fighter2.result && (fight.fighter2.result.win || fight.fighter2.result.loss)}</span>
                                                                </div>
                                                            </Col>
                                                            <Radio.Group className='p-3' name={fight.fighter2.name} onChange={this.onChange}>
                                                                <Radio onChange={val => this.handelSelect(val, 'fav')} style={radioStyle} value={1}><small><Badge status='success' />Favorit</small></Radio>
                                                                <Radio onChange={val => this.handelSelect(val, 'include')} style={radioStyle} value={2}><small><Badge status='warning' />Include</small></Radio>
                                                                <Radio onChange={val => this.handelSelect(val, 'exclude')} style={radioStyle} value={3}><small><Badge status='error' />Exclude</small></Radio>
                                                                <Radio onChange={val => this.handelSelect(val, 'neutral')} style={radioStyle} value={4}><small><Badge status='default' />Neutral</small></Radio>
                                                            </Radio.Group>
                                                        </Row>
                                                    </Col>
                                                    <Divider />
                                                </Row>
                                            )
                                        }
                                    } else {
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
                                    }
                                }) : <Skeleton />}
                                <Row>
                                    {this.state.showMode ? <Row>
                                        <Col>
                                            <Button onClick={() => this.setState({ showMode: false })}>Go Back</Button>
                                        </Col>
                                    </Row> : null}
                                </Row>
                            </List>
                            <Col>
                                <Divider />
                                <Button onClick={this.saveDraft} loading={this.state.draft.submited} disables={this.state.draft.submited ? this.state.draft.submited : undefined} className='text-right' type='primary'> Save </Button>
                            </Col>
                        </Card>
                    </Col>
                </Row>
            </Aux >
        )
    }
}

export default Draft;