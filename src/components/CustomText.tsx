import React from 'react';
import { styled } from '@mui/material/styles';
import { YAROUYO_FONT_CODE } from '@/lib';

const OPERATIONS: { [key: string]: keyof typeof YAROUYO_FONT_CODE } = {
  '1': 'lever_1',
  '2': 'lever_2',
  '3': 'lever_3',
  '4': 'lever_4',
  '5': 'lever_N',
  '6': 'lever_6',
  '7': 'lever_7',
  '8': 'lever_8',
  '9': 'lever_9',
  '1h': 'lever_1h',
  '2h': 'lever_2h',
  '3h': 'lever_3h',
  '4h': 'lever_4h',
  '6h': 'lever_6h',
  '7h': 'lever_7h',
  '8h': 'lever_8h',
  '9h': 'lever_9h',
  lp: 'lp',
  rp: 'rp',
  lk: 'lk',
  rk: 'rk',
  lp_lk: 'lp_lk',
  rp_rk: 'rp_rk',
  lp_rp: 'lp_rp',
  lk_rk: 'lk_rk',
  lp_rk: 'lp_rk',
  rp_lk: 'rp_lk',
  lp_rp_lk: 'lp_rp_lk',
  lp_rp_rk: 'lp_rp_rk',
  lp_lk_rk: 'lp_lk_rk',
  rp_lk_rk: 'rp_lk_rk',
  lp_rp_lk_rk: 'lp_rp_lk_rk',
};

export const CustomText: React.FC<{ text: string }> = ({ text }) => {
  const texts = text.split(/(\[cmd:[a-z1-9_]*\])/).map(s => {
    const m = s.match(/\[cmd:([a-z1-9_]*)\]/);

    if (m) {
      return <OperationIcon>{String.fromCharCode(YAROUYO_FONT_CODE[OPERATIONS[m[1]]])}</OperationIcon>;
    } else {
      return s;
    }
  });

  return <>{texts}</>;
};

const OperationIcon = styled('span')(() => ({
  fontFamily: 'YarouyoSymbols',
}));
