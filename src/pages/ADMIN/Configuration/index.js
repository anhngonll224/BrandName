import React from 'react';
import { Tabs } from 'antd';
import Integrated from './Components/Integrated';
import Warning from './Components/Warning';
const Configuration = () => {
    return (
        <div>
            <Tabs
                type="card"
                defaultActiveKey="1"
                items={[
                    {
                        label: 'Tích hợp hệ thống',
                        key: '1',
                        children: <Integrated />,
                    },
                    {
                        label: 'Cấu hình cảnh báo',
                        key: '2',
                        children: <Warning />,

                    },

                ]}
            />
        </div>
    );
}

export default Configuration;
