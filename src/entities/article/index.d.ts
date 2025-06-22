import { ComponentType } from 'react';
import { type Article } from './model';

export * from './model';

export const ArticlePost: ComponentType<{ article: Article }>;
export const CreateArticleButton: ComponentType;
