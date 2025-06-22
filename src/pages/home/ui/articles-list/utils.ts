import moment from 'moment';
import { type Article } from '~/entities/article';

export const groupArticlesByDate = (
  articles: Article[],
): Record<string, Article[]> =>
  [...articles]
    .sort(({ date: dateA }, { date: dateB }) => {
      if (!dateA) {
        return 1;
      }

      if (!dateB) {
        return -1;
      }

      return new Date(dateB).getTime() - new Date(dateA).getTime();
    })
    .reduce<Record<string, Article[]>>((acc, curr) => {
      const { date } = curr;
      const formattedDate = date ? moment(date).format('D MMMM') : 'Без даты';
      const postsByDate = acc[formattedDate] ?? [];
      acc[formattedDate] = [...postsByDate, curr];
      return acc;
    }, {});
