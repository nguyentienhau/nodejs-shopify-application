import PropTypes from "prop-types";
import { useState, createContext, useContext } from "react";
import { AgUserSample, SpShopSample } from "@frontend/constants";

const AppContext = createContext();

const initialState = Object.freeze({
	appGeneral: {
		user: AgUserSample
	},
	shopify: {
		shop: SpShopSample,
		customers: [],
		customerTags: [],
		products: [],
		collections: [],
		productTags: []
	}
});

export function ContextProvider({ children = "" }) {
	const [state, setState] = useState(initialState);
	return <AppContext.Provider value={[state, setState]}>{children}</AppContext.Provider>;
}

ContextProvider.propTypes = {
	children: PropTypes.node
};

export function useSelector(selectFunction = () => {}) {
	const [state, _setState] = useContext(AppContext);
	return selectFunction(state);
}

function getAttributeValue(source = {}, payload = {}, initial = {}) {
	if (payload && payload.constructor === Object) {
		return Object.keys(payload).reduce(function (accumulator = {}, key = "") {
			if (payload[key] === undefined) {
				return accumulator;
			} else if (payload[key] === null) {
				accumulator[key] = initial[key];
			} else {
				accumulator[key] = getAttributeValue(source[key], payload[key], initial[key]);
			}
			return accumulator;
		}, source);
	} else {
		return payload ?? initial;
	}
}

/*
	payload attribute value = undefined => remove attribute
	payload attribute value = null => reset to initial value
	payload attribute value = something => set new value
*/
export function useDispatch() {
	const [_state, setState] = useContext(AppContext);

	return function (type = "", payload = {}) {
		if (payload && payload.constructor === Object) {
			setState(function (state = {}) {
				const newState = state.deepCopy();
				const keys = type.split(".").filter((key = "") => key);
				const lastKey = keys.pop();
				const target = keys.reduce((object = {}, key = "") => object[key], newState);
				const initial = keys.reduce((object = {}, key = "") => object[key], initialState);
				target[lastKey] = getAttributeValue(target[lastKey], payload, initial[lastKey]);
				return newState;
			});
		}
	};
}
