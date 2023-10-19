import { useNavigate } from "react-router-dom";

function DeleteDone() {
    const nav = useNavigate()
    return ( <>
        <h1>Xoa Thanh Cong</h1>
        <button onClick={() => nav('../..')}>Quay lai</button>
    </> );
}

export default DeleteDone;