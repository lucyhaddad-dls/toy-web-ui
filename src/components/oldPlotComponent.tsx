import '@h5web/lib/styles.css';
import ndarray from 'ndarray';
import { DataCurve, VisCanvas, getDomain, type Domain } from '@h5web/lib';

export function DataPlot(props: {data_y: number[]|null, data_x: number[]|null,
                label_x: string|null, label_y:string|null}){

  const ydata = props.data_y ? ndarray(props.data_y): null;

  const xdata = props.data_x != null ? ndarray(props.data_x)
        : null;

      
    let domain:Domain|undefined = ydata ? getDomain(ydata): [0, 1];
    let domain_x:Domain|undefined = xdata ? getDomain(xdata): [0, 1];

    domain = domain ? domain: [0, 1];
    domain_x = domain_x ? domain_x: [0, 1];

    const xlabel = props.label_x != null ? props.label_x : ""
    const ylabel = props.label_y != null ? props.label_y : ""


    return (
        <VisCanvas
        abscissaConfig={{
          visDomain: domain_x ? domain_x: [0, 1], 
        label: xlabel}}
        ordinateConfig={{
          visDomain: domain ? domain: [0, 1],
        label: ylabel }}
        >
          {ydata && xdata && (
            <DataCurve
            abscissas={xdata.data}
            color="red"
            ordinates={ydata?.data}
            visible={true}
            />
          )}
        </VisCanvas>
    )
}