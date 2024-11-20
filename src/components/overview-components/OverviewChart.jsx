import GroupedBarChart from "./GroupedBarChart";

const OverviewChart = () => {
  return (
    <div className="ml-3 flex-1">
        <div className="grid grid-cols-1 mt-4 p-1">
            <h1 className="font-bold text-lg items-center m-auto">Last Quarter Insights</h1>
            <div className="m-1">
                <GroupedBarChart/>
            </div>
        </div>

    </div>
  )
}

export default OverviewChart