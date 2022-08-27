import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import type { AppProps } from 'next/app';
import 'antd/dist/antd.css';
import MenuContainer from '../containers/menu-container';

// const AppLayout = dynamic(() => import('../components/Layout'), { ssr: false });

const Menu = ({ Component, pageProps }: AppProps) => {
  return <MenuContainer />;
};

export default Menu;
