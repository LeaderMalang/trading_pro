import { Link } from "react-router-dom"

function Cta() {
    return (
        <section className="bg-light-dark-clr py-16">
            <h2 className="head--two text-center">Start earning today</h2>
            <Link to={"/register"} className="block max-w-max mx-auto">
            <button className="rounded-md  bg-primary-clr px-8 py-2 mt-11 font-semibold text-[18px] hover:bg-green-700">
              Sign Up now
            </button>
            </Link>
        </section>
    )
}

export default Cta
