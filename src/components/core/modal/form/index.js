import React, {useState, useContext} from "react";
import Inputs from "./inputs";
import Button from "../../../ui/buttons";
import "./index.scss"

function Form(props) {

  return (
    <form action=""
          className="form"
          onSubmit={(e) => props.onSubmit(e, props.inputs)}
          onReset={() => props.onReset()}
    >
      <Inputs/>

      <div className="form__submit">
        <div className="form__submit_checkbox">
          <input type="checkbox"
                 className="checkbox"
                 id="form__checkbox"
                 onChange={(e) => props.onChange(props.inputIndex, e)}
                 checked={!!props.value}
          />
          <label htmlFor="form__checkbox"
                 className="checkbox__label">
            Пометить событие как важное
          </label>
        </div>
        <div className="modal__buttons">
          <Button /*onClick={types.onClick}*/
                  value="Готово"
                  mod="_submit small"
                  type="submit"
                  key="submitForm"
          />
          <Button /*onClick={types.onClick}*/
                  value="Удалить"
                  mod="_reset small"
                  type="reset"
                  key="resetForm"
          />
        </div>
      </div>
    </form>
  )
}

export default Form