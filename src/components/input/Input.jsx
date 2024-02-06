import React, { useState } from "react";
import styles from "./Input.module.scss";
import classNames from "classnames";
import Icon from "../icon/Icon";

const Input = ({
  id,
  label,
  name = "",
  labelVisible,
  icon,
  email,
  password,
  placeholder = "",
  readOnly,
  disabled,
  value,
  error: errorProps,
  className = "",
  onChange,
  ...restProps
}) => {
  const [inputValue, setInputValue] = useState(value || "");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const checkType = () => {
    if (email) {
      return "email";
    }

    if (password) {
      return isPasswordVisible ? "text" : "password";
    }

    return "text";
  };
  const handleChange = (e) => {
    setInputValue(e.target.value);
    onChange(e);
  };

  const iconType = isPasswordVisible ? "show" : "hide";
  const iconLabel = `비밀번호 ${isPasswordVisible ? "표시" : "감춤"}`;

  return (
    <div className={classNames(styles.formControl, className)}>
      <label
        htmlFor={id}
        className={classNames(styles.label, labelVisible || styles.labelHidden)}
      >
        {label}
      </label>

      <div
        className={classNames(
          styles.inputWrapper,
          errorProps && styles.inputWrapperError
        )}
      >
        {icon && <Icon type={icon} />}
        <input
          id={id}
          name={name}
          type={checkType()}
          className={classNames(styles.input)}
          readOnly={readOnly}
          disabled={disabled}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleChange}
          {...restProps}
        />

        {password && (
          <button
            type="button"
            className={classNames(styles.button)}
            onClick={() => setIsPasswordVisible((prev) => !prev)}
            disabled={disabled}
          >
            <Icon type={iconType} alt={iconLabel} title={iconLabel} />
          </button>
        )}
      </div>

      {errorProps && (
        <span role="alert" className={styles.error}>
          {errorProps.message}
        </span>
      )}
    </div>
  );
};

export default Input;
