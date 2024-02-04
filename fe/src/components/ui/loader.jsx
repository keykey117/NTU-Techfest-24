import { TailSpin } from "react-loader-spinner";
const LoaderComp = () => {
    return (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
            <TailSpin
                height="80"
                width="80"
                color="#d3d3d3"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    );
};  
export default LoaderComp;