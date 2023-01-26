import * as React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsiveRadar } from '@nivo/radar'
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
        <div style={{ width: '100%', height: '500px' }}>
            <ResponsiveRadar
                data={data}
                keys={[ '오리온 ' ]}
                indexBy="title"
                valueFormat=">-.2f"
                margin={{ top: 50, right: 80, bottom: 50, left: 80 }}
                borderColor={{ from: 'color' }}
                gridLabelOffset={36}
                dotSize={10}
                dotColor={{ theme: 'background' }}
                dotBorderWidth={2}
                colors={{ scheme: 'nivo' }}
                blendMode="multiply"
                motionConfig="wobbly"
                legends={[
                    {
                        anchor: 'top-left',
                        direction: 'column',
                        translateX: -50,
                        translateY: -40,
                        itemWidth: 80,
                        itemHeight: 20,
                        itemTextColor: '#999',
                        symbolSize: 12,
                        symbolShape: 'circle',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemTextColor: '#000'
                                }
                            }
                        ]
                    }
                ]}
            />
        </div>
        // <div style={{ width: '100%', height: '500px' }}>
        //     <ResponsiveBar
        //         data={data}
        //         keys={["percent"]}
        //         indexBy="title"
        //         layout="vertical"
        //         margin={{ top: 0, right: 130, bottom: 50, left: 130 }}
        //         padding={0.4}
        //         valueScale={{ type: "linear" }}
        //         colors="#f47560"
        //         maxValue={100}
        //         animate={true}
        //         enableLabel={true}
        //         axisBottom={{
        //             tickSize: 5,
        //             tickPadding: 5,
        //             tickRotation: 0
        //         }}
        //         axisTop={null}
        //         axisRight={null}
        //         axisLeft={null}                
        //         theme={{
        //             /**
        //              * label style (bar에 표현되는 글씨)
        //              */
        //             labels: {
        //                 text: {
        //                     fontSize: 14,
        //                     fontWeight: 'bold',
        //                     fill: '#ffffff',
        //                 }
        //             },
        //             axis: {
        //                 /**
        //                  * axis ticks style (bottom, left에 있는 값)
        //                  */
        //                 ticks: {
        //                     text: {
        //                         fontSize: 12,
        //                         fontWeight: 'bold',
        //                         fill: 'dimgrey'                                
        //                     }
        //                 }
        //             }
        //         }}
        //     />
        // </div>
    );
};

export default Barchart;