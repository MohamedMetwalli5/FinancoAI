import OverviewCards from "../overview-components/OverviewCards"
import OverviewChart from "../overview-components/OverviewChart"

const Overview = () => {
  return (
    <div className="flex items-center mt-2 space-x-2 bg-slate-50 rounded-lg p-1">
        <OverviewCards/>
        <OverviewChart/>
    </div>
  )
}

export default Overview