import { Fragment } from "react";
import TypeOfWork from "./typeOfWork";
import SubjectLayout from "./subject";
import AcadmicLevelLayout from "./AcademicLevel";
import ReferencingStyle from "./referencingStyle";
import HourlyRate from "./hourlyRate";
interface DashboardInterface {
  Store: any;
  allPricesRates: {
    _id: string;
    hourlyRate: string;
    pricePerDoublePage: string;
    pricePerSinglePage: string;
  };
}
const DashboardSettings: React.FC<DashboardInterface> = (props) => {
  const { Store, allPricesRates } = props;

  return (
    <Fragment>
      <div className="mb-4">
        <div className="flex flex-wrap md:space-x-10">
          <TypeOfWork Store={Store} />
          <SubjectLayout Store={Store} />
        </div>
        <div className="flex flex-wrap md:space-x-10 mt-4">
          <HourlyRate Store={Store} allPricesRates={allPricesRates} />
          <AcadmicLevelLayout Store={Store} />
          <ReferencingStyle Store={Store} />
        </div>
      </div>
    </Fragment>
  );
};

export default DashboardSettings;
