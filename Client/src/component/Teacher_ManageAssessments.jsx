function ManageAssessments() {
  return (
    <div className="flex flex-col flex-grow gap-2 p-4">
      <div className="bg-[#08a454] rounded-full shadow-md px-10 py-3 text-4xl font-bold font-sourceSans3">CUSTOM ASSESSMENTS</div>
      <div className="flex flex-col bg-[#a8d4a4] flex-grow rounded-3xl p-5">
        <div className="flex flex-row justify-end gap-2">
          <button className="bg-[#282424] rounded-full shadow-md px-8 py-2 text-white text-2xl font-bold hover:brightness-90">ADD QUESTION</button>
          <button className="bg-[#282424] rounded-full shadow-md px-8 py-2 text-white text-2xl font-bold hover:brightness-90">SAVE ASSESSMENT</button>
        </div>
      </div>
    </div>
  );
}

export default ManageAssessments;
