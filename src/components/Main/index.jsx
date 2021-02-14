import React from "react";
import "./main.css";
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/atom-one-dark.css';
import { flattenDeep } from "../../function/array";


const code = `
_.chunk(['a', 'b', 'c', 'd'], 2);
// => [['a', 'b'], ['c', 'd']]

_.chunk(['a', 'b', 'c', 'd'], 3);
// => [['a', 'b', 'c'], ['d']]
`


export const Main = ({ }) => {
  React.useLayoutEffect(() => {
    hljs.registerLanguage('javascript', javascript);
    hljs.initHighlightingOnLoad();
  }, [])
  return (
    <div className="main">
      <div className="main__category">
        <h1 className="main__category-name">“Array” Methods</h1>
        <div className="main__function">
          <div className="main__function-name">{`chunk(array, [size=1])`}</div>
          <div className="main__function-desc">
            Creates an array of elements split into groups the length of size.
            If array can't be split evenly, the final chunk will be the
            remaining elements.
          </div>
          <div className="main__arg">
            <h1 className="main__function-title">Arguments</h1>
            <div className="main__arg-content">
              <p>
                <span className="main__info">
                  array <i>{`(Array)`}</i>
                </span>
                : The array to process.
              </p>
              <p>
                <span className="main__info">
                  [size=1] <i>{`(number)`}</i>
                </span>
                : The length of each chunk
              </p>
            </div>
          </div>
          <div className="main__return">
            <h1 className="main__function-title">Returns</h1>
            <div className="main__return-content">
              <p>
                <span className="main__info">
                  <i>{`(Array)`}</i>
                </span>
                : Returns the new array of chunks.
              </p>
            </div>
          </div>
          <div className="main__example">
            <h1 className="main__function-title">Example</h1>
            <div className="main__example-content">
              <pre>
                <code className="javascript hljs language-js">
                  {code}
                </code>
              </pre>
              <pre>
                <code className="javascript hljs language-js">
                  const chunk {'= '}{flattenDeep.toString()}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
