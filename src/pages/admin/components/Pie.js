import Chart from "chart.js/auto";
import { Pie } from "react-chartjs-2";


export default  ({props}) => {
    const {label,labels,dataList} = props;
    const data = {
      labels: labels,
      datasets: [
        {
          label: label,
          data: dataList,
        },
      ],
    };

    return <Pie data={data} />
}