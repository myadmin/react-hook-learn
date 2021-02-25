import React, { useState } from "react";
import { RegisterScreen } from "./register";
import { LoginScreen } from "./login";
import { Divider } from "antd";
import * as Style from "./style";

export const UnauthenticatedApp = () => {
    const [isRegister, setIsRegister] = useState(false);

    return (
        <Style.Container>
            <Style.Header />
            <Style.Background />
            <Style.ShadowCard>
                <Style.Title>{isRegister ? "请注册" : "请登录"}</Style.Title>
                {isRegister ? <RegisterScreen /> : <LoginScreen />}
                <Divider />
                <a onClick={() => setIsRegister(!isRegister)}>
                    {isRegister
                        ? "已经有账号了？直接登录"
                        : "没有账号？注册新账号"}
                </a>
            </Style.ShadowCard>
        </Style.Container>
    );
};
