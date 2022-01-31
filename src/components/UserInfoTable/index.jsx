import BalancesTable from './BalancesTable';
import OpenOrderTable from './OpenOrderTable';
import React from 'react';
import { Tabs, Typography } from 'antd';
import FillsTable from './FillsTable';
import FloatingElement from '../layout/FloatingElement';
import FeesTable from './FeesTable';
import { useOpenOrders, useBalances, useMarket } from '../../utils/markets';

const { Paragraph } = Typography;
const { TabPane } = Tabs;

export default function Index() {
  const { market } = useMarket();
  return (
    <FloatingElement style={{ flex: 1, paddingTop: 20 }}>
      <Typography>
        <Paragraph style={{ color: 'rgba(255,255,255,0.5)' }}>
          Introducing SoBull decentralized exchange, 0 trading fees on limit order. Your fund is always in your wallet.
        </Paragraph>
        <Paragraph style={{ color: 'rgba(255,255,255,0.5)' }}>
          To fund your wallet, you can get SOL from Binance, OKEX, FTX, BitMax and others, or convert ETH to SOL in your sollet wallet.
        </Paragraph>
      </Typography>
      <Tabs defaultActiveKey="orders">
        <TabPane tab="Open Orders" key="orders">
          <OpenOrdersTab />
        </TabPane>
        <TabPane tab="Recent Trade History" key="fills">
          <FillsTable />
        </TabPane>
        {/* <TabPane tab="Balances" key="balances">
          <BalancesTab />
        </TabPane> */}
        {/* {market && market.supportsSrmFeeDiscounts ? ( */}
          <TabPane tab="Fee discounts" key="fees">
            <FeesTable />
          </TabPane>
        {/* ) : null} */}
      </Tabs>
    </FloatingElement>
  );
}

const OpenOrdersTab = () => {
  const openOrders = useOpenOrders();

  return <OpenOrderTable openOrders={openOrders} />;
};

const BalancesTab = () => {
  const balances = useBalances();

  return <BalancesTable balances={balances} />;
};
