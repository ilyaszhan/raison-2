import { Redirect } from "react-router"

const HomePage = () => {
    return <Redirect to={'/login/step-2'} />
}

export default HomePage