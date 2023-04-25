import Posts from "./Posts";
import { Grid } from "@mui/material";
import Search from "./Search";
import SearchResults from "./SearchResults";
import Subscribe from "./Subscribe";
import Popular from "./Popular";

export default function Feed({
  supabase,
  setLayout,
  layout,
  loading,
  data,
  setData,
  search,
  setSearch,
}) {
  return (
    <div className="main">
      <Search data={data} setData={setData} setSearch={setSearch} />
      <SearchResults
        setLayout={setLayout}
        data={data}
        setData={setData}
        search={search}
        supabase={supabase}
      />
      <Grid container>
        <Grid item xs={9}>
          <Posts layout={layout} loading={loading} data={data} />
        </Grid>
        <Grid item xs={3}>
          <Subscribe />
          <Popular />
        </Grid>
      </Grid>
    </div>
  );
}
