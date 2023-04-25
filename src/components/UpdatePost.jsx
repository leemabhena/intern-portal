import "./CreatePost.css";
import { useParams, useNavigate } from "react-router-dom";

import React, { useState, useEffect } from "react";

export default function UpdatePost({ supabase }) {
  const { id: postId } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select()
        .eq("id", postId);

      setPost(data[0]);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (post) {
      setFormData({
        companyName: post.company_name,
        location: post.location,
        jobTitle: post.job_title,
        imageUrl: post.image_url,
        level: post.level,
        workStyle: post.work_style,
        pay: post.pay,
        jobDescription: post.job_description,
      });
    }
  }, [post]);

  const [formData, setFormData] = useState({
    companyName: "",
    location: "",
    jobTitle: "",
    imageUrl: "",
    level: "All",
    workStyle: "Remote",
    pay: "Paid",
    jobDescription: "Job description here!!!",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // form submission logic here
    const { data, error } = await supabase
      .from("posts")
      .update([
        {
          company_name: formData.companyName,
          location: formData.location,
          job_title: formData.jobTitle,
          image_url: formData.imageUrl,
          level: formData.level,
          work_style: formData.workStyle,
          pay: formData.pay,
          job_description: formData.jobDescription,
        },
      ])
      .eq("id", postId);

    if (!error) {
      alert("Post updated successfully!");
      navigate(`/post/${postId}`);
    }
  };

  return (
    <div className="CreatePost" style={{ margin: "3rem", width: "100%" }}>
      <h3>Update Job Post</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          placeholder="Company Name"
          onChange={handleChange}
          required
          style={{ width: "45%" }}
        />
        <input
          type="text"
          name="location"
          value={formData.location}
          placeholder="Location"
          onChange={handleChange}
          required
          style={{ width: "45%" }}
        />
        <input
          type="text"
          name="jobTitle"
          value={formData.jobTitle}
          placeholder="Job Title"
          onChange={handleChange}
          required
          style={{ width: "45%" }}
        />
        <input
          type="text"
          name="imageUrl"
          value={formData.imageUrl}
          placeholder="Image url"
          onChange={handleChange}
          required
          style={{ width: "45%" }}
        />
        <select
          name="level"
          id="level"
          value={formData.level}
          onChange={handleChange}
        >
          <option value="All">All</option>
          <option value="Freshman">Freshman</option>
          <option value="Sophomore">Sophomore</option>
          <option value="Junior">Junior</option>
          <option value="Senior">Senior</option>
        </select>
        <select
          name="workStyle"
          id="work_style"
          value={formData.workStyle}
          onChange={handleChange}
        >
          <option value="Remote">Remote</option>
          <option value="Onsite">Onsite</option>
          <option value="Hybrid">Hybrid</option>
        </select>
        <br />
        <p>Select pay type</p>
        <input
          type="radio"
          name="pay"
          value="Paid"
          id="paid"
          checked={formData.pay === "Paid"}
          onChange={handleChange}
        />
        <label htmlFor="paid">Paid</label>
        <br />
        <input
          type="radio"
          name="pay"
          value="Unpaid"
          id="unpaid"
          checked={formData.pay === "Unpaid"}
          onChange={handleChange}
        />
        <label htmlFor="unpaid">Unpaid</label>
        <br />
        <textarea
          name="jobDescription"
          value={formData.jobDescription}
          cols="30"
          rows="10"
          onChange={handleChange}
          required
          style={{ width: "90%" }}
        >
          Job description
        </textarea>
        <br />
        <button className="createpost-btn" onClick={handleSubmit}>
          <i className="fa-solid fa-paper-plane"></i> Update Post
        </button>
      </form>
    </div>
  );
}
