import "../../../src/home.css";
import Banner from "./Banner";
import Cards from "./Cards";
import Cta from "./Cta";
import Faq from "./Faq"
import Footer from "./Footer";
import Header from "./Header";
import Hero from "./Hero";
import Sample from "./Sample";
// import { Button } from "@/components/ui/button";
import { Button } from "../../../src/components/ui/button";
function Home() {
    return (
       <main className="bg-dark-clr main text-text-clr font-poppins">
        <Header/>

        <Hero/>


        <Banner/>

        <Sample/>

        <Cards/>
        <Faq/>

        <Cta/>

        <Footer/>
        <Button variant="secondary">Click me</Button>
       </main>
    )
}

export default Home
