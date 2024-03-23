import { GoCheckCircleFill } from "react-icons/go";

const PricingCard = ({ title, price, description, className }) => {
    return (

        <div className="border-solid border p-4 border-gray-400/30 max-w-[25rem] rounded-2xl  ">
            <div className="flex flex-col gap-5 ">
                <h3 className={`text-4xl text-center font-bold  py-1 ${className}`}>{title}</h3>
                <p className=" text-md text-center text-gray-300 font-semibold ">{description}</p>
            </div>

            <div className=" mt-9 flex flex-col gap-4 font-semibold bg-red px-1">
                <div className="min-h-[2px] bg-gray-500/40 rounded-full  "> </div>
                <div className=" flex items-center gap-3 ">
                    <GoCheckCircleFill className="min-w-[40px] text-2xl " />
                    <p>You will Learn Indepth Knowledge on fronted-Backend Technologies</p>

                </div>

                <div className="min-h-[2px] bg-gray-500/40 rounded-full  "> </div>
                <div className=" flex items-center gap-3 ">
                    <GoCheckCircleFill className="min-w-[40px] text-2xl " />
                    <p>10+ Mega Projects</p>

                </div>
                <div className="min-h-[2px] bg-gray-500/40 rounded-full  "> </div>
                <div className=" flex items-center gap-3 ">
                    <GoCheckCircleFill className="min-w-[40px] text-2xl " />
                    <p>Lifetime access</p>

                </div>
                <div className="min-h-[2px] bg-gray-500/40 rounded-full  "> </div>
                <div className=" flex items-center gap-3 ">
                    <GoCheckCircleFill className="min-w-[40px] text-2xl " />
                    <p>30-day money-back guarantee</p>

                </div>
                <div className="min-h-[2px] bg-gray-500/40 rounded-full  "> </div>
                <div className=" flex items-center gap-3 ">
                    <GoCheckCircleFill className="min-w-[40px] text-2xl " />
                    <p>Completion Certificate</p>

                </div>
                <div className="min-h-[2px] bg-gray-500/40 rounded-full  "> </div>
                <div className=" flex items-center gap-3 ">
                    <GoCheckCircleFill className="min-w-[40px] text-2xl " />
                    <p>Access to GitHub Reposit</p>

                </div>
            </div>
            <div className="mt-[4rem] ">
                <div className=" text-5xl lg:text-6xl font-bold "><span className="text-4xl">₹</span>{price}</div>
                <div className="w-full text-center text-black bg-white rounded-full py-3 mt-8 text-3xl font-bold hover:cursor-pointer active:text-green-950 hover:text-green-950 transition-all duration-200 active:bg-green-500 hover:bg-green-500 ">
                    <span>Enroll Now</span>
                </div>

            </div>
        </div>

    );
};
export default PricingCard;
