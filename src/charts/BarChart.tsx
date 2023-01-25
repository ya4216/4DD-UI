import * as React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { BiBold } from 'react-icons/bi';

type unit = {
    category?: string;
    category_number?: number;
    _id: string;
    title: string;
    title_image_path?: string;
    useYN?: string;
    percent: number;
}

const Barchart = ({data}: any) => {
    const handle = {
        barClick: (data: any) => {
            console.log(data);
        },

        legendClick: (data: any) => {
            console.log(data);
        },
    };

    return (
        // chart height이 100%이기 때문이 chart를 덮는 마크업 요소에 height 설정
        <div style={{ width: '50%', height: '500px' }}>
            <ResponsiveBar
                data={data}
                keys={["percent"]}
                indexBy="title"
                layout="horizontal"
                margin={{ top: 50, right: 130, bottom: 50, left: 100 }}
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