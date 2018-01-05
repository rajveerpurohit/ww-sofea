import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
//import axios from 'axios';
import { Link } from 'react-router';
//import {bindActionCreators} from 'redux';
//import {getUsingAboutUs} from './actions';
//import SideBarComponent from '../../components/basic/SideBarContent';

export default class HowTos extends Component {
//   static need = [
//     getUsingAboutUs
//   ];
  constructor(props) {
    super(props);
    this.primeComponent = this.primeComponent.bind(this);
  }
  componentDidMount() {
  }

  primeComponent() {
    return (
        <main className="grid grid--space-y site-main">
   <div className="main-page ">
   {/* CONTENT */}	
   {/* BREADCRUMB NAVIGATION */}
   <nav>
      <ol className="breadcrumb">
         <li className="breadcrumb__crumb">Today With Woolies</li>
      </ol>
   </nav>
   {/* END BREADCRUMB NAVIGATION */}
   {/* WRAPPER */}
   <div className="grid grid--space-y">
   {/* REFACTORED */}
   {/* HOW TO */}
   <style dangerouslySetInnerHTML={{__html: "\n.how-to-figure { height: 180px; width: 180px; text-align: center;\n}\n.how-to-img {\theight: 90%;\n}\n" }} />	
   <article className="grid">
      <div className="grid">
      <div className="grid grid__two-thirds--medium">
         <h1 className=" heading heading--1 text-caps font-graphic">
            As if you needed more reasons to eat avocado
         </h1>
         <div className="text-intro">
            <p><a href="/store/cat/Food/Food/Fruit-Vegetables-Salads/Salads-Herbs/Avocadoes/_/N-1z13sdh"><strong><span style={{fontSize: 12}}>SHOP OUR RANGE OF DELICIOUSLY CREAMY AVOCADO HERE</span></strong></a></p>
            <p><span style={{fontSize: 12}}><span style={{color: 'rgb(34, 34, 34)'}}>We’re in love with avo and it’s so much more than just a summer crush.&nbsp;</span><br /><span style={{color: 'rgb(34, 34, 34)'}}>While the classic smashed avo on toast is a forever win, here are 10 new ways to get busy with this creamy berry (yes, it’s actually a berry).</span></span></p>
         </div>
      </div>
      <div className="grid grid__third--medium grid__third--medium--last float-r--medium pos--rel">
      <img className="img-fill-responsive" alt="As if you needed more reasons to eat avocado" src="/images/elasticera/New_Site/Food/Content/tww_avo_content.jpg" />
      <div className="text-small" />			
      </div>
      <div className="grid grid__two-thirds--medium grid--space-y">
      <ul className="list--silent">
         <li className="grid grid--space-y">
            <div className="how-to-figure float-r--small">
            <a href="#">
               <img className="how-to-img" alt="1. AVOCADO CHEESECAKE" src="/images/elasticera/New_Site/Food/Content/avocado_cheesecake.jpg" />
               <div className="text-small" />	
            </a>
            </div>
            <h2 className="heading heading--4 text-caps font-graphic">1. AVOCADO CHEESECAKE</h2>
            <div className="text-small"><span style={{fontSize: 12}}><span style={{color: 'rgb(34, 34, 34)'}}>Why limit your avo satisfaction to just savoury delights? It’s an absolute hero in so many desserts, and this cheesecake is no expectation.&nbsp;<br /><br /><a href="/store/recipe/_/A-cmp205476"><strong>GET THE RECIPE HERE &gt;&nbsp;</strong></a></span></span><br />&nbsp;</div>
         </li>
         <hr className="hr--light" />
         <li className="grid grid--space-y">
            <div className="how-to-figure float-r--small">
            <a href="#">
               <img className="how-to-img" alt="2. HUEVOS RANCHEROS WITH AVO SALSA" src="/images/New_Site/Food/Recipes/huevos_rancheros.jpg" />
               <div className="text-small" />	
            </a>
            </div>
            <h2 className="heading heading--4 text-caps font-graphic">2. HUEVOS RANCHEROS WITH AVO SALSA</h2>
            <div className="text-small"><span style={{fontSize: 12}}><span style={{color: 'rgb(34, 34, 34)'}}>Spice things up at the breakfast table with this flavour-rich take on a total classic. Instead of reaching for the good old guacamole, try this avo salsa instead.&nbsp;<br /><br /><a href="/store/recipe/_/A-cmp202302"><strong>GET THE RECIPE HERE &gt;&nbsp;</strong></a></span></span><br />&nbsp;</div>
         </li>
         <hr className="hr--light" />
         <li className="grid grid--space-y">
            <div className="how-to-figure float-r--small">
            <a href="#">
               <img className="how-to-img" alt="3. RAW AVOCADO CHOCOLATE TARTS" src="/images/elasticera/New_Site/Food/Content/tart.jpg" />
               <div className="text-small" />	
            </a>
            </div>
            <h2 className="heading heading--4 text-caps font-graphic">3. RAW AVOCADO CHOCOLATE TARTS</h2>
            <div className="text-small">
               <span style={{fontSize: 12}}>You just read about how awesome avo could be in cheesecake, but it’s true dessert love-match is without a doubt, chocolate. These raw avo and chocolate tarts are easy to make and oh so delicious.<br /><br /><strong><a href="/store/recipe/_/A-cmp205291">GET THE RECIPE HERE &gt;&nbsp;</a></strong></span>
               <div>&nbsp;</div>
            </div>
         </li>
         <hr className="hr--light" />
         <li className="grid grid--space-y">
            <div className="how-to-figure float-r--small">
            <a href="#">
               <img className="how-to-img" alt="4. SRIRACHA ASIAN AVOCADO RITZ" src="/images/elasticera/New_Site/Food/Content/Sriracha_asian_avocado_ritz.jpg" />
               <div className="text-small" />	
            </a>
            </div>
            <h2 className="heading heading--4 text-caps font-graphic">4. SRIRACHA ASIAN AVOCADO RITZ</h2>
            <div className="text-small"><span style={{fontSize: 12}}><span style={{color: 'rgb(34, 34, 34)'}}>A spicy throwback to the 80’s anyone? This flavour combo needs no introduction. While it remains classic to its core, the addition of Sriracha gives it a decidedly modern twist.&nbsp;</span><br /><br /><a href="/store/recipe/_/A-cmp205280"><strong>GET THE RECIPE HERE &gt;&nbsp;</strong></a></span></div>
         </li>
         <hr className="hr--light" />
         <li className="grid grid--space-y">
            <div className="how-to-figure float-r--small">
            <a href="#">
               <img className="how-to-img" alt="5. POACHED EGGS SERVED WITH AN AVOCADO-INFUSED HUMMUS" src="/images/New_Site/Food/Recipes/avocado_with_poached_egg.JPG" />
               <div className="text-small" />	
            </a>
            </div>
            <h2 className="heading heading--4 text-caps font-graphic">5. POACHED EGGS SERVED WITH AN AVOCADO-INFUSED HUMMUS</h2>
            <div className="text-small"><span style={{fontSize: 12}}><span style={{color: 'rgb(34, 34, 34)'}}>“Avo on everything” is the motto for this dish. Think perfectly poached eggs served with freshly sliced avo and a dollop of avo-infused hummus. Add a drizzle of lemon and a crack of flaky sea salt and black pepper to finish it off.&nbsp;</span><br /><br /><a href="/store/recipe/_/A-cmp203611"><strong>GET THE RECIPE HERE &gt;</strong></a></span></div>
         </li>
         <hr className="hr--light" />
         <li className="grid grid--space-y">
            <div className="how-to-figure float-r--small">
            <a href="#">
               <img className="how-to-img" alt="6. SPICY GUACAMOLE" src="/images/elasticera/New_Site/Food/Content/spicy_guacamole.jpg" />
               <div className="text-small" />	
            </a>
            </div>
            <h2 className="heading heading--4 text-caps font-graphic">6. SPICY GUACAMOLE</h2>
            <div className="text-small"><span style={{fontSize: 12}}>Kick your guac game up a notch with this spicy twist on a classic dip. While we’ll take any excuse to eat a bowl of chips, try pairing this tasty guacamole with a BLT, scrambled eggs or a cheesy baked sweet potato.&nbsp;<br /><br /><a href="/store/recipe/_/A-cmp206120"><strong>GET THE RECIPE HERE &gt;&nbsp;</strong></a></span></div>
         </li>
         <hr className="hr--light" />
         <li className="grid grid--space-y">
            <div className="how-to-figure float-r--small">
               <a href="#">
                  <img className="how-to-img" alt="7. GREEN SMOOTHIE BOWL" src="/images/elasticera/New_Site/Food/Content/green_smoothie_bowl.jpg" />
                  <div className="text-small" />	
               </a>
               </div>
               <h2 className="heading heading--4 text-caps font-graphic">7. GREEN SMOOTHIE BOWL</h2>
               <div className="text-small"><span style={{fontSize: 12}}>Looking for a refreshing dairy-free breakfast bowl? Look no further. Not only does it look like it’s good for you, it’s crammed with so many delicious fruity flavours and yes, avo. You’ll be rushing back to the kitchen for seconds.<br /><br /><a href="/store/recipe/_/A-cmp205510" style={{lineHeight: '1.6'}}><strong>GET THE RECIPE HERE &gt;&nbsp;</strong></a></span></div>
         </li>
         <hr className="hr--light" />
         <li className="grid grid--space-y">
         <div className="how-to-figure float-r--small">
         <a href="#">
         <img className="how-to-img" alt="8. TROPICAL FRUIT SALAD WITH AVOCADO & CRUNCHY ROASTED PISTACHIOS" src="/images/New_Site/Food/Recipes/tropical_fruit_salad_with_avo.JPG" />
         <div className="text-small" />	
         </a>
         </div>
         <h2 className="heading heading--4 text-caps font-graphic">8. TROPICAL FRUIT SALAD WITH AVOCADO &amp; CRUNCHY ROASTED PISTACHIOS</h2>
         <div className="text-small"><span style={{fontSize: 12}}><span style={{color: 'rgb(34, 34, 34)'}}>You would be hard-pressed to find a dish more representative of summer than this colourful salad. Crunchy roasted pistachios topped with tangy white balsamic vinegar and served with a delicious lemongrass dressing, make this our go-to summer entertaining salad. &nbsp;</span><br /><br /><a href="/store/recipe/_/A-cmp203605"><strong>GET THE RECIPE HERE &gt;&nbsp;</strong></a></span></div>	
         </li>
         <hr className="hr--light" />
         <li className="grid grid--space-y">
         <div className="how-to-figure float-r--small">
         <a href="#">
         <img className="how-to-img" alt="9. AVOCADO & ROTISSERIE CHICKEN SALAD" src="/images/New_Site/Food/Content/rotisserie_chicken_salad.jpg" />
         <div className="text-small" />	
         </a>
         </div>
         <h2 className="heading heading--4 text-caps font-graphic">9. AVOCADO &amp; ROTISSERIE CHICKEN SALAD</h2>
         <div className="text-small"><span style={{fontSize: 12}}><span style={{color: 'rgb(34, 34, 34)'}}>This colourful, fresh salad is perfect for the whole family and works wonderfully as a casual weekday supper. Creamy avo served with our &nbsp;succulent rotisserie chicken and crunchy, toasted ciabatta… yum!&nbsp;</span><br /><br /><a href="/store/fragments/recipe/recipe-index.jsp?contentId=cmp204165"><strong>GET THE RECIPE HERE &gt;&nbsp;</strong></a></span></div>	
         </li>
         <hr className="hr--light" />
         <li className="grid grid--space-y">
         <div className="how-to-figure float-r--small">
         <a href="#">
         <img className="how-to-img" alt="10. SEARED CORIANDER-CRUSTED SALMON WITH CHILLI AVOCADO SALAD" src="/images/New_Site/Food/Recipes/seared_salmon_with_avo.JPG" />
         <div className="text-small" />	
         </a>
         </div>
         <h2 className="heading heading--4 text-caps font-graphic">10. SEARED CORIANDER-CRUSTED SALMON WITH CHILLI AVOCADO SALAD</h2>
         <div className="text-small"><span style={{fontSize: 12}}><span style={{color: 'rgb(34, 34, 34)'}}>This dish will become of your favourite spring/summer dinners. Loaded with good fats, it is quick and easy to make and the flavours a rich and complex. Avo and salmon are a savoury match blessed by the flavour-gods, you will definitely be craving this again.&nbsp;</span><br /><br /><a href="/store/recipe/_/A-cmp203609"><strong>GET THE RECIPE HERE &gt;&nbsp;</strong></a></span></div>	
         </li>
         <hr className="hr--light" />
      </ul>
      </div>
      </div>
      {/* SOCIAL LINKS */}
      <div className="grid grid__two-thirds--small">
      {/* PRODUCT SOCIAL LINKS */}
      {/*<nav className="grid grid--space-y">
      <ul className="nav-list-x">
    
      <li className="nav-list-x__item">
      <iframe id="twitter-widget-0" scrolling="no" frameBorder={0} allowTransparency="true" className="twitter-share-button twitter-share-button-rendered twitter-tweet-button" style={{position: 'static', visibility: 'visible', width: 60, height: 20}} title="Twitter Tweet Button" src="https://platform.twitter.com/widgets/tweet_button.eaf4b750247dd4d0c4a27df474e7e934.en.html#dnt=false&id=twitter-widget-0&lang=en&original_referer=http%3A%2F%2Fwww.woolworths.co.za%2Fstore%2Frecipe%2F_%2FA-cmp206616&size=m&text=As%20if%20you%20needed%20more%20reasons%20to%20eat%20avocado%20%7C%20Woolworths.co.za&time=1514535791801&type=share&url=http%3A%2F%2Fwww.woolworths.co.za%2Fstore%2Frecipe%2F_%2FA-cmp206616" />
      </li>
     
      <li className="nav-list-x__item nav-list-x--space">
      <span className="PIN_1514535791787_button_pin PIN_1514535791787_save" data-pin-log="button_pinit_bookmarklet" data-pin-href="https://www.pinterest.com/pin/create/button/">Save</span>
      </li>
     
      <li className="nav-list-x__item nav-list-x--space">
      <span className="fb_like product__fb-like">
       <fb:like href layout="button_count" show-faces="true" width={450} action="like" colorscheme="light" send="false" className=" fb_iframe_widget" fb-xfbml-state="rendered" fb-iframe-plugin-query="action=like&app_id=599670703430997&color_scheme=light&container_width=0&href=http%3A%2F%2Fwww.woolworths.co.za%2Fstore%2Frecipe%2F_%2FA-cmp206616&layout=button_count&locale=en_US&sdk=joey&send=false&show_faces=true&width=450"><span style={{verticalAlign: 'bottom', width: 61, height: 20}}><iframe name="f3fd77cb36a617" width="450px" height="1000px" frameBorder={0} allowTransparency="true" allowFullScreen="true" scrolling="no" title="fb:like Facebook Social Plugin" src="https://www.facebook.com/plugins/like.php?action=like&app_id=599670703430997&channel=http%3A%2F%2Fstaticxx.facebook.com%2Fconnect%2Fxd_arbiter%2Fr%2FlY4eZXm_YWu.js%3Fversion%3D42%23cb%3Df82e07a6c1180c%26domain%3Dwww.woolworths.co.za%26origin%3Dhttp%253A%252F%252Fwww.woolworths.co.za%252Ff15103b08b504c8%26relation%3Dparent.parent&color_scheme=light&container_width=0&href=http%3A%2F%2Fwww.woolworths.co.za%2Fstore%2Frecipe%2F_%2FA-cmp206616&layout=button_count&locale=en_US&sdk=joey&send=false&show_faces=true&width=450" style={{border: 'none', visibility: 'visible', width: 61, height: 20}} className /></span></fb:like></span> 
      </li>
      </ul>
      </nav>*/}
      {/* END PRODUCT SOCIAL LINKS */}
      </div>	
   </article>
   {/* END HOW TO */}
   </div>	
   </div>{/* /.main-page */}	
</main>
    );
  }
  render() {
    return (
      <div>
        {this.primeComponent()}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    // aboutUsData: state.aboutUsReducer.aboutUsData,
    // contentAside: state.aboutUsReducer.contentAside
    };
};

// const matchDispatchToProps = (dispatch) => {
//   return bindActionCreators({getUsingWoolworthsOnline}, dispatch);
// };

//export default connect(mapStateToProps)(AboutUs);
