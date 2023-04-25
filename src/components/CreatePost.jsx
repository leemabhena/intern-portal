import "./CreatePost.css";

import React, { useState } from "react";

export default function CreatePost({ supabase, user }) {
  const [formData, setFormData] = useState({
    companyName: "",
    location: "",
    jobTitle: "",
    imageUrl: "",
    level: "All",
    workStyle: "Remote",
    pay: "Paid",
    videoUrl: "",
    jobDescription: "Job description here!!!",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // form submission logic here
    const { data, error } = await supabase.from("posts").insert([
      {
        company_name: formData.companyName,
        location: formData.location,
        job_title: formData.jobTitle,
        image_url: formData.imageUrl,
        level: formData.level,
        work_style: formData.workStyle,
        pay: formData.pay,
        job_description: formData.jobDescription,
        video: formData.videoUrl,
        upvote: 0,
        user: user.username,
      },
    ]);

    // if (selectedFile) {
    //   const { data: supaData, error: supaError } = await supabase.storage
    //     .from("posts")
    //     .upload(`images`, selectedFile);
    //   if (supaError) {
    //     console.error(supaError);
    //     // alert(
    //     //   "There was a problem with the file upload, try again or use the url instead"
    //     // );
    //   }
    // }

    if (!error) {
      alert("Post created successfully!");
    }
    // Reset form fields
    setFormData({
      companyName: "",
      location: "",
      jobTitle: "",
      imageUrl: "",
      level: "All",
      workStyle: "Remote",
      pay: "Paid",
      jobDescription: "Job description",
    });
  };

  return (
    <div className="CreatePost">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          placeholder="Company Name"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          value={formData.location}
          placeholder="Location"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="jobTitle"
          value={formData.jobTitle}
          placeholder="Job Title"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="imageUrl"
          value={formData.imageUrl}
          placeholder="Image url"
          onChange={handleChange}
          required
        />
        <input
          id="text"
          name="videoUrl"
          value={formData.videoUrl}
          onChange={handleChange}
          placeholder="Youtube VideoId"
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
        <textarea
          name="jobDescription"
          value={formData.jobDescription}
          cols="30"
          rows="10"
          onChange={handleChange}
          required
        >
          Job description
        </textarea>
        <button className="createpost-btn" onClick={handleSubmit}>
          <i className="fa-solid fa-paper-plane"></i> Create Post
        </button>
      </form>
    </div>
  );
}
