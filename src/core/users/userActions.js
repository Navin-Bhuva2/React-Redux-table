const userActions = {
    GET_ALL_USERS: "GET_ALL_USERS",
    GET_ALL_USERS_SUCCESS: "GET_ALL_USERS_SUCCESS",
    GET_ALL_USERS_ERROR: "GET_ALL_USERS_ERROR",

    FETCH_ERROR: "FETCH_ERROR",
    FAKE_ACTION: 'FAKE_ACTION',

    getUsersAction: (data) => ({
        type: userActions.GET_ALL_USERS,
        payload: data
    }),

    fakeAction: () => ({
        type: userActions.FAKE_ACTION
    }),

    
}
export default userActions;