import Offer1 from "/src/assets/offer1.jpeg";
import Offer2 from "/src/assets/offer2.png";
import Offer3 from "/src/assets/offer3.jpeg";
import Offer4 from "/src/assets/offer4.jpeg";

function Banner() {
    return (
      <section className="sec_max-width">
        <div className="my-4">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-10">
          <img
            src={Offer1}
            alt="trade-img"
            className="w-[100%] h-[150px] my-4 rounded-md"
          />
          <img
            src={Offer2}
            alt="trade-img"
            className="w-[100%] h-[150px] my-4 rounded-md"
          />
          <img
            src={Offer3}
            alt="trade-img"
            className="w-[100%] h-[150px] my-4 rounded-md"
          />
          <img
            src={Offer4}
            alt="trade-img"
            className="w-[100%] h-[150px] my-4 rounded-md"
          />
        </div>
        </div> 
      </section>
    )
}

export default Banner
