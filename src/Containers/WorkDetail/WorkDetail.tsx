import { useParams } from "react-router-dom";
import Layout2 from "../../Components/Layout2/Layout2";
import { works } from "../../Utilities/works";
import WorkDetaiDescription from "../WorkDetaiDescription/WorkDetaiDescription";
import WorkDetailAchievements from "../WorkDetailAchievements/WorkDetailAchievements";
import WorkDetailFeatures from "../WorkDetailFeatures/WorkDetailFeatures";
import WorkDetailHeader from "../WorkDetailHeader.tsx/WorkDetailHeader";
import WorkDetailProblem from "../WorkDetailProblem/WorkDetailProblem";
import classes from "./WorkDetail.module.css";

const WorkDetail = () => {
  // Router
  const { workSlug } = useParams();

  // Utils
  const activeWork: any = works.find((data) => data.slug === workSlug);
  return (
    <Layout2>
      <section className={classes.container}>
        <WorkDetailHeader
          name={activeWork?.title}
          role={activeWork?.role}
          timeline={activeWork?.timeline}
          image={activeWork.image}
        />
        <WorkDetaiDescription description={activeWork.description} />
        <WorkDetailProblem problems={activeWork.problem} />
        <WorkDetailFeatures features={activeWork.features} />
        {activeWork.achievements && (
          <WorkDetailAchievements achievements={activeWork.achievements} />
        )}

        <div className={classes.visit}>
          {
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 25 25"
              fill="none"
            >
              <path
                d="M6.14126 6.66406L18.3369 18.8597M16.3043 6.66406H6.14126V16.8271"
                stroke="#0F0C13"
                strokeWidth="2.74637"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }

          {
            <div>
              <a href={activeWork.url} target="_blank" rel="noreferrer">
                Pay this site a visit
              </a>
              <span className={classes.visit2}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 25 25"
                  fill="none"
                >
                  <path
                    d="M6.14126 6.66406L18.3369 18.8597M16.3043 6.66406H6.14126V16.8271"
                    stroke="#0F0C13"
                    strokeWidth="2.74637"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          }
        </div>
      </section>
    </Layout2>
  );
};

export default WorkDetail;
