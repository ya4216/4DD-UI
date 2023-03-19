import React, { useEffect } from 'react';
import './about.scss';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';

const About = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      {/* <div className="root__title">About Developer</div> */}
      <Box
        className="root__box"
        sx={{
          //   display: 'flex',
          display: 'inline-flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
          },
        }}
      >
        <span className="root__box__picture">
          <div className="root__box__picture__div">
            <Paper className="root__box__picture__paper" elevation={5}>
              <img
                className="root__box__picture__paper__img"
                src="/assets/images/ohjiwon.jpg"
              ></img>
            </Paper>
            <div>OH JI WON</div>
          </div>
          <Divider className="root__box__divider" variant="middle" />
          <div className="root__box__about">
            <table>
              <tr>
                <th style={{ width: '150px' }}>PHONE NUMBER</th>
                <td>010-9187-1301</td>
              </tr>
              <tr>
                <th style={{ width: '150px' }}>E-MAIL</th>
                <td>okwangdori@gmail.com</td>
              </tr>
              <tr>
                <th style={{ width: '150px' }}>GITHUB</th>
                <td>
                  <a href="https://github.com/okwangdori" target="_blank">
                    https://github.com/okwangdori
                  </a>
                </td>
              </tr>
              <tr>
                <th>PORTFOLIO</th>
                <td>-</td>
              </tr>
              {/* <tr>
                <th>CAREER</th>
                <td>한신대학교</td>
              </tr>
              <tr>
                <th></th>
                <td>엣데이터</td>
              </tr>
              <tr>
                <th></th>
                <td>회사2</td>
              </tr>
              <tr>
                <th>PROJECT</th>
                <td>SKT TANGO 프로젝트</td>
              </tr>
              <tr>
                <th></th>
                <td>PROJECT2</td>
              </tr>
              <tr>
                <th></th>
                <td>4DD (For Dream Developer) 프로젝트</td>
              </tr> */}
            </table>
          </div>
        </span>
        {/* <Divider orientation="vertical" variant="middle" flexItem /> */}
        <span className="root__box__picture">
          <div className="root__box__picture__div">
            <Paper className="root__box__picture__paper" elevation={5}>
              <img
                className="root__box__picture__paper__img"
                src="/assets/images/parkdaehwi.jpg"
              ></img>
            </Paper>
            <div>PARK DAE HWI</div>
          </div>
          <Divider className="root__box__divider" variant="middle" />
          <div className="root__box__about">
            <table>
              <tr>
                <th style={{ width: '150px' }}>PHONE NUMBER</th>
                <td>010-5011-8115</td>
              </tr>
              <tr>
                <th style={{ width: '150px' }}>E-MAIL</th>
                <td>qkreognl1@gamil.com</td>
              </tr>
              <tr>
                <th style={{ width: '150px' }}>GITHUB</th>
                <td>
                  <a href="https://github.com/ya4216" target="_blank">
                    https://github.com/ya4216
                  </a>
                </td>
              </tr>
              <tr>
                <th>PORTFOLIO</th>
                <td>-</td>
              </tr>
              {/* <tr>
                <th>CAREER</th>
                <td>안양대학교</td>
              </tr>
              <tr>
                <th></th>
                <td>엣데이터</td>
              </tr>
              <tr>
                <th></th>
                <td>디오티스</td>
              </tr>
              <tr>
                <th>PROJECT</th>
                <td>SKT TANGO 프로젝트</td>
              </tr>
              <tr>
                <th></th>
                <td>LG전자 보이는ARS B2C, CARESOLUTION 프로젝트</td>
              </tr>
              <tr>
                <th></th>
                <td>4DD (For Dream Developer) 프로젝트</td>
              </tr> */}
            </table>
          </div>
        </span>
      </Box>
    </div>
  );
};

export default About;
