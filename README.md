列ごとに特定のDOMの高さを揃えるreact-hook。

# 特徴

## ロジックを超シンプル化

一般的なライブラリだと「レイアウトから列数を自動計算」するものが多く、  
それによる**バグやコードの複雑化**が見られた。  
（同じ列数とみなす計算に、前の要素とtopが同じかどうか、など。それだと上手く使えないケースがあった）

「列数は明示的に指定」させることによって、列数自動計算処理を外せ、コードを大幅に減らせた。  
（自動計算によるメリットを捨て、コードの健全化を優先）

## hooks

ロジックの共通化なのでhooksで使う。  
コンポーネントでなくhooksなので、ネストさせたりすることなく使用できる。

# 使い方

```jsx
const App = () => {
  const TARGET_CLASSNAME = "test";
  const ref = React.useRef(null);
  useMatchHeight(ref, TARGET_CLASSNAME, 10);

  return (
    <div ref={ref}>
      {data.map((d, i) => (
        <SomeComponent
          className={`${TARGET_CLASSNAME}`}
        />
      ))}
    </div>
  );
};
```