import React from "react";
import Navbar from "../Navbar";
import "./board.scss";
import Button from '@material-ui/core/Button';
import { Link, useNavigate } from "react-router-dom";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";

const rows: GridRowsProp = [
  { id: 1, col1: 'Hello', col2: 'World' },
  { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
  { id: 3, col1: 'Material-UI', col2: 'is Amazing' },
];

const columns: GridColDef[] = [
  { field: 'col1', headerName: 'Column 1', width: 150 },
  { field: 'col2', headerName: 'Column 2', width: 150 },
];

function Board() {
  return (
    <body>
      <Navbar />
      <h1>Board</h1>
      <div className="grid_container">
        <div className="grid_component">
          <DataGrid rows={rows} columns={columns} />
        </div>
      </div>
      <div className="grid_button">
      <Link to="/board/post">
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

export default Board;
