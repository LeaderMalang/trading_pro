import TradeImg from "/src/assets/home_img_desktop.webp";

function Hero() {
    return (
    <section className="sec_max-width mt-16">
    <div className=" flex justify-between items-center gap-10 flex-shrink-0 flex-wrap md:flex-nowrap">
        <div className="order-last lg:order-first">
          <h1 className="text-[2.9rem] lg:text-[3.5rem]  font-bold leading-tight">
            Profitability on the rise!
          </h1>
          <p className="text-2xl pt-3">
            A trading platform that supports your financial goals.
          </p>
          <p className="text-[green] my-3 mt-8 text-2xl font-bold">100% SECURE</p>
          <button
            className="rounded-md bg-green-700  px-8 py-2  font-semibold text-2xl lg:text-xl hover:bg-primary-clr"
          >
            Start Trade Now ~
          </button>
        </div>
        <div>
          <img
            src={TradeImg}
            alt="trade-img"
            className="object-cover w-[100%] max-w-[600px]"
            />
        </div>
    </div>
    </section>
    )
}

export default Hero
