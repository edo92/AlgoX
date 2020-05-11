import React, { Component } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';

import { Button, Select } from 'antd';
import { BulbOutlined } from '@ant-design/icons';

import Card from '../../App/components/MainCard';
import Aux from '../../hoc/_Aux';

import InputForm from './InputForm';
import Combinations from './Combinations';
import LiveEvent from './Live';

class Draft extends Component {
    state = {
    };

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

    autoGen = async () => {
        let generated = await axios.post('/engine/generate/draft/', { draft: this.state.draft });
        console.log('generated',generated)
        this.setState({ combins: generated.data });
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
        let size = 0;

        // Count selected fighters number
        Object.keys(this.state.fighters).map(fighter => {
            if (this.state.fighters[fighter]) {
                size += 1;
            }
        })
        if (size > 2) {
            let generated = await axios.post('/engine/generate/draft/', { draft: this.state.draft, filter: this.state.fighters });
            this.setState({ combins: generated.data });
        }
    }

    getCombins = async () => {
        let cards = await axios.get('/api/get/cards/');
        this.setState({ combins: cards.data });
    }

    draftCard = async card => {
        await axios.post('/api/update/combins/', { card: { ...card, name: this.state.draft.name } });
    }

    hideCard = async index => {
        this.setState({
            ...this.state,
            combins: {
                ...this.state.combins,
                cards: this.state.combins.cards.filter((eachCard, i) => {
                    if (index !== i) {
                        return eachCard;
                    }
                })
            }
        })
    }

    deleteCard = async card => {
        await axios.post('/api/remove/card/', { card: { ...card, name: this.state.draft.name } });
        this.setState({
            ...this.state,
            combins: {
                ...this.state.combins,
                cards: this.state.combins.cards.filter(eachCard => {
                    if (eachCard._id !== card._id) {
                        return card
                    }
                })
            }
        })
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
                                <Button onClick={this.getCombins} type='primary' className='mr-3'>Saved Cards</Button>
                                <Button onClick={this.predict} disabled={!this.state.model || this.state.predictOnLoad} loading={this.state.predictOnLoad} className='mr-3' type='ghost'>
                                    Predict{!this.state.predictOnLoad && <BulbOutlined />}
                                </Button>
                                <Select onChange={this.handleSelectModel} defaultValue={'Model'} className='mr-3'>
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
                                <Combinations {...this} state={this.state} getCombins={this.getCombins} state={this.state} generate={this.generateCustomCombins} handleSelect={this.handleSelectFighter} draft={this.state.draft} saveCombins={this.saveCombins} draftInfo={this.state.draftInfo} />
                            }

                            {/* {!this.state.live &&
                                <LiveEvent state={this.state} />
                            } */}
                        </Card>
                    </Col>
                </Row>
            </Aux>
        )
    }
}

export default Draft;