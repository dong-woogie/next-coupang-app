import classNames from "classnames";
import React from "react";
import styles from "./Divider.module.scss";

const Divider = ({ space = 22, color = "#ccc", ...restProps }) => {
  const style = {
    marginTop: space,
    marginBottom: space,
    backgroundColor: color,
  };
  return (
    <div className={classNames(styles.line)} style={style} {...restProps} />
  );
};

export default Divider;
