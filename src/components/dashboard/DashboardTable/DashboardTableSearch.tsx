import React, { useRef } from 'react';

import { Box } from '@mui/material';

import { SearchWord } from '@/components';

interface Props {
  onClickSearch: (keyword: string) => void;
}

export const DashboardTableSearch: React.FC<Props> = ({ onClickSearch }) => {
  const keywordRef = useRef<string>();

  return (
    <Box mb={2}>
      <SearchWord
        onSearch={word => {
          if (keywordRef.current === word) return;

          keywordRef.current = word;

          onClickSearch(keywordRef.current);
        }}
      />
    </Box>
  );
};
