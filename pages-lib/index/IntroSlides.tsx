import React from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { IntroSlide } from '@/components/IntroSlide';

export const IntroSlides: React.FC = () => {
  return (
    <Slider speed={500} slidesToShow={1} slidesToScroll={1} infinite dots>
      <IntroSlide imageUrl="https://d2ybk292wkc2jl.cloudfront.net/site/introduction/characters.jpg">
        鉄拳やろうよ.comは、
        <br />
        格闘ゲーム 鉄拳7を楽しむためのサイトです。
      </IntroSlide>

      <IntroSlide imageUrl="https://d2ybk292wkc2jl.cloudfront.net/site/introduction/twt_chikurin.jpg">
        eスポーツとしての鉄拳7を応援します。
      </IntroSlide>
    </Slider>
  );
};
