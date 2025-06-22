import { Link } from 'react-router-dom';
import { MinimalisticLayout } from '~/widgets/layouts';
import * as styles from './Page.module.css';

const Page = () => {
  return (
    <MinimalisticLayout>
      <div className={styles.page}>
        <h1>Ошибка 404</h1>
        <i>К сожалению, страница не найдена.</i>
        <br />
        <br />
        <br />
        <br />
        <Link to="/">
          <span className={styles.link}>
            Нажмите, чтобы вернуться на главную
          </span>
        </Link>
      </div>
    </MinimalisticLayout>
  );
};

export default Page;
