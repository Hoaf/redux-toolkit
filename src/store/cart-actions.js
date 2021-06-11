import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const res = await fetch('https://react-http-aea3e-default-rtdb.firebaseio.com/cart.json');
            if (!res.ok) {
                throw new Error('error');
            }
            const data = await res.json();
            return data;
        };

        try {
            const data = await fetchData();
            dispatch(cartActions.replaceCart({
                items: data.items || [],
                totalQuantity: data.totalQuantity
            }));
        } catch (error) {
            dispatch(uiActions.showNoti({
                status: 'error',
                title: 'error...',
                message: 'fetch cart data error'
            }))
        }
    }
}

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(uiActions.showNoti({
            status: 'pending',
            title: 'sending...',
            message: 'sending cart data....'
        }));
        const sendReq = async () => {
            const res = await fetch('https://react-http-aea3e-default-rtdb.firebaseio.com/cart.json', {
                method: 'PUT',
                body: JSON.stringify({
                    items: cart.items,
                    totalQuantity: cart.totalQuantity
                })
            });

            if (!res.ok) {
                throw new Error('send cart data fail');
            }
        }
        try {
            await sendReq();
            dispatch(uiActions.showNoti({
                status: 'success',
                title: 'success...',
                message: 'sending cart data success'
            }))
        } catch (error) {
            dispatch(uiActions.showNoti({
                status: 'error',
                title: 'error...',
                message: 'sending cart data error'
            }))
        }
    };
};