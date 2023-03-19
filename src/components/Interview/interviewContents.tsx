import Axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import './interview.scss';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { DataGrid, GridColDef, GridToolbar, GridValueGetterParams } from '@mui/x-data-grid';
import { Divider } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const columns: GridColDef[] = [
  { field: 'sequence_number', headerName: 'No', width: 50 },
  {
    field: 'sub_category',
    headerName: '제목',
    width: 1000,
    editable: false,
  },
  {
    field: 'writer',
    headerName: '작성자',
    width: 170,
    editable: false,
  },
  {
    field: 'dateTimeOfPosting',
    headerName: '날짜',
    type: 'date',
    width: 250,
    editable: false,
  },
];

const interviewContents = () => {
  const [rows, setRows] = useState<[]>([]);
  const [markAnswer, setMarkAnswer] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<{}>();
  const [correctCheck, setCorrectCheck] = useState<JSX.Element>(<></>);
  const [answerHtml, setAnswerHtml] = useState<JSX.Element[]>([]);

  useEffect(() => {
    Axios.get('/api/interview')
      .then((res) => {
        setSelectedData(res.data.data[Math.floor(Math.random() * res.data.data.length)]);
        setRows(res.data.data);
      })
      .catch((err) => {
        console.log('실패 :: ', err);
      });
  }, []);

  const selectRow = (e: any) => {
    setMarkAnswer(false);
    setSelectedData(e.row);
  };

  const answerCheck = (e: any) => {
    setMarkAnswer(true);
  };

  const answerClick = (e: any) => {
    if (e.target.className.indexOf('wrong') === -1) {
      setCorrectCheck(
        <span>
          정답입니다! <button>다음문제</button>
        </span>,
      );
    } else {
      setCorrectCheck(<span>틀렸습니다!</span>);
    }
  };

  // const getAnswer = React.memo(function getAnswer() {
  const getAnswer = () => {
    let innerHtml: JSX.Element[] = [];
    let answerExample = [];

    answerExample.push(<span className={`${markAnswer ? 'answer__correct__mark' : ''}`}>{Object(selectedData).interview_answer}</span>);

    for (let i in Object(selectedData).answer_example) {
      answerExample.push(<span className="answer__example__wrong">{Object(selectedData).answer_example[i]}</span>);
    }

    let exampleArr = answerExample.sort(() => Math.random() - 0.5);

    if (selectedData) {
      if (Object(selectedData).answer_example[0] === '') {
        innerHtml.push(
          <div className="answer__question" key="answer">
            A. {Object(selectedData).interview_answer}
          </div>,
        );
      } else {
        innerHtml.push(
          <div className="answer__question" key="answer">
            A. 다음 보기 중 맞는 답을 고르세요. {correctCheck}
            {window.innerWidth < 768 ? null : (
              <button className="answer__question__correctButton" onClick={answerCheck}>
                정답확인
              </button>
            )}
            <br />
          </div>,
        );
        for (let i = 1; i <= 5; i++) {
          innerHtml.push(
            <div key={i} className="answer__example" onClick={answerClick}>
              {i}. {exampleArr[i - 1]}
            </div>,
          );
        }
        innerHtml.push(
          <div>
            {window.innerWidth < 768 ? (
              <button className="answer__question__correctButton" onClick={answerCheck}>
                정답확인
              </button>
            ) : null}
          </div>,
        );
      }
    }
    return <>{innerHtml}</>;
  };

  const setBookmark = (e: any) => {
    if (e.target.checked) {
      console.log('selectedData 체크 : ', selectedData);
    } else {
      console.log('selectedData 해제 : ', selectedData);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Item className="interview__block__bar" sx={{ textAlign: 'center', color: 'black' }} elevation={0}>
            <span className="interview__block__bar__left" style={{ float: 'left' }}>
              면접질문 풀어보기
            </span>
            <span className="interview__block__bar__center"></span>
            {/* <span className="interview__block__bar__right">
              <select>
                <option value="1">1개씩 보기</option>
                <option value="5">5개씩 보기</option>
                <option value="10">10개씩 보기</option>
              </select>
            </span> */}
          </Item>
        </Grid>
        {window.innerWidth < 768 ? (
          <>
            <Grid item xs={12}>
              <Item style={{ position: 'relative' }} elevation={0}>
                <div className="answer__question">{selectedData ? 'Q. ' + Object(selectedData).interview_contents : '오류'}</div>
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                  }}
                >
                  <Tooltip title="복습 노트에 추가하기!" followCursor>
                    <Checkbox
                      aria-label="Checkbox"
                      style={{
                        color: '#33cd21',
                      }}
                      icon={<BookmarkBorderIcon />}
                      checkedIcon={<BookmarkIcon />}
                      onChange={setBookmark}
                    />
                  </Tooltip>
                </div>
                <Divider />
                <div>
                  <>{selectedData ? getAnswer() : null}</>
                </div>
              </Item>
            </Grid>
          </>
        ) : (
          <>
            <Grid className="interview__button" item xs={0.5}>
              <Item className="interview__button__previousButton" elevation={0}>
                <span className="interview__button__previousButton__span">
                  <ArrowBackIosNewIcon />
                </span>
              </Item>
            </Grid>
            <Grid item xs={5.5}>
              <Item style={{ position: 'relative' }} elevation={5}>
                <div className="answer__question">{selectedData ? 'Q. ' + Object(selectedData).interview_contents : '오류'}</div>
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                  }}
                >
                  <Tooltip title="복습 노트에 추가하기!" followCursor>
                    <Checkbox
                      aria-label="Checkbox"
                      style={{
                        color: '#33cd21',
                      }}
                      icon={<BookmarkBorderIcon />}
                      checkedIcon={<BookmarkIcon />}
                      onChange={setBookmark}
                    />
                  </Tooltip>
                </div>
              </Item>
            </Grid>
            <Grid item xs={5.5}>
              <Item elevation={5}>
                <div>
                  <>{selectedData ? getAnswer() : null}</>
                </div>
              </Item>
            </Grid>
            <Grid className="interview__button" item xs={0.5}>
              <Item className="interview__button__nextButton" elevation={0}>
                <span className="interview__button__nextButton__span">
                  <ArrowForwardIosIcon />
                </span>
              </Item>
            </Grid>
          </>
        )}
        <Grid item xs={12}>
          <Item elevation={0}>
            <Box sx={{ height: 400, width: '100%', minHeight: '425px' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                // checkboxSelection
                // disableSelectionOnClick
                autoPageSize={true}
                experimentalFeatures={{ newEditingApi: true }}
                onRowClick={selectRow}
                components={{ Toolbar: GridToolbar }}
                componentsProps={{
                  toolbar: {
                    showQuickFilter: true,
                    quickFilterProps: { debounceMs: 500 },
                  },
                }}
                disableColumnFilter={true}
                disableColumnSelector={true}
                disableDensitySelector={true}
                hideFooterSelectedRowCount={true}
              />
            </Box>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default interviewContents;
