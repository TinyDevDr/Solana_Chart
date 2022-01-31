import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { createChart, CrosshairMode } from 'lightweight-charts';
import { findTVMarketFromAddress } from '../../utils/tradingview';
import { useMarket } from '../../utils/markets';
import { BONFIDA_DATA_FEED } from '../../utils/bonfidaConnector';
import './index.css';
//
export function TVChartContainer() {
  const ref = useRef<null | HTMLDivElement>(null);
  const [dataCandle, setCandleData] = useState([]);
  // const [dataLine, setLineData] = useState([])
  const { market } = useMarket();
  useEffect(() => {
    const marketName: string = findTVMarketFromAddress(
      market?.address.toBase58() || '',
    ) as string;
    const startTime = (new Date().getTime() - 3000000000)
      .toString()
      .substring(0, 10);
    const currentTime: string = new Date()
      .getTime()
      .toString()
      .substring(0, 10);

    console.log(marketName);
    fetch(
      `https://dry-ravine-67635.herokuapp.com/tv` +
        `/history?symbol=` +
        marketName +
        `&resolution=60&from=` +
        startTime +
        `&to=` +
        currentTime,
    )
      .then((res) => res.json())
      .then((data) => {
        const arr = [];
        for (let i = 0; i < data.t.length; i++) {
          arr.push({
            //@ts-ignore
            time: data.t[i] / 1000,
            //@ts-ignore
            open: parseFloat(data.o[i]),
            //@ts-ignore
            high: parseFloat(data.h[i]),
            //@ts-ignore
            low: parseFloat(data.l[i]),
            //@ts-ignore
            close: parseFloat(data.c[i]),
          });
        }
        console.log(data);
        setCandleData(arr);
      })
      .catch((err) => console.info(err));
    if (dataCandle && dataCandle.length > 0 && ref.current) {
      const chart = createChart(ref.current, {
        width: ref.current.clientWidth,
        height: ref.current.clientHeight,
        layout: {
          backgroundColor: '#222323',
          textColor: 'rgba(255, 255, 255, 0.9)',
        },
        crosshair: {
          vertLine: {
            visible: false,
          },
          horzLine: {
            visible: false,
          },
        },
        // grid: {
        //   vertLines: {
        //     color: "#000000",
        //     style: 0,
        //     visible: false,
        //   },
        //   horzLines: {
        //     color: "#000000",
        //     style: 0,
        //     visible: false,
        //   },
        // },
      });

      const candleSeries = chart.addCandlestickSeries({
        upColor: '#4bffb5',
        downColor: '#ff4976',
        borderDownColor: '#ff4976',
        borderUpColor: '#4bffb5',
        wickDownColor: '#838ca1',
        wickUpColor: '#838ca1',
      });

      candleSeries.setData(dataCandle);

      return () => {
        chart.remove();
      };
    } else {
      console.log('this eerror', ref.current);
    }
  }, [dataCandle, market]);

  return <div ref={ref} className="TVChartContainer" />;
}
