import React, { Component } from 'react';
import { Col, Card } from 'react-bootstrap';

class EventList extends Component {
    state = {
        drafting: false
    };

    draftEvent = () => {
        if (!this.state.drafting) {
            console.log('-----')
            this.setState({
                drafting: true,
                draftLoad: true
            },
                () => {
                    setTimeout(() => {
                        this.setState({ draftLoad: false })
                    }, 3000);
                })
        }
    }

    render() {
        return (
            <div className='col-12'>
                <Card title='Upcoming Events'>

                    {this.props.list ? this.props.list.map((event, i) => {
                        return (
                            <Card title='asdf Events'>
                                <p>{event.name}</p>
                            </Card>
                        )
                    }) : <div></div>}
                </Card>

            </div>
        )
    }
}

export default EventList;