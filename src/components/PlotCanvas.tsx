import ndarray from "ndarray";
import { type Domain, getDomain, VisCanvas, DataCurve } from "@h5web/lib";

export function DataPlot(props: {xdata:ndarray.NdArray<number[]>|null,
                                ydata:ndarray.NdArray<number[]>|null, 
                                xlabel:string, 
                                ylabel:string}){


    const ydomain:Domain|undefined = props.ydata ? getDomain(props.ydata): [0, 1];
    const xdomain:Domain|undefined = props.xdata ? getDomain(props.xdata): [0, 1];


    return ( <VisCanvas
        abscissaConfig={{
          visDomain: xdomain ? xdomain: [0, 1], 
        label: props.xlabel}}

        ordinateConfig={{
          visDomain: ydomain ? ydomain: [0, 1],
        label: props.ylabel }}
        >
          {props.ydata && props.xdata && (
            <DataCurve
            abscissas={props.xdata.data}
            color="red"
            ordinates={props.ydata?.data}
            visible={true}
            />
          )}
        </VisCanvas>
        )
}