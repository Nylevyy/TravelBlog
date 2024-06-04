import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { UiInput } from '~/shared/ui/input';
import { UiDatePicker } from '~/shared/ui/date-picker';
import * as styles from './ArticleFormInputs.scss';

const ccn = classNames.bind(styles);

const ArticleFormInputs = ({ onInput, onChange, values, notValidated }) => {
  return (
    <div className={styles.articleFormInputs}>
      <div className={styles.articleFormInputs__wrapper}>
        <UiInput
          htmlProps={{ type: 'text', value: values[0] }}
          isValid={!notValidated.includes(0)}
          label="Событие"
          onChange={(value) => onChange({ index: 0, value })}
        />
        <div className={styles.articleFormInputs__wrap}>
          <UiInput
            htmlProps={{ type: 'text', value: values[1] }}
            isValid={!notValidated.includes(1)}
            label="Место"
            onChange={(value) => onChange({ index: 1, value })}
          />
          <UiDatePicker
            isValid={!notValidated.includes(2)}
            value={values[2]}
            onChange={onChange}
          />
        </div>
      </div>
      <textarea
        cols="25"
        name="content"
        placeholder="Описание"
        rows="8"
        value={values[3]}
        className={ccn('articleFormInputs__textarea', {
          articleFormInputs_invalid: notValidated.includes(3),
        })}
        onChange={(e) => onChange({ index: 3, value: e.target.value })}
        onInput={(e) => onInput({ index: 3, value: e.target.value })}
      />
    </div>
  );
};

ArticleFormInputs.propTypes = {
  onInput: PropTypes.func,
  onChange: PropTypes.func,
  values: PropTypes.arrayOf(PropTypes.any),
  notValidated: PropTypes.arrayOf(PropTypes.number),
};

export default ArticleFormInputs;
