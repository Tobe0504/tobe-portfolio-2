import { useParams } from "react-router-dom";
import Layout2 from "../../Components/Layout2/Layout2";
import { works } from "../../Utilities/works";
import WorkDetailHeader from "../WorkDetailHeader.tsx/WorkDetailHeader";
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
      </section>
    </Layout2>
  );
};

export default WorkDetail;
