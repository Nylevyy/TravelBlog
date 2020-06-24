import React from 'react';
import PropTypes from 'prop-types';
import Input from '~/components/ui/input/Input';
import './FormInputs.scss';
// import DatePicker from '~/components/widgets/datePicker/DatePicker';

const Inputs = (
  {
    onInput,
    onChange,
    values,
    notValidated,
  },
) => {
  Inputs.propTypes = {
    onInput: PropTypes.func,
    onChange: PropTypes.func,
    values: PropTypes.arrayOf(PropTypes.any),
    notValidated: PropTypes.arrayOf(PropTypes.number),
  };
  return (
    <div className="inputs">
      <div className="inputs_small">
        <Input
          name="title"
          label="Событие"
          index={0}
          onInput={onInput}
          onChange={onChange}
          value={values[0]}
          notValidated={notValidated}
        />
        <div className="inputs__wrapper">
          <Input
            name="location"
            label="Место"
            index={1}
            onInput={onInput}
            value={values[1]}
            notValidated={notValidated}
            onChange={onChange}
          />
          {/* <DatePicker
            onChange={onChange.bind(null, 2)}
            value={values[2]}
            notValidated={notValidated}
          /> */}
        </div>
      </div>
      <textarea
        className={`inputs__textarea ${(notValidated.includes(3) ? ' inputs_invalid' : '')}`}
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

export default Inputs;
