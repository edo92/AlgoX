import React, { Component } from 'react';
import { Row, Col, Collapse } from 'react-bootstrap';

import { Divider, Progress, Button, Input, InputNumber, Select, List, Dropdown, Menu } from 'antd';
import { ExperimentOutlined, SlidersOutlined, CloseCircleOutlined, EllipsisOutlined, DotChartOutlined, DeleteOutlined } from '@ant-design/icons';
import Chart from '../../Widgets/chart1';

import Aux from '../../hoc/_Aux';
import Card from '../../App/components/MainCard';

import socket from '../../socket';
import './style.css';

class SamplePage extends Component {
    constructor() {
        super();

        this.state = {
            models: [],
            datasets: [],
            mode: 'control',
            dataset: {
                option: 'save',
                type: 'wl',
                datasetName: ''
            },
            train: {
                type: 'wl',
                saveIn: 'local',
                modelName: '',
                epochs: 10,
                layer1: 34,
                layer2: 12,
                layer3: 2
            }
        }
    }


    componentDidMount() {
        this.socketConnection();
    }

    socketConnection = () => {
        // Int request
        socket.emit('ml', { action: 'get' });

        // Listem
        socket.listen('ml', data => {
            let key = Object.keys(data);
            this.setState({
                ...this.state,
                [key]: {
                    ...this.state[key],
                    ...data[key]
                }
            })
        })
    }

    trainModel = () => {
        if (this.state.trainSaveMode) {
            if (this.state.train.modelName.length) {
                socket.emit('ml', { action: 'train', ...this.state.train });
                this.setState({
                    ...this.state, train: { ...this.state.train, creating: true }
                })
            } else {
                this.setState({ inputErr: true });
            }
        }
        this.setState({ trainSaveMode: !this.state.trainSaveMode });
    }

    deleteModel = model => {
        socket.emit('ml', { action: 'deleteModel', model });
        this.setState({
            models: Object.keys(this.state.models).filter(mdl => {
                if (mdl._id === model._id) {
                    return mdl;
                }
            })
        })
    }

    createDataset = () => {
        if (this.state.datasetSaveMode) {
            if (this.state.dataset.datasetName.length) {
                socket.emit('ml', { action: 'createDataset', ...this.state.dataset });
                this.setState({
                    ...this.state, dataset: { ...this.state.dataset, creating: true }
                });
            }
        }
        this.setState({ datasetSaveMode: !this.state.datasetSaveMode });
    }

    deleteDataset = dataset => {
        socket.emit('ml', { action: 'deleteDataset', dataset });
        this.setState({
            datasets: Object.keys(this.state.datasets).filter(dst => {
                if (dst._id === dataset._id) {
                    return dataset;
                }
            })
        })
    }

    handleInput = (cont, name, val) => {
        this.setState({
            ...this.state,
            [cont]: {
                ...this.state[cont],
                [name]: val
            }
        })
    }

    analize = () => {
        this.setState({ mode: 'analize' });
    }

    charts = () => {
        this.setState({ mode: 'charts' });
    }

    render() {
        console.log('state', this.state)
        return (
            <Aux>
                <Row>
                    <Col sm={7}>
                        <Row style={{ justifyContent: 'space-evenly' }}>
                            <Button onClick={this.analize} type='primary'>Analize</Button>
                            <Button onClick={this.charts} type='ghost'>
                                <SlidersOutlined style={{ fontSize: '1.4em' }} />
                            </Button>
                            <Button type='ghost'>
                                <ExperimentOutlined style={{ fontSize: '1.4em' }} />
                            </Button>
                        </Row>
                    </Col>
                </Row>

                {/* Analize  */}
                {this.state.mode === 'analize' &&
                    <Row>
                        <h3>analize</h3>
                    </Row>
                }

                {/* Charts  */}
                {this.state.mode === 'charts' &&
                    <Row>
                        <Chart />
                    </Row>
                }

                {/* Control  */}
                {this.state.mode === 'control' &&
                    <Row className='py-3'>
                        <Col xl={6}>
                            <Card title={'Datasets'}>
                                <List style={{ height: '170px', overflowY: 'scroll' }}>
                                    <List.Item>
                                        <small><b>Options</b></small>
                                        <small><b>Name</b></small>
                                        <small><b>Type</b></small>
                                        <small><b>Size</b></small>
                                        <small><b>Points</b></small>
                                    </List.Item>
                                    {Object.keys(this.state.datasets).map((each, i) => {
                                        let dataset = this.state.datasets[each];
                                        return (
                                            <List.Item key={i}>
                                                <small>
                                                    <Dropdown trigger={['click']} overlay={
                                                        <Menu>
                                                            <Menu.Item key='0'>
                                                                <DeleteOutlined onClick={() => this.deleteDataset(dataset)} />
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
                                                <small>{dataset.datasetName}</small>
                                                <small>{dataset.type}</small>
                                                <small>{dataset.size}</small>
                                                <small>{dataset.dataPoints}</small>
                                            </List.Item>
                                        )
                                    })}
                                </List>
                            </Card>
                            <Col id='dataset-control-panel'>
                                <Card title={
                                    <Col>
                                        <Col>
                                            <Row>
                                                <Col xl={3}>
                                                    <Button onClick={() => this.setState({ datasetOpts: !this.state.datasetOpts })} type='dashed'>Options</Button>
                                                </Col>
                                                <Col xl={3}>
                                                    <Button disabled={this.state.dataset.creating} loading={this.state.dataset.creating} onClick={() => this.createDataset()}>Create</Button>
                                                </Col>
                                                <Col xl={6}>
                                                    {this.state.dataset.creating && <Progress percent={this.state.dataset.progress} status='active' />}
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col>
                                            <Collapse in={this.state.datasetOpts}>
                                                <Col>
                                                    <Divider className='m-0 mt-3' />
                                                    <Row style={{ opacity: this.state.dataset.creating ? 0.2 : 1, justifyContent: 'space-evenly', paddingTop: '1rem' }}>
                                                        <Select onChange={val => this.handleInput('dataset', 'option', val)} disabled={this.state.creating} defaultValue='save' >
                                                            <Select.Option value='save'>Save</Select.Option>
                                                        </Select>
                                                        <Select onChange={val => this.handleInput('dataset', 'type', val)} disabled={this.state.creating} defaultValue='wl' >
                                                            <Select.Option value='wl'>WL</Select.Option>
                                                            <Select.Option value='ql'>QL</Select.Option>
                                                        </Select>
                                                    </Row>
                                                </Col>
                                            </Collapse>
                                        </Col>
                                    </Col>
                                }>
                                    {!this.state.datasetSaveMode &&
                                        <Col>
                                            <Col className='py-3'>
                                                <Progress type='circle' percent={75} />
                                            </Col>

                                        </Col>
                                    }
                                    {this.state.datasetSaveMode &&
                                        <Col style={{ height: '280px', paddingTop: '3rem' }}>
                                            <Row>
                                                <Col md={5}>
                                                    <Input onChange={e => this.handleInput('dataset', e.target.name, e.target.value)} name='datasetName' placeholder='Dataset Name' />
                                                </Col>
                                                <Col>
                                                    <Select onChange={(val) => this.handleInput('train', 'saveIn', val)} defaultValue='local' >
                                                        <Select.Option value='local'>Local</Select.Option>
                                                        <Select.Option value='clound'>Clound</Select.Option>
                                                    </Select>
                                                </Col>
                                                <Col>
                                                    <Row>
                                                        <Button disabled={this.state.dataset.creating} onClick={this.createDataset} shape='round' type='danger'>Go</Button>
                                                        <a onClick={() => this.setState({ trainSaveMode: false })} className='p-1 px-2'><CloseCircleOutlined /></a>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Col>
                                    }
                                </Card>
                            </Col>
                        </Col>
                        <Col xl={6}>
                            <Card title={'Trained Models'}>
                                <List style={{ height: '170px', overflowY: 'scroll' }}>
                                    <List.Item>
                                        <small><b>Options</b></small>
                                        <small><b>Name</b></small>
                                        <small><b>Epochs</b></small>
                                        <small><b>Layers</b></small>
                                        <small><b>Acc</b></small>
                                        <small><b>Loss</b></small>
                                        <small><b>BTacc</b></small>
                                    </List.Item>
                                    {Object.keys(this.state.models).map((each, i) => {
                                        let model = this.state.models[each];
                                        return (
                                            <List.Item key={i}>
                                                <small>
                                                    <Dropdown trigger={['click']} overlay={
                                                        <Menu>
                                                            <Menu.Item key='0'>
                                                                <DeleteOutlined onClick={() => this.deleteModel(model)} />
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
                                                {console.log('test---', model)}
                                                <small>{model.modelName}</small>
                                                <small>{model.epochs}</small>
                                                <small>{model.layer1}-{model.layer2}-{model.layer3}</small>
                                                <small>{model.results.acc * 100}%</small>
                                                <small>{model.results.loss * 100}%</small>
                                                <small>{model.results.btAcc * 100}%</small>
                                            </List.Item>
                                        )
                                    })}
                                </List>
                            </Card>
                            <Card title={
                                <Col>
                                    <Col>
                                        <Row>
                                            <Button onClick={() => this.setState({ trainOps: !this.state.trainOps })} className='mx-1' type='dashed'>Options</Button>
                                            <Button onClick={this.trainModel} disabled={this.state.train.creating} className='mx-1' type='danger'>Train</Button>
                                            <Col>
                                                {this.state.train.creating ? <Progress percent={this.state.train.progress * 100} status='active' /> : null}
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Collapse in={this.state.trainOps}>
                                        <Col>
                                            <Divider className='m-0 my-2' />
                                            <Row className='py-2 text-center'>
                                                <Col xl={4}>
                                                    <small className='pr-2 fs-11'>Epochs</small><br />
                                                    <InputNumber value={this.state.train.epochs} onChange={(val) => this.handleInput('train', 'epochs', val)} />
                                                </Col>
                                                <Col xl={4}>
                                                    <small className='pr-2 fs-11'>Type</small><br />
                                                    <Select onChange={(val) => this.handleInput('train', 'type', val)} defaultValue='wl' >
                                                        <Select.Option value='wl'>WL</Select.Option>
                                                        <Select.Option value='ql'>QL</Select.Option>
                                                    </Select>
                                                </Col>
                                                <Col xl={4}>
                                                    <small className='pr-2 fs-11'>Dataset</small><br />
                                                    <Select onChange={(val) => this.handleInput('train', 'dataset', val)} defaultValue='none' >
                                                        {Object.keys(this.state.datasets).map(dataset => {
                                                            let { datasetName } = this.state.datasets[dataset];
                                                            return (
                                                                <Select.Option key={datasetName} value={datasetName}>{datasetName}</Select.Option>
                                                            )
                                                        })}
                                                    </Select>
                                                </Col>
                                            </Row>
                                            <Divider className='m-0 my-2' />
                                            <Row className='py-2 text-center'>
                                                <Col xl={4}>
                                                    <small className='fs-11'>Layer1</small><br />
                                                    <InputNumber value={this.state.train.layer1} onChange={(val) => this.handleInput('train', 'layer1', val)} />
                                                </Col>
                                                <Col xl={4}>
                                                    <small className='fs-11'>Layer2</small><br />
                                                    <InputNumber value={this.state.train.layer2} onChange={(val) => this.handleInput('train', 'layer2', val)} />
                                                </Col>
                                                <Col xl={4}>
                                                    <small className='fs-11'>Layer3</small><br />
                                                    <InputNumber value={this.state.train.layer3} onChange={(val) => this.handleInput('train', 'layer3', val)} />
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Collapse>
                                </Col>
                            }>
                                {!this.state.trainSaveMode &&
                                    <Col className='py-3' style={{ height: '280px' }}>
                                        <Row style={{ justifyContent: 'space-evenly' }}>
                                            <Progress type='circle' percent={this.state.train.acc * 100} />
                                            <Progress type='circle' percent={this.state.train.loss * 100} />
                                        </Row>
                                    </Col>
                                }
                                {this.state.trainSaveMode &&
                                    <Col style={{ height: '280px', paddingTop: '3rem' }}>
                                        <Row>
                                            <Col md={5}>
                                                <Input onChange={e => this.handleInput('train', e.target.name, e.target.value)} name='modelName' placeholder='file name' />
                                            </Col>
                                            <Col>
                                                <Select onChange={(val) => this.handleInput('train', 'saveIn', val)} defaultValue='local' >
                                                    <Select.Option value='local'>Local</Select.Option>
                                                    <Select.Option value='clound'>Clound</Select.Option>
                                                </Select>
                                            </Col>
                                            <Col>
                                                <Row>
                                                    <Button disabled={this.state.train.creating} onClick={this.trainModel} shape='round' type='danger'>Go</Button>
                                                    <a onClick={() => this.setState({ trainSaveMode: false })} className='p-1 px-2'><CloseCircleOutlined /></a>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Col>
                                }
                            </Card>
                        </Col>
                    </Row>
                }
            </Aux>
        );
    }
}

export default SamplePage;