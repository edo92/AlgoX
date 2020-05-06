import React, { Component } from 'react';
import axios from 'axios';

import { Row, Col } from 'react-bootstrap';
import { Card, Badge, Button, Modal, Avatar, Skeleton, Switch, Divider } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

import Aux from '../../hoc/_Aux';
import CardRow from '../../App/components/MainCard';

class Combinations extends Component {
    state = {
        viewStats: {}
    };

    statsModalSwitch = async fighter => {
        let stats = await axios.post('/api/get/fighterStats/', { id: fighter.fighterId });
        console.log('imp-->', fighter)

        this.setState({
            viewStats: { ...stats.data, predict: fighter.predict, dk: fighter.dk, outcome: fighter.outcome },
            statsModalSwitch: !this.state.statsModalSwitch
        })
    }

    render() {
        const IntroData = () => (
            <Card className='p-1'>
                <Row>
                    <Col xl={6}>
                        {(this.props.draft.fights.slice().splice(0, 7) || []).map((fight, i) => {
                            return (
                                <Row key={i} className='p-3 justify-content-center'>
                                    <a onClick={() => this.statsModalSwitch(fight.fighter1)}>
                                        <InfoCircleOutlined />
                                    </a>
                                    <Button type={(this.props.state && this.props.state.fighters[fight.fighter1.name]) ? 'primary' : 'dashed'} onClick={() => this.props.handleSelect(fight.fighter1.name, fight.fighter2.name)} className='px-3'><Badge status={fight.fighter1.predict && fight.fighter1.predict.outcome === 'Win' ? 'success' : 'error'} />{fight.fighter1.name}</Button>
                                    <span className='px-3'>VS</span>
                                    <Button type={(this.props.state && this.props.state.fighters[fight.fighter2.name]) ? 'primary' : 'dashed'} onClick={() => this.props.handleSelect(fight.fighter2.name, fight.fighter1.name)} className='px-3'><Badge status={fight.fighter2.predict && fight.fighter2.predict.outcome === 'Win' ? 'success' : 'error'} />{fight.fighter2.name}</Button>
                                    <a onClick={() => this.statsModalSwitch(fight.fighter2)}>
                                        <InfoCircleOutlined />
                                    </a>
                                </Row>
                            )
                        })}
                    </Col>
                    <Col xl={6}>
                        {(this.props.draft.fights.slice().splice(7, this.props.draft.fights.length) || []).map((fight, i) => {
                            return (
                                <Row key={i} className='p-3 justify-content-center'>
                                    <a onClick={() => this.statsModalSwitch(fight.fighter1)}>
                                        <InfoCircleOutlined />
                                    </a>
                                    <Button type={(this.props.state && this.props.state.fighters[fight.fighter1.name]) ? 'primary' : 'dashed'} onClick={() => this.props.handleSelect(fight.fighter1.name, fight.fighter2.name)} className='px-3'><Badge status={fight.fighter1.predict && fight.fighter1.predict.outcome === 'Win' ? 'success' : 'error'} />{fight.fighter1.name}</Button>
                                    <span className='px-3'>VS</span>
                                    <Button type={(this.props.state && this.props.state.fighters[fight.fighter2.name]) ? 'primary' : 'dashed'} onClick={() => this.props.handleSelect(fight.fighter2.name, fight.fighter1.name)} className='px-3'><Badge status={fight.fighter2.predict && fight.fighter2.predict.outcome === 'Win' ? 'success' : 'error'} />{fight.fighter2.name}</Button>
                                    <a onClick={() => this.statsModalSwitch(fight.fighter2)}>
                                        <InfoCircleOutlined />
                                    </a>
                                </Row>
                            )
                        })}
                    </Col>
                </Row>
                <StatsModal />
            </Card >
        )

        const CardsList = props => {
            return props.card.fighters.map((fighter, ftNum) => {
                return (
                    <div key={fighter.name} className='px-2 p-1'>
                        <span>{ftNum + 1}. <b> {fighter.name}</b></span>
                        <span className='mx-1'> {fighter.predict && fighter.predict.outcome === 'Win' ?
                            <Badge status='success' /> :
                            <Badge status='error' />
                        }
                            <span> {fighter.outcome && fighter.outcome}</span>
                        </span>
                    </div>
                )
            })
        }

        const StatsModal = () => {
            let fighter = this.state.viewStats;
            console.log('fighter-->', fighter)
            return (
                <Modal
                    title="Basic Modal"
                    visible={this.state.statsModalSwitch}
                    onOk={this.handleOk}
                    onCancel={this.statsModalSwitch}
                >
                    {this.state.viewStats.stats ?
                        <span>
                            <Row className='p-3'>
                                <span className='px-2'><Avatar size='default' /></span>
                                <span className='px-2'><b>{fighter.name}</b></span>
                                <span className='px-3'><b>{fighter.fighterId}</b></span>
                            </Row>
                            <Row>
                                <Col>
                                    <div>
                                        <p><b>Reality: {<Badge status={fighter.outcome === 'Win' ? 'success' : 'error'} />}{fighter.outcome}</b></p>
                                    </div>
                                    {fighter.predict && <div>
                                        <div>
                                            <span className='p-1 px-2'>Prediction:<Badge status={fighter.predict.outcome === 'Win' ? 'success' : 'error'} />{fighter.predict.outcome}</span>
                                        </div>
                                        <div>
                                            <span className='p-1 px-2'>Strength: {fighter.predict.strength}</span>
                                        </div>
                                        <div>
                                            <span className='p-1 px-2'>Win: {fighter.predict.win}%</span>
                                            <span className='p-1 px-2'>Loss: {fighter.predict.loss}%</span>
                                        </div>
                                    </div>}
                                    <div>
                                        <span className='p-1 px-2'>FppF: {fighter.dk.fppf}</span>
                                        <span className='p-1 px-2'>Price: {fighter.dk.price}</span>
                                    </div>
                                </Col>
                            </Row>
                            <Divider />
                            <Row className='justify-content-center'>
                                <Col xl={6}>
                                    <div className='p-3'>
                                        <p>Age: {new Date().getFullYear() - Number(fighter.stats.dob.split(',')[1])}</p>
                                        <p>Hight: {fighter.stats.hight}</p>
                                        <p>Reach: {fighter.stats.reach}</p>
                                        <p>Record: {fighter.stats.record}</p>
                                        <p>Weight: {fighter.stats.weight}</p>
                                        <p>Stance: {fighter.stats.stance}</p>
                                    </div>
                                </Col>
                                <Col xl={6}>
                                    <div className='p-3'>
                                        <p>StrAcc: {fighter.stats.StrAcc}</p>
                                        <p>TDAcc: {fighter.stats.TDAcc}</p>
                                        <p>StrDef: {fighter.stats.StrDef}</p>
                                        <p>TDDef: {fighter.stats.TDDef}</p>
                                        <p>SubAvg: {fighter.stats.SubAvg}</p>
                                        <p>TDAvg: {fighter.stats.TDAvg}</p>
                                    </div>
                                </Col>
                            </Row>
                            <Row >
                                {(fighter.stats.pastFights || []).map(fight => {
                                    return (
                                        <div className='pl-3'>
                                            <span className='px-2'><Badge status={fight.outcome === 'win' ? 'success' : 'error'} /></span>
                                            <span className='px-2'>Opponent: <b>{fight.opponent}</b></span>
                                            <span className='px-2'>Method: <b>{fight.method}</b></span>
                                            <span className='px-2'>Round: <b>{fight.round}</b></span>
                                        </div>
                                    )
                                })}
                            </Row>
                        </span>
                        : <Skeleton />}
                </Modal>
            )
        }
        return (
            <Aux>
                <IntroData />
                <Row style={{ justifyContent: 'space-evenly' }}>
                    {(this.props.cards || []).map((card, i) => {
                        return (
                            <Card key={i} style={{ marginBottom: '.75rem', width: 300 }} size='small'
                                title={
                                    <span>
                                        <small className='px-2'>{`Str: ${card.config.strength}`}</small>
                                        <small className='px-2'>{`Fppf: ${card.config.fppf}`}</small>
                                        <Button size='small' style={{ float: 'right' }}>Drafted</Button>
                                    </span>
                                }>
                                <CardsList card={card} />
                            </Card>
                        )
                    })}
                </Row>
            </Aux>
        )
    }
}

export default Combinations;