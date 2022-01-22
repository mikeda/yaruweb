import React, { useState } from 'react';
import { useSlate } from 'slate-react';

import { Button } from './Button';
import { YAROUYO_FONT_CODE } from '@/lib/YarouyoFont';
import { Box, Dialog, DialogContent } from '@mui/material';
import styled from '@mui/styles/styled';

const OPERATIONS: (keyof typeof YAROUYO_FONT_CODE)[][] = [
  ['lever_7', 'lever_8', 'lever_9', 'lever_4', 'lever_N', 'lever_6', 'lever_1', 'lever_2', 'lever_3'],
  ['lever_7h', 'lever_8h', 'lever_9h', 'lever_4h', 'lever_6h', 'lever_1h', 'lever_2h', 'lever_3h'],
  ['lp', 'rp', 'lk', 'rk'],
  ['lp_lk', 'rp_rk', 'lp_rp', 'lk_rk', 'lp_rk', 'rp_lk'],
  ['lp_rp_lk', 'lp_rp_rk', 'lp_lk_rk', 'rp_lk_rk', 'lp_rp_lk_rk'],
];

interface Props {
  icon: number;
}

export const OperationButton: React.FC<Props> = ({ icon }) => {
  const [expanded, setExpanded] = useState(false);

  const editor = useSlate();
  return (
    <>
      <Button
        active={false}
        onMouseDown={event => {
          event.preventDefault();
          setExpanded(!expanded);
        }}
        icon={icon}
      />

      <Dialog open={expanded} onClose={() => setExpanded(false)}>
        <DialogContent>
          {OPERATIONS.map((codes, i) => (
            <Box key={i}>
              {codes.map(code => (
                <OperationIcon
                  key={code}
                  onMouseDown={e => {
                    e.preventDefault();
                    editor.insertFragment([
                      {
                        text: String.fromCharCode(YAROUYO_FONT_CODE[code]),
                        icon: true,
                      },
                    ]);
                    editor.removeMark('icon');
                  }}
                >
                  {String.fromCharCode(YAROUYO_FONT_CODE[code])}
                </OperationIcon>
              ))}
            </Box>
          ))}
        </DialogContent>
      </Dialog>
    </>
  );
};

const OperationIcon = styled('span')(() => ({
  fontFamily: 'YarouyoSymbols',
  width: '24px',
  height: '24px',
  margin: '2.5px',
  fontSize: '22px',
  cursor: 'pointer',
}));
