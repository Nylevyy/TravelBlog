import { ArticleFormField } from './enums';

export type ArticleFormType = {
  [ArticleFormField.Title]?: string;
  [ArticleFormField.Location]?: string;
  [ArticleFormField.Date]?: string;
  [ArticleFormField.Description]?: string;
  [ArticleFormField.IsSignificant]?: boolean;
};
