
import { Link, useParams } from "react-router-dom";
import DashboardSubNav from "../../components/DashboardSubNav"
import DashboardLayout from "./DashboardLayout"
import { IoMdAlert } from "react-icons/io";
import { FaAngleLeft, FaArrowRightLong } from "react-icons/fa6";
import { useForm } from "react-hook-form";

const cryptoDeposit = [
    {
    name: "Binance Pay",
    iconUrl: "https://qxbroker.com/profile/images/binance.svg"
    },
    {
        name: "Polka dot",
        iconUrl: "https://qxbroker.com/profile/images/polkadot.svg"
    },
    {
        name: "Zcash(ZEC)",
        iconUrl: "https://qxbroker.com/profile/images/crypto-zec.svg"
    },
    {
        name: "Ripple",
        iconUrl: "https://qxbroker.com/profile/images/crypto-xpr.svg"
    },
    {
        name: "ApeCoin(APE)",
        iconUrl: "https://qxbroker.com/profile/images/apecoin.svg"
    },
    {
        name: "Avalance",
        iconUrl: "https://qxbroker.com/profile/images/avalance.svg"
    },
    {
    name: "Polygon(MATIC)",
    iconUrl: "https://qxbroker.com/profile/images/polygon.svg"
    },
    {
    name: "USD Coin (USDC ERC-20)",
    iconUrl: "https://qxbroker.com/profile/images/usdc-eth.svg"
    },
    {
    name: "Binance Cash",
    iconUrl: "https://qxbroker.com/profile/images/crypto-bch.svg"
    },
    {
    name: "Solana",
    iconUrl: "https://qxbroker.com/profile/images/crypto-solana.svg"
    },
    {
    name: "Shiba Inu(ERC-20)",
    iconUrl: "https://qxbroker.com/profile/images/crypto-shiba_erc20.svg"
    },
    {
    name: "Dogecoin",
    iconUrl: "https://qxbroker.com/profile/images/crypto-doge.svg"
    },
    {
    name: "Binance Pay",
    iconUrl: "https://qxbroker.com/profile/images/ton.svg"
    },
    {
    name: "Binance Pay",
    iconUrl: "https://qxbroker.com/profile/images/uniswap.svg"
    },
    {
    name: "Binance Pay",
    iconUrl: "https://qxbroker.com/profile/images/crypto-dash.svg"
    },
    {
    name: "Binance Pay",
    iconUrl: "https://qxbroker.com/profile/images/crypto-tron.svg"
    },
    {
    name: "Binance Pay",
    iconUrl: "https://qxbroker.com/profile/images/crypto-ltc.svg"
    },
    {
    name: "Binance Pay",
    iconUrl: "https://qxbroker.com/profile/images/crypto-btc.svg"
    },
    {
    name: "Binance Pay",
    iconUrl: "https://qxbroker.com/profile/images/usdt_bep20.svg"
    },
    {
    name: "Binance Pay",
    iconUrl: "https://qxbroker.com/profile/images/usdt_erc20.svg"
    },
    {
    name: "Binance Pay",
    iconUrl: "https://qxbroker.com/profile/images/usdt_trc20.svg"
    },
    {
    name: "Binance Pay",
    iconUrl: "https://qxbroker.com/profile/images/crypto-eth.svg"
    },  
   ];


function DepositDes() {
    return (
        <DashboardLayout  layout={<DepositDesPage />}/>
    )
}

function DepositDesPage(){

  const { register, handleSubmit, formState: { errors } } = useForm();


    const accountSubmit = (data) => {
        console.log(data);
      };
    

    const {name} = useParams();
 

    return <div className="mb-20 px-7 ">
           {/* <DashboardSubNav /> */}

           <div className="grid grid-cols-1 lg:grid-cols-2 py-7 ">
            {/* Choose a payment method Start */}
            <section>
                <div role="alerts" className="bg-warning-clr text-black font-semibold text-fnt-b flex items-center gap-3 px-4 py-3 max-w-max mt-5 rounded-md">
                    <IoMdAlert className="inline-block basis-24 text-3xl"/>
                    <span className="inlin-block">
                        Please Verify Your account at first
                    </span>
                    <div>
                    </div>
                </div>
                <div>
                        <h2 className="text-text-clr text-fnt-c py-4">Choosen Payment method:</h2>
                        <div  className="border bg-slate-100 flex items-center gap-5 p-4 pe-20 w-[20rem]  rounded-md hover:bg-voilet-dark group">
                            <img src={cryptoDeposit[name].iconUrl} alt="" />
                            <h2 className="group-hover:text-text-clr text-fnt-c">{cryptoDeposit[name].name}</h2>
                        </div>
                        <Link to="/deposit" className="text-success-clr flex gap-3 items-center my-3"><FaAngleLeft />Choose a different method</Link>
                </div>
            {/* Choose a payment method Start */}
          </section>
            {/* Payment Data Start */}
            <section>
            <h2 className="text-text-clr text-fnt-c py-4">Payment data:</h2>
            {/* Account Details Form Start*/}
            <form className="max-w-[600px] py-6  pt-0" onSubmit={handleSubmit(accountSubmit)}>

            {/*  */}
            <div className="relative">
                <p className="hidden lg:block bg-light-dark-clr text-[rgba(255,255,255,.3)] w-max px-2 text-md translate-x-3 translate-y-3">
                Ammount
                </p>
                <input
                className="mt-3 lg:mt-0 text-text-clr text-fnt-b md:text-fnt-c border border-[#515768] bg-transparent rounded-md p-3 w-full placeholder:text-[#5f636a] focus:outline-none focus-visible:outline-none"
                type="number"
                {...register("nickname", { required: "This field is required" })}
                />
                <p className="text-red-400 font-medium">{errors.nickname?.message}</p>
            </div>
            {/*  */}
            <div className="relative">
                <p className="hidden lg:block bg-light-dark-clr text-[rgba(255,255,255,.3)] w-max px-2 text-md translate-x-3 translate-y-3">
                First Name
                </p>
                <input
                className="mt-3 lg:mt-0 text-text-clr text-fnt-b md:text-fnt-c border border-[#515768] bg-transparent rounded-md p-3 w-full placeholder:text-[#5f636a] focus:outline-none focus-visible:outline-none"
                type="text"
                {...register("firstname", { required: "This field is required" })}
                />
                <p className="text-red-400 font-medium">{errors.firstname?.message}</p>
            </div>
            {/*  */}
            <div className="relative">
                <p className="hidden lg:block bg-light-dark-clr text-[rgba(255,255,255,.3)] w-max px-2 text-md translate-x-3 translate-y-3">
                Last Name
                </p>
                <input
                className="mt-3 lg:mt-0 text-text-clr text-fnt-b md:text-fnt-c border border-[#515768] bg-transparent rounded-md p-3 w-full placeholder:text-[#5f636a] focus:outline-none focus-visible:outline-none"
                type="text"
                {...register("lastname", { required: "This field is required" })}
                />
                <p className="text-red-400 font-medium">{errors.lastname?.message}</p>
            </div>
            {/*  */}
            <div className="relative">
                <p className="hidden lg:block bg-light-dark-clr text-[rgba(255,255,255,.3)] w-max px-2 m-0 text-md translate-x-3 translate-y-5">
                Date of birth
                </p>
                <input
                className="text-text-clr text-fnt-b md:text-fnt-c border border-[#515768] bg-transparent rounded-md p-3 mt-2 w-full placeholder:text-[#5f636a] focus:outline-none focus-visible:outline-none"
                type="date"
                {...register("dob", { required: "This field is required" })}
                />
                <p className="text-red-400 font-medium">{errors.dob?.message}</p>
            </div>
            {/*  */}
            <button className="text-text-clr flex items-center gap-5 justify-center rounded-md text-fnt-b lg:text-fnt-c font-bold p-3 bg-success-clr w-full mt-4">
                Deposit
                <div className="p-2 bg-[#82b0f2] rounded-full w-max">
                <FaArrowRightLong className="text-fnt-b md:text-fnt-b" />
                </div>
            </button>
            </form>
            {/* Account Details Form End */}
            </section>
            {/* Payment Data End */}
            </div>
          

         </div>   
}


export default DepositDes

