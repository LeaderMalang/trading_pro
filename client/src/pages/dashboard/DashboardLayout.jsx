import PropTypes from "prop-types";
import DashboardHeader from "./DashboardHeader";
import Sidebar from "./Sidebar";

function DashboardLayout({ layout }) {
    return (
        <section className="flex  font-poppins bg-dark-clr max-w-[100vw] h-[100vh] pr-2 overflow-x-hidden overflow-y-scroll">
            <div className="w-full h-16 fixed bottom-0 bg-dark-clr text-text-clr  flex items-center justify-around p-5 z-20 md:flex-shrink-1 md:sticky md:top-0 md:bottom--2 md:h-fit md:p-0 md:m-2 md:w-auto">
                <Sidebar />
            </div>
            <div className="w-full flex flex-col flex-grow ">
                <div className="w-full h-fit  bg-dark-clr rounded-sm flex ">
                    <DashboardHeader />
                </div>

                <div className="w-full h-full pt-3 rounded-sm">{layout}</div>
            </div>
        </section>
    );
}

DashboardLayout.propTypes = {
    layout: PropTypes.any,
};

export default DashboardLayout;
