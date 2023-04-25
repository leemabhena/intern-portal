import { Grid, CircularProgress } from "@mui/material";
import SquareTile from "./SquareTile";
import RectangleTile from "./RectangleTile";

export default function Posts({ loading, data, layout }) {
  return (
    <div className="Posts" style={{ overflowY: "scroll" }}>
      {loading ? ( // Conditionally render based on loading state
        <CircularProgress /> // Show loading spinner while data is being fetched
      ) : layout === "square" ? (
        <Grid container>
          {data &&
            data?.map((item, index) => {
              return (
                <Grid item xs={4} key={index}>
                  <SquareTile data={item} />
                </Grid>
              );
            })}
        </Grid>
      ) : (
        data.map((item, index) => {
          return <RectangleTile data={item} key={index} />;
        })
      )}
    </div>
  );
}
