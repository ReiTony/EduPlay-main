import { useNavigate } from "react-router-dom";
import myHighlight1 from "../assets/LandingPage/Highlight1.svg";
import myHighlight2 from "../assets/LandingPage/Highlight2.svg";
import kids from "../assets/LandingPage/kids.png";
import NavBar from "./NavBar";

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

      <section className="text-white bg-zinc-800 sectionSize" id="section-1">
        <div>
          <h2 className="secondaryTitle bg-underline2 bg-100%">About</h2>
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

      <section className="sectionSize bg-secondary" id="section-2">
        <div>
          <h2 className="secondaryTitle bg-underline3 bg-100%">Features</h2>
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

      <section className="flex flex-col gap-14 bg-zinc-800 sectionSize text-white font-sourceSans3 py-20" id="about">
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-16">
          <h2 className="text-yellow-400 font-bold text-5xl">ABOUT</h2>
          <p>In this school, Education and Behavior play the most powerful motivating forces and essential means to create significant life changes among its students.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-10">
          <div className="flex flex-col gap-2">
            <h3 className="text-yellow-400 font-bold text-2xl text-center">MISSION</h3>
            <p>Infant Jesus Montessori Center is a leading school recognized globally for excellence and developing wholistic leaders who will play a great role in improving the nation.</p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-yellow-400 font-bold text-2xl text-center">VISION</h3>
            <p>The IJMC is committed to shape the hearts, minds and souls of all students through quality education that will bring about the best in them.</p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-yellow-400 font-bold text-2xl text-center">PHILOSOPHY</h2>
          <p>
            The aims and objectives of Infant Jesus Montessori Center recognized that every human being has an eternal destiny as well as earth existence. IJMC, therefore, pursues full and integrated development of the whole
            man, intellectually, culturally, morally, and spiritually. The school carries on the role as promoter of Christian and humanistic ideals and thereby seeks to fulfill its individual commitment of individual to
            community and to God.
          </p>
          <p>The school recognizes the role of the parents as the primary and principal educators of their children.</p>
          <p>
            In keeping the role of an educational institution, IJMC wants to remain faithful to its function.. to serve the educational needs of every students and develop a like-long learner with the core values Maka-Diyos,
            makatao, maka kalikasan at makabansa.
          </p>
        </div>
      </section>

      <section className="bg-secondary sectionSize">
        <div className="text-sm font-montserrat">© 2023 EDUPLAY. All rights reserved</div>
      </section>
    </div>
  );
}

export default LandingPage;
