import React from 'react';
import { Switch, Row, Col } from 'antd';
import { IntegratedStyled } from '../styled';
const Integrated = () => {
    return (
        <IntegratedStyled>
            <Row className='all-switch'>
                <Col span={24}><Switch size="large" /> Cổng thanh toán ViettelPay</Col>
                <Col span={24}><Switch size="large" /> Cổng thanh toán ví điện tử Momo</Col>
                <Col span={24}><Switch size="large" /> Cổng thanh toán thẻ ATM</Col>
                <Col span={24}><Switch size="large" /> API nhận tên định danh khai báo từ nhà mạng</Col>
                <Col span={24}><Switch size="large" /> API cho phép nhà mạng khai báo tên định danh</Col>
            </Row>
        </IntegratedStyled>
    );
}

export default Integrated;
