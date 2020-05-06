import React, { Component } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';

import { Button, Select } from 'antd';
import { AppstoreAddOutlined, BulbOutlined } from '@ant-design/icons';

import Card from '../../App/components/MainCard';
import Aux from '../../hoc/_Aux';

import SelectForm from './SelectForm';
import InputForm from './InputForm';
import Combinations from './Combinations';

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

    handleSelectOptions = (val, index, fighter, opt) => {
        this.state.draft.fights[index][fighter].select = opt;
    }

    predict = async () => {
        this.setState({ predictOnLoad: true });
        let predict = await axios.post('/engine/predict/draft/', { model: this.state.model });
        this.setState({ predicted: true, predictOnLoad: false, draft: predict.data.draft, draftInfo: predict.data.draftInfo });
    }

    generate = async () => {
        let generated = await axios.post('/engine/generate/draft/', { draft: this.state.draft });
        this.setState({ cards: generated.data });
    }

    saveFightsData = async () => {
        await axios.post('/api/update/draft', { draft: this.state.draft });
    }

    handleUpdateDkForm = draft => {
        this.setState({ draft });
    }

    saveCombins = async () => {
        await axios.post('/api/create/draft/', { cards: this.state.cards });
    }

    generateCustomCombins = async () => {
        let generated = await axios.post('/engine/generate/draft/', { draft: this.state.draft, filter: this.state.fighters });
        this.setState({ cards: generated.data });
    }

    handleSelectFighter = (fighter, opponent) => {
        this.setState({
            ...this.state,
            fighters: {
                ...this.state.fighters,
                [fighter]: !this.state.fighters[fighter],
                [opponent]: this.state.fighters[fighter] ? false : this.state.fighters[fighter]
            }
        })
    }

    render() {
        console.log('state', this.state)
        return (
            <Aux>
                <Row>
                    <Col>
                        <Card isOption title={
                            <Row>
                                <Button onClick={this.generateCustomCombins} disabled={!this.state.predicted} className='mr-3' type='ghost'>Generate<AppstoreAddOutlined /></Button>
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
                            {!this.state.inputMode && this.state.draft &&
                                <InputForm update={this.handleUpdateDkForm} saveFightsData={this.saveFightsData} draft={this.state.draft} />
                            }
                            {this.state.inputMode && this.state.draft &&
                                <Combinations state={this.state} generate={this.generateCustomCombins} handleSelect={this.handleSelectFighter} draft={this.state.draft} saveCombins={this.saveCombins} draftInfo={this.state.draftInfo} cards={this.state.cards} />
                            }
                        </Card>
                    </Col>
                </Row>
            </Aux>
        )
    }
}

export default Draft;