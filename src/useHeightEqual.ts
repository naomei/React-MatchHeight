import React from "react";

/**
 * getGroupHeight
 * * returns the one with the highest height from element group
 */
const getGroupHeight = (group: HTMLElement[]) => {
  const arr = group.map((d) => d.getBoundingClientRect().height);

  return Math.max(...arr);
};

/**
 * chunkArray
 * * array of elements split into groups the length of size
 */
const chunkArray = <T extends any[]>(arr: T, size: number): T[] => {
  return arr.reduce(
    (newarr, _, i) => (i % size ? newarr : [...newarr, arr.slice(i, i + size)]),
    [] as T[][]
  );
};

export interface UseHeightEqualParams {
  ref: React.RefObject<HTMLElement>;
  targetClassName: string;
  column: number;
}

/**
 * useHeightEqual
 */
export const useHeightEqual = (params: UseHeightEqualParams) => {
  const { ref, targetClassName, column } = params;
  const exec = () => {
    const target = ref.current;
    const elements:
      | NodeListOf<HTMLElement>
      | undefined = target?.querySelectorAll(`.${targetClassName}`);

    if (!target || !elements?.length) {
      console.error("target or elements is notFound.");
      return;
    }

    const groups = chunkArray(Array.from(elements), column);
    const heightList: number[] = [];

    // 1. delete the height once
    // 2. measure the height of the group and collect
    // 3. set height
    groups.forEach((d1, i) => {
      d1.forEach((d2) => (d2.style.height = "auto"));
      heightList.push(getGroupHeight(d1));
      d1.forEach((d2) => (d2.style.height = `${heightList[i]}px`));
    });
  };

  React.useEffect(() => {
    exec();

    window.addEventListener("resize", exec);

    return () => {
      window.removeEventListener("resize", exec);
    };
  });
};
