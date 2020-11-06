# feature
height equalizer for React-hook.  

## simple logic

Many similar libraries are multifunctional.  
(eg. [jquery-match-height](https://github.com/liabru/jquery-match-height))  

For example, monitor the status of the DOM and calculate columns and rows.  
These are great, but they add complexity and bugs(Because it depends on the CSS situation).

This hook does not have that function.  
Just specify the **number of columns** instead.

# usage

```tsx
const Component = () => {
  const ref = React.useRef(null);
  const targetClassName = "my-col";

  useHeightEqual({ ref, targetClassName, column: 10 });

  return (
    <ul ref={ref}>
      <li className={targetClassName}>...</li>
      <li className={targetClassName}>...</li>
      ...
    </ul>
  );
}
```

## execHeightEqual

a function aligns the height.  
hook returns this function, so if you want to manually align the heights, call this function.

```tsx
const {execHeightEqual} = useHeightEqual(...);

<button onClick={() => {
  execHeightEqual();
}}>
  send
</button>
```