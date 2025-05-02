let state = {
    documentClientHeight: 0
};

let mutations = {
    updateDocumentClientHeight(state, height) {
        if (state) {
            state.documentClientHeight = height;
        }
    }
};

let module = {
    namespaced: true,
    state,
    mutations
};

export default module;
