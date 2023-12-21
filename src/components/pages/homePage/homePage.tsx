import { Redirect } from "react-router"

const HomePage = () => {
    return <Redirect to={'/login/step-1'} />
}

export default HomePage