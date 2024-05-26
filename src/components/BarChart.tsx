import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend, BarElement } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const BarChart = (score) => {
  const options = {}
  const data = {
    labels: ['CV có điểm dưới 6', 'CV điểm tử 6 đến 8', 'CV có điểm trên 8'],
    datasets: [
      {
        label: 'Số lượng',
        // data: [12, 34, 34],
        data: score.score,
        backgroundColor: ['rgba(255, 99,132,0.2)', 'rgba(54,162,235,0.2)', 'rgba(255, 206, 86, 0.2)'],
        borderColor: ['rgba(255, 99,132,1)', 'rgba(54,162,235,1)', ' rgba(255, 206, 86, 1)'],
        borderWidth: 1
      }
    ]
  }
  return (
    <div style={{ width: '800px' }}>
      <Bar options={options} data={data} />
    </div>
  )
}

export default BarChart
