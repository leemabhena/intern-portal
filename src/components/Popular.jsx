import "./Popular.css";

export default function Popular() {
  return (
    <div className="Popular">
      <h4>Popular in USA</h4>
      <div className="popular-details">
        <img
          src="https://expresswriters.com/wp-content/uploads/2015/09/google-new-logo-450x450.jpg"
          alt="Popular companies"
          className="p-avatar"
        />
        <div className="company-info">
          <h5>Google</h5>
          {/* <p>9 Jobs</p> */}
        </div>
      </div>
      <div className="popular-details">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png"
          alt="Popular companies"
          className="p-avatar"
        />
        <div className="company-info">
          <h5>Microsoft</h5>
          {/* <p>10 Jobs</p> */}
        </div>
      </div>
      <div className="popular-details">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Amazon_icon.svg/2500px-Amazon_icon.svg.png"
          alt="Popular companies"
          className="p-avatar"
        />
        <div className="company-info">
          <h5>Amazon</h5>
          {/* <p>11 Jobs</p> */}
        </div>
      </div>
      <div className="popular-details">
        <img
          src="https://1000logos.net/wp-content/uploads/2017/05/Netflix-Logo-2006.png"
          alt="Popular companies"
          className="p-avatar"
        />
        <div className="company-info">
          <h5>Netflix</h5>
          {/* <p>12 Jobs</p> */}
        </div>
      </div>
    </div>
  );
}
