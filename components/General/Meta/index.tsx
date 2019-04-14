import React from 'react';
import Head from 'next/head';
import { appName } from '../Preferences';

const Meta = () => (
  <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charSet="utf-8" />
    <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
    <link rel="shortcut icon" type="image/png" href="/static/racing.png" />
    <script
      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBo5qmk1ucd5sr6Jm-3SWVup3ZIhfjxtnU&libraries=places"
      key="googleMap"
    />
    <title>{appName}</title>
  </Head>
);

export default Meta;
