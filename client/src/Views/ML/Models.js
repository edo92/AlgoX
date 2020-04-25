import React, { Component } from 'react';
import { Row, Col, Collapse } from 'react-bootstrap';

import { Button, List, Dropdown, Menu, Divider, Input, InputNumber, Select, Statistic, Progress, Skeleton } from 'antd';
import { EllipsisOutlined, DotChartOutlined, DeleteOutlined, CloseCircleOutlined } from '@ant-design/icons';
import Card from '../../App/components/MainCard';

class Models extends Component {
    state = {
        options: {
            modelName: '',
            in: 'local',
            epochs: 10,
            layer1: 125,
            layer2: 12,
            layer3: 2
        }
    };

    componentWillReceiveProps(props, nextProps) {
        if (nextProps) {
            this.setState({ training: false });
        }
    }

    handleTrainModel = () => {
        if (this.state.onLoad && this.state.options.modelName && this.state.options.dataset) {
            this.props.trainModel(this.state.options);
            this.setState({ training: true });
        }
        this.setState({ onLoad: !this.state.onLoad, optionCollaps: false });
    }

    handleInput = (cat, key, val) => {
        this.setState({
            ...this.state,
            [cat]: {
                ...this.state[cat],
                [key]: val
            }
        })
    }

    render() {
        const ModelGuid = () => (
            <List.Item>
                <small><b>Options</b></small>
                <small><b>Name</b></small>
                <small><b>Epochs</b></small>
                <small><b>Layers</b></small>
                <small><b>Acc</b></small>
                <small><b>Loss</b></small>
                <small><b>BTacc</b></small>
            </List.Item>
        )

        const ModelInfo = props => {
            const model = props.model;

            return (
                <>
                    <small>{model.modelName}</small>
                    <small>{model.epochs}</small>
                    <small>{model.layer1}-{model.layer2}-{model.layer3}</small>
                    <small>{model.result.acc * 100}%</small>
                    <small>{model.result.loss * 100}%</small>
                    <small>{model.result.btAcc * 100}%</small>
                </>
            )
        }

        return (
            <Col xs={12} md={6}>
                <Card title={'Trained Models'}>
                    <List style={{ height: '170px', overflowY: 'scroll' }}>
                        <ModelGuid />
                        {console.log('this.props.models ', this.props.models)}
                        {this.props.models ? this.props.models.map((model, i) => (
                            <List.Item key={i}>
                                <small>
                                    <Dropdown trigger={['click']} overlay={
                                        <Menu>
                                            <Menu.Item key='0' onClick={() => this.props.deleteModel(model)}>
                                                <DeleteOutlined style={{ fontSize: '15px' }} />
                                                <small className='mt-2'>delete</small>
                                            </Menu.Item>
                                        </Menu>
                                    }>
                                        <Button style={{ width: '20px', marginRight: '.25rem', padding: '.2em', height: '20px' }}>
                                            <EllipsisOutlined className='ellipsButtonStyle' />
                                        </Button>
                                    </Dropdown>
                                    <Button style={{ width: '20px', padding: '.2em', height: '20px' }}>
                                        <DotChartOutlined className='ellipsButtonStyle' />
                                    </Button>
                                </small>
                                <ModelInfo model={model} />
                            </List.Item>
                        )) : <Skeleton />}
                    </List>
                </Card>
                <Card title={
                    <Col className='p-0'>
                        <Col>
                            <Row>
                                {this.state.onLoad ?
                                    <span><Input onChange={val => this.handleInput('options', 'modelName', val.target.value)} value={this.state.options.modelName} placeholder='Model Name' /></span>
                                    :
                                    <Button onClick={() => this.setState({ optionCollaps: !this.state.optionCollaps })} className='mx-1' type='dashed'>Options</Button>
                                }
                                <Button onClick={this.handleTrainModel} disabled={this.state.training} loading={this.state.training} className='mx-1' type='danger'>Train</Button>
                                <Col className='p-1'>
                                    {this.state.onLoad && <CloseCircleOutlined onClick={() => this.setState({ onLoad: false })} />}
                                </Col>
                            </Row>
                        </Col>
                        <Collapse className='collapsOptions' in={this.state.optionCollaps}>
                            <Col>
                                <Divider className='m-0 my-2' />
                                <Row className='py-2 text-center'>
                                    <Col xl={4}>
                                        <small className='pr-2 fs-11'>Epochs</small><br />
                                        <InputNumber value={this.state.options.epochs} onChange={val => this.handleInput('options', 'epochs', val)} />
                                    </Col>
                                    <Col xl={4}>
                                        <small className='pr-2 fs-11'>Dataset</small><br />
                                        <Select onChange={val => this.handleInput('options', 'dataset', val)} defaultValue='none' >
                                            {(this.props.state.datasets || []).map(dataset => (
                                                <Select.Option value={dataset._id}>{dataset.datasetName}</Select.Option>
                                            ))}
                                        </Select>
                                    </Col>
                                    <Col xl={4}>
                                        <small className='pr-2 fs-11'>Save</small><br />
                                        <Select onChange={val => this.handleInput('options', 'in', val)} defaultValue={this.state.options.in} >
                                            <Select.Option value='local'>Local</Select.Option>
                                            <Select.Option value='cloud'>Cloud</Select.Option>
                                        </Select>
                                    </Col>
                                </Row>
                                <Divider className='m-0 my-2' />
                                <Row className='py-2 text-center'>
                                    <Col xl={4}>
                                        <small className='fs-11'>Layer1</small><br />
                                        <InputNumber value={this.state.options.layer1} onChange={val => this.handleInput('options', 'layer1', val)} />
                                    </Col>
                                    <Col xl={4}>
                                        <small className='fs-11'>Layer2</small><br />
                                        <InputNumber value={this.state.options.layer2} onChange={val => this.handleInput('options', 'layer2', val)} />
                                    </Col>
                                    <Col xl={4}>
                                        <small className='fs-11'>Layer3</small><br />
                                        <InputNumber value={this.state.options.layer3} onChange={val => this.handleInput('options', 'layer3', val)} />
                                    </Col>
                                </Row>
                            </Col>
                        </Collapse>
                    </Col>
                }>
                    <Col>
                        <Row className='text-center'>
                            <Col span={12}>
                                <small>Avg. Accuracy</small>
                                <Progress width={74} type='circle' percent={((this.props.state.model.acc) * 100) || '--'} />
                            </Col>
                            <Col span={12}>
                                <small>Bt. Accuracy</small>
                                <Progress width={74} type='circle' percent={((this.props.state.model.btAcc) * 100) || '--'} />
                            </Col>
                            <Col span={12}>
                                <div className='pt-3'>
                                    <Statistic title='Unmerged' value={93} suffix='/ 100' />
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Card>
            </Col>
        )
    }
}

export default Models;