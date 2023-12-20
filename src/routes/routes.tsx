import { Route } from "react-router"
import HomePage from "../components/pages/homePage/homePage"
import LoginPage from "../components/pages/loginPage/loginPage"
import ConfirmPage from "../components/pages/confirmPage/confirmPage"

const Routes = () => {
    return (
        <>
            <Route path="/" component={HomePage} />
            <Route path="/login/step-1" component={LoginPage} />
            <Route path="/login/step-2" component={ConfirmPage} />
        </>
    )
}

export default Routes