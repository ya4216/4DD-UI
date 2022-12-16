import * as React from 'react';
import { ResponsiveBar } from '@nivo/bar';

const Barchart = (data: any) => {
    const handle = {
        barClick: (data: any) => {
            console.log(data);
        },

        legendClick: (data: any) => {
            console.log(data);
        },
    };

    data = [
        {
            subject: "네트워크",
            percent: 15
        },
        {
            subject: "운영체제",
            percent: 27
        },
        {
            subject: "자료구조",
            percent: 22
        },
        {
            subject: "알고리즘",
            percent: 50
        },
        {
            subject: "HTML5",
            percent: 100
        },
        {
            subject: "CSS3",
            percent: 85
        },
        {
            subject: "React",
            percent: 43
        },
        {
            subject: "Vue",
            percent: 0
        }
        ,
        {
            subject: "Angular",
            percent: 15
        }
      ];

    return (
        // chart height이 100%이기 때문이 chart를 덮는 마크업 요소에 height 설정
        <div style={{ width: '900px', height: '500px', margin: '0 auto' }}>
            <ResponsiveBar
                data={data}
                keys={["percent"]}
                indexBy="subject"
                layout="horizontal"
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.4}
                valueScale={{ type: "linear" }}
                colors="#3182CE"
                maxValue={100}
                animate={true}
                enableLabel={true}
                axisBottom={null}
                axisTop={null}
                axisRight={null}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0
                }}
                />
        </div>
    );
};

export default Barchart;