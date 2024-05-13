import { Route, Routes } from 'react-router-dom';

import routes from './routes';
import { Fragment } from 'react';

function App() {
    return (
        <div className="App">
            <Routes>
                {routes.map((route, index) => {
                    let Layout = route.layout === null ? Fragment : route.layout;
                    return <Route key={index} path={route.path} element={<Layout>{route.component}</Layout>} />;
                })}
            </Routes>
        </div>
    );
}

export default App;
