import NavBar from "./NavBar";

function About() {
  return (
    <>
      <NavBar />
      <main className="flex flex-col gap-14 bg-zinc-800 sectionSize text-white font-sourceSans3 py-20" id="about">
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-16">
          <h2 className="text-yellow-400 font-bold text-5xl">ABOUT</h2>
          <p>In this school, Education and Behavior play the most powerful motivating forces and essential means to create significant life changes among its students.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-10">
          <div className="flex flex-col gap-2">
            <h3 className="text-yellow-400 font-bold text-3xl text-center">MISSION</h3>
            <p>Infant Jesus Montessori Center is a leading school recognized globally for excellence and developing wholistic leaders who will play a great role in improving the nation.</p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-yellow-400 font-bold text-3xl text-center">VISION</h3>
            <p>The IJMC is committed to shape the hearts, minds and souls of all students through quality education that will bring about the best in them.</p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-yellow-400 font-bold text-3xl text-center">PHILOSOPHY</h2>
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

        <div className="flex flex-row gap-6">
          <h2 className="text-yellow-400 font-bold text-3xl my-auto" style={{ writingMode: "vertical-rl", textOrientation: "upright" }}>
            GOALS
          </h2>
          <ul className="flex flex-col justify-between list-disc">
            <li>To provide wholesome and basic learning experiences of children for their intellectual, social, physical, cultural and spiritual development.</li>
            <li>To serve as outlet of technical know-how in innovation of education.</li>
            <li>To develop pupils to be independent minded individual through self-learning activities.</li>
            <li>Develop love and appreciation of country, its history and culture, its government and policies through books, educational researches, seminars, and other activities geared towards this purpose.</li>
            <li>Instill habits of industry and thrift, through savings.</li>
          </ul>
          <div></div>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-yellow-400 font-bold text-3xl text-center">QUESTIONS ?</h2>
          <div className="flex flex-row items-center gap-4">
            <div className="text-4xl">?</div>
            <div>Does my life reflect my values?</div>
          </div>
          <div className="flex flex-row items-center gap-4">
            <div className="text-4xl">?</div>
            <div>What do I want my life to be about?</div>
          </div>
          <div className="flex flex-row items-center gap-4">
            <div className="text-4xl">?</div>
            <div>Do I either know the direction I want my life to go or have sufficient faith in a higher power to trust that I do not need to know?</div>
          </div>
        </div>

        <p className="text-xl text-center">
          <span className="text-yellow-400">EDUCATION</span> has its object the <span className="text-yellow-400">FORMATION</span> of <span className="text-yellow-400">CHARACTER</span>.
        </p>

        <p className="text-xl text-center">
          We are very proud to say that Infant Jesus Montessorians have refined <span className="text-yellow-400">CHARACTERS</span>, fully developed <span className="text-yellow-400">MINDS</span>, vigorous{" "}
          <span className="text-yellow-400">BODIES</span>, and well-rounded <span className="text-yellow-400">PERSONALITIES</span>
        </p>
      </main>
    </>
  );
}

export default About;
