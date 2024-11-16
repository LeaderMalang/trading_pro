

import { useForm } from "react-hook-form"
import DashboardSubNav from "../../components/DashboardSubNav"
import DashboardLayout from "./DashboardLayout"
import { FaArrowRightLong } from "react-icons/fa6";
import { useState } from "react";



function Withdraw() {
    return (
        <DashboardLayout  layout={<WithdrawPage />}/>
    )
}

function WithdrawPage(){

    const [withdrawlType, setWithdrawlType] = useState();
    console.log(withdrawlType);
    const {register, handleSubmit, formState: { errors } } =  useForm();

    function withdrawSubmit(data){
      console.log(data);
    }
 

    return <div className="mb-20 px-7 ">
                 <div className="flex gap-5 flex-wrap justify-between items-center p-5 ps-0">
                    {/* <DashboardSubNav /> */}
                    
                    <div className="flex flex-wrap gap-14 text-left lg:text-right me-4">
                    <div>
                        <p className="text-fnt-b font-medium text-light-text-clr">My current currency</p>
                        <p className="text-fnt-c font-bold text-text-clr">USD &nbsp; <span className="bg-success-clr text-text-clr text-fnt-b font-semibold p-1 rounded hover:cursor-pointer">change</span></p>
                    </div>
                    <div>
                        <p className="text-fnt-b font-medium text-light-text-clr">Available for withdrawal</p>
                        <p className="text-fnt-c font-bold text-text-clr">0.00$</p>
                    </div>
                    <div>
                        <p className="text-fnt-b font-medium text-light-text-clr">In the account</p>
                        <p className="text-fnt-c font-bold text-text-clr">0.00$</p>
                    </div>
                    </div>
                </div>


                   <h2 className="text-text-clr my-3 text-fnt-c">Withdraw Form:</h2>

                    {/* Account Details Form Start*/}
                    <form className="max-w-[600px] py-6  pt-0" onSubmit={handleSubmit(withdrawSubmit)}>

                            {/* Choose option Start */}
                            <select 
                            value={withdrawlType} onChange={(e)=>setWithdrawlType(e.target.value)} className="mt-3 lg:mt-0 text-text-clr text-fnt-b md:text-fnt-c border border-[#515768] bg-transparent rounded-md p-3 w-full placeholder:text-[#5f636a] focus:outline-none focus-visible:outline-none" name="" id=""
                            >
                                {/* {...register("withdrawType", {required: "This field is required"})} */}
                                <option className="bg-light-dark-clr" value="">Select Withdrawl Type</option>
                                <option className="bg-light-dark-clr" value="crypto">Withdraw with Crypto Coin</option>
                                <option className="bg-light-dark-clr" value="debit">Withdraw with Debit Card</option>
                            </select>
                            <p className="text-red-400 font-medium">{errors.withdrawType?.message}</p>
                            {/* Choose option End */}
                            {/*  */}
                            <div className="relative">
                                <p className="hidden lg:block bg-light-dark-clr text-[rgba(255,255,255,.3)] w-max px-2 text-md translate-x-3 translate-y-3">
                                Ammount
                                </p>
                                <input
                                className="mt-3 lg:mt-0 text-text-clr text-fnt-b md:text-fnt-c border border-[#515768] bg-transparent rounded-md p-3 w-full placeholder:text-[#5f636a] focus:outline-none focus-visible:outline-none"
                                type="number"
                                {...register("withdrawAmmount", { required: "This field is required" })}
                                />
                                <p className="text-red-400 font-medium">{errors.withdrawAmmount?.message}</p>
                            </div>
                            {/*  */}



                            {/*  */}
                            {withdrawlType === "crypto" &&
                            <div className="relative">
                                <p className="hidden lg:block bg-light-dark-clr text-[rgba(255,255,255,.3)] w-max px-2 text-md translate-x-3 translate-y-3">
                                Wallet Address
                                </p>
                                <input
                                className="mt-3 lg:mt-0 text-text-clr text-fnt-b md:text-fnt-c border border-[#515768] bg-transparent rounded-md p-3 w-full placeholder:text-[#5f636a] focus:outline-none focus-visible:outline-none"
                                type="number"
                                {...register("walletAddress", { required: "This field is required" })}
                                />
                                <p className="text-red-400 font-medium">{errors.walletAddress?.message}</p>
                            </div>
                              }

                            {/*  */}

                            {/*  */}

                            {
                              withdrawlType === "debit" &&
                            <div className="relative">
                                <p className="hidden lg:block bg-light-dark-clr text-[rgba(255,255,255,.3)] w-max px-2 text-md translate-x-3 translate-y-3">
                                Debit Card Number
                                </p>
                                <input
                                className="mt-3 lg:mt-0 text-text-clr text-fnt-b md:text-fnt-c border border-[#515768] bg-transparent rounded-md p-3 w-full placeholder:text-[#5f636a] focus:outline-none focus-visible:outline-none"
                                type="number"
                                {...register("debitCardNumber", { required: "This field is required" })}
                                />
                                <p className="text-red-400 font-medium">{errors.debitCardNumber?.message}</p>
                            </div>
                            }
                            {/*  */}


                            <div className="relative">
                                <p className="hidden lg:block bg-light-dark-clr text-[rgba(255,255,255,.3)] w-max px-2 text-md translate-x-3 translate-y-3">
                                Account holder full name
                                </p>
                                <input
                                className="mt-3 lg:mt-0 text-text-clr text-fnt-b md:text-fnt-c border border-[#515768] bg-transparent rounded-md p-3 w-full placeholder:text-[#5f636a] focus:outline-none focus-visible:outline-none"
                                type="text"
                                {...register("fullname", { required: "This field is required" })}
                                />
                                <p className="text-red-400 font-medium">{errors.fullname?.message}</p>
                            </div>
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
                                Withdrawl
                                <div className="p-2 bg-[#82b0f2] rounded-full w-max">
                                <FaArrowRightLong className="text-fnt-b md:text-fnt-b" />
                                </div>
                            </button>
                    </form>
                    {/* Account Details Form End */}

         </div>   
}


export default Withdraw

