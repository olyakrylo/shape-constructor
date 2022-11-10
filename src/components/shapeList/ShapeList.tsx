import containerStyles from "../lib/container.module.css";
import listStyles from "../lib/list.module.css";
import styles from "./ShapeList.module.css";
import { ShapeType, SHAPE_LIST } from "../../entities/shape";
import cx from "classnames";
import { useAppDispatch } from "../../redux/hooks";
import { addShape } from "../../redux/shapes/slice";
import * as Icons from "../../icons";
import { IconName } from "../../entities/icon";

export const ShapeList = () => {
  const dispatch = useAppDispatch();

  const createShape = (type: ShapeType) => {
    dispatch(addShape({ type }));
  };

  const getIcon = (name: IconName) => {
    const IconComponent = Icons[name];
    return <IconComponent className={styles.item__icon} />;
  };

  return (
    <div className={cx(containerStyles.container, styles.container)}>
      <p className={containerStyles.title}>Shapes</p>
      <ul className={listStyles.list}>
        {SHAPE_LIST.map(({ type, name, icon }) => (
          <li key={type}>
            <button
              className={cx(listStyles.item, styles.item)}
              onClick={() => createShape(type)}
            >
              {getIcon(icon)}
              {name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
