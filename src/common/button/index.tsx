import "./button.module.scss";

const Button = (props: any) => {
  return (
    <input className={props.className} type="submit" value={props.value} />
  );
};

export default Button;
