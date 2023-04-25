import "./SquareTile.css";
import { Grid } from "@mui/material";

export default function SquareTile({ data }) {
  return (
    <div className="SquareTile">
      <div className="square-top">
        <div className="company-logo">
          <img src={data.image_url} alt="Company logo" />
        </div>
        <div className="job-title">
          <h3>{data.job_title}</h3>
          <Grid container>
            <Grid item sx={6}>
              <p className="company-name square-p">{data.company_name}</p>
            </Grid>
            <Grid item sx={6}>
              <p className="location square-p">{data.location}</p>
            </Grid>
          </Grid>
        </div>
      </div>
      <div className="square-mid">
        <p className="job-desc">{data.job_description.substring(0, 70)}...</p>
        <div className="date-added">
          <i class="fa-regular fa-calendar-plus"></i> &nbsp;
          {new Date(data.created_at).toDateString()}{" "}
          <span style={{ marginLeft: "70px" }}>
            {" "}
            <i class="fa-solid fa-thumbs-up"></i> &nbsp;
            {data.upvote}
          </span>
        </div>
      </div>
      <div className="square-bottom">
        <a className="see-details" href={`/post/${data.id}`}>
          Details
        </a>
        <button className="apply" onClick={() => alert("Saved")}>
          Save
        </button>
      </div>
    </div>
  );
}
