import React from "react";
import { ICategory } from "../../consts/categories";

export const Category: React.FC<ICategory> = ({
  title,
  items,
}): React.ReactElement => {
  const [isVisibleList, setIsVisibleList] = React.useState(true);
  const icon = isVisibleList ? "-" : "+"

  const onToggleVisible = () => setIsVisibleList(prev => !prev)

  return (
    <div className="panel__list-item">
      <div className="panel__header" role="button" onClick={onToggleVisible} >
        <p>{icon}</p>
        <h1 className="panel__title">{title}</h1>
      </div>
      {isVisibleList ? (
        <ul className="panel__ul">
          {items.map((item, idx) => (
            <li className="panel__text" key={idx}>
              <a href={`#${item}`}>{item}</a>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
