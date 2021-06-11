import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { sendCartData, fetchCartData } from './store/cart-actions'

let isInit = true;
function App() {
  const cartIsVisible = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    // const sendData = async () => {
    //   dispatch(uiActions.showNoti({
    //     status: 'pending',
    //     title: 'sending...',
    //     message: 'sending cart data....'
    //   }))
    //   const res = await fetch('https://react-http-aea3e-default-rtdb.firebaseio.com/cart.json', {
    //     method: 'PUT',
    //     body: JSON.stringify(cart)
    //   });
    //   if (!res.ok) {
    //     dispatch(uiActions.showNoti({
    //       status: 'fail',
    //       title: 'fail...',
    //       message: 'sending cart data fail'
    //     }))
    //   }
    //   dispatch(uiActions.showNoti({
    //     status: 'success',
    //     title: 'success...',
    //     message: 'sending cart data success'
    //   }))
    // }

    // if(isInit){
    //   isInit = false;
    //   return;
    // }

    // sendData().catch(error => {
    //   dispatch(uiActions.showNoti({
    //     status: 'error',
    //     title: 'error...',
    //     message: 'sending cart data error'
    //   }))
    // });

    if (isInit) {
      isInit = false;
      return;
    }
    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  useEffect(() => {
      dispatch(fetchCartData());
  }, [dispatch]);

  return (
    <Fragment>
      {notification && <Notification
        title={notification.title}
        message={notification.message}
        status={notification.status} />}
      <Layout>
        {cartIsVisible && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
