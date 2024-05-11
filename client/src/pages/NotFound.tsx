import Lottie from "lottie-react";
import notfound from "@/animations/notfound-animation.json";

const NotFound = () => {
  return (
    <div className="w-full h-[80vh] justify-center items-center flex">
      <Lottie animationData={notfound} loop={true} />
    </div>
  );
};
export default NotFound;
