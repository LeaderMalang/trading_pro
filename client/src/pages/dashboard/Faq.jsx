import DashboardLayout from "./DashboardLayout";
import  { useState } from 'react';
import PropTypes from 'prop-types';
import { IoIosArrowDown } from "react-icons/io";


function DashboardFaq() {
    return (
       <DashboardLayout layout={<FAQAccordion/>}/>
    )
}



const AccordionItem = ({ question, answer, index, isOpen, onClick }) => (
  <div className="">
    <button className="text-text-clr text-[22px] text-left pb-3 border-b border-light-text-clr" onClick={() => onClick(index)}>
       {question}<IoIosArrowDown className="inline ms-4" />
    </button>
    {isOpen && <div className="text-light-text-clr text-fnt-c text-left mt-3">{answer}</div>}
  </div>
);

const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
      {
        question: "What are digital options?",
        answer: (
            <>
              Option is a derivative financial instrument based on any underlying asset, such as a stock, a currency pair, oil, etc.<br /><br />
              
              DIGITAL OPTION - a non-standard option that is used to make a profit on price movements of such assets for a certain period of time.<br /><br />
              
              A digital option, depending on the terms agreed upon by the parties to the transaction, at a time determined by the parties, brings a fixed income (the difference between the trade income and the price of the asset) or loss (in the amount of the value of the asset).<br /><br />
              
              Since the digital option is purchased in advance at a fixed price, the size of the profit, as well as the size of the potential loss, are known even before the trade.<br /><br />
              
              Another feature of these deals is the time limit. Any option has its own term (expiration time or conclusion time).<br /><br />
              
              Regardless of the degree of change in the price of the underlying asset (how much it has become higher or lower), in case of winning an option, a fixed payment is always made. Therefore, your risks are limited only by the amount for which the option is acquired.
            </>
          )
        
      },
      
    { question: "What are the varieties of digital options?",
        answer: (
            <>
              Making an option trade, you must choose the underlying asset that will underlie the option. Your forecast will be carried out on this asset.<br /><br />
              
              Simply, buying a digital contract, you are actually betting on the price movement of such an underlying asset.<br /><br />
              
              An underlying asset is an “item” whose price is taken into account when concluding a trade. As the underlying asset of digital options, the most sought-after products on the markets usually act. There are four types of them:<br /><br />
              
              - Securities (shares of world companies)<br />
              - Currency pairs (EUR/USD, GBP/USD, etc.)<br />
              - Raw materials and precious metals (oil, gold, etc.)<br />
              - Indices (S&P 500, Dow, dollar index, etc.)<br /><br />
              
              There is no such thing as a universal underlying asset. When choosing it, you can only use your own knowledge, intuition, and various kinds of analytical information, as well as market analysis for a particular financial instrument.
            </>
          ) },
    { question: "What is the gist of digital options trading?", answer: (
        <>
          The fact is that a digital option is the simplest type of derivative financial instrument. In order to make money in the digital options market, you do not need to predict the value of the market price of an asset that it can reach.<br /><br />
          
          The principle of the trading process is reduced only to the solution of one single task - the price of an asset will increase or decrease by the time the contract is executed.<br /><br />
          
          The aspect of such options is that it does not matter to you at all, that the price of the underlying asset will go one hundred points or only one, from the moment the trade is concluded to its close. It is important for you to determine only the direction of movement of this price.<br /><br />
          
          If your prognosis is correct, in any case you get a fixed income.
        </>
      ) },
    { question: "How to learn quickly how to make money in the digital options market?", 
    answer: (
        <>
          To get a profit in the digital options market, you only need to correctly predict which way the price of the asset you have chosen will go (up or down). Therefore, for a stable income you need:<br /><br />
          
          - Develop your own trading strategies, in which the number of correctly predicted trades will be maximum, and follow them.<br />
          - Diversify your risks.<br /><br />
          
          In developing strategies, as well as in searching for diversification options, market monitoring, studying analytical and statistical information that can be obtained from various sources (Internet resources, expert opinions, analysts in this field, etc.) will help you, one of which is the Company website.
        </>
      ) },
    { question: "Does your trading platform have a demo account in order to understand the process of working with digital options without spending your own money?",
     answer: (
        <>
          Yes. In order to develop trading skills and test the capabilities of the Companys trading platform, you can use a demo account (free of charge). This is a kind of simulator that allows you to try first, and only then move on to real trading. Such a demo account is also suitable for experienced traders to improve their professional level.<br /><br />
          
          The balance of such an account is 10,000 units.
        </>
      ) },
    { question: "At what expense does the Company pay profit to the Client in case of successful trade?",
    answer: (
        <>
          Company earns with customers. Therefore, it is interested in the share of profitable transactions significantly prevailing over the share of unprofitable ones, due to the fact that the Company has a percentage of payments for a successful trading strategy chosen by the Client.<br /><br />
          
          In addition, trades conducted by the Client together constitute the trading volume of the Company, which is transferred to a broker or exchange, which in turn are included in the pool of liquidity providers, which together leads to an increase in the liquidity of the market itself.
        </>
      ) },
    { question: "Can I close my account? How to do it?", answer: "You can delete an account in your Individual Account by clicking on the “Delete Account” button located at the bottom of the profile page." },
    { question: "What is the expiration period of a trade?", answer: (<>
    The expiration period is the time after which the trade will be considered completed (closed) and the result is automatically summed up.
    When concluding a trade with digital options, you independently determine the time of execution of the transaction (1 minute, 2 hours, month, etc.).</>) },
    { question: "What is a trading platform and why is it needed?", answer: "Trading platform - a software complex that allows the Client to conduct trades (operations) using different financial instruments. It has also accesses to various information such as the value of quotations, real-time market positions, actions of the Company, etc." },
    { question: "What are the possible results of the placed trades?", answer:  (
        <>
          There are three possible outcomes in the digital options market:<br /><br />
          
          1) In the event that your prognosis of determining the direction of the price movement of the underlying asset is correct, you receive income.<br /><br />
          
          2) If by the time the option was concluded your forecast turned out to be erroneous, you incur a loss limited by the size of the asset value (i.e., in fact, you can only lose your investment).<br /><br />
          
          3) If the outcome of the trade is zero (the price of the underlying asset has not changed, the option is concluded at the price at which it was purchased), you return your investment.<br /><br />
          
          Thus, the level of your risk is always limited only by the size of the asset value.
        </>
      ) },
    { question: "Is the download of the program to a computer or smartphone required?", answer: "No, it's not required. You just need to register on the Company's website in the presented form and open a individual account." }
  ];

  const handleClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-light-dark-clr mt-0 m-4 p-4 ps-16 rounded-xl">
    <h2 className="text-text-clr  text-fnt-e font-semibold  mt-8">Frequently asked questions</h2>
    <div className="max-w-[700px] flex flex-col gap-8 mt-14 mb-28">
      {faqs.map((faq, index) => (
        <AccordionItem
          key={index}
          index={index}
          question={faq.question}
          answer={faq.answer}
          isOpen={openIndex === index}
          onClick={handleClick}
        />
      ))}
    </div>
    </section>
  );
};

AccordionItem.propTypes = {
    question: PropTypes.any,
    answer: PropTypes.any,
     index: PropTypes.any,
      isOpen:PropTypes.any,
       onClick: PropTypes.any 
  };





export default DashboardFaq;
