import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
    loggedIn: boolean
}

export const Chat:React.FC<Props> = ({ loggedIn }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if(!loggedIn) {
            navigate("/login");
        }
    }, [loggedIn]);

    return <></>
}