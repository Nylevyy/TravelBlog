import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import UiInput, {
  uiInput_title,
  uiInput_location,
} from '~/components/ui/input/UiInput';
import DatePicker from '~/widgets/date-picker/DatePicker';
import * as styles from './ArticleFormInputs.scss';

const ccn = classNames.bind(styles);

const ArticleFormInputs = ({ onInput, onChange, values, notValidated }) => {
  return (
    <div className={styles.articleFormInputs}>
      <div className={styles.articleFormInputs__wrapper}>
        <UiInput
          className={ccn(uiInput_title)}
          label="Событие"
          index={0}
          onInput={onInput}
          onChange={onChange}
          value={values[0]}
          isValid={!notValidated.includes(0)}
        />
        <div className={styles.articleFormInputs__wrap}>
          <UiInput
            className={ccn(uiInput_location)}
            label="Место"
            index={1}
            onInput={onInput}
            value={values[1]}
            isValid={!notValidated.includes(1)}
            onChange={onChange}
          />
          <DatePicker
            onChange={onChange}
            value={values[2]}
            isValid={!notValidated.includes(2)}
          />
        </div>
      </div>
      <textarea
        className={ccn('articleFormInputs__textarea', {
          articleFormInputs_invalid: notValidated.includes(3),
        })}
        name="content"
        cols="25"
        rows="8"
        placeholder="Описание"
        onInput={(e) => onInput({ index: 3, value: e.target.value })}
        onChange={(e) => onChange({ index: 3, value: e.target.value })}
        value={values[3]}
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
