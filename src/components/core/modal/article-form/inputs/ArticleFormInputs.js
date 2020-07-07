import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Input from '~/components/ui/input/Input';
import styles from './ArticleFormInputs.scss';
import DatePicker from '~/widgets/date-picker/DatePicker';

const inputsClasses = classNames.bind(styles);

const ArticleFormInputs = ({ onInput, onChange, values, notValidated }) => (
  <div className={styles.articleFormInputs}>
    <div className={styles.articleFormInputs_small}>
      <Input
        name="title"
        label="Событие"
        index={0}
        onInput={onInput}
        onChange={onChange}
        value={values[0]}
        isValid={!notValidated.includes(0)}
      />
      <div className={styles.articleFormInputs__wrapper}>
        <Input
          name="location"
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
      className={inputsClasses('articleFormInputs__textarea', {
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

ArticleFormInputs.propTypes = {
  onInput: PropTypes.func,
  onChange: PropTypes.func,
  values: PropTypes.arrayOf(PropTypes.any),
  notValidated: PropTypes.arrayOf(PropTypes.number),
};

export default ArticleFormInputs;
