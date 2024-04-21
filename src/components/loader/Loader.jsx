import "./Loader.css";

const Loader = () => {
    return (
        <div className="loader">
            <div className="spinner-container">
                <div className="spinner">
                    <div className="bubble bubble--1"></div>
                    <div className="bubble bubble--2"></div>
                    <div className="bubble bubble--4"></div>
                    <div className="bubble bubble--3"></div>
                    <div className="bubble bubble--5"></div>
                    <div className="bubble bubble--6"></div>
                    <div className="aliment aliment--1"></div>
                    <div className="aliment aliment--2"></div>
                    <div className="aliment aliment--3"></div>
                    <div className="stove">
                        <div className="stove--handle"></div>
                        <div className="stove--base"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Loader;