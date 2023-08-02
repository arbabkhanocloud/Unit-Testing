import classes from "./heading.module.scss";

const Heading = ({ title }: any) => {
  return (
    <div data-testid="heading-component" className={`${classes["heading"]}`}>
      {title}
    </div>
  );
};

export default Heading;
