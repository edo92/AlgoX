import React, { Component } from 'react';
import './style.css';

import { Row, Col } from 'react-bootstrap';
import { Button } from 'antd';
import { ExperimentOutlined, LinkOutlined, SlidersOutlined } from '@ant-design/icons';

import Aux from '../../hoc/_Aux';
import axios from 'axios';

import ModelsControlPanel from './Models';
import DatasetControlPanel from './Dataset';

class SamplePage extends Component {
    state = {
        model: {},
        dataset: {}
    };

    componentDidMount() {
        this.getInitialData();
    }

    getInitialData = async () => {
        let initialData = await axios.get('/api/get/init');
        this.setState({ ...initialData.data });
    }

    trainModel = async config => {
        let resp = await axios.post('/engine/model/train', { config });
        this.setState({ ...resp.data });
    }

    deleteModel = selected => {
        axios.delete(`/engine/model/remove/${selected._id}`)
        this.setState({
            models: this.state.models.filter(model => {
                return model._id !== selected._id;
            })
        })
    }

    createDataset = async config => {
        let datasets = await axios.post('/engine/dataset/create', { config });
        this.setState({ ...datasets.data });
    }

    deleteDataset = async selected => {
        await axios.delete(`/engine/dataset/remove/${selected._id}`);
        this.setState({
            datasets: this.state.datasets.filter(dataset => {
                return dataset._id !== selected._id;
            })
        })
    }

    updateStats = async () => {
        this.setState({ onLoadStats: true });
        let stats = await axios.get('/api/update/stats');
    }

    render() {
        console.log('thisttate ---', this.state)
        return (
            <Aux>
                <Row>
                    <Col sm={7}>
                        <Row className='justify-evenly'>
                            <Button disabled={this.state.onLoadStats} onClick={this.updateStats} type='primary'>
                                <LinkOutlined style={{ fontSize: '1.4em' }} />
                            </Button>
                            <Button onClick={this.charts} type='ghost'>
                                <SlidersOutlined style={{ fontSize: '1.4em' }} />
                            </Button>
                            <Button type='ghost'>
                                <ExperimentOutlined style={{ fontSize: '1.4em' }} />
                            </Button>
                        </Row>
                    </Col>
                </Row>
                <Row className='py-3 pt-4 m-0'>
                    <DatasetControlPanel {...this} datasets={this.state.datasets} />
                    <ModelsControlPanel {...this} models={this.state.models} />
                </Row>
            </Aux>
        );
    }
}

export default SamplePage;