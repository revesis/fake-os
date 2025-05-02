let state = {
    id: 0,
    username: "",
    nickname: "",
};
let mutations = {
    updateId(state, id) {
        state.id = id;
    },
    updateUsername(state, username) {
        state.username = username;
    },
    updateNickname(state, nickname) {
        state.nickname = nickname;
    }
}

const module = {
    namespaced: true,
    state,
    mutations
};

export default module;
