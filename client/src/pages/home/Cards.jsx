import { FaAward } from "react-icons/fa"
import { GrUserManager } from "react-icons/gr"
import { MdAccountBox } from "react-icons/md"
import { SiMarketo } from "react-icons/si"
function Cards() {

        return (
            <section className="sec_max-width">
             <div className=" flex justify-between mt-[9rem]">
                <div className="flex gap-10 flex-wrap">
                  <div className="card w-full md:w-[300px] md:mx-auto border">
                    <div className="content">
                      <FaAward />
                      <p className="font-bold uppercase mt-4 text-2xl md:text-xl">Risk free trade</p>
                      <p className="max-w-[35ch] text-2xl md:text-lg">
                        Explore the platform and test strategies for free.
                      </p>
                    </div>
                  </div>
                  <div className="card w-full md:w-[300px] md:mx-auto border">
                    <div className="content">
                      <MdAccountBox />
                      <p className="font-bold uppercase mt-4 text-2xl md:text-xl">Account</p>
                      <p className="max-w-[35ch] text-2xl md:text-lg">
                        10,000 in virtual funds to practice and learn.
                      </p>
                    </div>
                  </div>
                  <div className="card w-full md:w-[300px] md:mx-auto border">
                    <div className="content">
                      <SiMarketo />
                      <p className="font-bold uppercase mt-4 text-2xl md:text-xl">Market</p>
                      <p className="max-w-[35ch] text-2xl md:text-lg">
                        Customize the platform with unique tools to elevate your
                        trading skills.
                      </p>
                    </div>
                  </div>
                  <div className="card w-full md:w-[300px] md:mx-auto border">
                    <div className="content">
                      <GrUserManager />
                      <p className="font-bold uppercase mt-4 text-2xl md:text-xl">
                        Personal Manager
                      </p>
                      <p className="max-w-[35ch] text-2xl md:text-lg">
                        Get exclusive one-on-one guidance with a trading expert.
                      </p>
                    </div>
                  </div>
                </div>
             
            </div> 
            </section>
          )
    
}

export default Cards
