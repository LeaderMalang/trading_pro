function Footer() {
    const date = new Date();
    return (
      <section className="sec_max-width">
        <div className="mt-[5rem]">
          {/* <p className="font-semibold text-xl text-center">
            Charisma Future Pro.
          </p> */}
          <div className="mb-[1rem] mt-6">
            <div className=" grid grid-flow-row lg:grid-cols-6 grid-cols-2  gap-8  md:justify-center text-light-text-clr">
              <div className="flex flex-col gap-1">
                <p className="text-2xl md:text-lg font-bold text-text-clr">About Us</p>
                <p className="text-2xl lg:text-lg">About</p>
                <p className="text-2xl lg:text-lg">Careers</p>
                <p className="text-2xl lg:text-lg">Announcements</p>
                <p className="text-2xl lg:text-lg">News</p>
                <p className="text-2xl lg:text-lg">Legal</p>
                <p className="text-2xl lg:text-lg">Press</p>
                <p className="text-2xl lg:text-lg">Terms</p>
                <p className="text-2xl lg:text-lg">Privacy</p>
                <p className="text-2xl lg:text-lg">Building Trust</p>
                <p className="text-2xl lg:text-lg">Blog</p>
                <p className="text-2xl lg:text-lg">Community</p>
                <p className="text-2xl lg:text-lg">Sitemap</p>
                <p className="text-2xl lg:text-lg">Risk Waring</p>
                <p className="text-2xl lg:text-lg">Notices</p>
                <p className="text-2xl lg:text-lg">Downloads</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-2xl md:text-xl font-bold text-text-clr">Product</p>
                <p className="text-2xl lg:text-lg">Exchange</p>
                <p className="text-2xl lg:text-lg">Buy Crypto</p>
                <p className="text-2xl lg:text-lg">Trading View</p>
                <p className="text-2xl lg:text-lg">Pay</p>
                <p className="text-2xl lg:text-lg">Academy</p>
                <p className="text-2xl lg:text-lg">Live</p>
                <p className="text-2xl lg:text-lg">Tax</p>
                <p className="text-2xl lg:text-lg">Gift Card</p>
                <p className="text-2xl lg:text-lg">Lunch pool</p>
                <p className="text-2xl lg:text-lg">Auto Invest</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-2xl md:text-xl font-bold text-text-clr">Bussiness</p>
                <p className="text-2xl lg:text-lg">P2Pro Merchant Application</p>
                <p className="text-2xl lg:text-lg">Listing Application</p>
                <p className="text-2xl lg:text-lg">Institutional & VIP Services</p>
                <p className="text-2xl lg:text-lg">P2P Merchant Application</p>
                <p className="text-2xl lg:text-lg">Labs</p>
              </div>
              <div className="flex flex-col gap-1">
              <p  className="text-2xl md:text-xl font-bold text-text-clr">Learn</p>
                <p className="text-2xl lg:text-lg">Learn & Earn</p>
                <p className="text-2xl lg:text-lg">Browse Crypto Prices</p>
                <p className="text-2xl lg:text-lg">Bitcoin Price</p>
                <p className="text-2xl lg:text-lg">Ethereum Price</p>
                <p className="text-2xl lg:text-lg">Browse Crypto Price Predictions</p>
                <p className="text-2xl lg:text-lg">Bitcoin Price Prediction</p>
                <p className="text-2xl lg:text-lg">Ethereum Price Predictio</p>
                <p className="text-2xl lg:text-lg">Buy BNB </p>
                <p className="text-2xl lg:text-lg">BuyRipple </p>
                <p className="text-2xl lg:text-lg">Buy Dogecoin </p>
                <p className="text-2xl lg:text-lg">Buy Ethereum </p>
                <p className="text-2xl lg:text-lg">Buy Tradable Altcoins</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-2xl md:text-xl font-bold text-text-clr">Service</p>
                <p className="text-2xl lg:text-lg">Affiliate</p>
                <p className="text-2xl lg:text-lg">Referral</p>
                <p className="text-2xl lg:text-lg">OTC Trading</p>
                <p className="text-2xl lg:text-lg">Historical Market Data</p>
                <p className="text-2xl lg:text-lg">Proof of Reserves</p>
              </div>
              <div className="flex flex-col gap-1">
              <p className="text-2xl md:text-xl font-bold text-text-clr">Support</p>
                <p className="text-2xl lg:text-lg">24/7 Chat Support</p>
                <p className="text-2xl lg:text-lg">Support Center</p>
                <p className="text-2xl lg:text-lg">Product Feedback & Suggestions</p>
                <p className="text-2xl lg:text-lg">Fees</p>
                <p className="text-2xl lg:text-lg">Trading Rules</p>
              </div>
            </div>
          </div>
          {/* <hr /> */}
          <p className="text-center mt-8 p-5 text-light-text-clr text-fnt-c">
            {date.getFullYear()}&copy;Charasma Capital Trading.
          </p>
        </div>
      </section>
    );
  }
  
  export default Footer;
  