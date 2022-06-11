import {Routes, Route, Navigate} from "react-router-dom";
import {useState} from "react";
import './scss/app.scss';
import {Header} from "./components/Header";
import {Home} from "./pages/Home";
import {Cart} from "./pages/Cart";
import {NotFound} from "./pages/NotFound";

function App() {
    const [searchValue, setSearchValue] = useState('')

    return (
        <div className="wrapper">
            <Header searchValue={searchValue} setSearchValue={setSearchValue}/>
            <div className="content">
                <Routes>
                    <Route path={'/pizza-store'}
                           element={<Navigate to={'/'}/>}/>
                    <Route path={'/'}
                           element={<Home searchValue={searchValue}/>}/>
                    <Route path={'/cart'} element={<Cart/>}/>
                    <Route path={'*'} element={<NotFound/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;