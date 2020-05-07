import React, { Component } from 'react';
import axios from 'axios';

import { Row, Col, Collapse } from 'react-bootstrap';
import { Card, Badge, Button, Modal, Avatar, Skeleton, Switch, Divider } from 'antd';
import { InfoCircleOutlined, DashOutlined, DeploymentUnitOutlined } from '@ant-design/icons';

import Aux from '../../hoc/_Aux';

class Combinations extends Component {
    state = {
        filterCollaps: true,
        viewStats: {}
    };

    statsModalSwitch = async fighter => {
        let stats = await axios.post('/api/get/fighterStats/', { id: fighter.fighterId });

        this.setState({
            viewStats: { ...stats.data, predict: fighter.predict, dk: fighter.dk, outcome: fighter.outcome },
            statsModalSwitch: !this.state.statsModalSwitch
        })
    }

    render() {
        const ButtonPanel = () => (
            <Card>
                <Row>
                    <Col>
                        <Button onClick={() => { this.setState({ filterCollaps: !this.state.filterCollaps }) }} size='small'><DashOutlined className='icon-fix' /></Button>
                        <Button onClick={this.props.generateCustomCombins} disabled={!this.props.state.predicted} className='mr-3 icon-fix' size='small' type='ghost'><DeploymentUnitOutlined /></Button>
                    </Col>
                    <Col>
                        <b><span className='px-2'><span style={{ fontSize: '12px' }}>Fights: {this.props.state.draft.fights && Object.keys(this.props.state.draft.fights).length}</span></span></b>
                        {this.props.state.combins && <span className='px-2'><b><span style={{ fontSize: '12px' }}>Cards: {Object.keys(this.props.state.combins.cards).length}</span></b></span>}
                        {this.props.state.combins && <span className='px-2'><b><span style={{ fontSize: '12px' }}>Fighters: {Object.keys(this.props.state.combins.fighters).length}</span><InfoCircleOutlined onClick={() => this.setState({ combinModal: !this.state.combinModal })} className='icon-fix mx-1' style={{ fontSize: '11px' }} /></b></span>}
                    </Col>
                </Row>
                <CombinModal />
            </Card>
        )

        const SelectPanel = () => (
            <Collapse in={this.state.filterCollaps}>
                <Card className='p-1'>
                    <Row>
                        <Col lg={6} xl={6}>
                            {(this.props.draft.fights.slice().splice(0, 7) || []).map((fight, i) => {
                                return (
                                    <Row key={i} className='p-3'>
                                        <Button type={(this.props.state && this.props.state.fighters[fight.fighter1.name]) ? 'primary' : 'dashed'} onClick={() => this.props.handleSelect(fight.fighter1.name, fight.fighter2.name)} className='px-3' style={{ width: '150px' }}><Badge status={fight.fighter1.predict && fight.fighter1.predict.outcome === 'Win' ? 'success' : 'error'} />{fight.fighter1.name.charAt(0)}. {fight.fighter1.name.split(' ')[1]}</Button>
                                        <a onClick={() => this.statsModalSwitch(fight.fighter1)}> <Avatar src={fight.fighter1.dk.image} className='mx-2' /></a>
                                        <span className='px-3'>VS</span>
                                        <a onClick={() => this.statsModalSwitch(fight.fighter2)}> <Avatar src={fight.fighter2.dk.image} className='mx-2' /> </a>
                                        <Button type={(this.props.state && this.props.state.fighters[fight.fighter2.name]) ? 'primary' : 'dashed'} onClick={() => this.props.handleSelect(fight.fighter2.name, fight.fighter1.name)} className='px-3' style={{ width: '150px' }}><Badge status={fight.fighter2.predict && fight.fighter2.predict.outcome === 'Win' ? 'success' : 'error'} />{fight.fighter2.name.charAt(0)}. {fight.fighter2.name.split(' ')[1]}</Button>
                                    </Row>
                                )
                            })}
                        </Col>
                        <Col lg={6} xl={6}>
                            {(this.props.draft.fights.slice().splice(7, this.props.draft.fights.length) || []).map((fight, i) => {
                                return (
                                    <Row key={i} className='p-3'>
                                        <Button type={(this.props.state && this.props.state.fighters[fight.fighter1.name]) ? 'primary' : 'dashed'} onClick={() => this.props.handleSelect(fight.fighter1.name, fight.fighter2.name)} className='px-3' style={{ width: '150px' }}><Badge status={fight.fighter1.predict && fight.fighter1.predict.outcome === 'Win' ? 'success' : 'error'} />{fight.fighter1.name.charAt(0)}. {fight.fighter1.name.split(' ')[1]}</Button>
                                        <a onClick={() => this.statsModalSwitch(fight.fighter1)}> <Avatar src={fight.fighter1.dk.image} className='mx-2' /></a>
                                        <span className='px-3'>VS</span>
                                        <a onClick={() => this.statsModalSwitch(fight.fighter2)}> <Avatar src={fight.fighter2.dk.image} className='mx-2' /> </a>
                                        <Button type={(this.props.state && this.props.state.fighters[fight.fighter2.name]) ? 'primary' : 'dashed'} onClick={() => this.props.handleSelect(fight.fighter2.name, fight.fighter1.name)} className='px-3' style={{ width: '150px' }}><Badge status={fight.fighter2.predict && fight.fighter2.predict.outcome === 'Win' ? 'success' : 'error'} />{fight.fighter2.name.charAt(0)}. {fight.fighter2.name.split(' ')[1]}</Button>
                                    </Row>
                                )
                            })}
                        </Col>
                    </Row>
                    <StatsModal />
                </Card >
            </Collapse>
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

        const CombinModal = () => (
            <div>
                <Modal
                    title='Basic Modal'
                    visible={this.state.combinModal}
                    onOk={this.handleOk}
                    onCancel={() => this.setState({ combinModal: false })}
                >
                    <Col style={{ paddingLeft: '10%' }}>
                        {this.props.state.combins && Object.keys(this.props.state.combins.fighters).map(fighter => {
                            return (
                                <p>{`${fighter}: ${this.props.state.combins.fighters[fighter]}`}</p>
                            )
                        })}
                    </Col>
                </Modal>
            </div>
        )

        const StatsModal = () => {
            let fighter = this.state.viewStats;
            return (
                <Modal
                    title='Basic Modal'
                    visible={this.state.statsModalSwitch}
                    onOk={this.handleOk}
                    onCancel={this.statsModalSwitch}
                >
                    {this.state.viewStats.stats ?
                        <span>
                            <Row className='p-3'>
                                <span className='px-2'><Avatar src={fighter.dk.image} size='large' /></span>
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
                <ButtonPanel />
                <SelectPanel />
                <Card>
                    <Row style={{ justifyContent: 'space-evenly' }}>
                        {(this.props.state.combins && this.props.state.combins.cards || []).map((card, i) => {
                            return (
                                <Card key={i} style={{ marginBottom: '.75rem', width: 300 }} size='small'
                                    title={
                                        <span>
                                            <small className='px-2'>{`Str: ${card.config.strength}`}</small>
                                            <small className='px-2'>{`Fppf: ${card.config.fppf}`}</small>
                                            {card.config.saved &&
                                                <Button onClick={() => this.props.deleteCard(card)} size='small' style={{ float: 'right' }}>Delete</Button>
                                            }
                                            {!card.config.saved &&
                                                <Button onClick={() => this.props.draftCard(card)} size='small' style={{ float: 'right' }}>Drafted</Button>
                                            }
                                        </span>
                                    }>
                                    <CardsList card={card} />
                                </Card>
                            )
                        })}
                    </Row>
                </Card>
            </Aux>
        )
    }
}

export default Combinations;