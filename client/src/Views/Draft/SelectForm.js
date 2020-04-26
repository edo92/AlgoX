import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

import { List, Avatar, Badge, Divider, Button, Skeleton, Radio } from 'antd';
import { SearchOutlined, NodeIndexOutlined } from '@ant-design/icons';

const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
};

class SelectForm extends Component {
    render() {
        return (
            <List className='w-100 px-3'>
                {this.props.draft ? this.props.draft.fights.map((fight, i) => {
                    return (
                        <Row key={i} style={{ justifyContent: 'space-between' }}>
                            <Col xs={6}>
                                <Row>
                                    <Radio.Group className='p-3' name={fight.fighter1.name} onChange={this.onChange}>
                                        <Radio onChange={val => this.handelSelect(val, 'fav')} style={radioStyle} value={1}><small><Badge status='success' />Favorit</small></Radio>
                                        <Radio onChange={val => this.handelSelect(val, 'include')} style={radioStyle} value={2}><small><Badge status='warning' />Include</small></Radio>
                                        <Radio onChange={val => this.handelSelect(val, 'exclude')} style={radioStyle} value={3}><small><Badge status='error' />Exclude</small></Radio>
                                        <Radio onChange={val => this.handelSelect(val, 'neutral')} style={radioStyle} value={4}><small><Badge status='default' />Neutral</small></Radio>
                                    </Radio.Group>
                                    <Col className='p-4'>
                                        <Avatar size={75}></Avatar>
                                        <span className='px-2 h6'>{fight.fighter1.name}</span>
                                        <div className='p-1'>
                                            <Button className='mx-1' shape='circle' icon={<NodeIndexOutlined />} />
                                            <Button className='mx-1' shape='circle' icon={<SearchOutlined />} />
                                        </div>
                                        {fight.fighter1.predict && <div>
                                            <span>{(fight.fighter1.predict).toUpperCase()}</span>
                                            <Badge status={(fight.fighter1.outcome).toLowerCase() === fight.fighter1.predict ? 'success' : 'error'} />
                                        </div>}
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={6}>
                                <Row>
                                    <Col className='p-4 text-right'>
                                        <span className='px-2 h6'>{fight.fighter2.name}</span>
                                        <Avatar size={75}></Avatar>
                                        <div className='p-2'>
                                            <Button className='mx-1' shape='circle' icon={<NodeIndexOutlined />} />
                                            <Button className='mx-1' shape='circle' icon={<SearchOutlined />} />
                                        </div>
                                        {fight.fighter2.predict && <div>
                                            <span>{(fight.fighter2.predict).toUpperCase()}</span>
                                            <Badge status={(fight.fighter2.outcome).toLowerCase() === fight.fighter2.predict ? 'success' : 'error'} />
                                        </div>}
                                    </Col>
                                    <Radio.Group className='p-3' name={fight.fighter2.name} onChange={this.onChange}>
                                        <Radio onChange={val => this.handelSelect(val, 'fav')} style={radioStyle} value={1}><small><Badge status='success' />Favorit</small></Radio>
                                        <Radio onChange={val => this.handelSelect(val, 'include')} style={radioStyle} value={2}><small><Badge status='warning' />Include</small></Radio>
                                        <Radio onChange={val => this.handelSelect(val, 'exclude')} style={radioStyle} value={3}><small><Badge status='error' />Exclude</small></Radio>
                                        <Radio onChange={val => this.handelSelect(val, 'neutral')} style={radioStyle} value={4}><small><Badge status='default' />Neutral</small></Radio>
                                    </Radio.Group>
                                </Row>
                            </Col>
                            <Divider />
                        </Row>
                    )
                }) : <Skeleton />}
            </List>
        )
    }
}

export default SelectForm;