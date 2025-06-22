import { ArticleFormField } from './enums';
import { Article } from '../../model';
import { ArticleFormType } from './types';

export const mapFormToModel = (form: ArticleFormType): Partial<Article> => ({
  ...form,
});

export const mapModelToForm = (article: Article): Partial<ArticleFormType> => ({
  [ArticleFormField.Title]: article.title,
  [ArticleFormField.Description]: article.description,
  [ArticleFormField.Date]: article.date,
  [ArticleFormField.Location]: article.location,
  [ArticleFormField.IsSignificant]: Boolean(article.isImportant),
});
