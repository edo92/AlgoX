import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Skeleton, Button } from 'antd';

import Aux from "../../hoc/_Aux";
import Card from "../../App/components/MainCard";
// import socket from '../../socket';

class SamplePage extends Component {
    constructor() {
        super();

        this.state = {
            events: [],
            drafting: false
        };
    }

    componentDidMount() {
        this.getUpcommingEvents();
    }

    getUpcommingEvents = () => {
        // socket.emit('get-upcome-events', { name: 'name' });
        // socket.listen('get-upcome-events', data => {
        //     this.setState({ events: data });
        // })
    }

    draftEvent = e => {
        // socket.emit('draft-event', { event: e._id });

        if (!this.state.drafting) {
            this.setState({
                drafting: true,
                draftLoad: true
            });

            setTimeout(() => {
                this.setState({
                    draftLoad: false
                });
            }, 3000);
        }
    }

    render() {
        const EventHeader = props => (
            <span>
                <span>{props.event.name}</span>
                <span className='pl-5'>
                    <Button className='mx-1' type='primary'>Save</Button>
                    <Button className='mx-1' type='primary'
                        disabled={this.state.drafting}
                        loading={this.state.draftLoad}
                        onClick={() => this.draftEvent(props.event)}
                    >
                        {console.log('test', props.event)}
                        <span>{!this.state.draftLoad && this.state.drafting ? 'Drafted' : 'Draft'}</span>
                    </Button>
                </span>
            </span>
        )
        return (
            <Aux>
                <Row>
                    <Col>
                        <Card title='Upcoming Events'>
                            {this.state.events ? this.state.events.map((event, i) => {
                                return (
                                    <Card key={i + event.name} isOption title={<EventHeader event={event} />}>
                                        {event.fights.map(fight => (
                                            <Row>
                                                <Col style={{ display: 'flex', justifyContent: 'space-around' }}>
                                                    <p>{fight.fighter1.name}</p>
                                                    <p>{fight.fighter2.name}</p>
                                                </Col>
                                            </Row>
                                        ))}
                                    </Card>
                                )
                            }) : <Skeleton />}
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }
}

export default SamplePage;