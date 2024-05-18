import Chart from "chart.js/auto";
import { Bar  } from "react-chartjs-2";

export default ({props}) => {
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
  
    return < Bar  data={data} />
}