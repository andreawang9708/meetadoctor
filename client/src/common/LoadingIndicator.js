import React from 'react';
import { Spin, Icon } from 'antd';

export default function LoadingIndicator(props) {
    const antIcon = <Icon type="loading" style={{ fontSize: 30 , color: "green"}} spin />;
    return (
        <Spin indicator={antIcon} style = {{display: 'block', textAlign: 'center', marginTop: 30}} />
    );
}
