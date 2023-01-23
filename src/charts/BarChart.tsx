import * as React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { BiBold } from 'react-icons/bi';

const Barchart = ({isFirst, data}: any) => {
    console.log("## isFirst : "+ isFirst);
    const handle = {
        barClick: (data: any) => {
            console.log(data);
        },

        legendClick: (data: any) => {
            console.log(data);
        },
    };
    if(isFirst){
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
    }else {
        data = [
            {
                subject: "test1",
                percent: 3
            },
            {
                subject: "test2",
                percent: 15
            },
            {
                subject: "test3",
                percent: 25
            },
            {
                subject: "test4",
                percent: 13
            },
            {
                subject: "test5",
                percent: 21
            },
            {
                subject: "test6",
                percent: 50
            },
            {
                subject: "test7",
                percent: 32
            },
            {
                subject: "test8",
                percent: 92
            }
            ,
            {
                subject: "test9",
                percent: 43
            }
        ];
    }
    return (
        // chart height이 100%이기 때문이 chart를 덮는 마크업 요소에 height 설정
        <div style={{ width: '50%', height: '500px' }}>
            <ResponsiveBar
                data={data}
                keys={["percent"]}
                indexBy="subject"
                layout="horizontal"
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.4}
                valueScale={{ type: "linear" }}
                colors="#f47560"
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
                theme={{
                    /**
                     * label style (bar에 표현되는 글씨)
                     */
                    labels: {
                        text: {
                            fontSize: 14,
                            fontWeight: 'bold',
                            fill: '#ffffff',
                        }
                    },
                    axis: {
                        /**
                         * axis ticks style (bottom, left에 있는 값)
                         */
                        ticks: {
                            text: {
                                fontSize: 12,
                                fontWeight: 'bold',
                                fill: 'dimgrey'                                
                            }
                        }
                    }
                }}
            />
        </div>
    );
};

export default Barchart;