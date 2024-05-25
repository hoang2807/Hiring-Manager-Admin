import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { useEffect, useState } from 'react'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

const PieChart = (status) => {
  useEffect(() => {})
  console.log(status)
  const options = {}
  const data = {
    labels: ['CV ứng tuyển', 'CV từ chối', 'CV chưa xem'],
    datasets: [
      {
        label: 'Số lượng',
        data: status.status,
        backgroundColor: ['rgba(54, 162,235,0.2)', 'rgba(255, 99,132,0.2)', 'rgba(75, 192, 192, 0.2)'],
        hoverOffset: 4
      }
    ]
  }

  return (
    <div style={{ width: '500px', height: '400px', marginBottom: '20px' }}>
      <Pie data={data} options={options} />
    </div>
  )
}

export default PieChart
