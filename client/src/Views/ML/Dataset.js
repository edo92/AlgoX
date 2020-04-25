import React, { Component } from 'react';
import { Row, Col, Collapse } from 'react-bootstrap';
import { Button, List, Dropdown, Menu, Divider, Select, Statistic, Modal, Input, Skeleton } from 'antd';
import { EllipsisOutlined, DotChartOutlined, DeleteOutlined, CloseCircleOutlined } from '@ant-design/icons';
import Card from '../../App/components/MainCard';

class Dataset extends Component {
    state = {
        options: {
            save: 'save',
            in: 'local'
        }
    }

    componentWillReceiveProps(props, nextProps) {
        if (nextProps) {
            this.setState({ creating: false });
        }
    }

    handelCreateDataset = () => {
        if (this.state.onLoad) {
            if (this.state.options.datasetName) {
                this.props.createDataset(this.state.options);
                this.setState({ creating: true });
            }
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
        const DatasetGuid = () => (
            <List.Item>
                <small><b>Options</b></small>
                <small><b>Name</b></small>
                <small><b>Type</b></small>
                <small><b>Size</b></small>
                <small><b>Points</b></small>
            </List.Item>
        )

        const DatasetInfo = props => {
            const dataset = props.dataset;
            return (
                <>
                    <small>{dataset.datasetName}</small>
                    <small>{dataset.type}</small>
                    <small>{dataset.size}</small>
                    <small>{dataset.dataPoints}</small>
                </>
            )
        }

        const DataPontControl = () => {
            return (
                <Modal

                >

                </Modal>
            )
        }

        return (
            <Col xs={12} md={6}>
                <Card title={'Datasets'}>
                    <List style={{ height: '170px', overflowY: 'scroll' }}>
                        <DatasetGuid />
                        {this.props.datasets ? this.props.datasets.map((dataset, i) => {
                            return (
                                <List.Item key={i}>
                                    <small>
                                        <Dropdown trigger={['click']} overlay={
                                            <Menu>
                                                <Menu.Item key='0' onClick={() => this.props.deleteDataset(dataset)}>
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
                                    <DatasetInfo dataset={dataset} />
                                </List.Item>
                            )
                        }) : <Skeleton />}
                    </List>
                </Card>
                <Card title={
                    <Col className='p-0'>
                        <Col>
                            <Row>
                                {this.state.onLoad ?
                                    <span><Input onChange={val => this.handleInput('options', 'datasetName', val.target.value)} value={this.state.options.datasetName} placeholder='Model Name' /></span>
                                    :
                                    <Button onClick={() => this.setState({ optionCollaps: !this.state.optionCollaps })} className='mx-1' type='dashed'>Options</Button>
                                }
                                <Button onClick={this.handelCreateDataset} loading={this.state.creating} disabled={this.state.creating} className='mx-1' type='danger'>Create</Button>
                                <Col className='p-1'>
                                    {this.state.onLoad && <CloseCircleOutlined onClick={() => this.setState({ onLoad: false })} />}
                                </Col>
                            </Row>
                        </Col>
                        <Collapse className='collapsOptions' in={this.state.optionCollaps}>
                            <Col>
                                <Divider className='m-0 mt-3' />
                                <Row className='justify-evenly pt-3'>
                                    <Button>Data Points</Button>
                                    <Select onChange={val => this.handleInput('options', 'save', val)} defaultValue='save' >
                                        <Select.Option value='save'>Save</Select.Option>
                                        <Select.Option value='none'>Dont Save</Select.Option>
                                    </Select>
                                    <Select onChange={val => this.handleInput('options', 'in', val)} defaultValue='local' >
                                        <Select.Option value='cloud'>Cloud</Select.Option>
                                        <Select.Option value='local'>Local</Select.Option>
                                    </Select>
                                </Row>
                            </Col>
                        </Collapse>
                    </Col>
                }>
                    <Col>
                        <Row className='text-center'>
                            <Col span={12}>
                                <div className='py-3'>
                                    <Statistic title='Events' value={this.props.state.dataset.events} />
                                </div>
                            </Col>
                            <Col span={12}>
                                <div className='py-3'>
                                    <Statistic title='Fights' value={this.props.state.dataset.fights} />
                                </div>
                            </Col>
                            <Col span={12}>
                                <div className='py-3'>
                                    <Statistic title='Fights' value={this.props.state.dataset.fighters} />
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Card>
            </Col>
        )
    }
};

export default Dataset;