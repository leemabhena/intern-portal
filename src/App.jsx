import "./App.css";
import ProfileTile from "./components/ProfileTile";
import Navigation from "./components/Navigation";
import Filters from "./components/Filters";
import { createClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import Feed from "./components/Feed";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PostDetails from "./components/PostDetails";
import UpdatePost from "./components/UpdatePost";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

function App() {
  const [layout, setLayout] = useState("square");

  // State to store the data in the component
  const [user, setUser] = useState({ username: "", userId: "" });

  // search states
  const [search, setSearch] = useState({ location: "", search: "" });

  // grab data from the server
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("posts").select();
      setData(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Navigation supabase={supabase} user={user} />
        <div className="second">
          <ProfileTile user={user} setUser={setUser} />
          <Filters data={data} setData={setData} supabase={supabase} />
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <Feed
                supabase={supabase}
                loading={loading}
                data={data}
                layout={layout}
                setLayout={setLayout}
                setData={setData}
                search={search}
                setSearch={setSearch}
              />
            }
          />
          <Route
            path="/post/:id"
            element={<PostDetails supabase={supabase} user={user} />}
          />
          <Route
            path="update/post/:id"
            element={<UpdatePost supabase={supabase} user={user} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
