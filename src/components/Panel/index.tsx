import React from "react";
import "./panel.css";

interface PanelProps {}

export const Panel: React.FC<PanelProps> = ({}): React.ReactElement => {
  return (
    <div className="panel">
      <div className="panel__search">
        <input type="text" placeholder="Search" />
      </div>
      <div className="panel__list">
        <div className="panel__list-item">
          <div className="panel__header">
            <p>+</p>
            <h1 className="panel__title">Array</h1>
          </div>
          <ul className="panel__ul">
            <li className="panel__text">
              <a href="#">chunk</a>
            </li>
            <li className="panel__text">
              <a href="#">compact</a>
            </li>
            <li className="panel__text">
              <a href="#">concat</a>
            </li>
          </ul>
        </div>
        <div className="panel__list-item">
          <div className="panel__header">
            <p>+</p>
            <h1 className="panel__title">Collection</h1>
          </div>
          <ul className="panel__ul">
            <li className="panel__text">
              <a href="#">chunk</a>
            </li>
            <li className="panel__text">
              <a href="#">compact</a>
            </li>
            <li className="panel__text">
              <a href="#">concat</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
