import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { styled } from '@mui/material/styles';

import { OperationEnum } from '@/lib/graphql/types';

import { OperationText } from '@/lib/graphql/enum_texts';

interface Props {
  operation: OperationEnum;
}

export const Operation: React.FC<Props> = ({ operation }) => {
  if (operation === OperationEnum.Next) return <NextOperation icon={faChevronRight} />;

  const operationText = OperationText[operation];
  const iconName = operationText.jpKey || operation;

  return (
    <>
      {operationText.icon ? (
        <IconOperation src={`https://yarouyo.s3-ap-northeast-1.amazonaws.com/site/operations/${iconName}.svg`} />
      ) : (
        <TextOperation>{operationText.text}</TextOperation>
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
  marginRight: theme.spacing(1),
  marginLeft: theme.spacing(1),
}));
