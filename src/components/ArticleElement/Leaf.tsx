import React from 'react';

interface Props {
  children: React.ReactNode;
  attributes: { [key: string]: unknown };
  leaf: {
    bold?: boolean;
    icon?: boolean;
  };
}

export const Leaf: React.FC<Props> = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.icon) {
    children = <span style={{ fontFamily: 'YarouyoSymbols' }}>{children}</span>;
  }

  //if (leaf.code) {
  //  children = <code>{children}</code>;
  //}

  //if (leaf.italic) {
  //  children = <em>{children}</em>;
  //}

  //if (leaf.underline) {
  //  children = <u>{children}</u>;
  //}

  return <span {...attributes}>{children}</span>;
};
