import BarChart from "./BarChart";

const OverviewChart = () => {
  return (
    <div className="ml-3 flex-1">
        <div className="mt-4 p-1">
            <h1 className="font-bold text-lg">Analytics</h1>
            <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-4 mr-4">
                <BarChart/>
            </div>
        </div>

    </div>
  )
}

export default OverviewChart