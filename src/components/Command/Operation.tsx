import React from 'react';

import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { styled } from '@mui/material/styles';

import { OperationText } from '@/lib';

interface Props {
  operation: string;
}

export const Operation: React.FC<Props> = ({ operation }) => {
  if (operation === 'next') return <NextOperation icon={faChevronRight} />;

  return (
    <>
      {OperationText[operation] ? (
        <IconOperation src={`https://yarouyo.s3-ap-northeast-1.amazonaws.com/site/operations/${operation}.svg`} />
      ) : (
        <TextOperation>{operation}</TextOperation>
      )}
    </>
  );
};

const IconOperation = styled('img')(({ theme }) => ({
  width: 20,
  marginRight: theme.spacing(0.5),
}));

export const TextOperation = styled('span')(({ theme }) => ({
  display: 'block',
  marginRight: theme.spacing(0.5),
  fontSize: '0.75rem',
}));

const NextOperation = styled(FontAwesomeIcon)(({ theme }) => ({
  marginRight: theme.spacing(0.5),
  marginLeft: theme.spacing(0.5),
}));
