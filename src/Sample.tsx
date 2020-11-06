import React from "react";
import { useHeightEqual } from "./useHeightEqual";

const TARGET_CLASS_NAME = "test";

export const Sample: React.FC = () => {
  const contentData = [
    "This is a wider card with supporting text below as a natural lead-in to additional content.<br /> This content is a little bit longer.",
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit.<br />Repudiandae amet laudantium soluta porro architecto provident nisi, <br />fuga suscipit nesciunt unde esse itaque minus voluptatibus, quam beatae, fugit dolores quod ab!",
    "JavaScript library to equalize elements's height",
    "This is a wider card with supporting text below as a natural lead-in to additional content.<br /> This content is a little bit longeaar.",
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit.<br />Repudiandae amet laudantium soluta porro architecto provident nisi, <br />fuga suscipit nesciunt unde esse itaque minus voluptatibus, quam beatae, fugit dolores quod ab!",
    "JavaScript library to equalize elements's height",
  ];
  const [data, setData] = React.useState<string[]>([...contentData]);
  const [col, setCol] = React.useState<string>("4");
  const ref = React.useRef(null);
  const getRandomValueArray = (array: any[]) => {
    return array[Math.floor(Math.random() * array.length)];
  };
  const add = () => {
    setData([...data, getRandomValueArray(contentData)]);
  };
  const remove = () => {
    const l = [...data];
    l.pop();
    setData(l);
  };

  useHeightEqual({
    ref,
    targetClassName: TARGET_CLASS_NAME,
    column: Number(col),
  });

  return (
    <>
      item:
      <button onClick={() => add()}>add</button>
      <button onClick={() => remove()}>remove</button>
      <br />
      column:
      <input
        type="number"
        min={1}
        max={10}
        defaultValue={col}
        onChange={(e) => {
          setCol(e.target.value);
        }}
      />
      <br />
      <div
        ref={ref}
        style={{
          gridTemplateColumns: `repeat(${col}, 1fr)`,
          display: "grid",
          columnGap: "10px",
          rowGap: "10px",
          marginTop: "20px",
        }}
      >
        {data.map((d, i) => (
          <div
            key={i}
            style={{
              backgroundColor: "#9e9e9e",
              padding: "20px",
            }}
          >
            <div
              className={`${TARGET_CLASS_NAME}`}
              style={{ backgroundColor: "#00A0B0", padding: "10px" }}
              dangerouslySetInnerHTML={{ __html: d }}
            />
          </div>
        ))}
      </div>
    </>
  );
};
