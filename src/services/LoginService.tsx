export const login = ({ email, password }: { email: string, password: string }) => {

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
            console.log("123");
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
    console.log("bbb");


    return response.json();

}