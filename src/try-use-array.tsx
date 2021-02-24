import React from "react";
import { useArray, useMount } from "./utils";

export const TsReactTest = () => {
    const persons: { name: string; age: number }[] = [
        { name: "jack", age: 25 },
        { name: "ma", age: 25 },
    ];
    const { value, clear, removeIndex, add } = useArray(persons);
    useMount(() => {
        //期待这里报错：
        // console.log(value.notExist);
        //期待这里报错
        // add({name: "dayid"});
        //期待这里报错
        // removeIndex("123");
    });

    return (
        <div>
            {/*期待：点击以后增加 john*/}
            <button onClick={() => add({ name: "john", age: 18 })}>
                add john
            </button>
            {/*期待：点击以后删除第一项*/}
            <button onClick={() => removeIndex(0)}>remove 0</button>
            {/*期待：点击以后情况列表*/}
            <button onClick={() => clear()}>clear</button>
            {value.map(
                (person: { age: number; name: string }, index: number) => (
                    <div key={index} style={{ marginBottom: "30px" }}>
                        <span style={{ color: "red" }}>{index}</span>
                        <span>{person.name}</span>
                        <span>{person.age}</span>
                    </div>
                )
            )}
        </div>
    );
};
