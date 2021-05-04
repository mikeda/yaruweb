import React from 'react';
import { Button } from './Button';

interface Props {
  onClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const ReadMore: React.FC<Props> = ({ onClick }) => {
  return (
    <div className="bl_box bl_box__unbordered bl_box__c">
      <Button>
        <a onClick={onClick}>次へ</a>
      </Button>
    </div>
  );
};
