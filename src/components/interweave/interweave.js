import { Interweave } from "interweave";
import { polyfill } from "interweave-ssr";

function transform(node, children) {
  if (node.tagName === "ul") {
    return <ul className="list-decimal px-6 text-lg space-y-2">{children}</ul>;
  }
  if (node.tagName === "ol") {
    return <ol className="list-disc px-6 text-lg space-y-2">{children}</ol>;
  }

  if (node.tagName === "p") {
    return <div>{children} </div>;
  }

  // if (node.tagName === "img") {
  //   return (
  //     <div className=" ">
  //       <Image
  //         src={node.getAttribute("src")}
  //         width="100%"
  //         height="50%"
  //         layout="responsive"
  //         objectFit="contain"
  //         alt=""
  //       />
  //     </div>
  //   );
  // }
}
export default function InterWeaveDetails(props) {
  polyfill();
  const { content } = props;

  return <Interweave content={content} transform={transform} />;
}
