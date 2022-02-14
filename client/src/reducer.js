export const initialState = {
    user: null,
    regemail: "",
    regusername: "",
    regpassword: "",
    regtype: "",
    axiosurl: "http://localhost:5000"
};

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.user,
            };
            break;
        case "REG1":
            return {
                ...state,
                regemail: action.regemail,
                regpassword: action.regpassword,
                regtype: action.regtype,
                regusername: action.regusername
            };
            break;
        default:
            return state;
    }
};

export default reducer;