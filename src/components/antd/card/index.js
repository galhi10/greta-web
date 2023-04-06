import { Card as CardAnt } from "antd";

const Card = ({ size, title, extra, style, children, ...rest }) => {
  return (
    <CardAnt size={size} title={title} extra={extra} style={style} {...rest}>
      {children}
    </CardAnt>
  );
};

export default Card;
