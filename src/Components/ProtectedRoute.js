import {Navigate, useLocation, useNavigate} from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

function ProtectedRoute({ children }) {

    const [loading, setLoading] = useState(true);
    const [isValid, setIsValid] = useState(false);
    const navigate = useNavigate();


    const token = localStorage.getItem("token");
    const location = useLocation();
    function checkLoginStatus(){
        let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: 'http://127.0.0.1:8000/me/',
          headers: {
            'Authorization': `Token ${localStorage.getItem("token")}`
          }
        };

        axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data.is_staff));
          if(response.data.is_staff){

              navigate('/adminDashboard');

          }else{
            navigate('/patientDashboard');
          }
        })
        .catch((error) => {
          console.log(error);
        });

    }

    useEffect(() => {

        if (!token) {
            setIsValid(false);
            setLoading(false);
            return;
        }

        axios.get("http://127.0.0.1:8000/check_auth/", {
            headers: {
                Authorization: `Token ${token}`
            }
        })
        .then(() => {
            setIsValid(true);
            checkLoginStatus();
        })
        .catch(() => {
            setIsValid(false);
        })
        .finally(() => {
            setLoading(false);
        });

    }, [token]);

    if (loading) {
        return <div>Checking authentication...</div>;
    }

    if (!isValid) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

export default ProtectedRoute;