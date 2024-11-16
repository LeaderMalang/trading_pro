import sampleImg  from "/src/assets/home-sample.png";

function Sample() {
    return (
      <section className="flex items-center gap-12 sec_max-width pt-40 flex-wrap md:flex-nowrap">
        <figure className="">
          <img
            src={sampleImg}
             className=" sam border border-gray-600 rounded-lg w-[100%] max-w-[600px] object-cover"
            alt="Dashboard Sample"
          />
        </figure>
        <div>
          <h2 className="head--two">
            <span className="text-primary-clr">Trade</span> on the go.{" "}
            <span className="text-primary-clr">Anywhere,</span> anytime.
          </h2>
        </div>
      </section>
    );
}

export default Sample
