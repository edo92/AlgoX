import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Avatar, Button } from 'antd';

import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import Card from '../../App/components/MainCard';
import Aux from '../../hoc/_Aux';

class LiveEvent extends Component {
    state = {
        current: 0
    }

    prev = () => {
        let size = (this.props.state.draft && this.props.state.draft.fights.length) - 1;
        this.setState({
            current: this.state.current > 0 ? this.state.current - 1 : size
        })
    }

    next = () => {
        let size = (this.props.state.draft && this.props.state.draft.fights.length) - 1;
        this.setState({
            current: this.state.current < size ? this.state.current + 1 : 0
        })
    }

    render() {
        const draft = this.props.state.draft;
        console.log('current', this.state.current)
        return (
            <Aux>
                <Card title='Live Event'>
                    <Row className='justify-content-center'>
                        {draft &&
                            <span>
                                <a onClick={this.prev} className='px-2' style={{ border: '1px solid gray', borderRadius: '50%', padding: '.35rem', borderColor: '#f1f1f1' }}><LeftOutlined className='icon-fix' /></a>
                                <span className='px-2'>{draft.fights[this.state.current].fighter1.name}</span>
                                <Avatar size='large' src={draft.fights[this.state.current].fighter1.dk.image} />
                                <span className='px-2'>VS</span>
                                <Avatar size='large' src={draft.fights[this.state.current].fighter2.dk.image} />
                                <span className='px-2'>{draft.fights[this.state.current].fighter2.name}</span>
                                <a onClick={this.next} className='px-2' style={{ border: '1px solid gray', borderRadius: '50%', padding: '.35rem', borderColor: '#f1f1f1' }}><RightOutlined className='icon-fix' /></a>
                            </span>
                        }

                    </Row>
                    <Row className='justify-content-center'>
                        <Button size='small'><small>End</small></Button>
                    </Row>
                </Card>
            </Aux>
        )
    }
}

export default LiveEvent;