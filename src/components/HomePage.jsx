import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/homePage.css'




// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);



const ProgressBar = ({ skill, target }) => {
    useEffect(() => {
        const progressBar = document.querySelector(`.oxy-progress-bar-${skill}`);
        const progressWrap = progressBar.querySelector('.oxy-progress-bar-progress-wrap');
        const percentText = progressBar.querySelector('.oxy-progress-bar-overlay-percent');

        const pbtl = gsap.timeline({
            defaults: { duration: 4, ease: 'bounce.out' },
            scrollTrigger: {
                trigger: progressBar,
                toggleActions: 'play pause resume reset',
            },
        });

        pbtl.fromTo(progressWrap, { width: 0 }, { width: `${target}%` });
        pbtl.from(percentText, {
            textContent: '0%',
            snap: { textContent: 1 },
        }, '<');
    }, [skill, target]);

    return (
        <div className={`oxy-progress-bar oxy-progress-bar-${skill}`}>
            <div className="oxy-progress-bar-label text-light">{skill}</div>
            <div className="oxy-progress-bar-progress">
                <div className="oxy-progress-bar-progress-wrap"></div>
            </div>

        </div>
    );
};
function HomePage() {

    const [showMore, setShowMore] = useState(false);

    const skillsData = [
        { skill: 'HTML5', target: 96 },
        { skill: 'CSS', target: 95 },
        { skill: 'JavaScript', target: 80 },
        { skill: 'Reactjs', target: 89 },
        { skill: 'Nodejs', target: 80 },
        { skill: 'MongoDb', target: 83 },
        { skill: 'Expressjs', target: 80 },



    ];
    const fullText = "FULL";
    const stackText = "STACK";
    const developerText = "DEVELOPER";
    const aboutText = "ABOUT";
    // color to each letter
    const renderLetters = (text) => {
        return [...text].map((letter, index) => (
            <span className="hover-letter" key={index}>
                {letter}
            </span>
        ));
    };
    // movement of full and stack to left and right
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            console.log("shinta");

            // Move the "FULL" text to the left
            gsap.to('.full-text', {
                x: -scrollY / 1, // Adjust speed by changing the divisor
                duration: 0.5,
                ease: 'power1.out',
            });

            // Move the "STACK" text to the right
            gsap.to('.stack-text', {
                x: scrollY / 1, // Adjust speed by changing the divisor
                duration: 0.5,
                ease: 'power1.out',
            });

            // Increase the width of the hyphen
            gsap.to('.hiphen', {
                width: `${12 + scrollY / 20}rem`, // Adjust growth rate
                duration: 0.1,
                ease: 'power1.out',
            });
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    useEffect(() => {
        const handleScroll = () => {
            const skillsSection = document.querySelector('.skillsandtools');
            const leftColumn = document.querySelector('.left-column');
            const rightColumn = document.querySelector('.right-column');

            if (skillsSection) {
                const sectionTop = skillsSection.getBoundingClientRect().top;
                const sectionBottom = skillsSection.getBoundingClientRect().bottom;

                if (sectionTop < window.innerHeight && sectionBottom > 0) {
                    // Add the show classes to slide in
                    leftColumn.classList.add('show-left');
                    rightColumn.classList.add('show-right');

                    // Add the shake class after a delay for the effect
                    setTimeout(() => {
                        leftColumn.classList.add('shake');
                        rightColumn.classList.add('shake');
                    }, 800); // Adjust delay as needed

                    // Remove the shake class after the animation completes
                    setTimeout(() => {
                        leftColumn.classList.remove('shake');
                        rightColumn.classList.remove('shake');
                    }, 1300); // Adjust timing to match animation duration
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    // projects animation
    useEffect(() => {
        // Trigger animation when the section is in view
        ScrollTrigger.create({
            trigger: ".projects-section", // Parent container of the projects
            start: "top 50%", // When the top of the section reaches 80% of the viewport
            end: "bottom 50%", // When the bottom of the section is 20% of the viewport
            onEnter: () => {
                gsap.to(".project-row", {
                    scale: 1,
                    opacity: 1,
                    duration: 0.5,
                    ease: "power1.out",
                    stagger: 0.2, // Animates each row with a slight delay
                });
            },
            onLeaveBack: () => {
                gsap.to(".project-row", {
                    scale: 0.6,
                    opacity: 0,
                    duration: 0.5,
                    ease: "power1.out",
                });
            },
        });
        ScrollTrigger.create({
            trigger: ".projects-section1", // Parent container of the projects
            start: "top 80%", // When the top of the section reaches 80% of the viewport
            end: "bottom 20%", // When the bottom of the section is 20% of the viewport
            onEnter: () => {
                gsap.to(".project-row1", {
                    scale: 1,
                    opacity: 1,
                    duration: 0.5,
                    ease: "power1.out",
                    stagger: 0.2, // Animates each row with a slight delay
                });
            },
            onLeaveBack: () => {
                gsap.to(".project-row1", {
                    scale: 0.6,
                    opacity: 0,
                    duration: 0.5,
                    ease: "power1.out",
                });
            },
        });
        ScrollTrigger.create({
            trigger: ".projects-section2", // Parent container of the projects
            start: "top 80%", // When the top of the section reaches 80% of the viewport
            end: "bottom 20%", // When the bottom of the section is 20% of the viewport
            onEnter: () => {
                gsap.to(".project-row2", {
                    scale: 1,
                    opacity: 1,
                    duration: 0.5,
                    ease: "power1.out",
                    stagger: 0.2, // Animates each row with a slight delay
                });
            },
            onLeaveBack: () => {
                gsap.to(".project-row2", {
                    scale: 0.6,
                    opacity: 0,
                    duration: 0.5,
                    ease: "power1.out",
                });
            },
        });
        ScrollTrigger.create({
            trigger: ".projects-section3", // Parent container of the projects
            start: "top 20%", // When the top of the section reaches 80% of the viewport
            end: "bottom 80%", // When the bottom of the section is 20% of the viewport
            onEnter: () => {
                gsap.to(".project-row3", {
                    scale: 1,
                    opacity: 1,
                    duration: 0.5,
                    ease: "power1.out",
                    stagger: 0.1, // Animates each row with a slight delay
                });
            },
            onLeaveBack: () => {
                gsap.to(".project-row3", {
                    scale: 0.6,
                    opacity: 0,
                    duration: 0.5,
                    ease: "power1.out",
                });
            },
        });
        ScrollTrigger.create({
            trigger: ".projects-section4", // Parent container of the projects
            start: "top 60%", // When the top of the section reaches 80% of the viewport
            end: "bottom 40%", // When the bottom of the section is 20% of the viewport
            onEnter: () => {
                gsap.to(".project-row4", {
                    scale: 1,
                    opacity: 1,
                    duration: 0.5,
                    ease: "power1.out",
                    stagger: 0.2, // Animates each row with a slight delay
                });
            },
            onLeaveBack: () => {
                gsap.to(".project-row4", {
                    scale: 0.6,
                    opacity: 0,
                    duration: 0.5,
                    ease: "power1.out",
                });
            },
        });
        ScrollTrigger.create({
            trigger: ".projects-section5", // Parent container of the projects
            start: "top 60%", // When the top of the section reaches 80% of the viewport
            end: "bottom 40%", // When the bottom of the section is 20% of the viewport
            onEnter: () => {
                gsap.to(".project-row5", {
                    scale: 1,
                    opacity: 1,
                    duration: 0.5,
                    ease: "power1.out",
                    stagger: 0.2, // Animates each row with a slight delay
                });
            },
            onLeaveBack: () => {
                gsap.to(".project-row5", {
                    scale: 0.6,
                    opacity: 0,
                    duration: 0.5,
                    ease: "power1.out",
                });
            },
        });
        ScrollTrigger.create({
            trigger: ".projects-section6", // Parent container of the projects
            start: "top 60%", // When the top of the section reaches 80% of the viewport
            end: "bottom 40%", // When the bottom of the section is 20% of the viewport
            onEnter: () => {
                gsap.to(".project-row6", {
                    scale: 1,
                    opacity: 1,
                    duration: 0.5,
                    ease: "power1.out",
                    stagger: 0.2, // Animates each row with a slight delay
                });
            },
            onLeaveBack: () => {
                gsap.to(".project-row6", {
                    scale: 0.6,
                    opacity: 0,
                    duration: 0.5,
                    ease: "power1.out",
                });
            },
        });
        ScrollTrigger.create({
            trigger: ".projects-section7", // Parent container of the projects
            start: "top 60%", // When the top of the section reaches 80% of the viewport
            end: "bottom 40%", // When the bottom of the section is 20% of the viewport
            onEnter: () => {
                gsap.to(".project-row7", {
                    scale: 1,
                    opacity: 1,
                    duration: 0.5,
                    ease: "power1.out",
                    stagger: 0.2, // Animates each row with a slight delay
                });
            },
            onLeaveBack: () => {
                gsap.to(".project-row7", {
                    scale: 0.6,
                    opacity: 0,
                    duration: 0.5,
                    ease: "power1.out",
                });
            },
        });
        ScrollTrigger.create({
            trigger: ".projects-section8", // Parent container of the projects
            start: "top 60%", // When the top of the section reaches 80% of the viewport
            end: "bottom 40%", // When the bottom of the section is 20% of the viewport
            onEnter: () => {
                gsap.to(".project-row8", {
                    scale: 1,
                    opacity: 1,
                    duration: 0.5,
                    ease: "power1.out",
                    stagger: 0.2, // Animates each row with a slight delay
                });
            },
            onLeaveBack: () => {
                gsap.to(".project-row8", {
                    scale: 0.6,
                    opacity: 0,
                    duration: 0.5,
                    ease: "power1.out",
                });
            },
        });
        ScrollTrigger.create({
            trigger: ".projects-section9", // Parent container of the projects
            start: "top 60%", // When the top of the section reaches 80% of the viewport
            end: "bottom 40%", // When the bottom of the section is 20% of the viewport
            onEnter: () => {
                gsap.to(".project-row9", {
                    scale: 1,
                    opacity: 1,
                    duration: 0.5,
                    ease: "power1.out",
                    stagger: 0.2, // Animates each row with a slight delay
                });
            },
            onLeaveBack: () => {
                gsap.to(".project-row9", {
                    scale: 0.6,
                    opacity: 0,
                    duration: 0.5,
                    ease: "power1.out",
                });
            },
        });
        ScrollTrigger.create({
            trigger: ".projects-section10", // Parent container of the projects
            start: "top 60%", // When the top of the section reaches 80% of the viewport
            end: "bottom 40%", // When the bottom of the section is 20% of the viewport
            onEnter: () => {
                gsap.to(".project-row10", {
                    scale: 1,
                    opacity: 1,
                    duration: 0.5,
                    ease: "power1.out",
                    stagger: 0.2, // Animates each row with a slight delay
                });
            },
            onLeaveBack: () => {
                gsap.to(".project-row10", {
                    scale: 0.6,
                    opacity: 0,
                    duration: 0.5,
                    ease: "power1.out",
                });
            },
        });
        ScrollTrigger.create({
            trigger: ".projects-section11", // Parent container of the projects
            start: "top 60%", // When the top of the section reaches 80% of the viewport
            end: "bottom 40%", // When the bottom of the section is 20% of the viewport
            onEnter: () => {
                gsap.to(".project-row11", {
                    scale: 1,
                    opacity: 1,
                    duration: 0.5,
                    ease: "power1.out",
                    stagger: 0.2, // Animates each row with a slight delay
                });
            },
            onLeaveBack: () => {
                gsap.to(".project-row11", {
                    scale: 0.6,
                    opacity: 0,
                    duration: 0.5,
                    ease: "power1.out",
                });
            },
        });

        if (showMore) {
            ScrollTrigger.refresh();  // Refresh ScrollTrigger to recognize newly added elements
        }
    }, [showMore]);


    // contact



    const form = useRef();
    // State to track form inputs
    const [formData, setFormData] = useState({
        from_name: '',
        user_email: '',
        message: '',
    });
    // Update form data on input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm('service_1ep81mt', 'template_4ywhbn9', form.current, {
                publicKey: 'M44pOvjzFcP9SX-YH',
            })
            .then(
                () => {
                    toast.success('Message sent', {
                        position: 'top-right',
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                    // Clear form inputs
                    e.target.reset();
                    setFormData({ name: '', email: '', message: '' }); // Reset state

                },
                (error) => {
                    toast.error(`Failed to send message: ${error.text}`, {
                        position: 'top-right',
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                },
            );
    };
    // Check if all fields are filled
    const isFormComplete = formData.from_name && formData.user_email && formData.message;
    return (
        <>
            <nav className="navbar navbar-expand-lg  ">
                <div className="container-fluid">
                    <button className='btn  btn-navbar btn-hai'><span className='victory'>✌️</span> Hi There! I'm Shinta</button>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse container " id="navbarSupportedContent">
                        <p className='navbar-nav me-auto mb-2 mb-lg-0 '>FULLSTACK DEVELOPER <br />FOLIO / 2023 - 2025</p>
                        <button className='btn btn-navbar'><a style={{ textDecoration: 'none', color: 'white' }} href="#contact">CONTACT</a></button>
                    </div>
                </div>
            </nav>
            <div className='homebox w-100 vh-100'>
                <div className='row container-fluid '>
                    <div className="col-xl-4 col-lg-12 ">
                        <p className='full-text'>{renderLetters(fullText)}</p>
                    </div>
                    <div className="col-xl-2  col-lg-12 d-flex align-items-center justify-content-center">
                        <div className='hiphen' ></div>
                    </div>
                    <div className="col-xl-6  col-lg-12">
                        <p className='stack-text'>{renderLetters(stackText)}</p>
                    </div>
                </div>
                <div className='row container-fluid '>
                    <div className="col-xl-10  col-lg-12 d-flex justify-content-start ">
                        <p >{renderLetters(developerText)}</p>
                    </div>
                    <div className="col-xl-2  col-lg-12 d-flex flex-column align-items-center justify-content-start ">
                        <p className='about' style={{ textAlign: 'left', fontSize: '1rem', lineHeight: '1.5rem', letterSpacing: '0px', color: '#aaa' }}>
                            <span className='text-secondary me-3 hover-letter'>{aboutText}</span> A Result-Oriented Full Stack Developer building and managing Websites and Web Applications that leads to the success of the overall product.


                        </p>
                        <button className='btn btn-cv me-auto' style={{
                            textDecoration: 'none',
                            backgroundColor: 'black',

                            padding: '8px 15px',
                            borderRadius: '5px',
                            fontSize: '0.9rem', border: '2px solid #882525'
                        }} ><a id='download' style={{ textDecoration: 'none', color: 'white', }} href="/resume/resume.pdf" download>DOWNLOAD CV</a></button>
                    </div>
                </div>
                <div>
                    <p style={{ lineHeight: '9rem' }} className='text-center'><i style={{ color: '#aaa' }} className="fa-solid fa-arrow-down-long down-arrow"></i></p>
                </div>

            </div>
            <div className='container'>
                <hr className="custom-hr mb-5" />
            </div>

            <div className=' skillsandtools  row mt-5 '>
                <div className='col-lg-3 col-12 left-column  d-flex flex-column justify-content-start align-items-center  '>
                    <div>
                        <p className='text-center'>Tools</p>
                        <hr style={{ backgroundColor: 'tan', height: '3px', border: 'none', width: '10rem' }} />
                    </div>

                    <div >
                        <ul className='tools'>
                            <li>Bootstrap</li>
                            <li>Tailwind CSS</li>
                            <li>GSAP</li>
                            <li>Material-UI</li>
                            <li>Styled Components</li>
                            <li>MongoDB Compass</li>
                            <li>Github </li>
                            <li>VS Code</li>
                            <li>Postman</li>

                        </ul>
                    </div>
                </div>
                <div className='col-lg-6 col-12 d-flex flex-column align-items-center'>
                    <div>
                        <p className='text-center'>Skills</p>
                        <hr style={{ backgroundColor: '#aaa', height: '3px', border: 'none', width: '10rem' }} />
                    </div>

                    <div className="skills-container">
                        {skillsData.map(({ skill, target }) => (
                            <ProgressBar key={skill} skill={skill} target={target} />
                        ))}
                    </div>
                </div>
                <div className='col-lg-3 col-12 right-column d-flex flex-column justify-content-start align-items-center   '>
                    <div>
                        <p className=''>Other</p>
                        <hr style={{ backgroundColor: 'tan', height: '3px', border: 'none', width: '10rem' }} />
                    </div>
                    <div className='' >
                        <ul className='tools'>
                            <li>Mongoose</li>
                            <li>REST API</li>
                            <li>Responsive Design</li>
                            <li>Authentication(JWT, OAuth)</li>



                        </ul>
                    </div>
                </div>

            </div>


            <div>
                <div className='container'>
                    <hr className="custom-hr" />
                </div>


                {/* expense tracker */}
                <div className='projects-section5'>
                    <div className="project-row5 d-flex">


                        <div className="project-details">
                            <h2>EXPENSE TRACKER</h2>
                            <p>A robust expense tracking application built with REACT, Context API, Node.js, EXPRESS. Users can securely register and log in using JWT authentication. The app allows users to add, view, edit, and delete expenses, categorized into savings, investments, and other customizable categories. Expenses are beautifully visualized with Chart.js, providing insights into spending patterns..</p>
                            <h3>MADE WITH</h3>
                            <a href="" className="project-spec"><i className="fa-brands fa-html5"></i></a>
                            <a href="" className="project-spec"><i className="fa-brands fa-css3"></i></a>
                            <a href="" className="project-spec"><i className="fa-brands fa-react"></i></a>
                            <a href="" className="project-spec"><i className="fa-brands fa-node-js"></i></a> 

                            <a href="" className="project-spec"><i className="fa-brands fa-bootstrap"></i></a>
                            <br /><br />
                            <a href="  https://expense-tracker-client-cfii.vercel.app/" target='_blank' className="project-link">Live Demo</a>
                            <a target='_blank' href="https://github.com/shintamariam123/Expense_Tracker_Client" className="project-link">Github</a>
                        </div>
                        <div className="project-image">
                            <img src=" /images/expensetracker.png" alt="Project 5" />
                            <div className='overlay'>
                                <div className="arrow"><a target='_blank' href=" https://expense-tracker-client-cfii.vercel.app/">&rarr;</a> </div> {/* Replace with an icon if needed */}

                                <div className="date">May 24, 2024</div> {/* Replace with your date */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container'>
                    <hr className="custom-hr" />
                </div>
                {/* media player */}
                <div className='projects-section1'>
                    <div className="project-row1 d-flex">
                        <div className="project-image">
                            <img src="/images/mediaplayer.png" alt="Project 2" />
                            <div className='overlay'>
                                <div className="arrow"><a target='_blank' href="https://media-player-app-xi.vercel.app/">&rarr;</a> </div> {/* Replace with an icon if needed */}

                                <div className="date">Feb 29, 2024</div> {/* Replace with your date */}
                            </div>
                        </div>

                        <div className="project-details">
                            <h2>MEDIA PLAYER</h2>
                            <p>A fully functional media player web application built using REACT and BOOTSTRAP, with a JSON SERVER backend. Features include the ability to upload and delete videos, organize content into categories, view playback history, and manage a streamlined user interface. Perfect for exploring dynamic video management and enhancing user experience with intuitive controls.</p>
                            <h3>MADE WITH</h3>
                            <a href="" className="project-spec"><i className="fa-brands fa-html5"></i></a>
                            <a href="" className="project-spec"><i className="fa-brands fa-css3"></i></a>
                            <a href="" className="project-spec"><i className="fa-brands fa-react"></i></a>
                            <a href="" className="project-spec"><i className="fa-brands fa-bootstrap"></i></a>
                            <a href="" className="project-spec"><i className="fa-brands fa-js"></i></a>
                            <br /><br />
                            <a href="https://media-player-app-xi.vercel.app/" className="project-link" target='_blank'>Live Demo</a>
                            <a href="https://github.com/shintamariam123/Media-Player-App" target='_blank' className="project-link">Github</a>
                        </div>

                    </div>
                </div>
                <div className='container'>
                    <hr className="custom-hr" />
                </div>
                {/* ecart */}
                <div className='projects-section3'>
                    <div className="project-row3 d-flex">


                        <div className="project-details">
                            <h2>ECART</h2>
                            <p>An interactive e-commerce platform built with REACT.JS and REDUX. Users can browse products, view detailed descriptions, add items to a wishlist or shopping cart, and proceed to checkout with a dynamic price calculation. The site features a seamless user experience with efficient state management, ensuring smooth navigation and functionality.</p>
                            <h3>MADE WITH</h3>
                            <a href="" className="project-spec"><i className="fa-brands fa-html5"></i></a>
                            <a href="" className="project-spec"><i className="fa-brands fa-css3"></i></a>
                            <a href="" className="project-spec"><i className="fa-brands fa-react"></i></a>

                            <a href="" className="project-spec"><i className="fa-brands fa-js"></i></a>
                            <br /><br />
                            <a href="https://redux-cart-eta.vercel.app/" target='_blank' className="project-link">Live Demo</a>
                            <a target='_blank' href="https://github.com/shintamariam123/redux-cart" className="project-link">Github</a>
                        </div>
                        <div className="project-image">
                            <img src=" /images/cart.png" alt="Project 2" />
                            <div className='overlay'>
                                <div className="arrow"><a target='_blank' href="https://redux-cart-eta.vercel.app/"> &rarr;</a></div> {/* Replace with an icon if needed */}

                                <div className="date">Jan 20, 2024</div> {/* Replace with your date */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container'>
                    <hr className="custom-hr" />
                </div>
                {/* project fair */}
                <div className="projects-section4">
                    <div className="project-row4 ">
                        <div className="project-image">
                            <img src="/images/projectfair.png" alt="Project 4" />
                            <div className='overlay'>
                                <div className="date">Apr 22, 2024</div> {/* Replace with your date */}
                                <div className="arrow"><a href="https://project-fair-ten.vercel.app/" target='_blank'>&rarr;</a> </div> {/* Replace with an icon if needed */}
                            </div>
                        </div>
                        <div className="project-details">
                            <h2>PROJECT FAIR</h2>
                            <p>A responsive Project Fair platform built using REACT, EXPRESS, NODE.JS, and MONGODB. It allows users to showcase and explore projects, featuring a seamless user interface and efficient backend with CONTEXT API for state management. Perfect for collaboration and inspiration!"</p>
                            <h3>MADE WITH</h3>
                            <a href="" className="project-spec"><i className="fa-brands fa-html5"></i></a>
                            <a href="" className="project-spec"><i className="fa-brands fa-css3"></i></a>
                            <a href="" className="project-spec"><i className="fa-brands fa-react"></i></a>
                            <a href="" className="project-spec"><i className="fa-brands fa-node-js"></i></a>
                            {/* <a href="" className="project-spec"><i className="fa-brands fa-js"></i></a> */}
                            <a href="" className="project-spec"><i className="fa-brands fa-bootstrap"></i></a>
                            <br /><br />
                            <a href="https://project-fair-ten.vercel.app/" target='_blank' className="project-link">Live Demo</a>
                            <a target='_blank' href=" https://github.com/shintamariam123/projectFair" className="project-link">Github</a>
                        </div>
                    </div>
                </div>
                <div className='container'>
                    <hr className="custom-hr" />
                </div>
                {/* fitness */}
                <div className="projects-section2">
                    <div className="project-row2 ">
                        <div className="project-details">
                            <h2>FITZONE</h2>
                            <p>A responsive fitness tracker built using REACT and BOOTSTRAP with a JSON Server backend. This application allows users to efficiently manage their workout routines by adding exercises along with their duration and date. Users can also view and delete previously logged exercises, ensuring an organized and seamless tracking experience.</p>
                            <h3>MADE WITH</h3>
                            <a href="" className="project-spec"><i className="fa-brands fa-html5"></i></a>
                            <a href="" className="project-spec"><i className="fa-brands fa-css3"></i></a>
                            <a href="" className="project-spec"><i className="fa-brands fa-react"></i></a>
                            <a href="" className="project-spec"><i className="fa-brands fa-bootstrap"></i></a>
                            <a href="" className="project-spec"><i className="fa-brands fa-js"></i></a>
                            <br /><br />
                            <a href="https://fitness-tracker-app-ten.vercel.app/" target='_blank' className="project-link">Live Demo</a>
                            <a target='_blank' href=" https://github.com/shintamariam123/fitness-tracker-app" className="project-link">Github</a>
                        </div>
                        <div className="project-image">
                            <img src="/images/fitnesstracker.png" alt="Project 1" />
                            <div className='overlay'>
                                <div className="date">Mar 3, 2024</div> {/* Replace with your date */}
                                <div className="arrow"><a href="https://fitness-tracker-app-ten.vercel.app/" target='_blank'> &rarr;</a></div> {/* Replace with an icon if needed */}
                            </div>
                        </div>

                    </div>
                </div>
                <div className='container'>
                    <hr className="custom-hr" />
                </div>
                {/* parallax */}
                <div className="projects-section">
                    <div className="project-row ">
                        <div className="project-image">
                            <img src="/images/parallax.png" alt="Parallax Image" />
                            <div className='overlay'>
                                <div className="date">Jan 20, 2024</div> {/* Replace with your date */}
                                <div className="arrow"> <a target='_blank' href="https://parallax-self.vercel.app/">&rarr;</a></div> {/* Replace with an icon if needed */}
                            </div>
                        </div>
                        <div className="project-details">
                            <h2>SKY WALK</h2>
                            <p>
                                "Designed and developed a captivating parallax homepage with seamless scrolling effects, dynamic content layering, and responsive design. Showcases modern front-end technologies like HTML, CSS, JavaScript, creating an engaging user experience that highlights creativity and interactivity."</p>
                            <h3>MADE WITH</h3>
                            <a href="" className="project-spec"><i className="fa-brands fa-html5"></i></a>
                            <a href="" className="project-spec"><i className="fa-brands fa-css3"></i></a>
                            {/* <a href="" className="project-spec"><i className="fa-brands fa-react"></i></a>
                            <a href="" className="project-spec"><i className="fa-brands fa-node-js"></i></a> */}
                            <a href="" className="project-spec"><i className="fa-brands fa-js"></i></a>
                            {/* <a href="" className="project-spec"><i className="fa-brands fa-bootstrap"></i></a> */}
                            <br /><br />
                            <a href="https://parallax-self.vercel.app/" rel="noopener noreferrer" target='_blank' className="project-link">Live Demo</a>
                            <a href="https://github.com/shintamariam123/parallax" rel="noopener noreferrer" target='_blank' className="project-link">Github</a>
                        </div>
                    </div>
                </div>
                <div className='container'>
                    <hr className="custom-hr" />
                </div>

                {showMore && (
                    // portfolio
                    <div>
                        <div className="projects-section6">
                            <div className="project-row6 ">

                                <div className="project-details">
                                    <h2>ANA PORTFOLIO</h2>
                                    <p>This is a modern and responsive portfolio website built using HTML, CSS, and JavaScript. The template is designed to showcase personal projects, skills, and about in a visually appealing and user-friendly way</p>
                                    <h3>MADE WITH</h3>
                                    <a href="" className="project-spec"><i className="fa-brands fa-html5"></i></a>
                                    <a href="" className="project-spec"><i className="fa-brands fa-css3"></i></a>
                                    <a href="" className="project-spec"><i className="fa-brands fa-js"></i></a>


                                    <a href="" className="project-spec"><i className="fa-brands fa-bootstrap"></i></a>
                                    <br /><br />
                                    <a href="https://portfolio-three-gamma-12.vercel.app/" target='_blank' className="project-link">Live Demo</a>
                                    <a target='_blank' href="https://github.com/shintamariam123/portfolio" className="project-link">Github</a>
                                </div>
                                <div className="project-image">
                                    <img src="/images/portfolio.png" alt="Project 6" />
                                    <div className='overlay'>
                                        <div className="date">Dec 12, 2023</div> {/* Replace with your date */}
                                        <div className="arrow"><a href="https://portfolio-three-gamma-12.vercel.app/" target='_blank'>&rarr;</a></div> {/* Replace with an icon if needed */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='container'>
                            <hr className="custom-hr" />
                        </div>
                    </div>
                )}

                {showMore && (
                    // fashion
                    <div>
                        <div className='projects-section7'>
                            <div className="project-row7 d-flex">

                                <div className="project-image">
                                    <img src=" /images/fashion.png" alt="Project 7" />
                                    <div className='overlay'>
                                        <div className="arrow"><a href="https://fashion-website-react.vercel.app/" target='_blank'></a> &rarr;</div> {/* Replace with an icon if needed */}

                                        <div className="date">Feb 15, 2024</div> {/* Replace with your date */}
                                    </div>
                                </div>
                                <div className="project-details">
                                    <h2>MARCELA</h2>
                                    <p>An elegant and responsive fashion website designed to showcase modern trends and collections. Built with HTML, CSS, REACT,JavaScript, and Bootstrap, it features a stylish layout, interactive galleries, and a seamless user experience.</p>
                                    <h3>MADE WITH</h3>
                                    <a href="" className="project-spec"><i className="fa-brands fa-react"></i></a>
                                    <a href="" className="project-spec"><i className="fa-brands fa-html5"></i></a>
                                    <a href="" className="project-spec"><i className="fa-brands fa-css3"></i></a>
                                    <a href="" className="project-spec"><i className="fa-brands fa-js"></i></a>


                                    <a href="" className="project-spec"><i className="fa-brands fa-bootstrap"></i></a>

                                    <br /><br />
                                    <a href="https://fashion-website-react.vercel.app/" target='_blank' className="project-link">Live Demo</a>
                                    <a target='_blank' href=" https://github.com/shintamariam123/fashion-website-react" className="project-link">Github</a>
                                </div>
                            </div>
                        </div>
                        <div className='container'>
                            <hr className="custom-hr" />
                        </div>
                    </div>
                )}

                {showMore && (
                    // coffee
                    <div>
                        <div className='projects-section9'>
                            <div className="project-row9 d-flex">


                                <div className="project-details">
                                    <h2>CAFE ROSA</h2>
                                    <p>A responsive cafe website built using HTML, CSS, JavaScript, and Bootstrap. The project showcases responsive design principles and client-side form validation, with Bootstrap used for a responsive, mobile-friendly layout.</p>
                                    <h3>MADE WITH</h3>
                                    <a href="" className="project-spec"><i className="fa-brands fa-html5"></i></a>
                                    <a href="" className="project-spec"><i className="fa-brands fa-css3"></i></a>
                                    {/* <a href="" className="project-spec"><i className="fa-brands fa-react"></i></a>
                            <a href="" className="project-spec"><i className="fa-brands fa-node-js"></i></a> */}
                                    <a href="" className="project-spec"><i className="fa-brands fa-js"></i></a>
                                    {/* <a href="" className="project-spec"><i className="fa-brands fa-bootstrap"></i></a> */}
                                    <br /><br />
                                    <a href="https://dynamic-website-brown.vercel.app/" target='_blank' className="project-link">Live Demo</a>
                                    <a target='_blank' href=" https://github.com/shintamariam123/dynamic-website" className="project-link">Github</a>
                                </div>
                                <div className="project-image">
                                    <img src=" /images/coffee.png" alt="Project 9" />
                                    <div className='overlay'>
                                        <div className="arrow"><a href="https://dynamic-website-brown.vercel.app/" target='_blank'></a> &rarr;</div> {/* Replace with an icon if needed */}

                                        <div className="date">Jan 23, 2024</div> {/* Replace with your date */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='container'>
                            <hr className="custom-hr" />
                        </div>
                    </div>
                )}
                {showMore && (
                    // figma
                    <div>
                        <div className='projects-section11'>
                            <div className="project-row11 d-flex">

                                <div className="project-image">
                                    <img src="/images/figma.png" alt="Project 11" />
                                    <div className='overlay'>
                                        <div className="arrow"><a href="https://figma-seven-iota.vercel.app/" target='_blank'>&rarr;</a> </div> {/* Replace with an icon if needed */}

                                        <div className="date">Jan 12, 2024</div> {/* Replace with your date */}
                                    </div>
                                </div>
                                <div className="project-details">
                                    <h2>GOOD4ME</h2>
                                    <p>A sleek and modern skincare website designed in FIGMA to provide users with detailed product information and skincare tips. Built using HTML and CSS for a clean, responsive design. The site emphasizes aesthetics and functionality, offering an intuitive browsing experience for skincare enthusiasts.</p>
                                    <h3>MADE WITH</h3>
                                    <a href="" className="project-spec"><i className="fa-brands fa-html5"></i></a>
                                    <a href="" className="project-spec"><i className="fa-brands fa-css3"></i></a>

                                    <a href="" className="project-spec"><i className="fa-brands fa-bootstrap"></i></a>
                                    <br /><br />
                                    <a href="https://figma-seven-iota.vercel.app/" target='_blank' className="project-link">Live Demo</a>
                                    <a target='_blank' href="  https://github.com/shintamariam123/figma" className="project-link">Github</a>
                                </div>

                            </div>
                        </div>
                        <div className='container'>
                            <hr className="custom-hr" />
                        </div>
                    </div>
                )}

                {showMore && (

                    // netflix
                    <div>
                        <div className="projects-section8">
                            <div className="project-row8 ">
                                
                                <div className="project-details">
                                    <h2>NETFLIX CLONE</h2>
                                    <p>A sleek, responsive clone of the Netflix homepage built using only HTML and CSS. This project showcases a clean layout, engaging design, and smooth transitions, demonstrating the power of modern web styling techniques. Perfect for streaming enthusiasts!</p>
                                    <h3>MADE WITH</h3>
                                    <a href="" className="project-spec"><i className="fa-brands fa-html5"></i></a>
                                    <a href="" className="project-spec"><i className="fa-brands fa-css3"></i></a>
                                    {/* <a href="" className="project-spec"><i className="fa-brands fa-react"></i></a>
                          <a href="" className="project-spec"><i className="fa-brands fa-node-js"></i></a> */}
                                    <a href="" className="project-spec"><i className="fa-brands fa-js"></i></a>
                                    {/* <a href="" className="project-spec"><i className="fa-brands fa-bootstrap"></i></a> */}
                                    <br /><br />
                                    <a href="https://clone-website-seven.vercel.app/" target='_blank' className="project-link">Live Demo</a>
                                    <a target='_blank' href=" https://github.com/shintamariam123/clone-website" className="project-link">Github</a>
                                </div>
                                <div className="project-image">
                                    <img src="/images/netflix.png" alt="Project 8" />
                                    <div className='overlay'>
                                        <div className="date">Dec 10, 2023</div> {/* Replace with your date */}
                                        <div className="arrow"><a href="https://clone-website-seven.vercel.app/" target='_blank'>&rarr;</a> </div> {/* Replace with an icon if needed */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='container'>
                            <hr className="custom-hr" />
                        </div>
                    </div>
                )}
                {showMore && (
                    // travel
                    <div>
                        <div className="projects-section10">
                            <div className="project-row8 ">
                                <div className="project-image">
                                    <img src="/images/travel.png" alt="Project 10" />
                                    <div className='overlay'>
                                        <div className="date">Dec 28, 2023</div> {/* Replace with your date */}
                                        <div className="arrow"> <a href="https://travel-eta-five.vercel.app/" target='_blank'>&rarr;</a></div> {/* Replace with an icon if needed */}
                                    </div>
                                </div>
                                <div className="project-details">
                                    <h2>TRAVERSAL</h2>
                                    <p>A visually captivating travel website that showcases various travel destinations, offering an engaging user experience. Built with only HTML and CSS, this project highlights responsive design principles, smooth layout transitions, and a clean, user-friendly interface.</p>
                                    <h3>MADE WITH</h3>
                                    <a href="" className="project-spec"><i className="fa-brands fa-html5"></i></a>
                                    <a href="" className="project-spec"><i className="fa-brands fa-css3"></i></a>

                                    <br /><br />
                                    <a href="https://travel-eta-five.vercel.app/" target='_blank' className="project-link">Live Demo</a>
                                    <a target='_blank' href="  https://github.com/shintamariam123/travel" className="project-link">Github</a>
                                </div>
                            </div>
                        </div>
                        <div className='container'>
                            <hr className="custom-hr" />
                        </div>
                    </div>
                )}


                {!showMore && (
                    <div className="load-more">
                        <button onClick={() => setShowMore(true)} id="load-more-btn">
                            DIVE INTO MORE
                        </button>
                    </div>
                )}
            </div>




            {/* contact us */}

            <div div id='contact' className='contact-section  p-5 row ' >
                <h3 className='text-center text-light'>GET IN TOUCH</h3>
                <div className="col-lg-1 d-none d-lg-block "></div>
                <div className="col-lg-6 col-md-6 col-12 mt-5 d-flex flex-column    ">
                    <form ref={form} onSubmit={sendEmail}>

                        <div className='d-flex flex-wrap justify-content-between'>
                            <div className='d-flex flex-column mt-2'>
                                <label className='text-light' htmlFor="name">NAME</label>
                                <input style={{
                                    backgroundColor: 'black',
                                    border: 'none',
                                    borderBottom: '1px solid white',
                                    color: 'white',
                                    outline: 'none'
                                }} type="text" name="from_name" id="from_name" value={formData.from_name}
                                    onChange={handleChange} />
                            </div>
                            <div className='d-flex flex-column mt-2'>
                                <label className='text-light' htmlFor="mail">EMAIL  </label>
                                <input type="text" style={{
                                    backgroundColor: 'black',
                                    border: 'none',
                                    borderBottom: '1px solid white',
                                    color: 'white',
                                    outline: 'none'
                                }} name="user_email" id="user_email" value={formData.user_email}
                                    onChange={handleChange} />
                            </div>
                        </div>
                        <div className='d-flex flex-column justify-content-between mt-4'>
                            <label className='text-light ' htmlFor="message">WRITE A MESSAGE...</label>
                            <textarea style={{
                                backgroundColor: 'black',
                                border: 'none',
                                borderBottom: '1px solid white',
                                color: 'white',
                                outline: 'none', marginTop: '8rem'
                            }} name="message" id="message" value={formData.message}
                                onChange={handleChange}></textarea>
                        </div>
                        <div>
                            <button type='submit' value="send" className='btn rounded-5 mt-4  px-4 py-3' disabled={!isFormComplete} style={{
                                backgroundColor: isFormComplete ? 'rgb(120, 55, 10)' : 'black',
                                cursor: isFormComplete ? 'pointer' : 'not-allowed',
                            }}>SEND MESSAGE</button>
                        </div>
                    </form>
                </div>
                <div className="col-lg-1 d-none d-lg-block"></div>
                <div className="col-lg-4 col-md-4 col-12 mt-5 contact-details ">
                    <div className='d-flex flex-column'>
                        <p>SHOOT ME AT</p>
                        <a href="mailto:shinta.mariamcherian@gmail.com" target="_blank" rel="noopener noreferrer"><i className="me-2 fa-regular fa-envelope"></i><span>shinta.mariamcherian@gmail.com</span></a>
                        <br /><br />
                        <p>CONTACT</p>
                        <a href="tel:+918113942581" target="_blank" rel="noopener noreferrer"><i className="me-2 fa-solid fa-phone"></i> <span>+91 8113942581</span></a>
                    </div>
                </div>
            </div >


            <div className='d-flex footer flex-column align-items-center justify-content-center'>
                <div className='icons '>
                    <a href="mailto:shinta.mariamcherian@gmail.com" target="_blank" rel="noopener noreferrer"><i className="fa-regular fa-envelope"></i></a>
                    <a href="https://www.linkedin.com/in/shinta-mariam-cheriann" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-linkedin"></i></a>
                    <a href="https://github.com/shintamariam123" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-github"></i></a>
                    <a href="https://www.instagram.com/shinta__mariam_?igsh=eGdhZXljZ29jN3F1" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-square-instagram"></i></a>
                </div>
                <p className='text-light text-center mt-4'>© 2024 All rights reserved | Made by Shinta Mariam Cherian</p>
            </div>





            <ToastContainer />



        </>
    )
}

export default HomePage