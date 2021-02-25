import qs from "qs";
import * as auth from "auth-provider";
import { useAuth } from "context/auth-context";

const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
    token?: string;
    data?: object;
}

export const http = async (
    endpoint: string,
    { data, token, headers, ...customConfig }: Config = {}
) => {
    const config = {
        method: "GET",
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": data ? "application/json" : "",
        },
        ...customConfig,
    };

    if (config.method.toUpperCase() === "GET") {
        endpoint += `?${qs.stringify(data)}`;
    } else {
        config.body = JSON.stringify(data || {});
    }

    return window
        .fetch(`${apiUrl}/${endpoint}`, config)
        .then(async (response) => {
            if (response.status === 401) {
                await auth.logout();
                window.location.reload();
                return Promise.reject({ message: "请重新登录" });
            }
            const data = await response.json();
            if (response.ok) {
                return data;
            } else {
                return Promise.reject(data);
            }
        });
};

export const useHttp = () => {
    const { user } = useAuth();
    //utility type 的用法：用泛型给它传入一个其它类型，然后utility type对这个类型进行某种操作
    return (...[endpoint, config]: Parameters<typeof http>) =>
        http(endpoint, { ...config, token: user?.token });
};

//联合类型
// let myFavoriteNumber: string | number;
// myFavoriteNumber = "seven";
// myFavoriteNumber = 7;
// // TS2322: Type '{}' is not assignable to type 'string | number'.
// // myFavoriteNumber = {}
// let jackFavoriteNumber: string | number;
//

// //类型别名，interface 在这种情况下没法替代type
// type FavoriteNumber = string | number;
// let roseFavoriteNumber: FavoriteNumber = 6;

// interface 也没法实现Utility type
// type Person = {
//     name: string,
//     age: number
// };

// const xiaoMing: Partial<Person> = {age: 8};
// const shenMiRen: Omit<Person, 'name'> = {age: 9};
// type PersonKeys = keyof Person;
// type PersonKeys = "name" | "age";
// type PersonOnlyName = Pick<Person, 'name'>;
// type Age = Exclude<PersonKeys, 'name'>;

//Partial 的实现
// type Partial<T> = {
//     [P in keyof T]?: T[P]
// }
