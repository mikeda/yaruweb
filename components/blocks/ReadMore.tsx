import React from 'react';
import { Button } from './Button';

interface Props {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const ReadMore: React.FC<Props> = ({ onClick }) => {
  return (
    <div className="bl_box bl_box__unbordered bl_box__c">
      <Button onClick={onClick}>次へ</Button>
    </div>
  );
};
