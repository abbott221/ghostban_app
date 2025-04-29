import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    const handleRowClick = (rowID) => {
        navigate(`/problem/${rowID}`);
    }

    return (
        <div>
            <div className="container-fluid">
                <h1 className="display-1 text-center">Home</h1>

                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Icon</th>
                            <th>Author</th>
                            <th>Tags / Info</th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr onClick={()=> handleRowClick("1")}>
                            <td>1</td>
                            <td>WIP</td>
                            <td>N/A</td>
                            <td>Hard Problem</td>
                        </tr>
                        <tr onClick={()=> handleRowClick("2")}>
                            <td>2</td>
                            <td>WIP</td>
                            <td>N/A</td>
                            <td>Easy Problem</td>
                        </tr>

                    </tbody>
                </table>

            </div>
        </div>
    )
}


export default Home;