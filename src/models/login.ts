const login = {
    namespace: 'login',
    state: {
        token:''
    },
    effects: {
        * setToken({payload}: any, {put}: any) {
            yield put({
                type: 'savemeToken',
                payload: payload,
            });
        },
    },
    reducers: {
        savemeToken(state: any, action: any) {
            return {
                token: action.payload,
            }
        },
    },
};

export default login;
