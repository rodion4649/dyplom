export const signup = ({ email, password }: { email: string, password: string }) => {
    const response = {
        ok: true,
        json: async () => {
            return {
                data: {
                    token: "example_token",
                    user: {
                        id: 1,
                        email: email,
                        name: "John Doe"
                    }
                },
                status: 200,
            }
        }
    } as Response;

    if (!response.ok) {
        throw new Error("Login failed");
    }

    return response.json();
}

export const login = async ({ email, password }: { email: string, password: string }) => {
    if (password !== "11111111") {
        return new Promise((_, reject) => {
            setTimeout(() => {
                reject({
                    ok: false,
                })
            }, 1000);
        });
    }

    const response = {
        ok: true,
        json: async () => {
            return {
                token: "example_token",
                user: {
                    id: "1",
                    email: email,
                    name: "John Doe"
                }
            }
        },
        status: 200,
    } as Response;

    if (!response.ok) {
        throw new Error("Login failed");
    }

    const json = await response.json();

    const token = json.token;
    if (token) {
        localStorage.setItem("token", token);
    }
    console.log(json);

    const userId = json.user.id;
    localStorage.setItem("userId", userId);

    return json;

    // const response = await fetch(адреса, {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //         email,
    //         password
    //     })
    // })
    // if (!response.ok) {
    //     throw new Error("Login failed");
    // }    

    // const json = await response.json();

    // const token = json.token;
    // if (token) {
    //     localStorage.setItem("token", token);
    // }

    // const userId = json.user.id;
    // localStorage.setItem("userId", userId);

    // return json;
}