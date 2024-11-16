import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import DashboardLayout from "./DashboardLayout";
import { Link } from "react-router-dom";

function Help() {
    return <DashboardLayout layout={<Layout />} />;
}

function Layout() {
    return (
        <section className=" pb-28 sec_max-width">
            <h2 className="head--two  mb-4 text-white">Help</h2>
            <div className="text-clr flex gap-3">
                <Link>
                    <FaFacebook className="text-text-clr text-3xl" />
                </Link>
                <Link>
                    <FaInstagram className="text-text-clr text-3xl" />
                </Link>
                <Link>
                    <FaLinkedin className="text-text-clr text-3xl" />
                </Link>
            </div>
        </section>
    )
}

export default Help;