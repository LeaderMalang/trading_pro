import { Navigate, useNavigate } from "react-router-dom";

function NavigateTo(link) {
  // const navigate = useNavigate();
  // console.log(link);
    useNavigate(link);
  // <Navigate to={link} replace={true} />;
}

export default NavigateTo;
