import { useState } from "react";
import { FaPlus } from "react-icons/fa";
function Faq() {

    const [close, setClose] = useState();
    function faqToggle(e){
        const id = e.currentTarget.dataset.id;
        setClose(prev => (prev === id ? "" : id));
    }
    return (
        <section className="pt-40 pb-28 sec_max-width">
            <h2 className="head--two text-center mb-16">Frequently Asked Questions</h2>
            <div>
                {/*  */}
                <div data-id="1" onClick={faqToggle} className="group  px-6 py-5 mt-5 rounded-xl cursor-pointer max-w-[1100px] hover:bg-light-dark-clr mx-auto">
                 <div className="flex justify-between">
                    <div className="flex gap-4 items-center"> 
                        <span className="flex items-center justify-center flex-shrink-0 w-[2.2rem] h-[2.2rem] rounded-md border border-gray-600">1</span>
                        <h4 className="text-text-clr font-medium text-2xl">What is a cryptocurrency exchange?</h4>
                    </div>
                    <div className="text-sm  flex items-center justify-center flex-shrink-0 w-[2.2rem] h-[2.2rem] rounded-full group-hover:text-dark-clr group-hover:bg-primary-clr">
                     <FaPlus className="" />
                    </div>
                </div>
                    {close === "1" &&
                    <div className="mt-6 ms-12 text-2xl lg:text-lg font-normal">
                        Cryptocurrency exchanges are digital marketplaces that enable users to buy and sell cryptocurrencies like Bitcoin, Ethereum, and Tether. The Binance exchange is the largest crypto exchange by trade volume.
                    </div>}
                </div>
                {/*  */}

                {/*  */}
                <div data-id="2" onClick={faqToggle} className="group  px-6 py-5 mt-5 rounded-xl cursor-pointer max-w-[1100px] hover:bg-light-dark-clr mx-auto">
                 <div className="flex justify-between items-center">
                    <div className="flex gap-4 items-center"> 
                        <span className="flex items-center justify-center flex-shrink-0 w-[2.2rem] h-[2.2rem] rounded-md border border-gray-600">2</span>
                        <h4 className="text-text-clr font-medium text-2xl">How to track cryptocurrency prices?</h4>
                    </div>
                    <div className="text-sm  flex items-center justify-center flex-shrink-0 w-[2.2rem] h-[2.2rem] rounded-full group-hover:text-dark-clr group-hover:bg-primary-clr">
                     <FaPlus className="" />
                    </div>
                </div>
                    {close === "2" &&
                    <div className="mt-6 ms-12 text-2xl lg:text-lg font-normal">
                       The easiest way to track the latest cryptocurrency prices, trading volumes, trending altcoins, and market cap is the Binance Cryptocurrency Directory. Click on the coins to know historical coin prices, 24-hour trading volume, and the price of cryptocurrencies like Bitcoin, Ethereum, BNB and others in real-time.
                    </div>}
                </div>
                {/*  */}      

                {/*  */}
                <div data-id="3" onClick={faqToggle} className="group  px-6 py-5 mt-5 rounded-xl cursor-pointer max-w-[1100px] hover:bg-light-dark-clr mx-auto">
                 <div className="flex justify-between items-center">
                    <div className="flex gap-4 items-center"> 
                        <span className="flex items-center justify-center flex-shrink-0 w-[2.2rem] h-[2.2rem] rounded-md border border-gray-600">3</span>
                        <h4 className="text-text-clr font-medium text-2xl">
                        How to trade cryptocurrencies on Charasma?</h4>
                    </div>
                    <div className="text-sm  flex items-center justify-center flex-shrink-0 w-[2.2rem] h-[2.2rem] rounded-full group-hover:text-dark-clr group-hover:bg-primary-clr">
                     <FaPlus className="" />
                    </div>
                </div>
                    {close === "3" &&
                    <div className="mt-6 ms-12 text-2xl lg:text-lg font-normal">
                       You can trade hundreds of cryptocurrencies on Binance via the Spot, Margin, Futures, and Options markets. To begin trading, users need to register an account, complete identity verification, buy/deposit crypto, and start trading.
                    </div>}
                </div>
                {/*  */}    
                {/*  */}
                <div data-id="4" onClick={faqToggle} className="group  px-6 py-5 mt-5 rounded-xl cursor-pointer max-w-[1100px] hover:bg-light-dark-clr mx-auto">
                 <div className="flex justify-between items-center">
                    <div className="flex gap-4 items-center"> 
                        <span className="flex items-center justify-center flex-shrink-0 w-[2.2rem] h-[2.2rem] rounded-md border border-gray-600">4</span>
                        <h4 className="text-text-clr font-medium text-2xl">
                        How to earn from crypto on  Charasma?</h4>
                    </div>
                    <div className="text-sm  flex items-center justify-center flex-shrink-0 w-[2.2rem] h-[2.2rem] rounded-full group-hover:text-dark-clr group-hover:bg-primary-clr">
                     <FaPlus className="" />
                    </div>
                </div>
                    {close === "4" &&
                    <div className="mt-6 ms-12 text-2xl lg:text-lg font-normal">
                       Users can earn rewards on more than 180+ cryptocurrencies by using one of the products offered on Binance Earn. Our platform offers dozens of digital assets like Bitcoin, Ethereum, and stablecoins.
                    </div>}
                </div>
                {/*  */}                                                

            </div>
        </section>
    )
}

export default Faq
