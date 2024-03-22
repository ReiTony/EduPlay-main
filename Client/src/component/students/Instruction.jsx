function Instruction() {
  return (
    <div className="text-xl font-semibold">
      <h3 className="text-2xl mb-2">Instructions</h3>
      <ol>
        <li className="list-decimal ms-4 mb-2">
          Read each question carefully before selecting the best answer. Press
          Submit to move to the next question.
        </li>
        <li className="list-decimal ms-4 mb-2">
          For Multiple Choice questions, choose the option that best answers the
          question.
        </li>
        <li className="list-decimal ms-4 mb-2">
          For true or false questions, determine whether the statement is true
          or false based on your understanding of the topic.
        </li>
      </ol>
    </div>
  );
}
export default Instruction;
