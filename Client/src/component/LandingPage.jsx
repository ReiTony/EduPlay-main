import { useNavigate } from "react-router-dom";
import myHighlight1 from "../assets/LandingPage/Highlight1.svg";
import myHighlight2 from "../assets/LandingPage/Highlight2.svg";
import kids from "../assets/LandingPage/kids.png";
import NavBar from "./NavBar";

const resourcesLogo = [
  { src: "/images/canva.webp", alt: "canva" },
  { src: "/images/pixelbay.webp", alt: "pixelbay" },
];

function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="backgroundYellow flex flex-col">
      <NavBar />
      <section className="flex flex-col justify-center px-4 pt-24 text-center md:mt-0 md:h-screen md:text-left md:flex-row md:justify-between md:items-center lg:px-48 md:px-12 bg-secondary">
        <div className="md:flex-1 md:mr-10">
          <h1 className="text-5xl font-bold font-pt-serif mb-7 text-zinc-800 font-sourceSans3">
            A Place to Combine<br></br>
            <span className="bg-left-bottom bg-no-repeat pb-2 bg-100%">Learning and Fun</span>
          </h1>
          <p className="font-normal font-pt-serif mb-7">Embark on an educational adventure like no other as this website combines learning with exciting games, turning knowledge into a thrilling quest.</p>
          <div className="font-montserrat">
            <button className="px-6 py-4 mb-2 mr-2 text-white border-2 border-black border-solid rounded-lg bg-zinc-800 font-expletus" onClick={() => navigate("/student/login")}>
              Student Login
            </button>
            <button className="px-6 py-4 text-white border-2 border-solid rounded-lg bg-rose-500 border-rose-500 font-expletus" onClick={() => navigate("teacher/login")}>
              Teacher Login
            </button>
          </div>
        </div>
        <div className="flex justify-around mt-8 md:block md:mt-0 md:flex-1">
          <div className="relative">
            <img src={myHighlight1} alt="" className="absolute -top-16 -left-10" />
          </div>
          <img src={kids} alt="Excited Students" />
          <div className="relative">
            <img src={myHighlight2} alt="" className="absolute -bottom-10 -right-6" />
          </div>
        </div>
      </section>

      <section className="text-white bg-zinc-800 sectionSize" id="about">
        <div>
          <h2 className="text-3xl font-semibold mb-4 bg-underline2 bg-100%">About</h2>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-col items-center flex-1 mx-8 my-4">
            <div className="flex items-center justify-center w-12 h-12 mb-3 text-white border-2 rounded-full bg-secondary">1</div>
            <h3 className="mb-2 text-xl font-medium font-montserrat">Learning</h3>
            <p className="text-center font-montserrat">Learning subjects through a welcoming and exciting way.</p>
          </div>
          <div className="flex flex-col items-center flex-1 mx-8 my-4">
            <div className="flex items-center justify-center w-12 h-12 mb-3 text-white border-2 rounded-full bg-secondary">2</div>
            <h3 className="mb-2 text-xl font-medium font-montserrat">Excitement</h3>
            <p className="text-center font-montserrat">Combine learning with games that keeps the students entertained and engaged.</p>
          </div>
          <div className="flex flex-col items-center flex-1 mx-8 my-4">
            <div className="flex items-center justify-center w-12 h-12 mb-3 text-white border-2 rounded-full bg-secondary">3</div>
            <h3 className="mb-2 text-xl font-medium font-montserrat">Interactive</h3>
            <p className="text-center font-montserrat">Improve the critical thinking and challenge the students to think out of the box.</p>
          </div>
        </div>
      </section>

      <section className="sectionSize bg-secondary" id="features">
        <div>
          <h2 className="text-3xl font-semibold mb-4 bg-underline3 bg-100%">Features</h2>
        </div>
        <div className="md:grid md:grid-cols-2 md:grid-rows-2">
          <div className="flex items-start my-6 mr-10 font-montserrat">
            {/* <img src={heart} alt="" className="mr-4 h-7" /> */}
            <div>
              <h3 className="text-2xl font-semibold">Modules and Lectures</h3>
              <p>Provide the students with lectures whether through documents or videos to keep them engaged and provide relevant information to the subjects.</p>
            </div>
          </div>

          <div className="flex items-start my-6 mr-10 font-montserrat">
            {/* <img src={heart} alt="" className="mr-4 h-7" /> */}
            <div>
              <h3 className="text-2xl font-semibold">Assessments</h3>
              <p>Challenge and test the knowledge of the students through basic assessments that tests how much the student understood the lessons.</p>
            </div>
          </div>

          <div className="flex items-start my-6 mr-10 font-montserrat">
            {/* <img src={heart} alt="" className="mr-4 h-7" /> */}
            <div>
              <h3 className="text-2xl font-semibold">Game</h3>
              <p>Enjoy various games that can help students remember and understand what they have learned while also having fun.</p>
            </div>
          </div>

          <div className="flex items-start my-6 mr-10 font-montserrat">
            {/* <img src={heart} alt="" className="mr-4 h-7" /> */}
            <div>
              <h3 className="text-2xl font-semibold">Learning Group</h3>
              <p>Allow teachers to interact with their students by providing them custom instructor-made assessments and monitor their progress.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-zinc-800 sectionSize text-white">
        <h2 className="text-3xl font-semibold bg-underline3 bg-100%">Resources</h2>
        <div className="flex flex-row flex-wrap gap-4 justify-center items-center my-8">
          {resourcesLogo.map((l, ind) => (
            <div key={ind} className="w-24">
              <img src={l.src} alt={l.alt} />
            </div>
          ))}
        </div>

        <div className="text-sm font-montserrat mt-6">© 2023 EDUPLAY. All rights reserved</div>
      </section>
    </div>
  );
}

export default LandingPage;
