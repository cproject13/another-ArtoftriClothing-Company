import { Route } from "react-router-dom";

const HiddenNavRoute = ({ component:Component,...rest }) => {
  return (
    <Route 
    { ...rest }
    render={(props) => {
        return <Component {...props}/>
    }}
    />
  )
}

export default HiddenNavRoute;