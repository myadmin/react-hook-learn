import React, { useEffect, useState } from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { cleanObject, useDebounce, useMount } from "../../utils";
import qs from "qs";

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
    const [users, setUsers] = useState([]);

    const [param, setParam] = useState({
        name: "",
        personId: "",
    });
    const debouncedState = useDebounce(param, 200);
    const [list, setList] = useState([]);

    useEffect(() => {
        fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(
            async (response) => {
                if (response.ok) {
                    setList(await response.json());
                }
            }
        );
    }, [debouncedState]);

    useMount(() => {
        fetch(`${apiUrl}/users`).then(async (response) => {
            if (response.ok) {
                setUsers(await response.json());
            }
        });
    });

    return (
        <div>
            <SearchPanel param={param} users={users} setParam={setParam} />
            <List users={users} list={list} />
        </div>
    );
};
