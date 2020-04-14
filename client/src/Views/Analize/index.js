import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

import Aux from '../../hoc/_Aux';
import Card from '../../App/components/MainCard';

class Analize extends Component {

    render() {
        return (
            <Aux>
                <Row>
                    <Col>
                        <Card isOption title={'Analitics'}>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        )
    }
}

export default Analize;