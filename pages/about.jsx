//our-domain.com/about
import Footer from "../components/Footer";
import Navi from "../components/Navi";

function AboutPage(){
    return(<div>
        <Navi/>
        <h1>About us</h1>
        <p>
            Starting in the United States, DECA has made its name internationally as non-profit organization with more than 200,000 members. DECA provides delegates with the opportunity network with business professionals develop professional skills and mature as a business student.

            Every year, DECA U Ontario hosts Nationals (formerly Provincials Conference), which has become the largest undergraduate conference in Canada. Universities and colleges from all across Ontario gather together square off against each other in many different categories.

            Many of the delegates that attend and take part in DECA are future entrepreneurs, marketers, and leaders. As a result, you will find a number of companies and their representative at every DECA U event.
        </p>
        <h1>Meet our team</h1>
        <Footer/>
    </div>);
}

export default AboutPage;