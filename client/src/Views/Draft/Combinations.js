import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Card, Badge, Button } from 'antd';

import Aux from '../../hoc/_Aux';
import CardRow from '../../App/components/MainCard';

class Combinations extends Component {
    render() {
        const IntroData = () => (
            <Card className='p-1'>
                <p>Combins: <b>{this.props.cards && this.props.cards.length}</b></p>
                <p>Fights: <b>{this.props.draftInfo && this.props.draftInfo.size} </b> </p>
                <p>Avg. Strength: <b> {this.props.draftInfo && this.props.draftInfo.strAvg}</b></p>
                <Button onClick={this.props.saveCombins}>Save</Button>
            </Card>
        )

        const CardsList = props => {
            return props.card.fighters.map((fighter, ftNum) => {
                return (
                    <div key={fighter.name} className='px-2 p-1'>
                        <span>{ftNum + 1}. <b> {fighter.name}</b></span>
                        <span className='mx-1'> {fighter.predict.outcome === 'Win' ?
                            <Badge status='success' /> :
                            <Badge status='error' />
                        }
                        </span>
                    </div>
                )
            })
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