import { Route, Routes } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';

import routes from './routes';
import UserContext from './context/userContext';
import request from './utils/request';

function App() {
    const [user, setUser] = useState(null);

    const checkUserToken = async () => {
        try {
            const res = await request.get('/checkLoginStatus');
            setUser(res.data.user);
        } catch (err) {
            setUser(null);
        }
    };

    //Check user's token
    useEffect(() => {
        checkUserToken();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <div className="App">
                <Routes>
                    {routes.map((route, index) => {
                        let Layout = route.layout === null ? Fragment : route.layout;
                        return <Route key={index} path={route.path} element={<Layout>{route.component}</Layout>} />;
                    })}
                </Routes>
            </div>
        </UserContext.Provider>
    );
}

export default App;
