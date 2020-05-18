import * as React from "react";
import { render } from "react-dom";
import { useMatchHeight } from "./index";

const rootEl = document.getElementById("root");
const getRandomValueArray = (array: any[]) => {
  return array[Math.floor(Math.random() * array.length)];
};
const contentData = [
  "This is a wider card with supporting text below as a natural lead-in to additional content.<br /> This content is a little bit longer.",
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit.<br />Repudiandae amet laudantium soluta porro architecto provident nisi, <br />fuga suscipit nesciunt unde esse itaque minus voluptatibus, quam beatae, fugit dolores quod ab!",
  "JavaScript library to equalize elements's height",
  "This is a wider card with supporting text below as a natural lead-in to additional content.<br /> This content is a little bit longer.",
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit.<br />Repudiandae amet laudantium soluta porro architecto provident nisi, <br />fuga suscipit nesciunt unde esse itaque minus voluptatibus, quam beatae, fugit dolores quod ab!",
  "JavaScript library to equalize elements's height"
];

const App = () => {
  const [data, setData] = React.useState<string[]>([...contentData]);
  const [col, setCol] = React.useState<string>("4");
  const targetClassName = "test";

  const ref = React.useRef(null);
  useMatchHeight(ref, targetClassName, Number(col));

  const add = () => {
    setData([...data, getRandomValueArray(contentData)]);
  };
  const remove = () => {
    const l = [...data];
    l.pop();
    setData(l);
  };

  return (
    <>
      <h1>React-MatchHeight</h1>
      <br /> dynamic item:
      <button onClick={() => add()}>add item</button>
      <button onClick={() => remove()}>reduce item</button>
      <br />
      column count:
      <input
        type="number"
        min={1}
        max={10}
        defaultValue={col}
        onChange={e => {
          setCol(e.target.value);
        }}
      />
      <br />
      <br />
      <div
        className="list"
        ref={ref}
        style={{ gridTemplateColumns: `repeat(${col}, 1fr)` }}
      >
        {data.map((d, i) => (
          <div className="item" key={i}>
            <p>item {i + 1}</p>
            <div
              className={`${targetClassName} content`}
              style={{ backgroundColor: "#00A0B0" }}
              dangerouslySetInnerHTML={{ __html: d }}
            />
          </div>
        ))}
      </div>
    </>
  );
};

render(<App />, rootEl);
