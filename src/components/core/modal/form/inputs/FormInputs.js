import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Input from '~/components/ui/input/Input';
import styles from './FormInputs.scss';
import DatePicker from '~/widgets/date-picker/DatePicker';

const inputsClasses = classNames.bind(styles);

const FormInputs = ({ onInput, onChange, values, notValidated }) => {
  FormInputs.propTypes = {
    onInput: PropTypes.func,
    onChange: PropTypes.func,
    values: PropTypes.arrayOf(PropTypes.any),
    notValidated: PropTypes.arrayOf(PropTypes.number),
  };
  return (
    <div className={styles.formInputs}>
      <div className={styles.formInputs_small}>
        <Input
          name="title"
          label="Событие"
          index={0}
          onInput={onInput}
          onChange={onChange}
          value={values[0]}
          notValidated={notValidated.includes(0)}
        />
        <div className={styles.formInputs__wrapper}>
          <Input
            name="location"
            label="Место"
            index={1}
            onInput={onInput}
            value={values[1]}
            notValidated={notValidated.includes(1)}
            onChange={onChange}
          />
          <DatePicker
            onChange={onChange}
            value={values[2]}
            notValidated={notValidated.includes(2)}
          />
        </div>
      </div>
      <textarea
        className={inputsClasses('formInputs__textarea', {
          formInputs_invalid: notValidated.includes(3),
        })}
        name="content"
        cols="25"
        rows="8"
        placeholder="Описание"
        onInput={(e) => onInput(3, e.target.value)}
        onChange={(e) => onChange(3, e.target.value)}
        value={values[3]}
      />
    </div>
  );
};

export default FormInputs;
