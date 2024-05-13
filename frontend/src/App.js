import { Route, Routes } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';

import routes from './routes';
import UserContext from './context/userContext';

function App() {
    const [user, setUser] = useState(null);

    //Check user's token
    useEffect(() => {}, []);

    return (
        <UserContext.Provider user={user} setUser={setUser}>
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
