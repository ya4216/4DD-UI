import React from "react";
import Navbar from "../Navbar";
import "./post.scss";
import Button from '@material-ui/core/Button';
import { Link, useNavigate } from "react-router-dom";


function Post() {
  return (
    <body>
      <Navbar />
      <h1>Post</h1>
      <div className="grid_button">
      <Link to="/post">
        <Button variant="contained" color="primary" style={{ width: '150px'}}>
          작성하기
        </Button>
      </Link>
      </div>

      <footer className="footer">
        <p className="footer-by">
          A project by{" "}
          <a
            href="https://naver.com/"
            rel="noopener"
            className="small-link"
          >
            HWI ONE
          </a>
          <a
            href="https://naver.com/"
            rel="noopener"
            target="_blank"
            className="no-link icon-twitter"
            aria-label="Follow me on Twitter"
          ></a>
        </p>
      </footer>
    </body>
  );
}

export default Post;
