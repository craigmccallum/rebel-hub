export type SvgProps = {
  /** SVG to render */
  component: React.FC;
};

export const Svg: React.FC<SvgProps> = ({ component }) => {
  const Svg = component;

  return <Svg />;
};
