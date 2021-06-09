import React from 'react';

import { CategoryCard, Category } from '../CategoryCard';

import styles from './CategoryCardList.module.scss';

interface Props {
  categories: Category[];
}

export const CategoryCardList: React.FC<Props> = ({ categories }) => {
  return (
    <div className={styles.list}>
      {categories.map(category => (
        <div className={styles.listItem} key={category.id}>
          <CategoryCard {...category} />
        </div>
      ))}
    </div>
  );
};
