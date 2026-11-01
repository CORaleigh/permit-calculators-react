import "./Tile.css"

import { useNavigate } from "react-router";

function Tile({title, path, icon}) {
  
    const navigate = useNavigate();

  return (
    <>
        <div className="tile" onClick={() => navigate(`/${path}`)}>
            <div className="content">
                <img className="icon" src={icon}></img>
            </div>
            <div className="footer">
                {title}
            </div>
        </div>
    </>
  );
}

export default Tile;
