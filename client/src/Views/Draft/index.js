import React, { Component } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';

import { List, Avatar, Badge, Divider, InputNumber, Button, Skeleton, Radio, Select } from 'antd';
import { InfoCircleOutlined, SearchOutlined, NodeIndexOutlined, AppstoreAddOutlined, BulbOutlined } from '@ant-design/icons';

import Card from '../../App/components/MainCard';
import Aux from '../../hoc/_Aux';
import SelectForm from './SelectForm';

class Draft extends Component {
    state = {};

    componentDidMount() {
        this.initialRequest();
    }

    initialRequest = async () => {
        let draft = await axios.get('/api/get/draftInit/');
        this.setState({ ...draft.data });
    }

    handleSelectModel = model => {
        this.setState({ model: model });
    }

    predict = async () => {
        this.setState({ predictOnLoad: true });
        let predict = await axios.post('/engine/predict/draft/', { model: this.state.model });
        this.setState({ predicted: true, predictOnLoad: false, draft: predict.data.draft });
    }

    generate = async () => {
        let test = await axios.post('/engine/generate/draft/', { draft: this.state.draft });
        console.log('test---', test)
    }

    render() {
        return (
            <Aux>
                <Row>
                    <Col>
                        <Card isOption title={
                            <Row>
                                <Button onClick={this.generate} disabled={!this.state.predicted} className='mr-3' type='ghost'>Generate<AppstoreAddOutlined /></Button>
                                <Button onClick={this.predict} disabled={!this.state.model || this.state.predictOnLoad} loading={this.state.predictOnLoad} className='mr-3' type='ghost'>
                                    Predict{!this.state.predictOnLoad && <BulbOutlined />}
                                </Button>
                                <Select onChange={this.handleSelectModel} defaultValue={'Model'} >
                                    {(this.state.models || []).map((model, i) => {
                                        return (
                                            <Select.Option key={i} value={model._id}>{model.modelName}</Select.Option>
                                        )
                                    })}
                                </Select>
                            </Row>
                        }>
                            <SelectForm draft={this.state.draft} />
                        </Card>
                    </Col>
                </Row>
            </Aux>
        )
    }
}

export default Draft;