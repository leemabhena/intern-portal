import "./Subscribe.css";

export default function Subscribe() {
  return (
    <div className="Subscribe">
      <h5>Be the first to see new jobs</h5>
      <p>Subscribe and not miss new job alert & never miss new listed jobs.</p>
      <input type="email" required placeholder="lee@lee.co" />
      <br />
      <button
        className="subscribe"
        onClick={() => alert("Subscribed successfully")}
      >
        Subscribe
      </button>
    </div>
  );
}
