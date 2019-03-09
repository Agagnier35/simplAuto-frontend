import React from 'react';

import { storiesOf } from '@storybook/react';
import Portlet from './';

storiesOf('Portlet', module)
  .addParameters({
    info: {
      text: `
        Portlet...
      `,
    },
  })
  .add('Base', () => (
    <div style={{ padding: '1rem', background: '#f4f4f8' }}>
      <Portlet
        interval={3000}
        title="Portlet title"
        pages={[<p>yo</p>, <p>allo</p>]}
      />
    </div>
  ))
  .add('With Image', () => (
    <div style={{ padding: '1rem', background: '#f4f4f8' }}>
      <Portlet
        interval={5}
        title="Lamborghini Aventador"
        pages={[<p>Page 1</p>, <p>Page 2</p>]}
        image={
          <img
            src="http://configuratormedia.lamborghini.com/renderservice/media/fast/H4sIAAAAAAAAAI1QMW_TQBj94hJoClRQIXUCMbBiBC0SiMkJFjU4NDjOkHQwl-TDdbHvzOdzCAwRMNCBFTYGBiaI-CFISEioYq1YUVkYQEgonKtcCxs3PJ3uvXvf9954B8o5weKau8EGzIyE2USKWBw9ZN0Yr7z7WBk3P-84BsAwBYATI4LLPZGYPcFjFJlJyPtIGdIg6qH6HjP1qASJ4FOnFYxTpDP-gxRhehaUG8H87sSY8dC0eZ78TaYSZq837GuB61QllGVOXTG6ByMwJBzZJW61LNfx2xnB8X0bh0sMkRa-vHr94_HmJQNKDpQHLM5RjTu2r7uZJ12kp-MXJw8_336ms3X0hErdqduB327YEuaihIV4biPFUNNzVat2I6ituqueas5Yq46_L_48OOtva6OZyWSixUcbTs1veXZgeZ7VzorXipKUNH9oyqsgS__RK-fYk4LMFZat10RfN1oyoOyAcf98ARcKWCpguYCLw3TLu3r3zlfafPL71Prt1tv3wzfwSa3GBsgl6ws6i0OpFzrQdDq23nNmWd-M8N-qq0LEyPiH0_Ro6-Wvb6rqjq46hb2YsFdpy3ODhuVZdQnzOcUpI6bCkkj5H7toOISCAgAA.webp?wid=900"
            alt=""
          />
        }
      />
    </div>
  ));
