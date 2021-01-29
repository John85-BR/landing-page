/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

//takes all sectors elements
let sectionsArray = document.querySelectorAll('section');
//takes de id of navbar__list
let navbar__list = document.getElementById('navbar__list');
//variable to know if the pointer of the mouse is on the navbar or not 
let mouse_over = false;
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * Function to count the time that the screen scroll is not used 
 * and to know  if the pointer of the mouse is on the navbar or not 
*/
function timeOut(){
    setTimeout(function(){  
        if(!mouse_over){
            navbar__list.style.display = 'none';
        }    
    },5000);    
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

/**
 * Function that identifies the sections, and identifies when the title of each one appears on the screen, 
 * changing the class when necessary 
*/
function identifySections(){     
    for(section of sectionsArray){
        let elem = section.getBoundingClientRect();   
        for(let top in elem){
            if(top=='y' && (elem[top]>-10 && elem[top]<629)){         
                let active = document.querySelector('.your-active-class');
                let topSection = document.querySelector('#'+section.getAttribute('id'));
                active.classList.remove("your-active-class");
                let li_elements = document.getElementsByClassName('menu__link');
                for(let li_element of li_elements){
                    // remove class
                    li_element.classList.remove('act_li');
                    if(li_element.textContent==section.getAttribute('data-nav')){
                         // Add class 'active' to section when near top of viewport
                        li_element.classList.add('act_li');
                    }
                }
                topSection.classList.add("your-active-class");                           
            }
        }
    }
}

/**
 * Function that dynamically builds the navbar 
*/
function configNavbar(){
    for(const section of sectionsArray){
        let li_element = document.createElement('li');     
        li_element.setAttribute('class','menu__link');     
        li_element.textContent = section.getAttribute("data-nav"); 
        //When a link is clicked it just jumps to the section smoothly
        li_element.addEventListener('click',function(){
            section.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
        });
        navbar__list.appendChild(li_element);
    }
}
// Start function Build nav 
configNavbar();

/**
 * End Main Functions
 * Begin Events
 * 
*/

/**
* Events listeners to identify when the pointer of the mouse is on the navbar or not 
*/
navbar__list.addEventListener('mouseover',function(){  
    mouse_over = true;      
});   
navbar__list.addEventListener('mouseout',function(){
    mouse_over = false;
    timeOut();     
});

/**
* Event listener to identify when the scroll of the screen is on the move or not 
*/
document.addEventListener('scroll', function(){
    navbar__list.style.display = 'block';  
    timeOut();            
    //start function set and add active class
    identifySections();      
});
/**
 * End Events
*/





