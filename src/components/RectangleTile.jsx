import "./RectangleTile.css";

export default function RectangleTile({ data }) {
  return (
    <div className="RectangleTile">
      <img src={data.image_url} alt="Company logo" />
      <div className="rect-info">
        <h4 className="company--name">{data.company_name}</h4>
        <div className="--items">
          <p>
            <i className="fa-solid fa-briefcase"></i> {data.job_title}
          </p>
          <p className="pd-3-lf">
            <i className="fa-solid fa-location-dot"></i> {data.location}
          </p>
          <p className="pd-3-lf">
            <i class="fa-regular fa-calendar-plus"></i> &nbsp;
            {new Date(data.created_at).toDateString()}{" "}
            <span style={{ marginLeft: "70px" }}>
              {" "}
              <i class="fa-solid fa-thumbs-up"></i> &nbsp;
              {data.upvote}
            </span>
          </p>
        </div>
        <p>{data.job_description.substring(0, 300)}...</p>
        <div className="rect-btns">
          <a className="detail" href={`/post/${data.id}`}>
            Details
          </a>
          <button className="aply" onClick={() => alert("saved")}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
