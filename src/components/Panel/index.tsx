import React from "react";
import { usePrevious } from "react-use";
import "./panel.css";
import { categories as defaultCats, ICategory } from "../../consts/categories";
import { Category } from "./Category";

interface PanelProps {}

const testRegex = (regex: RegExp, string: string) => regex.test(string);

const filterByQuery = (regex: RegExp) => (acc: ICategory[], cat: ICategory) => {
  if (testRegex(regex, cat.title)) {
    acc.push(cat);
  } else {
    const filterItems = cat.items.filter((item) => testRegex(regex, item));
    acc.push({
      title: cat.title,
      items: filterItems,
    });
  }
  return acc;
};

export const Panel: React.FC<PanelProps> = ({}): React.ReactElement => {
  const [categories, setCategories] = React.useState(defaultCats);
  const [value, setValue] = React.useState("");
  const prevValue = usePrevious(value);

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    console.log(value);
    const regex = new RegExp(query, "gi");
    setValue(query);
    if (prevValue?.length || 0 < value.length) {
      setCategories(defaultCats.reduce(filterByQuery(regex), []));
    } else {
      setCategories((prev) => prev.reduce(filterByQuery(regex), []));
    }
  };

  return (
    <div className="panel">
      <div className="panel__search">
        <input
          type="search"
          placeholder="Search"
          value={value}
          onChange={onChangeValue}
        />
      </div>
      <div className="panel__list">
        {categories.map(({ title, items }, i) => (
          <React.Fragment key={i}>
            {items.length ? (
              <Category title={title} items={items} />
            ) : null}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
